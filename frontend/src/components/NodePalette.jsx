import React from 'react';

const NodePalette = () => {
  const nodeTypes = [
    { type: 'input', label: '📥 Input', description: 'Input data' },
    { type: 'text', label: '📝 Text', description: 'Text processing' },
    { type: 'output', label: '📤 Output', description: 'Output results' },
    { type: 'llm', label: '🤖 LLM', description: 'Language model' },
    { type: 'math', label: '🧮 Math', description: 'Math operations' },
    { type: 'filter', label: '🔍 Filter', description: 'Conditional filter' },
    { type: 'string', label: '📄 String', description: 'String operations' },
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', nodeType);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">📦 Nodes</div>
      <div className="node-palette">
        {nodeTypes.map(node => (
          <div
            key={node.type}
            className="node-button"
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            title={node.description}
          >
            {node.label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #374151' }}>
        <div style={{ fontSize: '11px', color: '#9ca3af', lineHeight: '1.6' }}>
          <strong>💡 Tip:</strong> Drag nodes onto the canvas to add them. Connect handles to build your pipeline.
        </div>
      </div>
    </div>
  );
};

export default NodePalette;
