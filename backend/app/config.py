import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "TwinAI - Concept Dependency Graph Diagnostic System"
    API_PREFIX: str = "/api"
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "twinai_db")
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "chrome-extension://*",
        "*"
    ]
    CODEFORCES_API_BASE: str = "https://codeforces.com/api"
    DATA_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
    DEFAULT_STUDENT_ID: str = "std_01"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
