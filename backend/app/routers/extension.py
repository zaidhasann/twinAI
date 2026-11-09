from fastapi import APIRouter
from app.models.schemas import ExtensionSubmissionRequest, ExtensionDiagnosisResponse
from app.core.tracer import tracer
from app.core.concept_graph import concept_graph
from app.database import db_manager
from app.config import settings

router = APIRouter(prefix="/extension", tags=["Chrome Extension Companion"])

@router.post("/diagnose", response_model=ExtensionDiagnosisResponse)
async def diagnose_extension_submission(request: ExtensionSubmissionRequest):
    """
    Called by the Chrome Extension overlay when a student fails or inspects
    a problem directly on LeetCode or Codeforces.
    Maps problem tags to the Concept Dependency Graph, runs backward root-cause analysis,
    and returns immediate remedial insights for the floating browser pill.
    """
    student_id = request.student_id or settings.DEFAULT_STUDENT_ID
    mastery = await db_manager.get_concept_mastery(student_id)

    # 1. Match problem to concept in the graph
    matched_concept_id = "tree_dp"  # default
    tags_lower = [t.lower() for t in request.tags]
    title_lower = request.problem_title.lower()

    if any(k in tags_lower for k in ["tree", "trees"]) and any(k in tags_lower for k in ["dp", "dynamic programming"]):
        matched_concept_id = "tree_dp"
    elif any(k in tags_lower for k in ["graph", "graphs"]) and ("topological" in title_lower or "cycle" in title_lower or "course" in title_lower):
        matched_concept_id = "topological_sort"
    elif "shortest path" in tags_lower or "dijkstra" in title_lower:
        matched_concept_id = "shortest_path_dijkstra"
    elif "dsu" in tags_lower or "disjoint" in tags_lower:
        matched_concept_id = "disjoint_set_union"
    elif "sliding window" in tags_lower:
        matched_concept_id = "sliding_window"
    elif "binary search" in tags_lower:
        matched_concept_id = "binary_search_on_answer" if "answer" in title_lower else "binary_search"
    elif "dp" in tags_lower or "dynamic programming" in tags_lower:
        matched_concept_id = "dynamic_programming_1d"
    elif "two pointers" in tags_lower:
        matched_concept_id = "two_pointers"
    else:
        # Fallback search across node names
        for node in concept_graph.get_all_nodes():
            if any(t in node.get("cf_tags", []) or t in node.get("lc_tags", []) for t in request.tags):
                matched_concept_id = node["id"]
                break

    # 2. Run backward diagnosis
    diag = tracer.diagnose_concept(matched_concept_id, mastery)
    root_node = diag["root_cause"]
    symptom_node = diag["symptom"]
    chain_str = " → ".join([c["name"] for c in diag["causal_chain"]])

    fix_problem = (
        diag["fix_path"][0]["recommended_problem"]
        if diag["fix_path"]
        else {"title": "Foundational Prerequisite Drill", "url": "https://leetcode.com"}
    )

    return ExtensionDiagnosisResponse(
        problem_title=request.problem_title,
        matched_concept=matched_concept_id,
        is_surface_symptom=diag["is_surface_symptom"],
        symptom_name=symptom_node["name"],
        root_cause_name=root_node["name"],
        causal_path=chain_str,
        explanation=diag["explanation"],
        recommended_fix_problem=fix_problem
    )
