import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * StringNode - Performs string operations
 */
const StringNode = ({ data, selected, isConnecting }) => {
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
    <div className="base-node node-type-string selected" style={{ minWidth: '280px' }}>
      <Handle
        id="input"
        type="target"
        position={Position.Left}
        title="text"
      />
      <div className="node-header">
        <div className="node-label">📄 String</div>
      </div>
      <div className="node-content" style={{ padding: '12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Operation:</label>
          <select
            value={data.content.operation || 'uppercase'}
            onChange={(e) => handleChange('operation', e.target.value)}
            style={{
              width: '100%',
              padding: '6px',
              marginTop: '4px',
              fontSize: '12px'
            }}
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="trim">Trim</option>
            <option value="reverse">Reverse</option>
            <option value="length">Length</option>
          </select>
        </div>
      </div>
      <Handle
        id="output"
        type="source"
        position={Position.Right}
        title="result"
      />
    </div>
  );
};

export default StringNode;
