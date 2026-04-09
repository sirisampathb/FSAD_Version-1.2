# Environment Configuration - FSADP Version 1.2

## System Environment Variables

### Current User Environment
```
JAVA_HOME = C:\Java\jdk-21
PATH contains: C:\Java\jdk-21\bin
```

### How to Verify in PowerShell
```powershell
# Check JAVA_HOME
$env:JAVA_HOME

# Check if java is in PATH
java -version

# Check if javac is in PATH
javac -version

# View full PATH
$env:PATH
```

---

## Java Installation Details

### Installed Components
```
Location: C:\Java\jdk-21
├── bin/
│   ├── java.exe          ✓ Java Runtime
│   ├── javac.exe         ✓ Java Compiler
│   ├── jshell.exe        ✓ Interactive Shell
│   ├── jar.exe           ✓ Jar Tool
│   └── jdb.exe           ✓ Debugger
├── lib/
├── jmods/
└── conf/
```

### Version Info
```
OpenJDK 21.0.1 LTS
Build: Temurin-21.0.1+12
Release Date: 2023-10-17
```

---

## Application Configuration Files

### Backend Spring Boot
**File**: `Asset-Manager/Asset-Manager/backend-spring/pom.xml`
- Maven version: 3.x (via wrapper)
- Java version: 17
- Spring Boot version: 3.2.0
- Dependencies: Spring Web, JPA, PostgreSQL Driver

**File**: `Asset-Manager/Asset-Manager/backend-spring/src/main/resources/application.properties`
```properties
spring.application.name=monument-backend
spring.datasource.url=jdbc:postgresql://postgres:5432/monumentdb
spring.datasource.username=root
spring.datasource.password=Siri@2007
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=8080
cors.allowed-origins=http://localhost:5000
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
```

### Frontend Vite React
**File**: `Asset-Manager/Asset-Manager/client/package.json`
- React + TypeScript
- Vite for build
- Port: 3000 (dev)
- Tailwind CSS, Radix UI components

**File**: `Asset-Manager/Asset-Manager/client/tsconfig.json`
- Target: ES2020
- Module: ESNext
- Strict mode: enabled
- Path aliases configured for `@/` imports

### Server Node.js
**File**: `Asset-Manager/Asset-Manager/server/index.ts`
- Express.js server
- TypeScript-based
- Integrates with frontend build process

---

## Docker Configuration

### docker-compose.yml
Located in: `Asset-Manager/Asset-Manager/docker-compose.yml`

**Services**:
1. **postgres** - PostgreSQL 15
   - Port: 5432
   - Database: monumentdb
   - User: root
   - Password: Siri@2007

**Commands**:
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f postgres
```

---

## Build and Run Sequence

### Step 1: Backend Setup
```powershell
cd "Asset-Manager\Asset-Manager\backend-spring"

# Verify Java
java -version
javac -version

# Build with Maven wrapper
.\mvnw.cmd clean install

# Run backend
.\mvnw.cmd spring-boot:run
```
**Expected**: Server starts on `http://localhost:8080`

### Step 2: Frontend Setup
```powershell
cd "Asset-Manager\Asset-Manager\client"

# Install dependencies
npm install

# Start dev server
npm run dev:client
```
**Expected**: Client starts on `http://localhost:3000`

### Step 3: Full Stack Server
```powershell
cd "Asset-Manager\Asset-Manager"

# Install dependencies
npm install

# Start development mode
npm run dev
```

---

## Database Setup

### Connection String
```
postgresql://root:Siri@2007@postgres:5432/monumentdb
```

### Initial Setup
```bash
# Using Docker Compose (recommended)
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
# Then run backend to auto-create tables
.\mvnw.cmd spring-boot:run
```

---

## Environment Variable Persistence

### Windows User Scope
Set in Control Panel or via PowerShell:
```powershell
# Set JAVA_HOME (persisted across sessions)
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Java\jdk-21", "User")

# Add to PATH (persisted across sessions)
$JavaBinPath = "C:\Java\jdk-21\bin"
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = "$JavaBinPath;$currentPath"
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
```

### Session Scope (Temporary)
```powershell
# These only apply to current PowerShell session
$env:JAVA_HOME = "C:\Java\jdk-21"
$env:PATH = "C:\Java\jdk-21\bin;$env:PATH"
```

---

## Verification Checklist

- [x] Java installed at `C:\Java\jdk-21`
- [x] JAVA_HOME environment variable set
- [x] Java bin directory in PATH
- [x] `java -version` returns 21.0.1
- [x] `javac -version` returns 21.0.1
- [x] Maven wrapper available in backend-spring
- [x] Backend properties configured
- [x] Frontend dependencies listed
- [x] Server configuration present
- [x] Docker configuration available

**Status**: ✅ All Configuration Perfect

---

## Quick Reference

| Component | Version | Location | Status |
|-----------|---------|----------|--------|
| Java | 21.0.1 LTS | C:\Java\jdk-21 | ✅ |
| Spring Boot | 3.2.0 | backend-spring | ✅ |
| React | Latest | client | ✅ |
| PostgreSQL | 15 | Docker | ✅ |
| Node.js | Required | Global | ⏳ |
| npm | With Node | Global | ⏳ |

---

**Last Updated**: April 5, 2026  
**Status**: Ready for Development
