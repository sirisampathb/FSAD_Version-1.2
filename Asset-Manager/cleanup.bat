@echo off
echo Cleaning up unnecessary files and scripts...

:: Delete log files in the nested folder
del /F /Q "build.log"
del /F /Q "java_run.log"
del /F /Q "dockout.txt"
del /F /Q "logs.txt"
del /F /Q "server.log"
del /F /Q "server_final.log"
del /F /Q "server_final_2.log"
del /F /Q "test-db.log"
del /F /Q "db_push.log"

:: Remove the deepest empty Asset-Manager folder
rmdir /Q /S "Asset-Manager"

:: Delete older batch scripts in the root directory
del /F /Q "..\push.bat" 2>nul
del /F /Q "..\push_updates.bat" 2>nul
del /F /Q "..\push_to_git.bat" 2>nul
del /F /Q "..\build.log" 2>nul
del /F /Q "..\dockout.txt" 2>nul
del /F /Q "..\logs.txt" 2>nul

echo.
echo Cleanup complete! You can also delete this cleanup.bat file when you are done.
pause
