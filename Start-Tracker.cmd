@echo off
set PYTHONUTF8=1
cd /d "%~dp0"
"%~dp0runtime\python.exe" "%~dp0portable\launch.py" live %*
pause
