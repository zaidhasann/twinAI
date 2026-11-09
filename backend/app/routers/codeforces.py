from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import CodeforcesSyncRequest, CodeforcesSyncResponse
from app.services.codeforces_service import codeforces_service
from app.config import settings

router = APIRouter(prefix="/students", tags=["Codeforces Integration"])

@router.post("/sync-codeforces", response_model=CodeforcesSyncResponse)
async def sync_codeforces(request: CodeforcesSyncRequest):
    """
    Fetches real submission history from Codeforces API, maps problem tags to
    the Concept Dependency Graph, computes mastery/weakness scores, and updates the student's Digital Twin.
    """
    try:
        result = await codeforces_service.sync_codeforces_data(
            student_id=settings.DEFAULT_STUDENT_ID,
            handle=request.handle,
            count=request.count
        )
        return CodeforcesSyncResponse(
            status=result["status"],
            handle=result["handle"],
            rating=result["rating"],
            rank=result["rank"],
            maxRating=result["maxRating"],
            submissions_analyzed=result["submissions_analyzed"],
            synced_concepts=result["synced_concepts"],
            placement_readiness=result["placement_readiness"],
            message=result["message"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to sync Codeforces data: {str(e)}")
