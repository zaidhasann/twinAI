from fastapi import APIRouter, HTTPException, Path
from typing import Dict, Any, List
from app.models.schemas import (
    StudentProfile,
    DigitalTwinResponse,
    SkillAnalysisResponse,
    RoadmapPhaseSchema,
    DailyTaskSchema
)
from app.services.twin_service import twin_service
from app.services.recommendation_service import recommendation_service
from app.database import db_manager

router = APIRouter(prefix="/students", tags=["Digital Twin & Readiness"])

@router.get("/{student_id}/profile", response_model=StudentProfile)
async def get_profile(student_id: str):
    """Returns the student's personal profile, academic information, and composite readiness stats."""
    profile = await db_manager.get_student(student_id)
    if not profile:
        profile = {
            "id": student_id,
            "name": "Alex Sharma",
            "college": "ABC Engineering College",
            "degree": "B.Tech CSE",
            "graduationYear": 2027,
            "cgpa": 8.4,
            "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
            "targetRole": "Software Development Engineer",
            "targetSalary": "₹8-15 LPA",
            "targetCompanies": ["Microsoft", "Accenture", "Capgemini", "TCS"],
            "stats": {
                "leetCodeProblems": 187,
                "githubRepos": 12,
                "projectsCount": 5,
                "placementReadiness": 78,
                "readinessDeltaMonth": 6,
                "interviewReadiness": 64,
                "resumeScore": 86,
                "dsaScore": 81,
                "developmentScore": 76,
                "systemDesignScore": 48,
                "dbmsScore": 58,
                "communicationScore": 72,
                "consistencyScore": 84,
                "streakDays": 12
            }
        }
        await db_manager.save_student(student_id, profile)
    return profile

@router.post("/{student_id}/profile", response_model=StudentProfile)
async def update_profile(student_id: str, profile_update: StudentProfile):
    """Updates or sets the student profile with custom name, college, target role, etc."""
    existing = await db_manager.get_student(student_id) or {}
    data = profile_update.model_dump()
    if existing.get("stats"):
        # Keep accumulated contest/DSA stats
        data["stats"] = {**existing["stats"], **data.get("stats", {})}
    await db_manager.save_student(student_id, data)
    return data

@router.get("/{student_id}/digital-twin", response_model=DigitalTwinResponse)
async def get_digital_twin(student_id: str):
    """Returns synthesized Digital Twin nodes, weights, confidence score, and total verified signals."""
    twin_data = await twin_service.get_digital_twin_view(student_id)
    return twin_data

@router.get("/{student_id}/placement-readiness")
async def get_placement_readiness(student_id: str):
    """Returns overall placement readiness percentage, monthly delta, and confidence level."""
    profile = await get_profile(student_id)
    stats = profile.get("stats", {})
    return {
        "score": stats.get("placementReadiness", 78),
        "delta": stats.get("readinessDeltaMonth", 6),
        "status": "On Track" if stats.get("placementReadiness", 78) >= 70 else "Needs Work",
        "confidence": 88,
        "datapoints": 1247 + stats.get("codeforcesSolved", 0) * 5
    }

@router.get("/{student_id}/skills", response_model=SkillAnalysisResponse)
async def get_skills(student_id: str):
    """Returns categorized skill gaps with priorities and multi-dimensional radar benchmark comparison."""
    return await twin_service.get_skill_analysis(student_id)

@router.get("/{student_id}/companies")
async def get_companies(student_id: str):
    """Returns company match percentages, required skills, and tailored preparation advice."""
    return await twin_service.get_company_matches(student_id)

@router.get("/{student_id}/roadmap", response_model=List[RoadmapPhaseSchema])
async def get_roadmap(student_id: str):
    """Returns personalized 4-phase placement roadmap prioritized by root-cause graph deficiencies."""
    return await recommendation_service.get_personalized_roadmap(student_id)

@router.get("/{student_id}/daily-plan", response_model=List[DailyTaskSchema])
async def get_daily_plan(student_id: str):
    """Returns today's focused task list directly derived from root-cause unblocking."""
    return await recommendation_service.get_daily_tasks(student_id)
