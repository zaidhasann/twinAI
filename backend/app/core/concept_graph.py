import networkx as nx
from typing import Dict, List, Any, Optional

class ConceptDependencyGraph:
    """
    Core Directed Acyclic Graph (DAG) of Data Structures, Algorithms,
    and Competitive Programming Concepts with cross-topic prerequisite dependencies.
    """
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_concept_nodes()
        self._build_prerequisite_edges()
        self._compute_coordinates()

    def _build_concept_nodes(self):
        nodes_data = [
            # 1. Arrays & Strings
            {
                "id": "basic_arrays",
                "name": "Arrays & Hashing",
                "category": "Arrays & Strings",
                "tier": "Fundamental",
                "difficulty": "Easy",
                "description": "Linear memory allocation, traversal, indexing, hash map lookups, and frequency maps.",
                "cf_tags": ["data structures", "implementation"],
                "lc_tags": ["Array", "Hash Table"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "1", "title": "Two Sum", "difficulty": "Easy", "url": "https://leetcode.com/problems/two-sum/"},
                    {"platform": "Codeforces", "id": "4A", "title": "Watermelon", "difficulty": "800", "url": "https://codeforces.com/problemset/problem/4/A"}
                ]
            },
            {
                "id": "prefix_sum",
                "name": "Prefix Sums & Difference Arrays",
                "category": "Arrays & Strings",
                "tier": "Core",
                "difficulty": "Easy-Medium",
                "description": "Cumulative sum precomputations for O(1) range queries and difference arrays for range updates.",
                "cf_tags": ["data structures", "math"],
                "lc_tags": ["Prefix Sum"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "560", "title": "Subarray Sum Equals K", "difficulty": "Medium", "url": "https://leetcode.com/problems/subarray-sum-equals-k/"},
                    {"platform": "Codeforces", "id": "433B", "title": "Kuriyama Mirai's Stones", "difficulty": "1200", "url": "https://codeforces.com/problemset/problem/433/B"}
                ]
            },
            {
                "id": "two_pointers",
                "name": "Two Pointers Technique",
                "category": "Arrays & Strings",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Converging and parallel pointers for linear-time array scanning and pair finding.",
                "cf_tags": ["two pointers"],
                "lc_tags": ["Two Pointers"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "11", "title": "Container With Most Water", "difficulty": "Medium", "url": "https://leetcode.com/problems/container-with-most-water/"},
                    {"platform": "Codeforces", "id": "1462A", "title": "Favorite Sequence", "difficulty": "800", "url": "https://codeforces.com/problemset/problem/1462/A"}
                ]
            },
            {
                "id": "sliding_window",
                "name": "Sliding Window",
                "category": "Arrays & Strings",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Dynamic or fixed sub-array boundary expansion and contraction maintaining window invariants.",
                "cf_tags": ["two pointers", "data structures"],
                "lc_tags": ["Sliding Window"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "3", "title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"},
                    {"platform": "Codeforces", "id": "602B", "title": "Approximating a Constant Range", "difficulty": "1400", "url": "https://codeforces.com/problemset/problem/602/B"}
                ]
            },
            {
                "id": "string_manipulation",
                "name": "String Algorithms & Palindromes",
                "category": "Arrays & Strings",
                "tier": "Core",
                "difficulty": "Easy-Medium",
                "description": "Character encoding, string hashing, palindrome verification, and anagram grouping.",
                "cf_tags": ["strings"],
                "lc_tags": ["String"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "49", "title": "Group Anagrams", "difficulty": "Medium", "url": "https://leetcode.com/problems/group-anagrams/"},
                    {"platform": "Codeforces", "id": "118A", "title": "String Task", "difficulty": "1000", "url": "https://codeforces.com/problemset/problem/118/A"}
                ]
            },

            # 2. Searching & Sorting
            {
                "id": "basic_sorting",
                "name": "Basic Sorting & Custom Comparators",
                "category": "Searching & Sorting",
                "tier": "Fundamental",
                "difficulty": "Easy",
                "description": "Insertion, Selection, Bubble sort, lambda comparator functions, and lexicographical ordering.",
                "cf_tags": ["sortings"],
                "lc_tags": ["Sorting"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "912", "title": "Sort an Array", "difficulty": "Medium", "url": "https://leetcode.com/problems/sort-an-array/"},
                    {"platform": "Codeforces", "id": "339A", "title": "Helpful Maths", "difficulty": "800", "url": "https://codeforces.com/problemset/problem/339/A"}
                ]
            },
            {
                "id": "divide_and_conquer",
                "name": "Divide and Conquer",
                "category": "Searching & Sorting",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "Decomposing problems into independent subproblems, merge sort, quick sort, and inversion counting.",
                "cf_tags": ["divide and conquer"],
                "lc_tags": ["Divide and Conquer"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "23", "title": "Merge k Sorted Lists", "difficulty": "Hard", "url": "https://leetcode.com/problems/merge-k-sorted-lists/"},
                    {"platform": "Codeforces", "id": "1042D", "title": "Petya and Array", "difficulty": "1800", "url": "https://codeforces.com/problemset/problem/1042/D"}
                ]
            },
            {
                "id": "binary_search",
                "name": "Binary Search",
                "category": "Searching & Sorting",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Logarithmic search in monotonic arrays, lower_bound, upper_bound, and boundary condition handling.",
                "cf_tags": ["binary search"],
                "lc_tags": ["Binary Search"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "704", "title": "Binary Search", "difficulty": "Easy", "url": "https://leetcode.com/problems/binary-search/"},
                    {"platform": "Codeforces", "id": "706B", "title": "Interesting drink", "difficulty": "1100", "url": "https://codeforces.com/problemset/problem/706/B"}
                ]
            },
            {
                "id": "binary_search_on_answer",
                "name": "Binary Search on Answer",
                "category": "Searching & Sorting",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Searching over monotonic answer spaces with predicate check functions for min-max optimization.",
                "cf_tags": ["binary search"],
                "lc_tags": ["Binary Search"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "875", "title": "Koko Eating Bananas", "difficulty": "Medium", "url": "https://leetcode.com/problems/koko-eating-bananas/"},
                    {"platform": "Codeforces", "id": "1618C", "title": "Paint the Array", "difficulty": "1100", "url": "https://codeforces.com/problemset/problem/1618/C"}
                ]
            },

            # 3. Linear Data Structures
            {
                "id": "linked_lists",
                "name": "Linked Lists & Fast-Slow Pointers",
                "category": "Linear Data Structures",
                "tier": "Fundamental",
                "difficulty": "Easy-Medium",
                "description": "Node pointer manipulations, linked list reversal, cycle detection via Floyd's tortoise and hare.",
                "cf_tags": ["data structures"],
                "lc_tags": ["Linked List"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "206", "title": "Reverse Linked List", "difficulty": "Easy", "url": "https://leetcode.com/problems/reverse-linked-list/"},
                    {"platform": "LeetCode", "id": "141", "title": "Linked List Cycle", "difficulty": "Easy", "url": "https://leetcode.com/problems/linked-list-cycle/"}
                ]
            },
            {
                "id": "stacks",
                "name": "Stacks & Expression Parsing",
                "category": "Linear Data Structures",
                "tier": "Fundamental",
                "difficulty": "Easy-Medium",
                "description": "LIFO behavior, bracket matching, postfix evaluation, and call-stack simulations.",
                "cf_tags": ["data structures"],
                "lc_tags": ["Stack"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "20", "title": "Valid Parentheses", "difficulty": "Easy", "url": "https://leetcode.com/problems/valid-parentheses/"},
                    {"platform": "Codeforces", "id": "1092B", "title": "Teams Forming", "difficulty": "800", "url": "https://codeforces.com/problemset/problem/1092/B"}
                ]
            },
            {
                "id": "queues",
                "name": "Queues & Double-Ended Queues",
                "category": "Linear Data Structures",
                "tier": "Fundamental",
                "difficulty": "Easy",
                "description": "FIFO queues, ring buffers, and double-ended queues for frontier processing.",
                "cf_tags": ["data structures"],
                "lc_tags": ["Queue"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "225", "title": "Implement Stack using Queues", "difficulty": "Easy", "url": "https://leetcode.com/problems/implement-stack-using-queues/"}
                ]
            },
            {
                "id": "monotonic_stack",
                "name": "Monotonic Stack",
                "category": "Linear Data Structures",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "Maintaining monotonically increasing or decreasing stacks for Next Greater Element and histogram rectangles.",
                "cf_tags": ["data structures"],
                "lc_tags": ["Monotonic Stack"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "739", "title": "Daily Temperatures", "difficulty": "Medium", "url": "https://leetcode.com/problems/daily-temperatures/"},
                    {"platform": "LeetCode", "id": "84", "title": "Largest Rectangle in Histogram", "difficulty": "Hard", "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"}
                ]
            },
            {
                "id": "monotonic_queue",
                "name": "Monotonic Queue / Deque",
                "category": "Linear Data Structures",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Monotonic double-ended queue for O(1) sliding window minimum/maximum queries.",
                "cf_tags": ["data structures", "two pointers"],
                "lc_tags": ["Monotonic Queue"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "239", "title": "Sliding Window Maximum", "difficulty": "Hard", "url": "https://leetcode.com/problems/sliding-window-maximum/"}
                ]
            },

            # 4. Recursion & Backtracking
            {
                "id": "recursion",
                "name": "Recursion Foundations",
                "category": "Recursion & Backtracking",
                "tier": "Fundamental",
                "difficulty": "Medium",
                "description": "Base cases, call stack mechanics, recursive problem formulation, and recurrence relations.",
                "cf_tags": ["implementation", "math"],
                "lc_tags": ["Recursion"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "50", "title": "Pow(x, n)", "difficulty": "Medium", "url": "https://leetcode.com/problems/powx-n/"},
                    {"platform": "LeetCode", "id": "70", "title": "Climbing Stairs", "difficulty": "Easy", "url": "https://leetcode.com/problems/climbing-stairs/"}
                ]
            },
            {
                "id": "backtracking",
                "name": "Backtracking & State Exploration",
                "category": "Recursion & Backtracking",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "State-space tree exploration, choice-constraint-goal patterns, undoing state mutations, and pruning.",
                "cf_tags": ["dfs and similar"],
                "lc_tags": ["Backtracking"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "78", "title": "Subsets", "difficulty": "Medium", "url": "https://leetcode.com/problems/subsets/"},
                    {"platform": "LeetCode", "id": "51", "title": "N-Queens", "difficulty": "Hard", "url": "https://leetcode.com/problems/n-queens/"}
                ]
            },

            # 5. Trees & Heaps
            {
                "id": "binary_trees",
                "name": "Binary Trees & Traversal",
                "category": "Trees & Heaps",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Pre-order, in-order, post-order, and level-order traversals, depth/height, and lowest common ancestor.",
                "cf_tags": ["trees"],
                "lc_tags": ["Tree", "Binary Tree"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "104", "title": "Maximum Depth of Binary Tree", "difficulty": "Easy", "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"},
                    {"platform": "LeetCode", "id": "236", "title": "Lowest Common Ancestor of a Binary Tree", "difficulty": "Medium", "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"}
                ]
            },
            {
                "id": "binary_search_trees",
                "name": "Binary Search Trees (BST)",
                "category": "Trees & Heaps",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "BST invariant ordering, binary search in trees, insertion, deletion, and validation.",
                "cf_tags": ["trees", "data structures"],
                "lc_tags": ["Binary Search Tree"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "98", "title": "Validate Binary Search Tree", "difficulty": "Medium", "url": "https://leetcode.com/problems/validate-binary-search-tree/"},
                    {"platform": "LeetCode", "id": "450", "title": "Delete Node in a BST", "difficulty": "Medium", "url": "https://leetcode.com/problems/delete-node-in-a-bst/"}
                ]
            },
            {
                "id": "heaps_priority_queues",
                "name": "Heaps & Priority Queues",
                "category": "Trees & Heaps",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Min-heap and max-heap tree structures, logarithmic insertion/extraction, and top-K problem patterns.",
                "cf_tags": ["data structures"],
                "lc_tags": ["Heap (Priority Queue)"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "215", "title": "Kth Largest Element in an Array", "difficulty": "Medium", "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"},
                    {"platform": "Codeforces", "id": "1353D", "title": "Constructing the Array", "difficulty": "1400", "url": "https://codeforces.com/problemset/problem/1353/D"}
                ]
            },
            {
                "id": "trie",
                "name": "Trie (Prefix Tree)",
                "category": "Trees & Heaps",
                "tier": "Advanced",
                "difficulty": "Medium-Hard",
                "description": "Multi-way prefix tree for rapid string lookup, prefix autocompletion, and bitwise maximum XOR pairs.",
                "cf_tags": ["strings", "data structures", "trees"],
                "lc_tags": ["Trie"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "208", "title": "Implement Trie (Prefix Tree)", "difficulty": "Medium", "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"},
                    {"platform": "LeetCode", "id": "421", "title": "Maximum XOR of Two Numbers in an Array", "difficulty": "Medium", "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"}
                ]
            },

            # 6. Graph Algorithms
            {
                "id": "graph_representation",
                "name": "Graph Representation",
                "category": "Graph Algorithms",
                "tier": "Fundamental",
                "difficulty": "Easy-Medium",
                "description": "Adjacency lists, adjacency matrices, edge lists, weighted directed/undirected graphs, and degree counting.",
                "cf_tags": ["graphs"],
                "lc_tags": ["Graph"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "997", "title": "Find the Town Judge", "difficulty": "Easy", "url": "https://leetcode.com/problems/find-the-town-judge/"}
                ]
            },
            {
                "id": "bfs",
                "name": "Breadth-First Search (BFS)",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Level-order queue traversal, single-source shortest path in unweighted graphs, and multi-source BFS.",
                "cf_tags": ["graphs", "dfs and similar"],
                "lc_tags": ["Breadth-First Search"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "102", "title": "Binary Tree Level Order Traversal", "difficulty": "Medium", "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"},
                    {"platform": "LeetCode", "id": "1091", "title": "Shortest Path in Binary Matrix", "difficulty": "Medium", "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"}
                ]
            },
            {
                "id": "dfs",
                "name": "Depth-First Search (DFS)",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Recursive graph exploration, connected components, flood-fill algorithm, and tree traversal.",
                "cf_tags": ["graphs", "dfs and similar"],
                "lc_tags": ["Depth-First Search"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "200", "title": "Number of Islands", "difficulty": "Medium", "url": "https://leetcode.com/problems/number-of-islands/"},
                    {"platform": "Codeforces", "id": "520B", "title": "Two Buttons", "difficulty": "1400", "url": "https://codeforces.com/problemset/problem/520/B"}
                ]
            },
            {
                "id": "cycle_detection",
                "name": "Cycle Detection in Graphs",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Detecting cycles in undirected graphs (parent pointers) and directed graphs (three-color / recursion call stack).",
                "cf_tags": ["graphs", "dfs and similar"],
                "lc_tags": ["Graph", "Depth-First Search"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "207", "title": "Course Schedule", "difficulty": "Medium", "url": "https://leetcode.com/problems/course-schedule/"},
                    {"platform": "Codeforces", "id": "939A", "title": "Love Triangle", "difficulty": "800", "url": "https://codeforces.com/problemset/problem/939/A"}
                ]
            },
            {
                "id": "topological_sort",
                "name": "Topological Sort & Kahn's Algorithm",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "Linear ordering of DAG vertices, Kahn's in-degree queue algorithm, and DFS post-order reversal.",
                "cf_tags": ["graphs", "dfs and similar"],
                "lc_tags": ["Topological Sort"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "210", "title": "Course Schedule II", "difficulty": "Medium", "url": "https://leetcode.com/problems/course-schedule-ii/"},
                    {"platform": "Codeforces", "id": "510C", "title": "Fox And Names", "difficulty": "1500", "url": "https://codeforces.com/problemset/problem/510/C"}
                ]
            },
            {
                "id": "disjoint_set_union",
                "name": "Disjoint Set Union (DSU / Union-Find)",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Partitioning sets with path compression and union by rank for near O(1) dynamic connectivity.",
                "cf_tags": ["dsu", "data structures"],
                "lc_tags": ["Union Find"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "684", "title": "Redundant Connection", "difficulty": "Medium", "url": "https://leetcode.com/problems/redundant-connection/"},
                    {"platform": "Codeforces", "id": "25D", "title": "Roads not only in Berland", "difficulty": "1800", "url": "https://codeforces.com/problemset/problem/25/D"}
                ]
            },
            {
                "id": "minimum_spanning_tree",
                "name": "Minimum Spanning Tree (MST)",
                "category": "Graph Algorithms",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Kruskal's algorithm with DSU, Prim's algorithm with priority queues, and minimum edge cut sets.",
                "cf_tags": ["graphs", "dsu", "greedy"],
                "lc_tags": ["Minimum Spanning Tree"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "1584", "title": "Min Cost to Connect All Points", "difficulty": "Medium", "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"},
                    {"platform": "Codeforces", "id": "1245D", "title": "Shichikuji and Power Grid", "difficulty": "1900", "url": "https://codeforces.com/problemset/problem/1245/D"}
                ]
            },
            {
                "id": "shortest_path_dijkstra",
                "name": "Dijkstra's Shortest Path",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "Greedy single-source shortest path algorithm for non-negative weighted graphs with priority queue.",
                "cf_tags": ["graphs", "shortest paths"],
                "lc_tags": ["Shortest Path"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "743", "title": "Network Delay Time", "difficulty": "Medium", "url": "https://leetcode.com/problems/network-delay-time/"},
                    {"platform": "Codeforces", "id": "20C", "title": "Dijkstra?", "difficulty": "1400", "url": "https://codeforces.com/problemset/problem/20/C"}
                ]
            },
            {
                "id": "shortest_path_bellman_ford",
                "name": "Bellman-Ford & Negative Cycles",
                "category": "Graph Algorithms",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Dynamic edge relaxation over V-1 iterations and detecting reachable negative weight cycles.",
                "cf_tags": ["graphs", "shortest paths"],
                "lc_tags": ["Shortest Path"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "787", "title": "Cheapest Flights Within K Stops", "difficulty": "Medium", "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"}
                ]
            },
            {
                "id": "shortest_path_floyd_warshall",
                "name": "Floyd-Warshall (All-Pairs)",
                "category": "Graph Algorithms",
                "tier": "Advanced",
                "difficulty": "Medium-Hard",
                "description": "All-pairs shortest paths via O(V^3) dynamic programming matrix relaxation through intermediate vertices.",
                "cf_tags": ["graphs", "shortest paths", "dp"],
                "lc_tags": ["Shortest Path"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "1334", "title": "Find the City With Smallest Number of Neighbors at a Threshold", "difficulty": "Medium", "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"},
                    {"platform": "Codeforces", "id": "295B", "title": "Greg and Graph", "difficulty": "1700", "url": "https://codeforces.com/problemset/problem/295/B"}
                ]
            },
            {
                "id": "bipartite_graph",
                "name": "Bipartite Matching & 2-Coloring",
                "category": "Graph Algorithms",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Graph 2-colorability using BFS/DFS and checking for odd-length cycles in graph networks.",
                "cf_tags": ["graphs", "dfs and similar"],
                "lc_tags": ["Graph"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "785", "title": "Is Graph Bipartite?", "difficulty": "Medium", "url": "https://leetcode.com/problems/is-graph-bipartite/"},
                    {"platform": "Codeforces", "id": "687A", "title": "NP-Hard Problem", "difficulty": "1500", "url": "https://codeforces.com/problemset/problem/687/A"}
                ]
            },

            # 7. Dynamic Programming
            {
                "id": "memoization",
                "name": "Memoization (Top-Down DP)",
                "category": "Dynamic Programming",
                "tier": "Fundamental",
                "difficulty": "Medium",
                "description": "Augmenting recursive formulations with lookup tables/hash maps to avoid redundant subproblem evaluations.",
                "cf_tags": ["dp"],
                "lc_tags": ["Dynamic Programming", "Memoization"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "322", "title": "Coin Change", "difficulty": "Medium", "url": "https://leetcode.com/problems/coin-change/"},
                    {"platform": "Codeforces", "id": "455A", "title": "Boredom", "difficulty": "1500", "url": "https://codeforces.com/problemset/problem/455/A"}
                ]
            },
            {
                "id": "dynamic_programming_1d",
                "name": "1D Dynamic Programming",
                "category": "Dynamic Programming",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Linear iterative tabulation, state transition definitions, and space-optimized subproblem accumulation.",
                "cf_tags": ["dp"],
                "lc_tags": ["Dynamic Programming"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "198", "title": "House Robber", "difficulty": "Medium", "url": "https://leetcode.com/problems/house-robber/"},
                    {"platform": "LeetCode", "id": "300", "title": "Longest Increasing Subsequence", "difficulty": "Medium", "url": "https://leetcode.com/problems/longest-increasing-subsequence/"}
                ]
            },
            {
                "id": "dynamic_programming_2d",
                "name": "2D DP & Knapsack Variants",
                "category": "Dynamic Programming",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "Grid state transitions, 0/1 Knapsack, Unbounded Knapsack, Longest Common Subsequence (LCS), and Edit Distance.",
                "cf_tags": ["dp"],
                "lc_tags": ["Dynamic Programming"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "1143", "title": "Longest Common Subsequence", "difficulty": "Medium", "url": "https://leetcode.com/problems/longest-common-subsequence/"},
                    {"platform": "LeetCode", "id": "72", "title": "Edit Distance", "difficulty": "Hard", "url": "https://leetcode.com/problems/edit-distance/"}
                ]
            },
            {
                "id": "interval_dp",
                "name": "Interval DP",
                "category": "Dynamic Programming",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "DP over subarray ranges [i, j], solving subproblems in increasing order of length, matrix chain multiplication.",
                "cf_tags": ["dp"],
                "lc_tags": ["Dynamic Programming"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "312", "title": "Burst Balloons", "difficulty": "Hard", "url": "https://leetcode.com/problems/burst-balloons/"},
                    {"platform": "Codeforces", "id": "1114D", "title": "Flood Fill", "difficulty": "1800", "url": "https://codeforces.com/problemset/problem/1114/D"}
                ]
            },
            {
                "id": "tree_dp",
                "name": "Tree DP (DP on Trees)",
                "category": "Dynamic Programming",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Computing DP states recursively along tree branches, re-rooting techniques, and subtree optimization.",
                "cf_tags": ["dp", "trees", "dfs and similar"],
                "lc_tags": ["Dynamic Programming", "Tree"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "337", "title": "House Robber III", "difficulty": "Medium", "url": "https://leetcode.com/problems/house-robber-iii/"},
                    {"platform": "Codeforces", "id": "161D", "title": "Distance in Tree", "difficulty": "1800", "url": "https://codeforces.com/problemset/problem/161/D"}
                ]
            },
            {
                "id": "bitmask_dp",
                "name": "Bitmask DP",
                "category": "Dynamic Programming",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Compactly encoding subset membership into integer bits to solve exponential NP-hard problems.",
                "cf_tags": ["dp", "bitmasks"],
                "lc_tags": ["Dynamic Programming", "Bit Manipulation"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "847", "title": "Shortest Path Visiting All Nodes", "difficulty": "Hard", "url": "https://leetcode.com/problems/shortest-path-visiting-all-nodes/"},
                    {"platform": "Codeforces", "id": "401D", "title": "Roman and Numbers", "difficulty": "2000", "url": "https://codeforces.com/problemset/problem/401/D"}
                ]
            },
            {
                "id": "digit_dp",
                "name": "Digit DP",
                "category": "Dynamic Programming",
                "tier": "Advanced",
                "difficulty": "Hard",
                "description": "Counting integers within a range [L, R] satisfying specific digit constraints with tight bound flags.",
                "cf_tags": ["dp"],
                "lc_tags": ["Dynamic Programming"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "233", "title": "Number of Digit One", "difficulty": "Hard", "url": "https://leetcode.com/problems/number-of-digit-one/"},
                    {"platform": "Codeforces", "id": "628D", "title": "Magic Numbers", "difficulty": "1900", "url": "https://codeforces.com/problemset/problem/628/D"}
                ]
            },

            # 8. Greedy & Math
            {
                "id": "greedy",
                "name": "Greedy Algorithms",
                "category": "Greedy & Math",
                "tier": "Core",
                "difficulty": "Medium",
                "description": "Locally optimal choice paradigms, interval scheduling, exchange arguments, and matroid theory.",
                "cf_tags": ["greedy"],
                "lc_tags": ["Greedy"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "435", "title": "Non-overlapping Intervals", "difficulty": "Medium", "url": "https://leetcode.com/problems/non-overlapping-intervals/"},
                    {"platform": "Codeforces", "id": "158B", "title": "Taxi", "difficulty": "1100", "url": "https://codeforces.com/problemset/problem/158/B"}
                ]
            },
            {
                "id": "bit_manipulation",
                "name": "Bit Manipulation",
                "category": "Greedy & Math",
                "tier": "Fundamental",
                "difficulty": "Easy-Medium",
                "description": "Bitwise operations (&, |, ^, ~, <<, >>), parity, power of two checks, and low-bit masks.",
                "cf_tags": ["bitmasks", "math"],
                "lc_tags": ["Bit Manipulation"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "136", "title": "Single Number", "difficulty": "Easy", "url": "https://leetcode.com/problems/single-number/"},
                    {"platform": "Codeforces", "id": "1514B", "title": "AND 0, Sum Big", "difficulty": "1200", "url": "https://codeforces.com/problemset/problem/1514/B"}
                ]
            },
            {
                "id": "number_theory",
                "name": "Number Theory & Modular Arithmetic",
                "category": "Greedy & Math",
                "tier": "Core",
                "difficulty": "Medium-Hard",
                "description": "Euclidean GCD/LCM, Sieve of Eratosthenes, prime factorization, and modular inverse.",
                "cf_tags": ["math", "number theory"],
                "lc_tags": ["Math"],
                "sample_problems": [
                    {"platform": "LeetCode", "id": "204", "title": "Count Primes", "difficulty": "Medium", "url": "https://leetcode.com/problems/count-primes/"},
                    {"platform": "Codeforces", "id": "230B", "title": "T-primes", "difficulty": "1300", "url": "https://codeforces.com/problemset/problem/230/B"}
                ]
            }
        ]

        for n in nodes_data:
            self.graph.add_node(n["id"], **n)

    def _build_prerequisite_edges(self):
        """
        Builds directed edges (u -> v) indicating that 'u' is a prerequisite for 'v'.
        Includes weight (dependency strength 0.0 - 1.0) and relationship description.
        """
        prerequisite_edges = [
            # Arrays & Strings
            ("basic_arrays", "prefix_sum", 0.9, "Prefix sum precomputes cumulative slices of array buffers"),
            ("basic_arrays", "two_pointers", 0.9, "Two pointers iterates across linear index boundaries"),
            ("two_pointers", "sliding_window", 0.95, "Sliding window extends two pointers with boundary preservation"),
            ("basic_arrays", "string_manipulation", 0.85, "Strings are contiguous character arrays"),
            ("basic_arrays", "basic_sorting", 0.9, "Sorting algorithms operate directly on array elements"),

            # Linear Data Structures
            ("basic_arrays", "linked_lists", 0.7, "Linked lists offer alternate pointer-based linear structures"),
            ("basic_arrays", "stacks", 0.9, "Stacks model bounded/unbounded LIFO buffers"),
            ("basic_arrays", "queues", 0.9, "Queues model FIFO circular or dynamic buffers"),
            ("stacks", "monotonic_stack", 0.95, "Monotonic stack enforces ordered invariants on stack frames"),
            ("queues", "monotonic_queue", 0.9, "Monotonic queue maintains a deque of optimal candidates"),
            ("sliding_window", "monotonic_queue", 0.85, "Monotonic queue optimizes sliding window extremum queries"),

            # Recursion & Sorting
            ("basic_arrays", "recursion", 0.8, "Recursive functions decompose arrays and linear states"),
            ("recursion", "divide_and_conquer", 0.9, "Divide & conquer breaks problems into recursive subproblems"),
            ("basic_sorting", "divide_and_conquer", 0.8, "MergeSort and QuickSort synthesize sorting with divide & conquer"),
            ("recursion", "backtracking", 0.95, "Backtracking is depth-first recursive exploration with state reversion"),

            # Searching
            ("basic_arrays", "binary_search", 0.95, "Binary search requires sorted random-access memory"),
            ("basic_sorting", "binary_search", 0.85, "Sorting arrays satisfies the monotonic condition for binary search"),
            ("binary_search", "binary_search_on_answer", 0.9, "Binary search on answer evaluates predicates over monotonic output ranges"),

            # Trees & Heaps
            ("recursion", "binary_trees", 0.9, "Tree traversals recursively explore child subtrees"),
            ("queues", "binary_trees", 0.85, "Level-order tree traversal requires FIFO queue processing"),
            ("binary_trees", "binary_search_trees", 0.95, "BST adds sorted ordering invariant to binary trees"),
            ("binary_search", "binary_search_trees", 0.85, "BST search mirrors logarithmic binary search on trees"),
            ("binary_trees", "heaps_priority_queues", 0.9, "Binary heaps are complete binary trees in array form"),
            ("string_manipulation", "trie", 0.85, "Tries store string prefixes along edge transitions"),
            ("binary_trees", "trie", 0.8, "Tries are k-ary tree structures storing prefix states"),

            # Graphs
            ("basic_arrays", "graph_representation", 0.85, "Adjacency lists are arrays of neighbor vectors"),
            ("graph_representation", "bfs", 0.9, "BFS traverses adjacency lists layer by layer"),
            ("queues", "bfs", 0.95, "BFS requires a FIFO queue for unweighted distance discovery"),
            ("graph_representation", "dfs", 0.9, "DFS navigates adjacency lists depth-first"),
            ("recursion", "dfs", 0.85, "DFS relies on the recursive call stack or explicit stack"),
            ("dfs", "cycle_detection", 0.9, "Directed cycle detection checks recursion stack back-edges"),
            ("bfs", "cycle_detection", 0.8, "Undirected cycle detection checks visited parent pointers"),
            ("cycle_detection", "topological_sort", 0.95, "Topological sort is strictly defined on DAGs and requires cycle absence"),
            ("bfs", "topological_sort", 0.85, "Kahn's topological sort uses BFS queue with in-degree counters"),
            ("dfs", "topological_sort", 0.85, "DFS topological sort collects nodes in reverse post-visit order"),
            ("basic_arrays", "disjoint_set_union", 0.85, "DSU manages representative parent array indices"),
            ("disjoint_set_union", "minimum_spanning_tree", 0.95, "Kruskal's algorithm relies on DSU to prevent cycle formation"),
            ("heaps_priority_queues", "minimum_spanning_tree", 0.85, "Prim's algorithm uses priority queues for minimal edge cuts"),
            ("heaps_priority_queues", "shortest_path_dijkstra", 0.95, "Dijkstra requires priority queues for greedy minimum distance relaxation"),
            ("bfs", "shortest_path_dijkstra", 0.85, "Dijkstra is a priority-queue generalized BFS for weighted graphs"),
            ("graph_representation", "shortest_path_bellman_ford", 0.85, "Bellman-Ford iteratively relaxes edge lists"),
            ("bfs", "bipartite_graph", 0.85, "Bipartition testing alternates 2 colors level by level"),

            # Dynamic Programming
            ("recursion", "memoization", 1.0, "Memoization augments top-down recursion with state caching"),
            ("memoization", "dynamic_programming_1d", 0.9, "1D DP tabulates recurrence relations iteratively"),
            ("dynamic_programming_1d", "dynamic_programming_2d", 0.85, "2D DP extends single states to multidimensional tables"),
            ("dynamic_programming_2d", "interval_dp", 0.9, "Interval DP evaluates sub-ranges [i, j] in increasing length order"),
            ("dynamic_programming_1d", "tree_dp", 0.9, "Tree DP solves recurrence relations over subtree subproblems"),
            ("binary_trees", "tree_dp", 0.95, "Tree DP requires mastery of tree topologies and post-order traversal"),
            ("dfs", "tree_dp", 0.85, "Subtree values propagate along DFS post-visit order"),
            ("dynamic_programming_2d", "bitmask_dp", 0.85, "Bitmask DP evaluates subset configurations with dynamic programming"),
            ("dynamic_programming_2d", "digit_dp", 0.85, "Digit DP evaluates number prefixes with state transitions"),
            ("dynamic_programming_1d", "shortest_path_bellman_ford", 0.8, "Bellman-Ford is iterative dynamic programming over path lengths"),
            ("dynamic_programming_2d", "shortest_path_floyd_warshall", 0.85, "Floyd-Warshall is 3D/2D DP over intermediate vertex sets"),

            # Greedy & Math
            ("basic_sorting", "greedy", 0.85, "Greedy algorithms order candidates according to greedy objective metrics"),
            ("greedy", "minimum_spanning_tree", 0.85, "Kruskal and Prim MST algorithms obey the greedy matroid property"),
            ("basic_arrays", "bit_manipulation", 0.8, "Bit manipulation operates on integer words and bit vectors"),
            ("bit_manipulation", "bitmask_dp", 0.95, "Bitmask DP encodes subset combinations into integer bit states"),
            ("basic_arrays", "number_theory", 0.8, "Number theory routines operate over prime arrays and factor tables")
        ]

        for u, v, w, desc in prerequisite_edges:
            self.graph.add_edge(u, v, weight=w, description=desc)

    def _compute_coordinates(self):
        """
        Assigns normalized 2D coordinates (x: 10-90, y: 15-85) to nodes
        based on category and topological depth for visual graph rendering.
        """
        category_x_ranges = {
            "Arrays & Strings": (10, 22),
            "Searching & Sorting": (20, 34),
            "Linear Data Structures": (30, 44),
            "Recursion & Backtracking": (40, 54),
            "Trees & Heaps": (50, 66),
            "Graph Algorithms": (62, 80),
            "Dynamic Programming": (72, 90),
            "Greedy & Math": (25, 48)
        }

        # Calculate in-degree / topological depth for y positioning
        for node_id in self.graph.nodes:
            category = self.graph.nodes[node_id].get("category", "General")
            x_min, x_max = category_x_ranges.get(category, (20, 80))
            
            # Count ancestors to gauge prerequisite depth
            ancestors = nx.ancestors(self.graph, node_id)
            depth = len(ancestors)
            
            # Spread across category column
            nodes_in_cat = [n for n in self.graph.nodes if self.graph.nodes[n].get("category") == category]
            idx_in_cat = nodes_in_cat.index(node_id) if node_id in nodes_in_cat else 0
            cat_count = max(len(nodes_in_cat), 1)

            x = x_min + ((x_max - x_min) * (idx_in_cat % 2))
            y = 15 + min(70, depth * 14 + (idx_in_cat * 7))

            self.graph.nodes[node_id]["x"] = round(x, 1)
            self.graph.nodes[node_id]["y"] = round(y, 1)

    def get_node(self, node_id: str) -> Optional[Dict[str, Any]]:
        if node_id in self.graph.nodes:
            data = dict(self.graph.nodes[node_id])
            data["id"] = node_id
            return data
        return None

    def get_all_nodes(self) -> List[Dict[str, Any]]:
        result = []
        for n in self.graph.nodes:
            d = dict(self.graph.nodes[n])
            d["id"] = n
            result.append(d)
        return result

    def get_all_edges(self) -> List[Dict[str, Any]]:
        edges = []
        for u, v, data in self.graph.edges(data=True):
            edges.append({
                "source": u,
                "target": v,
                "weight": data.get("weight", 1.0),
                "description": data.get("description", "")
            })
        return edges

    def get_prerequisites(self, node_id: str) -> List[Dict[str, Any]]:
        """Direct prerequisites (in-edges to node_id)"""
        prereqs = []
        if node_id in self.graph:
            for pred in self.graph.predecessors(node_id):
                edge_data = self.graph.get_edge_data(pred, node_id)
                node_data = dict(self.graph.nodes[pred])
                node_data["id"] = pred
                node_data["dependency_weight"] = edge_data.get("weight", 1.0)
                node_data["dependency_reason"] = edge_data.get("description", "")
                prereqs.append(node_data)
        return prereqs

    def get_ancestor_prerequisites(self, node_id: str) -> List[str]:
        """All ancestor concepts in the prerequisite chain"""
        if node_id in self.graph:
            return list(nx.ancestors(self.graph, node_id))
        return []

    def get_dependents(self, node_id: str) -> List[Dict[str, Any]]:
        """Concepts that depend on node_id (out-edges from node_id)"""
        dependents = []
        if node_id in self.graph:
            for succ in self.graph.successors(node_id):
                edge_data = self.graph.get_edge_data(node_id, succ)
                node_data = dict(self.graph.nodes[succ])
                node_data["id"] = succ
                node_data["dependency_weight"] = edge_data.get("weight", 1.0)
                dependents.append(node_data)
        return dependents

    def to_cytoscape_or_d3(self) -> Dict[str, Any]:
        """Format suitable for interactive frontend graph visualizers"""
        nodes = []
        for n in self.graph.nodes:
            data = dict(self.graph.nodes[n])
            data["id"] = n
            nodes.append(data)

        edges = self.get_all_edges()
        return {
            "nodes": nodes,
            "edges": edges,
            "total_nodes": len(nodes),
            "total_edges": len(edges),
            "is_dag": nx.is_directed_acyclic_graph(self.graph)
        }

concept_graph = ConceptDependencyGraph()
