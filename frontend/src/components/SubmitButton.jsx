import React, { useState } from "react";

const SubmitButton = ({ nodes, edges, onResponse }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          data: node.data || {},
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      };

      const response = await fetch(
        "https://pipeline-builder-fsyx.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      onResponse(data);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? "⏳ Analyzing..." : "✈️ Submit Pipeline"}
    </button>
  );
};

export default SubmitButton;