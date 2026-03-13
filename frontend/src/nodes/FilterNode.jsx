import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * FilterNode - Filters data based on conditions
 */
const FilterNode = ({ data, selected, isConnecting }) => {
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
    <div className="base-node node-type-filter selected" style={{ minWidth: '280px' }}>
      <Handle
        id="input"
        type="target"
        position={Position.Left}
        title="data"
      />
      <div className="node-header">
        <div className="node-label">🔍 Filter</div>
      </div>
      <div className="node-content" style={{ padding: '12px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Condition:</label>
          <input
            type="text"
            value={data.content.condition || ''}
            onChange={(e) => handleChange('condition', e.target.value)}
            placeholder="e.g., x > 10"
            style={{
              width: '100%',
              padding: '6px',
              marginTop: '4px',
              fontSize: '12px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
      <Handle
        id="output-true"
        type="source"
        position={Position.Right}
        style={{ top: '35%' }}
        title="true"
      />
      <Handle
        id="output-false"
        type="source"
        position={Position.Right}
        style={{ top: '65%' }}
        title="false"
      />
    </div>
  );
};

export default FilterNode;
