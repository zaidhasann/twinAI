import networkx as nx
from typing import Dict, List, Any, Optional, Tuple
from app.core.concept_graph import concept_graph

class BackwardDiagnosticTracer:
    """
    Traces backward through the concept-dependency DAG to identify the true
    root-cause weakness behind a student's struggle on a target DSA/CP concept.
    """
    def __init__(self, weakness_threshold: float = 40.0):
        self.graph = concept_graph.graph
        self.weakness_threshold = weakness_threshold

    def diagnose_concept(
        self,
        symptom_concept_id: str,
        student_mastery: Dict[str, Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Executes backward traversal starting from symptom_concept_id.
        Returns root cause, causal path, diagnostic explanation, and fix path.
        """
        if symptom_concept_id not in self.graph:
            return {"error": f"Concept '{symptom_concept_id}' not found in concept graph"}

        symptom_node = dict(self.graph.nodes[symptom_concept_id])
        symptom_node["id"] = symptom_concept_id
        symptom_metrics = student_mastery.get(symptom_concept_id, {
            "mastery_score": 50.0,
            "weakness_score": 50.0,
            "status": "Good",
            "attempts": 0,
            "solved": 0
        })

        # 1. Identify all ancestor prerequisites in the DAG
        ancestors = nx.ancestors(self.graph, symptom_concept_id)
        
        prerequisite_analyses = []
        weak_ancestors = []

        for anc_id in ancestors:
            anc_node = dict(self.graph.nodes[anc_id])
            anc_node["id"] = anc_id
            anc_metrics = student_mastery.get(anc_id, {
                "mastery_score": 50.0,
                "weakness_score": 50.0,
                "status": "Good",
                "attempts": 0,
                "solved": 0
            })

            # Find strongest path from ancestor to symptom
            paths = list(nx.all_simple_paths(self.graph, source=anc_id, target=symptom_concept_id))
            max_path_weight = 0.0
            best_path = []

            for path in paths:
                weight_prod = 1.0
                for i in range(len(path) - 1):
                    e_data = self.graph.get_edge_data(path[i], path[i+1])
                    weight_prod *= e_data.get("weight", 1.0)
                if weight_prod > max_path_weight:
                    max_path_weight = weight_prod
                    best_path = path

            weakness = anc_metrics.get("weakness_score", 50.0)
            attempts = anc_metrics.get("attempts", 0)

            # Weight by attempts: tested failures carry much higher evidential weight than neutral priors
            evidential_factor = 1.0 + (0.5 * min(attempts, 6) / 6.0) if attempts > 0 else 0.7
            bottleneck_impact = round(weakness * max_path_weight * evidential_factor, 2)

            # A node is classified as weak if it was tested and weak, or severely lacking
            is_weak = (weakness >= self.weakness_threshold and attempts > 0) or (weakness >= 65.0)

            analysis = {
                "concept_id": anc_id,
                "name": anc_node.get("name", anc_id),
                "category": anc_node.get("category", "General"),
                "mastery_score": anc_metrics.get("mastery_score", 50.0),
                "weakness_score": weakness,
                "status": anc_metrics.get("status", "Good"),
                "attempts": attempts,
                "path_to_symptom": best_path,
                "path_strength": round(max_path_weight, 3),
                "bottleneck_impact": bottleneck_impact,
                "is_weak": is_weak
            }
            prerequisite_analyses.append(analysis)

            if is_weak:
                weak_ancestors.append(anc_id)

        # 2. Determine the True Root Cause
        # If there are weak ancestors, find the deepest foundational one (no weak predecessors)
        root_cause_id = symptom_concept_id
        causal_chain = [symptom_concept_id]
        is_surface_symptom = False

        if weak_ancestors:
            is_surface_symptom = True
            # Subgraph of weak ancestors
            weak_subgraph = self.graph.subgraph(weak_ancestors)
            # Candidate root causes are nodes in weak_ancestors with 0 in-degree in weak_subgraph
            candidate_roots = [n for n in weak_ancestors if weak_subgraph.in_degree(n) == 0]

            if candidate_roots:
                # Rank candidates by bottleneck impact
                candidate_analyses = [a for a in prerequisite_analyses if a["concept_id"] in candidate_roots]
                candidate_analyses.sort(key=lambda x: x["bottleneck_impact"], reverse=True)
                root_cause_id = candidate_analyses[0]["concept_id"]
                causal_chain = candidate_analyses[0]["path_to_symptom"]
            else:
                # Fallback to the ancestor with highest bottleneck impact
                prerequisite_analyses.sort(key=lambda x: x["bottleneck_impact"], reverse=True)
                root_cause_id = prerequisite_analyses[0]["concept_id"]
                causal_chain = prerequisite_analyses[0]["path_to_symptom"]

        root_cause_node = dict(self.graph.nodes[root_cause_id])
        root_cause_node["id"] = root_cause_id
        root_cause_metrics = student_mastery.get(root_cause_id, {
            "mastery_score": 50.0,
            "weakness_score": 50.0,
            "status": "Good"
        })

        # 3. Formulate explainable diagnostic narrative
        explanation = self._build_explanation(
            symptom_node,
            symptom_metrics,
            root_cause_node,
            root_cause_metrics,
            causal_chain,
            is_surface_symptom
        )

        # 4. Synthesize Remediation Fix Path
        fix_path = self._build_fix_path(root_cause_id, symptom_concept_id, causal_chain)

        return {
            "symptom": {
                "concept_id": symptom_concept_id,
                "name": symptom_node.get("name", symptom_concept_id),
                "category": symptom_node.get("category", "General"),
                "mastery_score": symptom_metrics.get("mastery_score", 50.0),
                "weakness_score": symptom_metrics.get("weakness_score", 50.0),
                "status": symptom_metrics.get("status", "Good")
            },
            "is_surface_symptom": is_surface_symptom,
            "root_cause": {
                "concept_id": root_cause_id,
                "name": root_cause_node.get("name", root_cause_id),
                "category": root_cause_node.get("category", "General"),
                "mastery_score": root_cause_metrics.get("mastery_score", 50.0),
                "weakness_score": root_cause_metrics.get("weakness_score", 50.0),
                "status": root_cause_metrics.get("status", "Good"),
                "description": root_cause_node.get("description", "")
            },
            "causal_chain": [
                {
                    "concept_id": cid,
                    "name": self.graph.nodes[cid].get("name", cid),
                    "category": self.graph.nodes[cid].get("category", "General")
                }
                for cid in causal_chain
            ],
            "prerequisite_analyses": prerequisite_analyses,
            "explanation": explanation,
            "fix_path": fix_path
        }

    def _build_explanation(
        self,
        symptom_node: Dict[str, Any],
        symptom_metrics: Dict[str, Any],
        root_cause_node: Dict[str, Any],
        root_cause_metrics: Dict[str, Any],
        causal_chain: List[str],
        is_surface_symptom: bool
    ) -> str:
        s_name = symptom_node.get("name", "Target Concept")
        s_cat = symptom_node.get("category", "")
        s_weak = symptom_metrics.get("weakness_score", 50.0)

        if not is_surface_symptom or symptom_node["id"] == root_cause_node["id"]:
            return (
                f"Diagnostic Analysis: Your difficulty in '{s_name}' ({s_cat}) is localized directly to this concept "
                f"(Weakness: {s_weak}%). All earlier foundational prerequisites (such as basic traversals and representations) "
                f"are sufficiently mastered. You should focus directly on standard problem patterns and edge cases of {s_name}."
            )

        r_name = root_cause_node.get("name", "Root Concept")
        r_cat = root_cause_node.get("category", "")
        r_mastery = root_cause_metrics.get("mastery_score", 50.0)
        r_weak = root_cause_metrics.get("weakness_score", 50.0)

        chain_names = [self.graph.nodes[cid].get("name", cid) for cid in causal_chain]
        chain_str = " → ".join(chain_names)

        return (
            f"Root-Cause Diagnosis: While your submission failures are tagged under '{s_name}' "
            f"(Surface Weakness: {s_weak}%), our backward graph traversal reveals that the true cognitive bottleneck "
            f"is earlier in the prerequisite hierarchy at '{r_name}' ({r_cat}) with only {r_mastery}% mastery "
            f"(Weakness: {r_weak}%).\n\n"
            f"Dependency Propagation Chain: {chain_str}.\n\n"
            f"Why this happens: Platforms like LeetCode and Codeforces only tag the final problem category, "
            f"ignoring that {s_name} strictly requires strong mastery of {r_name}. Attempting more {s_name} problems "
            f"without first solidifying {r_name} leads to repeated failures and wasted practice. "
            f"Fixing {r_name} first will naturally unlock your competence in {s_name}."
        )

    def _build_fix_path(
        self,
        root_cause_id: str,
        symptom_id: str,
        causal_chain: List[str]
    ) -> List[Dict[str, Any]]:
        """
        Creates a 3-step structured remediation track:
        Step 1: Foundational repair on the root cause
        Step 2: Bridge concept reinforcement
        Step 3: Verification on the target symptom concept
        """
        fix_steps = []
        step_number = 1

        # Step 1: Root Cause
        root_data = self.graph.nodes[root_cause_id]
        sample_probs = root_data.get("sample_problems", [])
        prob1 = sample_probs[0] if sample_probs else {"title": f"Fundamentals of {root_data.get('name')}", "platform": "LeetCode", "difficulty": "Easy", "url": "#"}
        fix_steps.append({
            "step": step_number,
            "type": "Foundation Fix (Root Cause)",
            "concept_id": root_cause_id,
            "concept_name": root_data.get("name", root_cause_id),
            "goal": f"Repair fundamental gap in {root_data.get('name')}. Ensure core logic and edge cases are second nature.",
            "recommended_problem": prob1,
            "estimated_time_minutes": 35
        })
        step_number += 1

        # Step 2: Intermediate Bridge (if path has >= 3 nodes)
        if len(causal_chain) > 2:
            bridge_id = causal_chain[1]
            bridge_data = self.graph.nodes[bridge_id]
            b_probs = bridge_data.get("sample_problems", [])
            b_prob = b_probs[0] if b_probs else {"title": f"Practice {bridge_data.get('name')}", "platform": "LeetCode", "difficulty": "Medium", "url": "#"}
            fix_steps.append({
                "step": step_number,
                "type": "Bridge Reinforcement",
                "concept_id": bridge_id,
                "concept_name": bridge_data.get("name", bridge_id),
                "goal": f"Bridge the transition from {root_data.get('name')} to intermediate composite structures.",
                "recommended_problem": b_prob,
                "estimated_time_minutes": 45
            })
            step_number += 1

        # Step 3: Target Symptom Problem
        symptom_data = self.graph.nodes[symptom_id]
        s_probs = symptom_data.get("sample_problems", [])
        s_prob = s_probs[0] if s_probs else {"title": f"Mastery of {symptom_data.get('name')}", "platform": "Codeforces", "difficulty": "Medium", "url": "#"}
        fix_steps.append({
            "step": step_number,
            "type": "Target Mastery Verification",
            "concept_id": symptom_id,
            "concept_name": symptom_data.get("name", symptom_id),
            "goal": f"Re-attempt {symptom_data.get('name')} with unblocked prerequisite knowledge to cement retention.",
            "recommended_problem": s_prob,
            "estimated_time_minutes": 50
        })

        return fix_steps

    def diagnose_overall_profile(
        self,
        student_mastery: Dict[str, Dict[str, Any]],
        limit: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Analyzes the student's entire concept graph to find top root causes
        across all weak areas.
        """
        # Find all concepts with status 'Attention' or weakness > threshold
        weak_concepts = []
        for cid, node_data in self.graph.nodes(data=True):
            metrics = student_mastery.get(cid, {})
            weakness = metrics.get("weakness_score", 50.0)
            if weakness >= self.weakness_threshold or metrics.get("status") == "Attention":
                weak_concepts.append((cid, weakness))

        weak_concepts.sort(key=lambda x: x[1], reverse=True)
        top_weak = weak_concepts[:limit] if weak_concepts else [("tree_dp", 68.0), ("topological_sort", 62.0)]

        results = []
        for cid, _ in top_weak:
            diag = self.diagnose_concept(cid, student_mastery)
            results.append(diag)

        return results

tracer = BackwardDiagnosticTracer()
