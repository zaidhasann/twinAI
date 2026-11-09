import pytest
import sys, os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.tracer import tracer

def test_tree_dp_identifies_recursion_root_cause():
    """
    A student failing Tree DP who has weak Recursion should be diagnosed
    with Recursion Foundations as the true root cause.
    """
    mastery = {
        "recursion": {"mastery_score": 30.0, "weakness_score": 70.0, "status": "Attention", "attempts": 8, "solved": 1},
        "binary_trees": {"mastery_score": 58.0, "weakness_score": 42.0, "status": "Good", "attempts": 10, "solved": 5},
        "dfs": {"mastery_score": 62.0, "weakness_score": 38.0, "status": "Good", "attempts": 12, "solved": 8},
        "tree_dp": {"mastery_score": 20.0, "weakness_score": 80.0, "status": "Attention", "attempts": 5, "solved": 0}
    }

    diag = tracer.diagnose_concept("tree_dp", mastery)
    assert diag["is_surface_symptom"] is True
    assert diag["root_cause"]["concept_id"] == "recursion"
    assert len(diag["fix_path"]) >= 2
    assert diag["fix_path"][0]["concept_id"] == "recursion"

def test_topological_sort_identifies_cycle_detection():
    """
    A student failing Topological Sort who cannot detect cycles should be
    diagnosed with Cycle Detection in Graphs.
    """
    mastery = {
        "cycle_detection": {"mastery_score": 35.0, "weakness_score": 65.0, "status": "Attention", "attempts": 7, "solved": 2},
        "bfs": {"mastery_score": 75.0, "weakness_score": 25.0, "status": "Strong", "attempts": 15, "solved": 12},
        "topological_sort": {"mastery_score": 28.0, "weakness_score": 72.0, "status": "Attention", "attempts": 4, "solved": 0}
    }

    diag = tracer.diagnose_concept("topological_sort", mastery)
    assert diag["is_surface_symptom"] is True
    assert diag["root_cause"]["concept_id"] == "cycle_detection"

def test_isolated_weakness_is_not_misattributed():
    """
    When all ancestors are strong, the diagnosis should correctly report
    that the difficulty is localized directly to the symptom concept.
    """
    mastery = {
        "recursion": {"mastery_score": 90.0, "weakness_score": 10.0, "status": "Strong", "attempts": 20, "solved": 18},
        "binary_trees": {"mastery_score": 88.0, "weakness_score": 12.0, "status": "Strong", "attempts": 20, "solved": 18},
        "dfs": {"mastery_score": 85.0, "weakness_score": 15.0, "status": "Strong", "attempts": 20, "solved": 17},
        "dynamic_programming_1d": {"mastery_score": 82.0, "weakness_score": 18.0, "status": "Strong", "attempts": 20, "solved": 16},
        "tree_dp": {"mastery_score": 40.0, "weakness_score": 60.0, "status": "Attention", "attempts": 4, "solved": 1}
    }

    diag = tracer.diagnose_concept("tree_dp", mastery)
    assert diag["is_surface_symptom"] is False
    assert diag["root_cause"]["concept_id"] == "tree_dp"
