@echo off
title TwinAI Full-Stack Launcher
echo ========================================================
echo Launching TwinAI Digital Twin System...
echo 1. Starting FastAPI Backend on http://localhost:8000
echo 2. Starting React Dashboard on http://localhost:3000
echo ========================================================

start "" "%~dp0start_backend.bat"
timeout /t 3 /nobreak >nul
start "" "%~dp0start_frontend.bat"
timeout /t 2 /nobreak >nul

echo Opening TwinAI in your default browser...
start http://localhost:3000

echo All services launched! You can minimize this window.
