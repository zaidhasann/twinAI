import math
import time
from typing import Dict, List, Any, Optional

class KnowledgeScorer:
    """
    Computes mastery, weakness scores, recency decay, and confidence
    for student submissions mapped against concept nodes.
    """
    def __init__(self, half_life_days: float = 30.0):
        # lambda decay rate for exponential recency weighting
        self.decay_lambda = math.log(2) / max(half_life_days, 1.0)

    def calculate_submission_weight(self, submission_timestamp: int) -> float:
        """Computes exponential recency weight based on days since submission."""
        now = int(time.time())
        days_ago = max(0.0, (now - submission_timestamp) / 86400.0)
        return math.exp(-self.decay_lambda * (days_ago / 30.0))

    def evaluate_verdict(self, verdict: str) -> float:
        """
        Maps competitive programming verdicts to numeric outcomes [0.0, 1.0].
        """
        v = verdict.upper()
        if v in ["OK", "ACCEPTED", "AC"]:
            return 1.0
        elif v in ["PARTIAL", "POINTS"]:
            return 0.5
        elif v in ["WRONG_ANSWER", "WA"]:
            return 0.0
        elif v in ["TIME_LIMIT_EXCEEDED", "TLE"]:
            return 0.1
        elif v in ["MEMORY_LIMIT_EXCEEDED", "MLE"]:
            return 0.15
        elif v in ["RUNTIME_ERROR", "RTE"]:
            return 0.05
        elif v in ["COMPILATION_ERROR", "CE"]:
            return 0.2
        return 0.0

    def compute_concept_metrics(
        self,
        concept_id: str,
        concept_submissions: List[Dict[str, Any]],
        user_rating: int = 1200
    ) -> Dict[str, Any]:
        """
        Calculates mastery score, weakness score, confidence, and status for a single concept.
        """
        if not concept_submissions:
            # Cold-start default prior for an unattempted concept
            return {
                "concept_id": concept_id,
                "attempts": 0,
                "solved": 0,
                "failed": 0,
                "pass_rate": 0.0,
                "mastery_score": 50.0,
                "weakness_score": 50.0,
                "confidence": 20.0,
                "status": "Good",
                "sample_size": 0
            }

        total_weight = 0.0
        weighted_success = 0.0
        solved_count = 0
        failed_count = 0

        for sub in concept_submissions:
            sub_time = sub.get("timestamp", int(time.time()))
            verdict = sub.get("verdict", "OK")
            prob_rating = sub.get("problem_rating", user_rating) or user_rating

            recency_weight = self.calculate_submission_weight(sub_time)
            
            # Difficulty factor adjustment
            # If a 1200 student attempts an 1800 problem, solving gives bonus, failing is soft
            rating_diff = prob_rating - user_rating
            diff_factor = 1.0 + max(-0.4, min(0.6, rating_diff / 1000.0))
            
            outcome = self.evaluate_verdict(verdict)
            if outcome >= 0.8:
                solved_count += 1
                weighted_success += recency_weight * outcome * diff_factor
            else:
                failed_count += 1
                # Failure penalty is softened if problem was far above student level
                penalized_outcome = outcome * (1.0 / max(diff_factor, 0.5))
                weighted_success += recency_weight * penalized_outcome

            total_weight += recency_weight

        # Weighted success probability
        success_prob = (weighted_success / total_weight) if total_weight > 0 else 0.5
        success_prob = max(0.0, min(1.0, success_prob))

        # Sample volume confidence factor: increases asymptotically with attempts
        n = len(concept_submissions)
        volume_factor = 1.0 - math.exp(-n / 4.0)

        # Bayesian blending: prior (50%) pulled towards empirical success_prob
        mastery = (0.5 * (1.0 - volume_factor) + success_prob * volume_factor) * 100.0
        mastery = round(max(5.0, min(98.0, mastery)), 1)
        weakness = round(100.0 - mastery, 1)

        confidence = round(volume_factor * 100.0, 1)

        if mastery >= 72.0:
            status = "Strong"
        elif mastery >= 52.0:
            status = "Good"
        else:
            status = "Attention"

        pass_rate = round((solved_count / n) * 100.0, 1) if n > 0 else 0.0

        return {
            "concept_id": concept_id,
            "attempts": n,
            "solved": solved_count,
            "failed": failed_count,
            "pass_rate": pass_rate,
            "mastery_score": mastery,
            "weakness_score": weakness,
            "confidence": confidence,
            "status": status,
            "sample_size": n
        }

scorer = KnowledgeScorer()
