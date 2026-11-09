from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

# --- Student Profile Schemas (aligned with Frontend src/types/index.ts) ---
class StudentStats(BaseModel):
    leetCodeProblems: int = 187
    githubRepos: int = 12
    projectsCount: int = 5
    placementReadiness: int = 78
    readinessDeltaMonth: int = 6
    interviewReadiness: int = 64
    resumeScore: int = 86
    dsaScore: int = 81
    developmentScore: int = 76
    systemDesignScore: int = 48
    dbmsScore: int = 58
    communicationScore: int = 72
    consistencyScore: int = 84
    streakDays: int = 12

class StudentProfile(BaseModel):
    id: str = "std_01"
    name: str = "Alex Sharma"
    college: str = "ABC Engineering College"
    degree: str = "B.Tech CSE"
    graduationYear: int = 2027
    cgpa: float = 8.4
    avatarUrl: str = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
    targetRole: str = "Software Development Engineer"
    targetSalary: str = "₹8-15 LPA"
    targetCompanies: List[str] = ["Microsoft", "Accenture", "Capgemini", "TCS"]
    stats: StudentStats = Field(default_factory=StudentStats)

# --- Codeforces Integration Schemas ---
class CodeforcesSyncRequest(BaseModel):
    handle: str
    count: int = 100

class CodeforcesSyncResponse(BaseModel):
    status: str = "OK"
    handle: str
    rating: int
    rank: str
    maxRating: int
    submissions_analyzed: int
    synced_concepts: int
    placement_readiness: int
    message: str

# --- Graph & Concept Schemas ---
class ProblemReference(BaseModel):
    platform: str
    id: str
    title: str
    difficulty: str
    url: str

class ConceptNodeSchema(BaseModel):
    id: str
    name: str
    category: str
    tier: str
    difficulty: str
    description: str
    cf_tags: List[str]
    lc_tags: List[str]
    sample_problems: List[ProblemReference]
    x: float
    y: float

class ConceptEdgeSchema(BaseModel):
    source: str
    target: str
    weight: float
    description: str

class ConceptGraphResponse(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    total_nodes: int
    total_edges: int
    is_dag: bool

# --- Root-Cause Diagnosis Schemas ---
class DiagnosisRequest(BaseModel):
    concept_id: Optional[str] = None
    problem_title: Optional[str] = None
    verdict: Optional[str] = None

class ConceptSummary(BaseModel):
    concept_id: str
    name: str
    category: str
    mastery_score: float
    weakness_score: float
    status: str
    description: Optional[str] = ""

class FixStep(BaseModel):
    step: int
    type: str
    concept_id: str
    concept_name: str
    goal: str
    recommended_problem: Dict[str, Any]
    estimated_time_minutes: int

class DiagnosisResponse(BaseModel):
    symptom: ConceptSummary
    is_surface_symptom: bool
    root_cause: ConceptSummary
    causal_chain: List[Dict[str, str]]
    prerequisite_analyses: List[Dict[str, Any]]
    explanation: str
    fix_path: List[FixStep]

# --- Digital Twin & Skill Dashboard Schemas ---
class DigitalTwinNodeSchema(BaseModel):
    id: str
    label: str
    score: int
    status: str  # 'Strong' | 'Good' | 'Attention'
    description: str
    updatedAgo: str
    x: float
    y: float

class DigitalTwinResponse(BaseModel):
    nodes: List[DigitalTwinNodeSchema]
    confidence: int
    datapoints: int
    readiness_score: int

class SkillItemSchema(BaseModel):
    id: str
    name: str
    category: str
    currentScore: int
    requiredScore: int
    priority: str
    gap: int
    impactOnPlacement: str
    recommendation: str
    recommendedTopics: List[str]

class SkillRadarItemSchema(BaseModel):
    subject: str
    score: int
    benchmark: int
    fullMark: int = 100

class SkillAnalysisResponse(BaseModel):
    skills: List[SkillItemSchema]
    radar: List[SkillRadarItemSchema]

class CompanyMatchSchema(BaseModel):
    id: str
    name: str
    logo: str
    readiness: int
    status: str
    salaryRange: str
    role: str
    skillsMatched: List[str]
    missingSkills: List[str]
    recommendedPreparation: List[str]
    description: str
    targetTimeline: str

class RoadmapTopicSchema(BaseModel):
    id: str
    title: str
    difficulty: str
    estimatedHours: int
    status: str
    category: str

class RoadmapPhaseSchema(BaseModel):
    id: str
    phaseNumber: int
    title: str
    status: str
    progressPercentage: int
    topics: List[RoadmapTopicSchema]

class DailyTaskSchema(BaseModel):
    id: str
    title: str
    subtitle: str
    timeEstimate: str
    status: str
    type: str
    priority: str

# --- AI Digital Twin Assistant Schemas ---
class ChatRequest(BaseModel):
    query: str
    student_id: Optional[str] = "std_01"

class ChatResponse(BaseModel):
    reply: str
    suggested_actions: Optional[List[str]] = []
    root_cause_highlight: Optional[Dict[str, Any]] = None

# --- Chrome Extension Schemas ---
class ExtensionSubmissionRequest(BaseModel):
    platform: str  # "leetcode" or "codeforces"
    problem_id: str
    problem_title: str
    verdict: str  # "WA", "TLE", "AC", etc.
    tags: List[str] = []
    student_id: Optional[str] = "std_01"

class ExtensionDiagnosisResponse(BaseModel):
    problem_title: str
    matched_concept: str
    is_surface_symptom: bool
    symptom_name: str
    root_cause_name: str
    causal_path: str
    explanation: str
    recommended_fix_problem: Dict[str, Any]
