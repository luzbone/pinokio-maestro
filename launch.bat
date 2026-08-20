@echo off
setlocal
title Maestro Console
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed or not on PATH.
  echo Install it from https://nodejs.org then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies. First run only.
  call npm.cmd install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo.
echo Maestro Console
echo Keep this window open. Close it to stop the site.
echo Opening http://localhost:8080/ when the server is ready.
echo First start can take 10-20 seconds.
echo.

rem Separate minimized window. /b in the same console lets timeout steal
rem stdin from Vite, so the server never prints "ready" and never binds.
rem Do not inline the wait loop: cmd /c "… && exit /b" ignores /b, so the
rem loop kept calling start http://… every second and reopened the browser.
start "Maestro opener" /min cmd /d /c call "%~dp0scripts\open-when-ready.bat"

call npm.cmd run dev
if errorlevel 1 (
  echo.
  echo The site did not start.
  pause
  exit /b 1
)
