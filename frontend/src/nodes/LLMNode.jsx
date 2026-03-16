import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * LLMNode - Interface to Language Model
 */
const LLMNode = ({ data, selected, isConnecting }) => {
  const handleChange = (field, value) => {
    if (data.onDataChange) {
      data.onDataChange({
        ...data,
        content: {
          ...data.content,
          [field]: value
        }
      });
    }
  };

  return (
    <div className="base-node node-type-llm selected" style={{ minWidth: '280px' }}>
      <Handle
        id="input"
        type="target"
        position={Position.Left}
        title="prompt"
      />
      <div className="node-header">
        <div className="node-label">🤖 LLM</div>
      </div>
      <div className="node-content" style={{ padding: '12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Model:</label>
          <select
            value={data.content.model || 'gpt-4'}
            onChange={(e) => handleChange('model', e.target.value)}
            style={{
              width: '100%',
              padding: '6px',
              marginTop: '4px',
              fontSize: '12px'
            }}
          >
            <option>gpt-4</option>
            <option>gpt-3.5-turbo</option>
            <option>claude-2</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Temperature:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={data.content.temperature || 0.7}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            style={{ width: '100%', marginTop: '4px' }}
          />
          <small>{(data.content.temperature || 0.7).toFixed(1)}</small>
        </div>
      </div>
      <Handle
        id="output"
        type="source"
        position={Position.Right}
        title="response"
      />
    </div>
  );
};

export default LLMNode;
