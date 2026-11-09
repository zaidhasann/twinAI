# TwinAI Chrome Extension (Manifest V3)

A companion Chrome/Edge extension that overlays real-time Concept-Dependency-Graph root-cause diagnosis directly on **LeetCode** and **Codeforces** problem pages.

## How It Works

1. Injects on `leetcode.com/problems/*` and `codeforces.com/problemset/problem/*`.
2. Inspects problem tags (e.g. `dp`, `trees`, `graphs`).
3. Calls the TwinAI FastAPI backend at `http://localhost:8000/api/extension/diagnose`.
4. Traces backward through the 41-node DSA prerequisite DAG using NetworkX.
5. Injects a non-intrusive floating badge: **"⚡ TwinAI Root-Cause Diagnosis"**.
6. When clicked, displays:
   - Surface Tag vs True Root-Cause Concept
   - Causal Prerequisite Path (e.g. `Recursion -> Binary Trees -> Tree DP`)
   - Diagnostic explanation detailing why re-attempting the symptom concept without prerequisite remediation is ineffective
   - Direct link to the foundational fix problem.

## Installation in Chrome / Brave / Edge

1. Open your browser and navigate to `chrome://extensions/` (or `edge://extensions/`).
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked**.
4. Select the `extension/` directory from this repository.
5. Open any LeetCode or Codeforces problem page (e.g. [LC-337 House Robber III](https://leetcode.com/problems/house-robber-iii/)).
6. Click the floating TwinAI badge in the bottom right corner!
