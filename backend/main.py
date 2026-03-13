from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI(title="Pipeline Builder Backend", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class NodeData(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}

class EdgeData(BaseModel):
    id: str
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_directed_acyclic_graph(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    A DAG has no cycles - every edge points from one node to another with no cycles.
    
    Uses Kahn's algorithm (topological sort with in-degree detection)
    """
    if not edges:
        # No edges means it's acyclic
        return True
    
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {node.id for node in nodes}
    
    # Initialize all nodes with 0 in-degree
    for node in nodes:
        if node.id not in in_degree:
            in_degree[node.id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        # Validate edge references valid nodes
        if edge.source not in node_ids or edge.target not in node_ids:
            continue
        
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Kahn's algorithm - topological sort
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    sorted_count = 0
    
    while queue:
        node_id = queue.popleft()
        sorted_count += 1
        
        for neighbor in graph[node_id]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were sorted, it's a DAG; otherwise it has cycles
    return sorted_count == len(node_ids)

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "Pipeline backend is running"}

@app.post("/pipelines/parse", response_model=PipelineResponse)
def parse_pipeline(request: PipelineRequest):
    """
    Parse a pipeline and return:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges in the pipeline
    - is_dag: Whether the pipeline forms a Directed Acyclic Graph
    """
    num_nodes = len(request.nodes)
    num_edges = len(request.edges)
    is_dag = is_directed_acyclic_graph(request.nodes, request.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Pipeline Builder Backend",
        "docs": "/docs",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
