import pytest
import sys, os
import asyncio

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
os.environ["DISABLE_MONGODB"] = "1"

from app.routers import graph, twin, diagnosis, assistant, extension
from app.models.schemas import DiagnosisRequest, ChatRequest, ExtensionSubmissionRequest

def test_graph_endpoints():
    data = graph.get_full_graph()
    assert "nodes" in data
    assert "edges" in data
    assert data["is_dag"] is True
    assert len(data["nodes"]) >= 35

    detail = graph.get_concept_details("tree_dp")
    assert detail["concept"]["id"] == "tree_dp"
    assert len(detail["direct_prerequisites"]) > 0

    categories = graph.get_concept_categories()
    assert len(categories) >= 5

def test_student_endpoints():
    profile = asyncio.run(twin.get_profile("std_01"))
    assert profile["id"] == "std_01"
    assert profile["stats"]["placementReadiness"] >= 50

    digital_twin = asyncio.run(twin.get_digital_twin("std_01"))
    assert len(digital_twin["nodes"]) >= 5
    assert digital_twin["confidence"] >= 80

    readiness = asyncio.run(twin.get_placement_readiness("std_01"))
    assert readiness["score"] >= 50

    skills = asyncio.run(twin.get_skills("std_01"))
    assert len(skills["skills"]) >= 3
    assert len(skills["radar"]) >= 6

    companies = asyncio.run(twin.get_companies("std_01"))
    assert len(companies) >= 2

    roadmap = asyncio.run(twin.get_roadmap("std_01"))
    assert len(roadmap) == 4

    daily_plan = asyncio.run(twin.get_daily_plan("std_01"))
    assert len(daily_plan) >= 3

def test_diagnosis_endpoint():
    req = DiagnosisRequest(concept_id="tree_dp")
    diag = asyncio.run(diagnosis.diagnose_student("std_01", req))
    assert diag["symptom"]["concept_id"] == "tree_dp"
    assert "root_cause" in diag
    assert "causal_chain" in diag
    assert len(diag["fix_path"]) >= 2

def test_assistant_chat_endpoint():
    req = ChatRequest(query="What should I study today?", student_id="std_01")
    res = asyncio.run(assistant.chat_with_assistant(req))
    assert len(res.reply) > 20

def test_extension_diagnose_endpoint():
    req = ExtensionSubmissionRequest(
        platform="leetcode",
        problem_id="337",
        problem_title="House Robber III",
        verdict="WA",
        tags=["dp", "tree"],
        student_id="std_01"
    )
    res = asyncio.run(extension.diagnose_extension_submission(req))
    assert res.matched_concept == "tree_dp"
    assert "root_cause_name" in res.dict()
    assert len(res.explanation) > 20
    assert "title" in res.recommended_fix_problem
