from typing import Dict, List, Any, Optional
from app.core.concept_graph import concept_graph
from app.database import db_manager

class DigitalTwinService:
    def __init__(self):
        pass

    async def get_digital_twin_view(self, student_id: str) -> Dict[str, Any]:
        """
        Builds the synthesized Digital Twin visualization data.
        Aligns directly with DigitalTwinNode in frontend src/types/index.ts
        """
        mastery = await db_manager.get_concept_mastery(student_id)
        student = await db_manager.get_student(student_id) or {}
        stats = student.get("stats", {})

        # Calculate category scores
        category_scores: Dict[str, List[float]] = {}
        for node in concept_graph.get_all_nodes():
            cid = node["id"]
            cat = node.get("category", "General")
            node_mastery = mastery.get(cid, {}).get("mastery_score", 65.0)
            if cat not in category_scores:
                category_scores[cat] = []
            category_scores[cat].append(node_mastery)

        # High-level satellite nodes for the visualizer
        dsa_score = stats.get("dsaScore", 81)
        sys_score = stats.get("systemDesignScore", 48)
        dev_score = stats.get("developmentScore", 76)
        dbms_score = stats.get("dbmsScore", 58)
        comm_score = stats.get("communicationScore", 72)
        contest_score = stats.get("codeforcesRating", 1420) // 20  # scaled to ~71

        def get_status(score: int) -> str:
            if score >= 75:
                return "Strong"
            elif score >= 55:
                return "Good"
            return "Attention"

        nodes = [
            {
                "id": "node_dsa",
                "label": "DSA & Problem Solving",
                "score": dsa_score,
                "status": get_status(dsa_score),
                "description": "Concept dependency mastery across 41 canonical DSA topics synced via Codeforces and LeetCode.",
                "updatedAgo": "2 hours ago",
                "x": 22,
                "y": 28
            },
            {
                "id": "node_sys_design",
                "label": "System Design",
                "score": sys_score,
                "status": get_status(sys_score),
                "description": "Scalability, caching architectures, load balancers, and distributed consensus evaluation.",
                "updatedAgo": "3 days ago",
                "x": 78,
                "y": 26
            },
            {
                "id": "node_dev",
                "label": "Full-Stack Development",
                "score": dev_score,
                "status": get_status(dev_score),
                "description": "API design, asynchronous concurrency, React 19 architecture, and database integrations.",
                "updatedAgo": "1 day ago",
                "x": 82,
                "y": 72
            },
            {
                "id": "node_dbms",
                "label": "CS Fundamentals & DB",
                "score": dbms_score,
                "status": get_status(dbms_score),
                "description": "ACID compliance, B-Tree indexing, operating system scheduling, and networking protocols.",
                "updatedAgo": "5 days ago",
                "x": 24,
                "y": 76
            },
            {
                "id": "node_comm",
                "label": "Technical Communication",
                "score": comm_score,
                "status": get_status(comm_score),
                "description": "Mock interview articulation, behavioral structuring, and technical explanation clarity.",
                "updatedAgo": "Yesterday",
                "x": 50,
                "y": 16
            },
            {
                "id": "node_contest",
                "label": "Competitive Contest Speed",
                "score": min(95, max(40, contest_score)),
                "status": get_status(min(95, max(40, contest_score))),
                "description": "Time-pressured problem solving speed, penalty management, and implementation agility.",
                "updatedAgo": "Just now",
                "x": 50,
                "y": 86
            }
        ]

        total_datapoints = 1247 + stats.get("codeforcesSolved", 45) * 5
        readiness = stats.get("placementReadiness", 78)

        return {
            "nodes": nodes,
            "confidence": 88,
            "datapoints": total_datapoints,
            "readiness_score": readiness
        }

    async def get_skill_analysis(self, student_id: str) -> Dict[str, Any]:
        """
        Returns skills gap list and radar visualization data.
        """
        mastery = await db_manager.get_concept_mastery(student_id)
        student = await db_manager.get_student(student_id) or {}
        stats = student.get("stats", {})

        dsa_score = stats.get("dsaScore", 81)
        dev_score = stats.get("developmentScore", 76)
        sys_score = stats.get("systemDesignScore", 48)
        dbms_score = stats.get("dbmsScore", 58)
        comm_score = stats.get("communicationScore", 72)

        radar = [
            {"subject": "DSA", "score": dsa_score, "benchmark": 75, "fullMark": 100},
            {"subject": "Development", "score": dev_score, "benchmark": 70, "fullMark": 100},
            {"subject": "CS Fundamentals", "score": dbms_score, "benchmark": 75, "fullMark": 100},
            {"subject": "System Design", "score": sys_score, "benchmark": 75, "fullMark": 100},
            {"subject": "Communication", "score": comm_score, "benchmark": 70, "fullMark": 100},
            {"subject": "Problem Solving", "score": int(round(dsa_score * 0.9 + 10)), "benchmark": 75, "fullMark": 100},
            {"subject": "Projects", "score": 76, "benchmark": 70, "fullMark": 100},
            {"subject": "Interview Skills", "score": 64, "benchmark": 75, "fullMark": 100}
        ]

        # Prioritized gaps
        skills = [
            {
                "id": "sk_sys_design",
                "name": "System Design",
                "category": "System Design",
                "currentScore": sys_score,
                "requiredScore": 75,
                "priority": "high",
                "gap": 75 - sys_score,
                "impactOnPlacement": "High impact for Tier-1 Product Companies (Microsoft, Uber, Amazon)",
                "recommendation": "Master Caching strategies (Redis), Database Sharding, and Rate Limiter implementations.",
                "recommendedTopics": ["Distributed Systems", "CAP Theorem", "Message Queues", "Load Balancers"]
            },
            {
                "id": "sk_recursion_root",
                "name": "Recursion & Subtree DP (Root Cause)",
                "category": "DSA",
                "currentScore": 42,
                "requiredScore": 75,
                "priority": "high",
                "gap": 33,
                "impactOnPlacement": "Blocks unfreezing advanced Dynamic Programming and Tree DP contest problems.",
                "recommendation": "Concept graph backward tracer indicates Recursion under-mastery is causing Tree DP failures.",
                "recommendedTopics": ["Recursion Call Stack", "Subtree Traversal", "Memoization", "Tree DP"]
            },
            {
                "id": "sk_dbms",
                "name": "DBMS & Normalization",
                "category": "CS Fundamentals",
                "currentScore": dbms_score,
                "requiredScore": 75,
                "priority": "medium",
                "gap": 75 - dbms_score,
                "impactOnPlacement": "Required for technical screening rounds across Accenture, Capgemini, TCS.",
                "recommendation": "Complete B-Tree Indexing and 3NF/BCNF relational schema exercises.",
                "recommendedTopics": ["Indexing", "ACID Transactions", "Normalization", "SQL Joins"]
            },
            {
                "id": "sk_graph_cycles",
                "name": "Cycle Detection & Topological Sort",
                "category": "DSA",
                "currentScore": 52,
                "requiredScore": 75,
                "priority": "medium",
                "gap": 23,
                "impactOnPlacement": "Essential for dependency resolution problems in technical interviews.",
                "recommendation": "Practice Kahn's algorithm with in-degree tracking on DAGs.",
                "recommendedTopics": ["Kahn Algorithm", "3-Color DFS", "DAG Ordering"]
            }
        ]

        return {"skills": skills, "radar": radar}

    async def get_company_matches(self, student_id: str) -> List[Dict[str, Any]]:
        """
        Benchmarked readiness against top hiring companies.
        """
        student = await db_manager.get_student(student_id) or {}
        stats = student.get("stats", {})
        readiness = stats.get("placementReadiness", 78)

        companies = [
            {
                "id": "comp_capgemini",
                "name": "Capgemini",
                "logo": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80",
                "readiness": min(95, int(readiness * 1.12)),
                "status": "Strong Match",
                "salaryRange": "₹7-10 LPA",
                "role": "Senior Software Engineer",
                "skillsMatched": ["Core DSA (Arrays, Strings)", "Full-Stack Web", "Object-Oriented Design"],
                "missingSkills": ["Cloud Architecture"],
                "recommendedPreparation": ["Mock interview communication", "Standard OOP principles"],
                "description": "Global leader in consulting, digital transformation, technology and engineering services.",
                "targetTimeline": "Next 30 days"
            },
            {
                "id": "comp_accenture",
                "name": "Accenture",
                "logo": "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80",
                "readiness": min(92, int(readiness * 1.05)),
                "status": "Strong Match",
                "salaryRange": "₹8-12 LPA",
                "role": "Associate Software Engineer",
                "skillsMatched": ["DSA Foundations", "DBMS", "RESTful APIs"],
                "missingSkills": ["Advanced Graph Algorithms"],
                "recommendedPreparation": ["SQL query optimization", "Standard Graph BFS/DFS"],
                "description": "Leading global professional services company specializing in technology and cloud delivery.",
                "targetTimeline": "Next 45 days"
            },
            {
                "id": "comp_microsoft",
                "name": "Microsoft",
                "logo": "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&w=120&q=80",
                "readiness": max(45, int(readiness * 0.72)),
                "status": "Needs Preparation",
                "salaryRange": "₹16-24 LPA",
                "role": "Software Engineer (L59/L60)",
                "skillsMatched": ["Linear DSA", "Problem Solving Consistency"],
                "missingSkills": ["Tree DP", "System Design Scalability", "Low-Level Design"],
                "recommendedPreparation": [
                    "Fix root-cause Recursion gaps to unlock Tree DP",
                    "Study Distributed Rate Limiters and Cache Sharding",
                    "Practice 1800+ rating Codeforces Graph problems"
                ],
                "description": "World-leading technology company building cloud, operating systems, and AI platforms.",
                "targetTimeline": "90-120 days"
            }
        ]
        return companies

twin_service = DigitalTwinService()
