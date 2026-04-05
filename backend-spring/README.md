# Monument Backend - Spring Boot

This is the Spring Boot backend for the Monument Management application.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL database

## Setup

1. **Database Setup:**
   - Create a PostgreSQL database named `monumentdb`
   - Update the database credentials in `src/main/resources/application.properties`

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

- `GET /api/monuments` - Get all monuments
- `GET /api/monuments/{id}` - Get monument by ID
- `POST /api/monuments` - Create a new monument

## Configuration

Update the following properties in `application.properties`:

- Database URL, username, password
- CORS settings for frontend integration
- Server port (default: 8080)

## Project Structure

- `entity/` - JPA entities
- `dto/` - Data Transfer Objects
- `repository/` - JPA repositories
- `service/` - Business logic
- `controller/` - REST controllers
- `config/` - Configuration classes