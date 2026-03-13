@echo off
echo.
echo ========================================
echo Pipeline Builder - Quick Start
echo ========================================
echo.
echo This script will help you get started with the Pipeline Builder application.
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo This script should be run from the project root directory.
    echo.
)

REM Frontend setup
echo [1/4] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

REM Backend setup
echo [2/4] Creating Python virtual environment...
cd ..\backend
if not exist "venv" (
    python -m venv venv
    if %errorlevel% neq 0 (
        echo Error creating virtual environment
        pause
        exit /b 1
    )
)
echo ✓ Virtual environment created
echo.

echo [3/4] Installing backend dependencies...
call venv\Scripts\activate
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo To run the application:
echo ========================================
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   venv\Scripts\activate
echo   python main.py
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo Backend  : http://localhost:8000
echo API Docs : http://localhost:8000/docs
echo.
pause
