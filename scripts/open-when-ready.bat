@echo off
setlocal
rem Opens the site once, then exits. exit /b only works in a real .bat
rem (not inside cmd /c "for ... && exit /b"), so this lives in its own file.
for /l %%i in (1,1,90) do (
  curl.exe -sf http://127.0.0.1:8080/ >nul 2>&1
  if not errorlevel 1 (
    start "" http://localhost:8080/
    exit /b 0
  )
  ping -n 2 127.0.0.1 >nul
)
exit /b 1
