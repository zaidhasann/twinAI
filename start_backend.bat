@echo off
title TwinAI FastAPI Backend
cd /d "%~dp0backend"
echo ========================================================
echo Starting TwinAI Backend (FastAPI + NetworkX DAG Engine)
echo API Docs: http://localhost:8000/docs
echo ========================================================
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
