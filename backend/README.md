# TwinAI Backend Engine: Concept-Dependency-Graph Diagnostic & Recommendation System

The intelligent backend for **"AI Digital Twin for Students: A Concept-Dependency-Graph Based Diagnostic and Recommendation System for DSA & Competitive Programming"**.

---

## 1. Problem Overview & Research Novelty

Current competitive programming platforms (e.g., LeetCode, Codeforces) only categorize a problem with surface topic tags (e.g., `Tree DP`, `Topological Sort`). When a student fails a problem:
1. **The surface fallacy**: The platform recommends more problems in that same topic (e.g. "solve more Tree DP").
2. **The hidden bottleneck**: Most advanced DSA topics depend on prerequisite foundational concepts (e.g., `Tree DP` requires `Recursion Foundations` and `Binary Tree Traversals`; `Topological Sort` requires `Cycle Detection` and `BFS/DFS In-Degree Tracking`).
3. **Cognitive frustration**: Repeatedly attempting problems in the symptom domain without remediating the prerequisite bottleneck causes repeated failures and ineffective practice.

### Our Solution
TwinAI constructs a rigorous **Concept-Dependency Directed Acyclic Graph (DAG)** of 41 canonical DSA concepts with 58 cross-topic prerequisite edges. Using a Knowledge-Tracing model and a backward-traversal graph algorithm via **NetworkX**, TwinAI:
- Ingests real submission data from the **Codeforces API** (and LeetCode via the companion extension).
- Calculates a weighted mastery and weakness score per concept with recency decay.
- Traces backward along dependency paths to isolate the deepest unmastered prerequisite (the **Root Cause**).
- Produces an explainable diagnostic chain and a 3-step structured **Fix Path**.
- Continuously maintains the student's dynamic **Digital Twin** skill profile.

---

## 2. Mathematical Framework

### A. Recency-Weighted Submission Scoring
For a concept $c$ with submissions $S_c = [s_1, s_2, \dots, s_n]$ at times $t_i$:
$$w_i = \exp\left(-\lambda \cdot \frac{t_{\text{now}} - t_i}{30 \times 86400}\right), \quad \lambda = \ln(2)$$

Verdict values:
$$\text{Verdict}(s_i) = \begin{cases}
1.0 & \text{Accepted (AC / OK)} \\
0.5 & \text{Partial Points} \\
0.2 & \text{Compilation Error (CE)} \\
0.15 & \text{Memory Limit Exceeded (MLE)} \\
0.10 & \text{Time Limit Exceeded (TLE)} \\
0.05 & \text{Runtime Error (RTE)} \\
0.0 & \text{Wrong Answer (WA)}
\end{cases}$$

### B. Difficulty-Adjusted Bayesian Mastery
Let $R_p$ be the problem rating and $R_u$ be the student rating:
$$\Delta R = R_p - R_u, \quad \delta = 1.0 + \text{clamp}\left(\frac{\Delta R}{1000}, -0.4, 0.6\right)$$

Weighted empirical success rate:
$$P(c) = \frac{\sum_{i=1}^n w_i \cdot \text{Verdict}(s_i) \cdot \delta_i}{\sum_{i=1}^n w_i}$$

Bayesian volume shrinkage with sample size $n$:
$$\alpha_n = 1 - e^{-n/4}$$
$$\text{Mastery}(c) = \text{round}\left( \left( 0.5(1 - \alpha_n) + P(c) \cdot \alpha_n \right) \times 100 \right)$$
$$\text{Weakness}(c) = 100 - \text{Mastery}(c)$$

### C. Backward Traversal Root-Cause Algorithm
Given symptom concept $T$:
1. Determine all ancestor concepts $\text{Anc}(T) = \{u \in V \mid u \rightsquigarrow T \text{ in } G\}$.
2. For each $u \in \text{Anc}(T)$, identify the path of maximum prerequisite dependency strength:
   $$\gamma(u, T) = \max_{p \in \text{Paths}(u, T)} \prod_{e \in p} \text{Weight}(e)$$
3. Compute bottleneck impact potential:
   $$\text{Impact}(u \to T) = \text{Weakness}(u) \times \gamma(u, T) \times \left(1.0 + 0.5 \cdot \frac{\min(n_u, 6)}{6}\right)$$
4. Filter active weak ancestors: $W_{\text{active}} = \{u \in \text{Anc}(T) \mid \text{Weakness}(u) \ge \theta \text{ and } n_u > 0\}$.
5. The **Root Cause** $R^*$ is the in-degree 0 node in the subgraph induced by $W_{\text{active}}$ with the highest bottleneck impact:
   $$R^* = \arg\max_{u \in W_{\text{active}}, \text{in-deg}(u)=0} \text{Impact}(u \to T)$$

---

## 3. System Architecture & Tech Stack

- **Framework**: FastAPI (Python 3.12)
- **Graph Engine**: NetworkX 3.7 (Directed Acyclic Graph with topological validation)
- **Database**: Dual-mode storage (MongoDB via Motor / PyMongo, with automatic resilient fallback to local JSON store in restricted environments)
- **API Client**: HTTPX for asynchronous Codeforces API ingestion
- **Validation**: Pydantic v2 schemas
- **Testing**: Pytest unit & integration test suite (12/12 passing)
- **Client Integrations**: React 19 Frontend + Manifest V3 Chrome Extension

```text
backend/
├── app/
│   ├── main.py                  # FastAPI app & CORS configuration
│   ├── config.py                # Environment & runtime settings
│   ├── database.py              # Dual-mode MongoDB & local JSON persistence
│   ├── core/
│   │   ├── concept_graph.py     # 41-node DSA DAG with 58 prerequisite edges
│   │   ├── scoring.py           # Knowledge tracing & recency decay engine
│   │   └── tracer.py            # Backward traversal root-cause diagnostic engine
│   ├── services/
│   │   ├── codeforces_service.py# Codeforces API fetcher & tag mapper
│   │   ├── twin_service.py      # Digital Twin synthesis & company benchmarks
│   │   └── recommendation_service.py # Remedial roadmap & daily plan generator
│   ├── routers/
│   │   ├── graph.py             # /api/graph
│   │   ├── codeforces.py        # /api/students/sync-codeforces
│   │   ├── diagnosis.py         # /api/students/{id}/diagnose
│   │   ├── twin.py              # /api/students/{id}/digital-twin, profile, skills
│   │   ├── assistant.py         # /api/assistant/chat
│   │   └── extension.py         # /api/extension/diagnose
│   └── models/
│       └── schemas.py           # Pydantic models & request/response contracts
└── tests/
    ├── test_graph.py            # DAG acyclicity & topological completeness
    ├── test_tracer.py           # Root-cause pinpointing verification
    └── test_api.py              # End-to-end API router test suite
```

---

## 4. API Endpoints

### Concept Graph
- `GET /api/graph`: Complete 41-node DAG with 58 prerequisite edges, coordinates, and categories.
- `GET /api/graph/concepts/{concept_id}`: Node metadata, direct prerequisites, and direct dependents.
- `GET /api/graph/categories`: Categorized curriculum breakdown.

### Root-Cause Diagnosis
- `POST /api/students/{student_id}/diagnose`: Traces backward from a given `concept_id` (or whole profile), returns root cause, causal chain, explanation, and structured 3-step Fix Path.
- `GET /api/students/{student_id}/diagnose-all`: Evaluates top bottlenecks across all domains.

### Codeforces Ingestion
- `POST /api/students/sync-codeforces`: Ingests user submissions via handle, computes concept mastery, and updates the student's Digital Twin.

### Digital Twin State & Placement Readiness
- `GET /api/students/{student_id}/profile`: Student profile, target companies, and readiness statistics.
- `GET /api/students/{student_id}/digital-twin`: Visualizer nodes with scores, status, and coordinates.
- `GET /api/students/{student_id}/placement-readiness`: Overall readiness percentage and monthly delta.
- `GET /api/students/{student_id}/skills`: Categorized skill gaps and 8-axis radar benchmarks.
- `GET /api/students/{student_id}/companies`: Company readiness matching (Microsoft, Accenture, Capgemini).
- `GET /api/students/{student_id}/roadmap`: 4-phase placement roadmap prioritized by root causes.
- `GET /api/students/{student_id}/daily-plan`: Daily task list unblocking diagnosed bottlenecks.

### AI Twin Assistant & Chrome Companion
- `POST /api/assistant/chat`: Context-aware career twin assistant answering study and company questions.
- `POST /api/extension/diagnose`: Overlay endpoint for LeetCode / Codeforces problem inspection.

---

## 5. Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the Backend Server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive OpenAPI documentation will be live at: [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Run the Test Suite
```bash
pytest tests/ -v
```
All 12 tests will execute and pass.
