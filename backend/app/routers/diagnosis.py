from fastapi import APIRouter, HTTPException, Path
from typing import Dict, Any, Optional
from app.models.schemas import DiagnosisRequest, DiagnosisResponse
from app.core.tracer import tracer
from app.core.concept_graph import concept_graph
from app.database import db_manager

router = APIRouter(prefix="/students", tags=["Backward Root-Cause Diagnosis"])

@router.post("/{student_id}/diagnose", response_model=DiagnosisResponse)
async def diagnose_student(
    student_id: str = Path(..., description="The unique student identifier"),
    request: Optional[DiagnosisRequest] = None
):
    """
    Performs backward graph traversal starting from a failed or struggle concept.
    Pinpoints the true foundational root-cause bottleneck rather than the surface symptom,
    and returns a step-by-step remediation fix path.
    """
    mastery = await db_manager.get_concept_mastery(student_id)

    target_concept = request.concept_id if request and request.concept_id else None

    # If no specific concept is provided, auto-select the highest weakness / highest risk concept
    if not target_concept:
        # Check concepts with Attention or highest weakness
        candidates = []
        for cid in concept_graph.graph.nodes:
            m = mastery.get(cid, {})
            weakness = m.get("weakness_score", 50.0)
            candidates.append((cid, weakness))
        candidates.sort(key=lambda x: x[1], reverse=True)
        # Default to highest weakness or 'tree_dp'
        target_concept = candidates[0][0] if candidates else "tree_dp"

    if target_concept not in concept_graph.graph:
        raise HTTPException(
            status_code=404,
            detail=f"Target concept '{target_concept}' not recognized in Concept Dependency Graph."
        )

    diagnosis = tracer.diagnose_concept(target_concept, mastery)

    # Log diagnosis in database
    await db_manager.save_diagnosis_log(student_id, {
        "target_concept": target_concept,
        "root_cause": diagnosis["root_cause"]["concept_id"],
        "is_surface_symptom": diagnosis["is_surface_symptom"],
        "explanation": diagnosis["explanation"]
    })

    return diagnosis

@router.get("/{student_id}/diagnose-all")
async def diagnose_all_weaknesses(student_id: str):
    """
    Evaluates all weak nodes across the student's entire graph to return
    the top root-cause bottlenecks across all DSA curriculum domains.
    """
    mastery = await db_manager.get_concept_mastery(student_id)
    diagnoses = tracer.diagnose_overall_profile(mastery, limit=4)
    return {
        "student_id": student_id,
        "total_diagnoses": len(diagnoses),
        "diagnoses": diagnoses
    }
