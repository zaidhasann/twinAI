import pytest
import networkx as nx
import sys, os

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.concept_graph import concept_graph

def test_graph_is_directed_acyclic_graph():
    """Validates that the concept-dependency ontology contains no cyclic dependencies."""
    assert nx.is_directed_acyclic_graph(concept_graph.graph) is True

def test_graph_node_and_edge_volume():
    """Ensures comprehensive DSA coverage across all canonical categories."""
    assert concept_graph.graph.number_of_nodes() >= 35
    assert concept_graph.graph.number_of_edges() >= 45

def test_critical_dsa_prerequisite_chains():
    """Verifies that core theoretical cross-topic chains exist."""
    G = concept_graph.graph
    
    # Recursion is an ancestor of Tree DP
    assert nx.has_path(G, "recursion", "tree_dp") is True
    
    # Cycle detection is an ancestor of Topological Sort
    assert nx.has_path(G, "cycle_detection", "topological_sort") is True
    
    # DSU is an ancestor of MST
    assert nx.has_path(G, "disjoint_set_union", "minimum_spanning_tree") is True
    
    # Two pointers is an ancestor of Sliding Window
    assert nx.has_path(G, "two_pointers", "sliding_window") is True

def test_cytoscape_export_format():
    """Verifies format compatibility for visual dashboard rendering."""
    payload = concept_graph.to_cytoscape_or_d3()
    assert "nodes" in payload
    assert "edges" in payload
    assert payload["is_dag"] is True
    assert len(payload["nodes"]) == concept_graph.graph.number_of_nodes()
