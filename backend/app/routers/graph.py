from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from app.core.concept_graph import concept_graph

router = APIRouter(prefix="/graph", tags=["Concept Dependency Graph"])

@router.get("", response_model=Dict[str, Any])
def get_full_graph():
    """
    Returns the complete Concept Dependency DAG (41 concepts, 58 prerequisite edges)
    formatted for visualization in React/Cytoscape/D3.
    """
    return concept_graph.to_cytoscape_or_d3()

@router.get("/concepts/{concept_id}", response_model=Dict[str, Any])
def get_concept_details(concept_id: str):
    """
    Returns detailed node attributes, incoming prerequisite edges, and outgoing dependent edges.
    """
    node = concept_graph.get_node(concept_id)
    if not node:
        raise HTTPException(status_code=404, detail=f"Concept '{concept_id}' not found")

    prerequisites = concept_graph.get_prerequisites(concept_id)
    dependents = concept_graph.get_dependents(concept_id)
    ancestors = concept_graph.get_ancestor_prerequisites(concept_id)

    return {
        "concept": node,
        "direct_prerequisites": prerequisites,
        "direct_dependents": dependents,
        "ancestor_count": len(ancestors),
        "ancestors": ancestors
    }

@router.get("/categories", response_model=List[Dict[str, Any]])
def get_concept_categories():
    """
    Returns a breakdown of concepts grouped by curriculum category.
    """
    categories: Dict[str, List[Dict[str, Any]]] = {}
    for n in concept_graph.get_all_nodes():
        cat = n.get("category", "General")
        if cat not in categories:
            categories[cat] = []
        categories[cat].append({
            "id": n["id"],
            "name": n["name"],
            "tier": n.get("tier", "Core"),
            "difficulty": n.get("difficulty", "Medium")
        })

    return [
        {"category": cat, "concept_count": len(items), "concepts": items}
        for cat, items in categories.items()
    ]
