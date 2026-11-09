import json
import os
import asyncio
import threading
from typing import Dict, Any, Optional
import motor.motor_asyncio
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from app.config import settings

class DatabaseManager:
    def __init__(self):
        self.use_mongo = False
        self.client: Optional[motor.motor_asyncio.AsyncIOMotorClient] = None
        self.db = None
        self.file_store_path = os.path.join(settings.DATA_DIR, "store.json")
        self._memory_store: Dict[str, Any] = {}
        self._lock = threading.Lock()
        self._init_file_store()

    def _init_file_store(self):
        os.makedirs(settings.DATA_DIR, exist_ok=True)
        if os.path.exists(self.file_store_path):
            try:
                with open(self.file_store_path, "r", encoding="utf-8") as f:
                    self._memory_store = json.load(f)
            except Exception:
                self._memory_store = self._default_store()
                self._save_file_store()
        else:
            self._memory_store = self._default_store()
            self._save_file_store()

    def _default_store(self) -> Dict[str, Any]:
        return {
            "students": {},
            "concept_mastery": {},
            "submissions": {},
            "diagnoses": {}
        }

    def _save_file_store(self):
        try:
            with open(self.file_store_path, "w", encoding="utf-8") as f:
                json.dump(self._memory_store, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"[Warning] Failed to persist file store: {e}")

    async def connect(self):
        # Allow disabling MongoDB via env var for fast local/test runs
        if os.getenv("DISABLE_MONGODB", "").lower() in ["1", "true", "yes"]:
            self.use_mongo = False
            print(f"[Database] Running in Local/JSON Store mode at {self.file_store_path}")
            return

        try:
            self.client = motor.motor_asyncio.AsyncIOMotorClient(
                settings.MONGODB_URL,
                serverSelectionTimeoutMS=400,
                connectTimeoutMS=400,
                socketTimeoutMS=400
            )
            # Fast ping with 500ms hard asyncio timeout
            await asyncio.wait_for(self.client.admin.command('ping'), timeout=0.5)
            self.db = self.client[settings.DATABASE_NAME]
            self.use_mongo = True
            print(f"[Database] Connected to MongoDB at {settings.MONGODB_URL} (db: {settings.DATABASE_NAME})")
        except Exception as e:
            self.use_mongo = False
            self.client = None
            print(f"[Database] MongoDB unavailable ({e}). Running in resilient Local/JSON Store mode at {self.file_store_path}")

    async def disconnect(self):
        if self.client:
            self.client.close()
            print("[Database] MongoDB connection closed")

    async def get_student(self, student_id: str) -> Optional[Dict[str, Any]]:
        if self.use_mongo and self.db is not None:
            try:
                doc = await self.db.students.find_one({"id": student_id})
                if doc:
                    doc.pop("_id", None)
                    return doc
            except Exception as e:
                print(f"[DB Error] MongoDB fetch failed, using fallback: {e}")

        with self._lock:
            return self._memory_store.get("students", {}).get(student_id)

    async def save_student(self, student_id: str, data: Dict[str, Any]):
        data["id"] = student_id
        if self.use_mongo and self.db is not None:
            try:
                await self.db.students.update_one(
                    {"id": student_id},
                    {"$set": data},
                    upsert=True
                )
            except Exception as e:
                print(f"[DB Error] MongoDB save failed, using fallback: {e}")

        with self._lock:
            if "students" not in self._memory_store:
                self._memory_store["students"] = {}
            self._memory_store["students"][student_id] = data
            self._save_file_store()

    async def get_concept_mastery(self, student_id: str) -> Dict[str, Any]:
        if self.use_mongo and self.db is not None:
            try:
                doc = await self.db.concept_mastery.find_one({"student_id": student_id})
                if doc and "mastery" in doc:
                    return doc["mastery"]
            except Exception as e:
                print(f"[DB Error] MongoDB fetch failed: {e}")

        with self._lock:
            return self._memory_store.get("concept_mastery", {}).get(student_id, {})

    async def save_concept_mastery(self, student_id: str, mastery_dict: Dict[str, Any]):
        if self.use_mongo and self.db is not None:
            try:
                await self.db.concept_mastery.update_one(
                    {"student_id": student_id},
                    {"$set": {"student_id": student_id, "mastery": mastery_dict}},
                    upsert=True
                )
            except Exception as e:
                print(f"[DB Error] MongoDB save failed: {e}")

        with self._lock:
            if "concept_mastery" not in self._memory_store:
                self._memory_store["concept_mastery"] = {}
            self._memory_store["concept_mastery"][student_id] = mastery_dict
            self._save_file_store()

    async def save_diagnosis_log(self, student_id: str, diagnosis_data: Dict[str, Any]):
        if self.use_mongo and self.db is not None:
            try:
                await self.db.diagnoses.insert_one({
                    "student_id": student_id,
                    **diagnosis_data
                })
            except Exception as e:
                print(f"[DB Error] MongoDB diagnosis log failed: {e}")

        with self._lock:
            if "diagnoses" not in self._memory_store:
                self._memory_store["diagnoses"] = {}
            if student_id not in self._memory_store["diagnoses"]:
                self._memory_store["diagnoses"][student_id] = []
            self._memory_store["diagnoses"][student_id].append(diagnosis_data)
            self._save_file_store()

db_manager = DatabaseManager()
