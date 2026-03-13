# Quick Start Guide

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git (optional)

## Installation (5 minutes)

### Option 1: Automated Setup (Windows)
```bash
cd demo
setup.bat
```

### Option 2: Automated Setup (Mac/Linux)
```bash
cd demo
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Application

### Terminal 1: Start Backend
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
Local:   http://localhost:5173/
ready in 123ms
```

## Access Points

- **Application**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## First Steps

1. **Open** http://localhost:5173 in your browser
2. **Drag** nodes from the left sidebar onto the canvas
3. **Connect** nodes by clicking handles and dragging to other nodes
4. **Configure** nodes by adjusting their settings
5. **Submit** your pipeline using the "Submit Pipeline" button
6. **View** the analysis results in the modal

## Example Pipeline

Try creating this simple pipeline:

1. Add an **Input** node (left)
2. Add a **Text** node (middle)
3. Add an **Output** node (right)
4. Connect: Input → Text → Output
5. In Text node, enter: `Hello {{ name }}`
6. Click Submit to analyze

Expected response:
```
Nodes: 3
Edges: 2
Is DAG: ✅ Valid DAG
```

## Features Overview

### Part 1: Node Abstraction ✅
- BaseNode reduces code duplication
- 7 node types created with minimal code
- Easy to add more nodes

### Part 2: Styling ✅
- Modern dark theme
- Color-coded nodes
- Smooth animations
- Professional UI

### Part 3: Text Node Logic ✅
- Auto-sizing textarea
- Variable detection with `{{ variable }}`
- Dynamic handles for variables

### Part 4: Backend Integration ✅
- Submit pipeline to backend
- Calculates node/edge count
- Detects DAG with Kahn's algorithm
- Beautiful results display

## Project Structure

```
demo/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── nodes/           # 7 node components
│   │   ├── components/      # UI components
│   │   ├── styles/          # CSS styling
│   │   ├── App.jsx          # Main app
│   │   └── main.jsx         # Entry point
│   └── package.json
│
├── backend/                  # FastAPI Python backend
│   ├── main.py              # FastAPI app with /pipelines/parse
│   └── requirements.txt
│
├── README.md                # Full documentation
├── NODE_ABSTRACTION_GUIDE.md # Node creation guide
└── setup.sh/setup.bat       # Automated setup
```

## Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 8000
- Check browser console for CORS errors
- Verify proxy is configured in `vite.config.js`

### Backend not starting
```bash
# Clear Python cache
find . -type d -name __pycache__ -exec rm -r {} +

# Reinstall packages
pip install --upgrade -r requirements.txt

# Try specific port
python main.py --port 8001
```

### Frontend build issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Common Commands

### Frontend Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
python main.py              # Run server
python -m pytest            # Run tests
python -c "import main"     # Check syntax
```

## Documentation

- **[README.md](README.md)** - Full project documentation
- **[NODE_ABSTRACTION_GUIDE.md](NODE_ABSTRACTION_GUIDE.md)** - How to create new nodes
- **API Docs** - http://localhost:8000/docs (when backend is running)

## Next Steps

### Explore the Code
- Check `frontend/src/nodes/` to see how nodes are implemented
- Look at `frontend/src/styles/node.css` for styling examples
- Review `backend/main.py` for backend logic

### Customize
- Add more nodes following the patterns in `NODE_ABSTRACTION_GUIDE.md`
- Modify styling in CSS files
- Add more endpoints in backend

### Deploy
- Build frontend: `npm run build` (creates `dist/` folder)
- Deploy backend using Gunicorn or similar
- Use environment variables for configuration

## Support

For issues:
1. Check the troubleshooting section above
2. Review error messages in browser console and terminal
3. Check firewall/port availability
4. Verify all dependencies installed correctly

## Key Technologies

- **Frontend**: React 18, Vite, ReactFlow, CSS3
- **Backend**: FastAPI, Python 3.8+, Pydantic
- **Architecture**: REST API, Node-based UI

---

**Happy building! 🚀**
