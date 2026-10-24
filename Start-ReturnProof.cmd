@echo off
cd /d "%~dp0"
set "PORT=43178"
echo ReturnProof local review: http://127.0.0.1:43178
echo Keep this window open while reviewing. Press Ctrl+C to stop this server.
node "%~dp0server.mjs"
if errorlevel 1 pause
