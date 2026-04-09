@echo off
REM Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~s0\"' -Verb RunAs"
    exit /b
)

echo ===================================
echo Installing Java 21 with all permissions
echo ===================================

REM Create directories with proper permissions
if not exist "C:\Program Files\Java" (
    mkdir "C:\Program Files\Java"
    icacls "C:\Program Files\Java" /grant:r "%username%:F" /t /q
)

REM Download Java
echo Downloading OpenJDK 21...
cd /d "%temp%"
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.1%%2B12/OpenJDK21U-jdk_x64_windows_hotspot_21.0.1_12.zip' -OutFile 'openjdk21.zip' -UseBasicParsing"

echo Extracting Java...
powershell -Command "Expand-Archive -Path '%temp%\openjdk21.zip' -DestinationPath '%temp%' -Force"

REM Find the extracted folder
for /d %%D in ("%temp%\jdk-*") do (
    set JAVA_EXTRACT=%%D
    goto found
)

:found
if not defined JAVA_EXTRACT (
    echo Extraction failed!
    pause
    exit /b 1
)

echo Removing old Java installation...
rmdir /s /q "C:\Program Files\Java\jdk-21" 2>nul

echo Moving Java to final location...
move "%JAVA_EXTRACT%" "C:\Program Files\Java\jdk-21"

echo Setting environment variables...
setx JAVA_HOME "C:\Program Files\Java\jdk-21" /M
setx PATH "%PATH%;C:\Program Files\Java\jdk-21\bin" /M

echo Granting permissions...
icacls "C:\Program Files\Java\jdk-21" /grant:r "%username%:F" /t /q

echo Cleaning up...
del "%temp%\openjdk21.zip"

echo.
echo ===================================
echo Java 21 installation completed!
echo ===================================
echo.
echo Verifying installation...
"C:\Program Files\Java\jdk-21\bin\java.exe" -version

echo.
echo IMPORTANT: Close and reopen VS Code for changes to take effect
pause
