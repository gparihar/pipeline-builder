# Pipeline Builder - Full Stack Application

A modern, interactive node-based pipeline builder with a React frontend and FastAPI backend.

## Features

### Part 1: Node Abstraction ✅

- **BaseNode abstraction** reduces code duplication
- **5 new node types created**:
  - 📥 **Input Node**: Receives external input values
  - 📝 **Text Node**: Processes text with dynamic variable support
  - 📤 **Output Node**: Displays pipeline results
  - 🤖 **LLM Node**: Language model interface with model/temperature config
  - 🧮 **Math Node**: Mathematical operations (add, subtract, multiply, divide, power)
  - 🔍 **Filter Node**: Conditional filtering with true/false outputs
  - 📄 **String Node**: String transformations (uppercase, lowercase, trim, reverse, length)

### Part 2: Modern Styling ✅

- Dark theme with gradient accents
- Color-coded node types for quick identification
- Smooth animations and transitions
- Responsive design with mobile support
- Interactive handles with visual feedback
- Modern button styles with hover effects

### Part 3: Enhanced Text Node ✅

- **Dynamic Sizing**: Textarea expands as user types
- **Variable Parsing**: Detects `{{ variable }}` patterns and creates dynamic handles
- **Variable Display**: Shows list of detected variables

### Part 4: Backend Integration ✅

- **Frontend Communication**: Submit button sends pipeline to backend
- **Pipeline Analysis**: Backend calculates nodes, edges, and DAG status
- **Response Modal**: Beautiful display of analysis results
- **Error Handling**: Graceful error management and user feedback

## Project Structure

```
demo/
├── frontend/
│   ├── src/
│   │   ├── nodes/              # Node components
│   │   │   ├── BaseNode.jsx   # Abstract base for all nodes
│   │   │   ├── TextNode.jsx   # Text with variables
│   │   │   ├── InputNode.jsx
│   │   │   ├── OutputNode.jsx
│   │   │   ├── LLMNode.jsx
│   │   │   ├── MathNode.jsx
│   │   │   ├── FilterNode.jsx
│   │   │   ├── StringNode.jsx
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── NodePalette.jsx
│   │   │   ├── SubmitButton.jsx
│   │   │   └── ResponseModal.jsx
│   │   ├── styles/
│   │   │   ├── node.css       # Node styling
│   │   │   └── index.css      # Global styling
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
└── backend/
    ├── main.py                # FastAPI application
    ├── requirements.txt
    └── .gitignore
```

## Installation & Setup

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The backend will be available at `http://localhost:8000`

- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

## Usage

### Building a Pipeline

1. **Add Nodes**: Drag nodes from the sidebar onto the canvas
2. **Connect Nodes**: Click on handles and drag to other nodes to create connections
3. **Configure Nodes**: Click nodes to modify their settings
4. **Text Variables**: In Text nodes, use `{{ variable_name }}` syntax to create dynamic input handles
5. **Submit**: Click the "Submit Pipeline" button to analyze your pipeline

### Backend API

#### POST /pipelines/parse

Send a pipeline for analysis.

**Request:**

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "input",
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2"
    }
  ]
}
```

**Response:**

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## Node Types Reference

### Input Node

- **Output**: data
- **Purpose**: Entry point for external data

### Text Node

- **Inputs**: Dynamic based on `{{ variable }}` patterns
- **Output**: Processed text
- **Special**: Auto-sizing textarea, variable detection

### Output Node

- **Input**: data
- **Purpose**: Final pipeline output display

### LLM Node

- **Input**: prompt
- **Output**: response
- **Config**: Model selection, temperature control

### Math Node

- **Inputs**: a, b
- **Output**: result
- **Operations**: Add, Subtract, Multiply, Divide, Power

### Filter Node

- **Input**: data
- **Outputs**: true (match), false (no match)
- **Config**: Condition expression

### String Node

- **Input**: text
- **Output**: result
- **Operations**: Uppercase, Lowercase, Trim, Reverse, Length

## DAG Detection Algorithm

The backend uses **Kahn's Algorithm** (topological sort) to detect if a pipeline forms a Directed Acyclic Graph:

1. Calculate in-degree for each node
2. Start with nodes having 0 in-degree
3. Remove nodes and their edges, updating in-degrees
4. If all nodes are processed, it's a DAG; otherwise, cycles exist

## Technologies Used

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **ReactFlow** - Node graph visualization
- **CSS3** - Modern styling with gradients and animations

### Backend

- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Python 3.8+**

## Styling Features

### Color Scheme

- Primary: `#6366f1` (Indigo)
- Secondary: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Background: Dark theme with gradients

### Components

- Gradient buttons with hover effects
- Smooth node animations
- Color-coded node types
- Interactive modals
- Status bars and indicators

## Future Enhancements

- [ ] Pipeline execution engine
- [ ] Data type validation
- [ ] Node import/export
- [ ] Collaborative editing
- [ ] More node types (API, Database, etc.)
- [ ] Pipeline scheduling
- [ ] Detailed execution logs

## License

MIT

## Support

For issues or questions, please create an issue or refer to the documentation.
