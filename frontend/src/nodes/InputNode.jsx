import React from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode';
import '../styles/node.css';

/**
 * InputNode - Receives external input
 */
const InputNode = ({ data, selected, isConnecting }) => {
  const handleChange = (e) => {
    if (data.onDataChange) {
      data.onDataChange({
        ...data,
        content: {
          ...data.content,
          inputValue: e.target.value
        }
      });
    }
  };

  const renderContent = (content, onChange) => (
    <div className="input-node-content">
      <input
        type="text"
        value={content.inputValue || ''}
        onChange={handleChange}
        placeholder="Enter input value"
        className="input-field"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #4a5568',
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );

  return (
    <div className="base-node node-type-input selected">
      <div className="node-header">
        <div className="node-label">📥 Input</div>
      </div>
      <div className="node-content">
        {renderContent(data.content, null)}
      </div>
      <Handle
        id="output"
        type="source"
        position={Position.Right}
        title="output"
      />
    </div>
  );
};

export default InputNode;
