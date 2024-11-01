# jdk-23
FROM openjdk:23-jdk-slim

# linux workdir
WORKDIR /app

# projecto files goes to
COPY target/CollectiveDunes-0.2.0-SNAPSHOT.jar CollectiveDunes.jar

# port 
EXPOSE 8080

# run app 
ENTRYPOINT ["java", "-jar", "CollectiveDunes.jar"]

