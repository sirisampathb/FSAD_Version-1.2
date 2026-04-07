FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY pom.xml ./
COPY .mvn/ .mvn/
COPY mvnw ./

RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw clean package -DskipTests

# ✅ FIXED HERE (use exact jar name)
CMD ["java", "-jar", "target/monument-backend-0.0.1-SNAPSHOT.jar"]