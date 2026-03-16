import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode';
import '../styles/node.css';

/**
 * TextNode - Renders a text input node with:
 * - Dynamic width/height based on input content
 * - Variable parsing ({{ variable }}) to create dynamic handles
 */
const TextNode = ({ data, selected, isConnecting }) => {
  const textareaRef = useRef(null);
  const [variables, setVariables] = useState([]);

  // Extract variables from text ({{ variable }} pattern)
  const extractVariables = useCallback((text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!vars.includes(match[1])) {
        vars.push(match[1]);
      }
    }
    setVariables(vars);
  }, []);

  useEffect(() => {
    extractVariables(data.content.text || '');
  }, [data.content.text, extractVariables]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    extractVariables(newText);
    
    if (data.onDataChange) {
      data.onDataChange({
        ...data,
        content: {
          ...data.content,
          text: newText
        }
      });
    }

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 400);
      textareaRef.current.style.height = newHeight + 'px';
    }
  };

  // Create handles for variables dynamically
  const variableHandles = variables.map((varName, idx) => ({
    id: `var-${varName}`,
    label: varName,
    position: Position.Left
  }));

  const allHandles = [
    { id: 'output', label: 'text', position: Position.Right },
    ...variableHandles
  ];

  const renderContent = (content, onChange) => (
    <div className="text-node-content">
      <textarea
        ref={textareaRef}
        value={content.text || ''}
        onChange={handleTextChange}
        placeholder="Enter text... Use {{ variable }} for variables"
        className="text-input"
        style={{
          width: '100%',
          minHeight: '60px',
          maxHeight: '300px',
          border: 'none',
          padding: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          resize: 'none',
          overflow: 'hidden'
        }}
      />
      {variables.length > 0 && (
        <div className="variables-list">
          <small>Variables: {variables.join(', ')}</small>
        </div>
      )}
    </div>
  );

  return (
    <div className="base-node node-type-text selected" style={{ minWidth: '300px' }}>
      {/* Variable handles on left */}
      {variableHandles.map((handle, idx) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="target"
          position={Position.Left}
          style={{ top: `${50 + idx * 30}px` }}
          title={handle.label}
        />
      ))}

      {/* Node header */}
      <div className="node-header">
        <div className="node-label">📝 Text</div>
      </div>

      {/* Node content */}
      <div className="node-content">
        {renderContent(data.content, null)}
      </div>

      {/* Output handle on right */}
      <Handle
        id="output"
        type="source"
        position={Position.Right}
        style={{ top: '50%' }}
        title="text"
      />
    </div>
  );
};

export default TextNode;
