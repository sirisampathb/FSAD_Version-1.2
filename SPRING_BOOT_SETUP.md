# Spring Boot Backend Setup Guide

## Option 1: Docker Setup (Recommended - Easiest)

### Prerequisites
1. Install Docker Desktop: https://www.docker.com/products/docker-desktop

### Quick Start
```bash
# From the project root directory
docker-compose up --build
```

This will:
- Start PostgreSQL database on port 5432
- Build and start Spring Boot backend on port 8080
- Set up the database automatically

## Option 2: Local Development

### Prerequisites
1. **Java 17+**: Download from https://adoptium.net/temurin/releases/
2. **Maven**: Download from https://maven.apache.org/download.cgi
3. **PostgreSQL**: Download from https://www.postgresql.org/download/

### Setup Steps

1. **Install PostgreSQL and create database:**
   ```sql
   CREATE DATABASE monumentdb;
   CREATE USER postgres WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE monumentdb TO postgres;
   ```

2. **Build and run the backend:**
   ```bash
   cd backend-spring
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

## Frontend Setup

The frontend is already configured to proxy API calls to the Spring Boot backend.

```bash
# Start the frontend (from project root)
npm run dev
```

## API Endpoints

- `GET /api/monuments` - Get all monuments
- `GET /api/monuments/{id}` - Get monument by ID
- `POST /api/monuments` - Create new monument

## Testing the Setup

1. Start the Spring Boot backend (port 8080)
2. Start the frontend (port 5000)
3. Open http://localhost:5000 in your browser
4. The frontend should load and display monuments from the Spring Boot API

## Troubleshooting

- **Port conflicts**: Make sure ports 5432, 8080, and 5000 are available
- **Database connection**: Verify PostgreSQL is running and credentials are correct
- **CORS issues**: The backend is configured to allow requests from localhost:5000

## Project Structure

```
backend-spring/
├── src/main/java/com/example/monumentbackend/
│   ├── controller/     # REST controllers
│   ├── entity/         # JPA entities
│   ├── dto/           # Data transfer objects
│   ├── repository/    # JPA repositories
│   ├── service/       # Business logic
│   └── config/        # Configuration classes
├── src/main/resources/
│   └── application.properties
├── Dockerfile
└── pom.xml
```