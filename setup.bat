@echo off
echo =======================================
echo Setting up Amazon Clone Dependencies
echo =======================================
echo.

echo [1/2] Installing Backend Dependencies...
cd amazon-backend
call npm install
cd ..

echo.
echo [2/2] Installing Frontend Dependencies...
cd amazon-frontend
call npm install
cd ..

echo.
echo =======================================
echo ✅ Setup Complete! 
echo =======================================
echo To start the application, open two separate terminals:
echo.
echo Terminal 1 (Backend):
echo cd amazon-backend
echo node index.js
echo.
echo Terminal 2 (Frontend):
echo cd amazon-frontend
echo npm run dev
echo =======================================
pause
