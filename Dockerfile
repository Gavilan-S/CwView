# jdk-23
FROM openjdk:23-jdk-slim

# linux workdir
WORKDIR /app

# projecto files goes to
COPY target/CollectiveDunes-0.0.1-SNAPSHOT.jar CollectiveDunes.jar

# port 
EXPOSE 8080

# run app 
ENTRYPOINT ["java", "-jar", "CollectiveDunes.jar"]

