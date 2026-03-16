import React from 'react';

const ResponseModal = ({ data, onClose }) => {
  const getStatusEmoji = (isDAG) => isDAG ? '✅' : '❌';
  const getStatusText = (isDAG) => isDAG ? 'Valid DAG' : 'Not a DAG';
  const getStatusColor = (isDAG) => isDAG ? '#10b981' : '#ef4444';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">📊 Pipeline Analysis</div>

        <div className="modal-content">
          <div className="modal-stat">
            <div className="modal-stat-label">Number of Nodes</div>
            <div className="modal-stat-value">{data.num_nodes}</div>
          </div>

          <div className="modal-stat">
            <div className="modal-stat-label">Number of Edges</div>
            <div className="modal-stat-value">{data.num_edges}</div>
          </div>

          <div className="modal-stat" style={{ borderLeftColor: getStatusColor(data.is_dag) }}>
            <div className="modal-stat-label">Directed Acyclic Graph</div>
            <div className="modal-stat-value" style={{ color: getStatusColor(data.is_dag) }}>
              {getStatusEmoji(data.is_dag)} {getStatusText(data.is_dag)}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
