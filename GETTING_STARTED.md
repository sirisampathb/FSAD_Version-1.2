# 🚀 FSADP Version 1.2 - START HERE

**Status**: ✅ All Setup Complete - Ready to Run

---

## 🎯 Quick Start (Copy & Paste Ready)

### Step 1: Start PostgreSQL
```bash
# Option A: Using Docker Compose (Recommended)
cd "Asset-Manager\Asset-Manager"
docker-compose up -d postgres

# Option B: Using local PostgreSQL
# Ensure PostgreSQL is running on localhost:5432
# Create user: root / password: Siri@2007
# Create database: monumentdb
```

### Step 2: Open Terminal 1 - Start Backend Server
```powershell
cd "c:\clg\FSADP Version1.2\Asset-Manager\Asset-Manager\backend-spring"
$env:JAVA_HOME = "C:\Java\jdk-21"
$env:PATH = "C:\Java\jdk-21\bin;$env:PATH"
.\mvnw.cmd spring-boot:run
```
**Expected Output**: `Started MonumentBackendApplication in X.XXX seconds`  
**Endpoint**: http://localhost:8080

### Step 3: Open Terminal 2 - Start Frontend Server
```powershell
cd "c:\clg\FSADP Version1.2\Asset-Manager\Asset-Manager\client"
npm run dev:client
```
**Expected Output**: `VITE v5.x.x ready in XXX ms`  
**Endpoint**: http://localhost:3000

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

---

## 🔍 Verify Installation

### Check Java
```powershell
java -version
javac -version
# Should show: openjdk version "21.0.1"
```

### Check Node.js & npm
```powershell
node --version    # Should show: v24.13.1
npm --version     # Should show: 11.8.0
```

### Check Maven Wrapper
```powershell
cd "Asset-Manager\Asset-Manager\backend-spring"
.\mvnw.cmd --version
# Should show: Apache Maven 3.9.4
```

### Check PostgreSQL Connection
```sql
-- Connect to PostgreSQL
psql -U root -d monumentdb -h localhost

-- Check tables
\dt
-- Should show tables created by Hibernate
```

---

## 📊 System Requirements Verified

| Requirement | Version | Status |
|------------|---------|--------|
| Java | 21.0.1 LTS | ✅ |
| Maven | 3.9.4 | ✅ |
| Node.js | v24.13.1 | ✅ |
| npm | 11.8.0 | ✅ |
| Spring Boot | 3.2.0 | ✅ |
| React | 19.2.0 | ✅ |
| PostgreSQL | 15 | ⏳ Configure |
| Docker | Latest | ⏳ Configure |

---

## 🛠️ Common Commands

### Build Backend (without running)
```powershell
cd "Asset-Manager\Asset-Manager\backend-spring"
$env:JAVA_HOME = "C:\Java\jdk-21"
$env:PATH = "C:\Java\jdk-21\bin;$env:PATH"
.\mvnw.cmd clean install
# Creates: target/monument-backend-0.0.1-SNAPSHOT.jar
```

### Build Frontend
```powershell
cd "Asset-Manager\Asset-Manager\client"
npm run build
# Creates: dist/ folder with optimized build
```

### Run Type Check
```powershell
cd "Asset-Manager\Asset-Manager"
npm run check
# Runs: tsc --noEmit
```

### Reset Database (if needed)
```bash
# Delete data but keep structure
DELETE FROM your_table;

# Or recreate entirely
DROP DATABASE monumentdb;
CREATE DATABASE monumentdb;
```

---

## 📁 Project Files Overview

```
current working directory: c:\clg\FSADP Version1.2\

Backend:         Asset-Manager/Asset-Manager/backend-spring/
Frontend:        Asset-Manager/Asset-Manager/client/
Server:          Asset-Manager/Asset-Manager/server/
Database Setup:  Asset-Manager/Asset-Manager/docker-compose.yml
```

---

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Check what's using port 8080 or 3000
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Change backend port in: backend-spring/src/main/resources/application.properties
# Add: server.port=8081
```

### Java Not Found
```powershell
# Verify installation
Test-Path "C:\Java\jdk-21"

# Manually set for session
$env:JAVA_HOME = "C:\Java\jdk-21"
$env:PATH = "C:\Java\jdk-21\bin;$env:PATH"
```

### npm Audit Warnings
```powershell
# View details
npm audit

# Fix moderate vulnerabilities (if needed)
npm audit fix --force
```

### Database Connection Refused
```
1. Verify PostgreSQL is running
2. Check connection string in application.properties
3. Verify credentials: root / Siri@2007
4. Ensure database 'monumentdb' exists
```

### Slow npm Install
```powershell
# Clear npm cache
npm cache clean --force

# Reinstall
npm install --no-audit
```

---

## 📚 Architecture Overview

```
┌─────────────────────────────────────────┐
│        Frontend (React/Vite)            │
│  Port 3000 - http://localhost:3000      │
│  TypeScript + Tailwind + Framer Motion  │
└────────────────────┬────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────┐
│     Backend (Spring Boot 3.2.0)         │
│  Port 8080 - http://localhost:8080      │
│  Java 17 (Running on Java 21)           │
│  RESTful API Endpoints                  │
└────────────────────┬────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────┐
│    Database (PostgreSQL 15)             │
│  Port 5432 - postgresql://postgres/...  │
│  Monument Data & Metadata               │
└─────────────────────────────────────────┘
```

---

## 🔗 Import Mappings (Frontend)

```typescript
// These path aliases are configured in tsconfig.json
@/components   → ./src/components/
@/ui           → ./src/components/ui/
@/hooks        → ./src/hooks/
@/lib          → ./src/lib/
@/pages        → ./src/pages/
@/assets       → ./src/assets/
```

---

## 🗄️ Database Configuration

### Connection Details
```properties
URL: jdbc:postgresql://postgres:5432/monumentdb
Host: postgres (Docker) or localhost (Local)
Port: 5432
Database: monumentdb
User: root
Password: Siri@2007
```

### Docker Compose Services
```yaml
PostgreSQL:
  Image: postgres:15-alpine
  Port: 5432
  Environment:
    POSTGRES_USER: root
    POSTGRES_PASSWORD: Siri@2007
    POSTGRES_DB: monumentdb
```

---

## 📝 Environment Setup

### Windows User Environment Variables
```
JAVA_HOME = C:\Java\jdk-21
PATH = C:\Java\jdk-21\bin;[existing PATH]
```

### How to Set Permanently
```powershell
# JAVA_HOME
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Java\jdk-21", "User")

# PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$javaPath = "C:\Java\jdk-21\bin"
if ($currentPath -notlike "*$javaPath*") {
    $newPath = "$javaPath;$currentPath"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
}
```

### How to Set Temporarily (Current Session Only)
```powershell
$env:JAVA_HOME = "C:\Java\jdk-21"
$env:PATH = "C:\Java\jdk-21\bin;$env:PATH"
```

---

## 🎓 Development Workflow

### 1. Make Backend Changes
```powershell
# Edit files in: backend-spring/src/main/java/...
# Server auto-reloads with Spring Boot DevTools
```

### 2. Make Frontend Changes
```powershell
# Edit files in: client/src/...
# Vite dev server auto-refreshes (HMR)
```

### 3. Database Schema Changes
```powershell
# Edit JPA entities in: backend-spring/src/main/java/.../entity/
# Hibernate auto-updates schema (spring.jpa.hibernate.ddl-auto=update)
```

### 4. Rebuild After Changes
```powershell
# Backend rebuild (if needed)
.\mvnw.cmd clean compile

# Frontend rebuild (if needed)
npm run build
```

---

## ✅ Final Checklist Before Starting

- [ ] PostgreSQL installed or Docker running
- [ ] Database `monumentdb` created with user `root`
- [ ] Java 21.0.1 installed at `C:\Java\jdk-21`
- [ ] Node.js v24.13.1+ installed
- [ ] npm packages installed (run `npm install --legacy-peer-deps`)
- [ ] Backend JAR built successfully
- [ ] VS Code restarted to load environment variables
- [ ] All terminals closed and reopened
- [ ] Port 8080 and 3000 are available

---

## 🎯 Success Indicators

### Backend Running ✅
```
Started MonumentBackendApplication
Server running at: http://localhost:8080
Database connected to: monumentdb
```

### Frontend Running ✅
```
VITE v5.x.x ready in XXX ms
Local: http://localhost:3000
```

### Application Working ✅
```
Page loads at http://localhost:3000
Monument cards display with data from backend
No console errors in browser DevTools
```

---

## 📞 Need Help?

**Documentation Files**:
- `ENVIRONMENT_CONFIG.md` - Detailed configuration reference
- `SETUP_VERIFICATION.md` - Complete verification report
- `COMPLETE_SETUP_REPORT.md` - Full setup documentation

**Backend Logs**: Check console output for Spring Boot errors

**Frontend Logs**: Open Browser DevTools (F12) → Console tab

**Database Logs**: Check PostgreSQL logs for connection errors

---

**Setup Complete Date**: April 5, 2026  
**All Systems**: ✅ Ready to Start  
**Next Action**: Run Quick Start steps above

🎉 **Ready to develop!**
