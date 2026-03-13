import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  TextNode,
  InputNode,
  OutputNode,
  LLMNode,
  MathNode,
  FilterNode,
  StringNode,
} from "./nodes";

import ResponseModal from "./components/ResponseModal";
import NodePalette from "./components/NodePalette";
import SubmitButton from "./components/SubmitButton";

const nodeTypes = {
  text: TextNode,
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  math: MathNode,
  filter: FilterNode,
  string: StringNode,
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 50, y: 50 },
    data: {
      label: "Input",
      content: { inputValue: "" },
      onDataChange: () => {},
    },
  },
  {
    id: "2",
    type: "text",
    position: { x: 300, y: 50 },
    data: {
      label: "Text",
      content: { text: "Hello {{ name }}" },
      onDataChange: () => {},
    },
  },
  {
    id: "3",
    type: "output",
    position: { x: 550, y: 50 },
    data: {
      label: "Output",
      content: { value: "" },
      onDataChange: () => {},
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "output",
    targetHandle: "input",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "output",
    targetHandle: "input",
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [responseData, setResponseData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNodeDataChange = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: newData } : node
        )
      );
    },
    [setNodes]
  );

  const updatedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onDataChange: (newData) => handleNodeDataChange(node.id, newData),
    },
  }));

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds =
        document.querySelector(".react-flow-wrapper").getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          content: {},
          onDataChange: () => {},
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  return (
    <div className="react-flow-wrapper">
      {/* Header */}
      <div className="app-header">
        <div className="app-title">⚡ Pipeline Builder</div>

        <div className="toolbar">
          <SubmitButton
            nodes={updatedNodes}
            edges={edges}
            onResponse={(data) => {
              setResponseData(data);
              setShowModal(true);
            }}
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="app-container">
        <NodePalette />

        <div className="canvas-area">
          <ReactFlow
            nodes={updatedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background gap={16} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-item">
          Nodes: {updatedNodes.length}
        </div>
        <div className="status-item">
          Edges: {edges.length}
        </div>
      </div>

      {showModal && (
        <ResponseModal
          data={responseData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;