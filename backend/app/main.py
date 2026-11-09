from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import db_manager
from app.core.concept_graph import concept_graph
from app.routers import (
    graph,
    codeforces,
    diagnosis,
    twin,
    assistant,
    extension
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: attempt DB connection & ensure baseline student exists
    print(f"[Startup] Initializing {settings.PROJECT_NAME}...")
    await db_manager.connect()

    # Seed baseline student profile if empty
    student = await db_manager.get_student(settings.DEFAULT_STUDENT_ID)
    if not student:
        default_student = {
            "id": settings.DEFAULT_STUDENT_ID,
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
                "streakDays": 12,
                "codeforcesRating": 1420,
                "codeforcesRank": "specialist",
                "codeforcesSolved": 45
            }
        }
        await db_manager.save_student(settings.DEFAULT_STUDENT_ID, default_student)

        # Seed baseline concept mastery showcasing root-cause recursion and cycle detection gaps
        baseline_mastery = {
            "basic_arrays": {"concept_id": "basic_arrays", "mastery_score": 88.0, "weakness_score": 12.0, "status": "Strong", "attempts": 25, "solved": 22},
            "prefix_sum": {"concept_id": "prefix_sum", "mastery_score": 82.0, "weakness_score": 18.0, "status": "Strong", "attempts": 14, "solved": 12},
            "two_pointers": {"concept_id": "two_pointers", "mastery_score": 85.0, "weakness_score": 15.0, "status": "Strong", "attempts": 18, "solved": 16},
            "sliding_window": {"concept_id": "sliding_window", "mastery_score": 78.0, "weakness_score": 22.0, "status": "Strong", "attempts": 12, "solved": 9},
            "basic_sorting": {"concept_id": "basic_sorting", "mastery_score": 90.0, "weakness_score": 10.0, "status": "Strong", "attempts": 20, "solved": 19},
            "binary_search": {"concept_id": "binary_search", "mastery_score": 80.0, "weakness_score": 20.0, "status": "Strong", "attempts": 16, "solved": 13},
            "binary_search_on_answer": {"concept_id": "binary_search_on_answer", "mastery_score": 62.0, "weakness_score": 38.0, "status": "Good", "attempts": 9, "solved": 5},
            # Foundational Recursion gap (Root Cause)
            "recursion": {"concept_id": "recursion", "mastery_score": 38.0, "weakness_score": 62.0, "status": "Attention", "attempts": 11, "solved": 3},
            "binary_trees": {"concept_id": "binary_trees", "mastery_score": 58.0, "weakness_score": 42.0, "status": "Good", "attempts": 14, "solved": 8},
            "dfs": {"concept_id": "dfs", "mastery_score": 64.0, "weakness_score": 36.0, "status": "Good", "attempts": 15, "solved": 10},
            "bfs": {"concept_id": "bfs", "mastery_score": 76.0, "weakness_score": 24.0, "status": "Strong", "attempts": 18, "solved": 14},
            # Cycle detection gap (Root Cause for Topological sort)
            "cycle_detection": {"concept_id": "cycle_detection", "mastery_score": 40.0, "weakness_score": 60.0, "status": "Attention", "attempts": 8, "solved": 2},
            "topological_sort": {"concept_id": "topological_sort", "mastery_score": 32.0, "weakness_score": 68.0, "status": "Attention", "attempts": 6, "solved": 1},
            "memoization": {"concept_id": "memoization", "mastery_score": 55.0, "weakness_score": 45.0, "status": "Good", "attempts": 10, "solved": 5},
            "dynamic_programming_1d": {"concept_id": "dynamic_programming_1d", "mastery_score": 62.0, "weakness_score": 38.0, "status": "Good", "attempts": 16, "solved": 10},
            "dynamic_programming_2d": {"concept_id": "dynamic_programming_2d", "mastery_score": 45.0, "weakness_score": 55.0, "status": "Attention", "attempts": 12, "solved": 4},
            # Tree DP symptom
            "tree_dp": {"concept_id": "tree_dp", "mastery_score": 28.0, "weakness_score": 72.0, "status": "Attention", "attempts": 7, "solved": 1},
            "greedy": {"concept_id": "greedy", "mastery_score": 84.0, "weakness_score": 16.0, "status": "Strong", "attempts": 22, "solved": 19},
            "shortest_path_dijkstra": {"concept_id": "shortest_path_dijkstra", "mastery_score": 70.0, "weakness_score": 30.0, "status": "Good", "attempts": 11, "solved": 8},
            "disjoint_set_union": {"concept_id": "disjoint_set_union", "mastery_score": 74.0, "weakness_score": 26.0, "status": "Good", "attempts": 13, "solved": 10}
        }
        await db_manager.save_concept_mastery(settings.DEFAULT_STUDENT_ID, baseline_mastery)

    print(f"[Startup] Ready! Concept DAG loaded with {concept_graph.graph.number_of_nodes()} concepts and {concept_graph.graph.number_of_edges()} prerequisite edges.")
    yield
    # Shutdown
    await db_manager.disconnect()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend engine for AI Digital Twin: Concept-Dependency-Graph Based Diagnostic and Recommendation System for DSA & Competitive Programming",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(graph.router, prefix=settings.API_PREFIX)
app.include_router(codeforces.router, prefix=settings.API_PREFIX)
app.include_router(diagnosis.router, prefix=settings.API_PREFIX)
app.include_router(twin.router, prefix=settings.API_PREFIX)
app.include_router(assistant.router, prefix=settings.API_PREFIX)
app.include_router(extension.router, prefix=settings.API_PREFIX)

@app.get("/", tags=["Health"])
def root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "online",
        "documentation": "/docs",
        "graph": {
            "nodes": concept_graph.graph.number_of_nodes(),
            "edges": concept_graph.graph.number_of_edges(),
            "is_dag": True
        }
    }

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "database_backend": "MongoDB" if db_manager.use_mongo else "Resilient File/Memory Store",
        "total_concepts": concept_graph.graph.number_of_nodes(),
        "total_prerequisites": concept_graph.graph.number_of_edges()
    }
