FROM openjdk:23-jdk-slim-bullseye
WORKDIR /app
COPY target/*.jar /app/backend.jar
CMD ["java", "-jar", "/app/backend.jar"]
COPY target/classes/techspot-objectorienters-firebase-adminsdk-bqho2-f5981f1058.json /app/src/main/resources/techspot-objectorienters-firebase-adminsdk-bqho2-f5981f1058.json
EXPOSE 8080