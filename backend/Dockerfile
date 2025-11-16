# Build stage
FROM gradle:8-jdk17 AS builder

WORKDIR /app

# Copy gradle files
COPY gradle ./gradle
COPY gradlew .
COPY gradlew.bat .
COPY settings.gradle .
COPY build.gradle .

# Copy source code
COPY src ./src

# Build the application
RUN ./gradlew build -x test

# Production stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy built JAR from builder
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
