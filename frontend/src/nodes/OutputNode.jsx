import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * OutputNode - Displays pipeline output
 */
const OutputNode = ({ data, selected, isConnecting }) => {
  return (
    <div className="base-node node-type-output selected">
      <Handle
        id="input"
        type="target"
        position={Position.Left}
        title="input"
      />
      <div className="node-header">
        <div className="node-label">📤 Output</div>
      </div>
      <div className="node-content" style={{ padding: '12px' }}>
        <div className="output-display">{data.content.value || 'Waiting for data...'}</div>
      </div>
    </div>
  );
};

export default OutputNode;
