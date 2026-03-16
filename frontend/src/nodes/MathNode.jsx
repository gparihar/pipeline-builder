import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * MathNode - Performs mathematical operations
 */
const MathNode = ({ data, selected, isConnecting }) => {
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
    <div className="base-node node-type-math selected" style={{ minWidth: '280px' }}>
      <Handle
        id="input-a"
        type="target"
        position={Position.Left}
        style={{ top: '35%' }}
        title="a"
      />
      <Handle
        id="input-b"
        type="target"
        position={Position.Left}
        style={{ top: '65%' }}
        title="b"
      />
      <div className="node-header">
        <div className="node-label">🧮 Math</div>
      </div>
      <div className="node-content" style={{ padding: '12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Operation:</label>
          <select
            value={data.content.operation || 'add'}
            onChange={(e) => handleChange('operation', e.target.value)}
            style={{
              width: '100%',
              padding: '6px',
              marginTop: '4px',
              fontSize: '12px'
            }}
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (*)</option>
            <option value="divide">Divide (/)</option>
            <option value="power">Power (^)</option>
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

export default MathNode;
