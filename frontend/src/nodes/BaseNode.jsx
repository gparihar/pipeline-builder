import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

/**
 * BaseNode - Abstraction for all node types
 * Reduces code duplication by providing common node functionality
 * 
 * Props:
 * - data: {
 *     label: string - display name
 *     content: any - node-specific content
 *     onDataChange: (newData) => void
 *     handles: [] - array of handle configs
 *     renderContent: (data, onChange) => JSX - custom content renderer
 *     nodeType: string - type identifier (for styling)
 *   }
 * - selected: boolean - whether node is selected
 * - isConnecting: boolean - whether connections are being made
 */
const BaseNode = ({ data, selected, isConnecting }) => {
  const {
    label,
    content = {},
    onDataChange,
    handles = [],
    renderContent,
    nodeType = 'default',
    dynamicSize = false,
    width = 250,
    height = 100
  } = data;

  const [size, setSize] = useState({ width, height });

  const nodeClass = `base-node node-type-${nodeType} ${selected ? 'selected' : ''} ${isConnecting ? 'connecting' : ''}`;

  const handleContentChange = useCallback((newContent) => {
    if (onDataChange) {
      onDataChange({ ...data, content: newContent });
    }
  }, [data, onDataChange]);

  const handleNodeResize = useCallback((contentHeight) => {
    if (dynamicSize) {
      setSize(prev => ({
        ...prev,
        height: Math.max(100, Math.min(contentHeight + 60, 600))
      }));
    }
  }, [dynamicSize]);

  return (
    <div className={nodeClass} style={{ width: size.width, height: size.height }}>
      {/* Render all input handles (left side) */}
      {handles
        .filter(h => h.position === Position.Left)
        .map((handle, idx) => (
          <Handle
            key={`${handle.id || idx}-input`}
            id={handle.id || `input-${idx}`}
            type="target"
            position={Position.Left}
            style={{ top: `${30 + idx * 25}%` }}
            label={handle.label}
          />
        ))}

      {/* Node header */}
      <div className="node-header">
        <div className="node-label">{label}</div>
      </div>

      {/* Node content */}
      <div className="node-content" onHeightChange={handleNodeResize}>
        {renderContent ? renderContent(content, handleContentChange, handleNodeResize) : null}
      </div>

      {/* Render all output handles (right side) */}
      {handles
        .filter(h => h.position === Position.Right)
        .map((handle, idx) => (
          <Handle
            key={`${handle.id || idx}-output`}
            id={handle.id || `output-${idx}`}
            type="source"
            position={Position.Right}
            style={{ top: `${30 + idx * 25}%` }}
            label={handle.label}
          />
        ))}
    </div>
  );
};

export default BaseNode;
