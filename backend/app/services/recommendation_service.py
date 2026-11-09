from typing import Dict, List, Any
from app.core.concept_graph import concept_graph
from app.core.tracer import tracer
from app.database import db_manager

class RecommendationService:
    def __init__(self):
        pass

    async def get_personalized_roadmap(self, student_id: str) -> List[Dict[str, Any]]:
        mastery = await db_manager.get_concept_mastery(student_id)
        # Check diagnoses
        diagnoses = tracer.diagnose_overall_profile(mastery, limit=2)
        root_causes = [d["root_cause"]["name"] for d in diagnoses]

        phases = [
            {
                "id": "phase_1",
                "phaseNumber": 1,
                "title": "Prerequisite Foundation & Root-Cause Remediation",
                "status": "In Progress",
                "progressPercentage": 65,
                "topics": [
                    {
                        "id": "topic_recursion_core",
                        "title": f"Fix Root Cause: {root_causes[0] if root_causes else 'Recursion Call Stack & Backtracking'}",
                        "difficulty": "Medium",
                        "estimatedHours": 10,
                        "status": "in_progress",
                        "category": "Foundations"
                    },
                    {
                        "id": "topic_trees_mastery",
                        "title": "Subtree Traversal & State Returns",
                        "difficulty": "Medium",
                        "estimatedHours": 12,
                        "status": "in_progress",
                        "category": "Trees"
                    },
                    {
                        "id": "topic_linear_ds",
                        "title": "Monotonic Stacks & Two Pointers",
                        "difficulty": "Medium",
                        "estimatedHours": 8,
                        "status": "completed",
                        "category": "Arrays & Stacks"
                    }
                ]
            },
            {
                "id": "phase_2",
                "phaseNumber": 2,
                "title": "Intermediate Graph Algorithms & Cycle Invariants",
                "status": "Upcoming",
                "progressPercentage": 25,
                "topics": [
                    {
                        "id": "topic_cycle_kahn",
                        "title": "Cycle Detection & Kahn's Topological Sort",
                        "difficulty": "Medium",
                        "estimatedHours": 14,
                        "status": "upcoming",
                        "category": "Graphs"
                    },
                    {
                        "id": "topic_dijkstra_dsu",
                        "title": "Dijkstra & Disjoint Set Union (DSU)",
                        "difficulty": "Hard",
                        "estimatedHours": 16,
                        "status": "upcoming",
                        "category": "Graphs"
                    }
                ]
            },
            {
                "id": "phase_3",
                "phaseNumber": 3,
                "title": "Advanced Dynamic Programming & Tree DP",
                "status": "Upcoming",
                "progressPercentage": 0,
                "topics": [
                    {
                        "id": "topic_tree_dp",
                        "title": "Tree DP & Re-rooting Optimization",
                        "difficulty": "Hard",
                        "estimatedHours": 20,
                        "status": "upcoming",
                        "category": "Dynamic Programming"
                    },
                    {
                        "id": "topic_bitmask_dp",
                        "title": "Bitmask & Interval Dynamic Programming",
                        "difficulty": "Hard",
                        "estimatedHours": 18,
                        "status": "upcoming",
                        "category": "Dynamic Programming"
                    }
                ]
            },
            {
                "id": "phase_4",
                "phaseNumber": 4,
                "title": "Company Benchmarking & Contest Simulation",
                "status": "Upcoming",
                "progressPercentage": 0,
                "topics": [
                    {
                        "id": "topic_cf_div2",
                        "title": "Codeforces Div. 2 Virtual Contests (1400-1600 Rating)",
                        "difficulty": "Hard",
                        "estimatedHours": 25,
                        "status": "upcoming",
                        "category": "Contests"
                    },
                    {
                        "id": "topic_sys_design",
                        "title": "High-Level Architecture & Mock Interviews",
                        "difficulty": "Hard",
                        "estimatedHours": 15,
                        "status": "upcoming",
                        "category": "Interviews"
                    }
                ]
            }
        ]
        return phases

    async def get_daily_tasks(self, student_id: str) -> List[Dict[str, Any]]:
        mastery = await db_manager.get_concept_mastery(student_id)
        diagnoses = tracer.diagnose_overall_profile(mastery, limit=1)
        diag = diagnoses[0] if diagnoses else None

        fix_steps = diag["fix_path"] if diag else []
        root_problem = fix_steps[0]["recommended_problem"]["title"] if fix_steps else "Recursion Base Cases"

        tasks = [
            {
                "id": "task_1",
                "title": f"Root-Cause Fix: {fix_steps[0]['concept_name'] if fix_steps else 'Recursion Foundations'}",
                "subtitle": f"Solve problem: {root_problem} to unblock dependent concepts",
                "timeEstimate": "45 mins",
                "status": "pending",
                "type": "dsa",
                "priority": "high"
            },
            {
                "id": "task_2",
                "title": "Bridge Concept Reinforcement",
                "subtitle": f"Verify traversal state passing: {fix_steps[1]['concept_name'] if len(fix_steps) > 1 else 'Binary Trees'}",
                "timeEstimate": "35 mins",
                "status": "pending",
                "type": "dsa",
                "priority": "high"
            },
            {
                "id": "task_3",
                "title": "System Design: Database Indexing & B-Trees",
                "subtitle": "Study B-Tree branching and compound index performance",
                "timeEstimate": "30 mins",
                "status": "in_progress",
                "type": "dbms",
                "priority": "medium"
            },
            {
                "id": "task_4",
                "title": "Mock Technical Interview Practice",
                "subtitle": "Record audio walkthrough for Cycle Detection in Directed Graphs",
                "timeEstimate": "25 mins",
                "status": "pending",
                "type": "interview",
                "priority": "standard"
            }
        ]
        return tasks

recommendation_service = RecommendationService()
