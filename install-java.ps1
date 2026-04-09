# Run as Administrator to install Java and set environment variables
# PowerShell script to download and install OpenJDK 21

param (
    [string]$JavaInstallPath = "C:\Program Files\Java\jdk-21"
)

Write-Host "Starting Java installation..." -ForegroundColor Green

# Create Java directory
if (-not (Test-Path $JavaInstallPath)) {
    New-Item -ItemType Directory -Path $JavaInstallPath -Force | Out-Null
    Write-Host "Created Java directory: $JavaInstallPath" -ForegroundColor Green
}

# Download OpenJDK 21 LTS (using Eclipse Temurin which is widely trusted)
$downloadUrl = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.1%2B12/OpenJDK21U-jdk_x64_windows_hotspot_21.0.1_12.zip"
$zipPath = "$env:TEMP\openjdk21.zip"

Write-Host "Downloading OpenJDK 21 from: $downloadUrl" -ForegroundColor Green

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing
    Write-Host "Download completed successfully" -ForegroundColor Green
} catch {
    Write-Host "Download failed. Please download manually from:" -ForegroundColor Red
    Write-Host "https://adoptium.net/temurin/releases/?version=21" -ForegroundColor Yellow
    Write-Host "Extract to: $JavaInstallPath" -ForegroundColor Yellow
    exit 1
}

# Extract the zip file
Write-Host "Extracting OpenJDK..." -ForegroundColor Green
Expand-Archive -Path $zipPath -DestinationPath $env:TEMP -Force

# Move extracted content to final location
$extractedFolder = Get-ChildItem -Path "$env:TEMP" -Directory -Name "jdk-*" | Select-Object -First 1
if ($extractedFolder) {
    # Remove old installation if it exists
    if (Test-Path $JavaInstallPath) {
        Remove-Item -Path $JavaInstallPath -Recurse -Force
    }
    Move-Item -Path "$env:TEMP\$extractedFolder" -Destination $JavaInstallPath -Force
    Write-Host "Installed to: $JavaInstallPath" -ForegroundColor Green
} else {
    Write-Host "Extraction failed" -ForegroundColor Red
    exit 1
}

# Set environment variables
Write-Host "Setting environment variables..." -ForegroundColor Green

# Set JAVA_HOME
[Environment]::SetEnvironmentVariable("JAVA_HOME", $JavaInstallPath, "Machine")
Write-Host "Set JAVA_HOME=$JavaInstallPath" -ForegroundColor Green

# Add to PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
$javaPath = "$JavaInstallPath\bin"
if ($currentPath -notlike "*$javaPath*") {
    $newPath = "$javaPath;$currentPath"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "Machine")
    Write-Host "Added to PATH: $javaPath" -ForegroundColor Green
}

# Cleanup
Remove-Item -Path $zipPath -Force -ErrorAction SilentlyContinue

# Verify installation
Write-Host "Verifying installation..." -ForegroundColor Green
$env:JAVA_HOME = $JavaInstallPath
$env:PATH = "$JavaInstallPath\bin;$env:PATH"

& "$JavaInstallPath\bin\java.exe" -version

Write-Host "`nJava installation completed successfully!" -ForegroundColor Green
Write-Host "Please restart VS Code for the changes to take effect." -ForegroundColor Yellow
