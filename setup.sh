#!/bin/bash

echo ""
echo "========================================"
echo "Pipeline Builder - Quick Start"
echo "========================================"
echo ""
echo "This script will help you get started with the Pipeline Builder application."
echo ""

# Frontend setup
echo "[1/4] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"
echo ""

# Backend setup
echo "[2/4] Creating Python virtual environment..."
cd ../backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "Error creating virtual environment"
        exit 1
    fi
fi
echo "✓ Virtual environment created"
echo ""

echo "[3/4] Installing backend dependencies..."
source venv/bin/activate
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"
echo ""

echo "[4/4] Setup complete!"
echo ""
echo "========================================"
echo "To run the application:"
echo "========================================"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python main.py"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo "Backend  : http://localhost:8000"
echo "API Docs : http://localhost:8000/docs"
echo ""
