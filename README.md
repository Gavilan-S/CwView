<h2>TODO</h2>
<pre>
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── collectiveDunes
│       │           ├── config              // Configuración del servicio 
│       │           ├── service             // Lógica de negocio (servicios)
│       │           ├── model               // Modelos de datos (entidades)
│       │           ├── repository          // Interfaces para acceso a datos
│       │           ├── dto                 // Objetos de transferencia de datos
│       │           ├── exception           // Clases de excepción personalizadas
│       │           ├── utils               // Utilidades generales
│       │           └── websocket           // Manejo de WebSocket para sincronización
│       ├── resources
│       │   ├── application.properties       // Configuración del servicio
│       │   └── application.yml              // Configuración en formato YAML (opcional)
│       ├── static
│       │   ├── js                           // Archivos JavaScript para la lógica del canvas
│       │   │   └── sandbox.js               // Lógica de partículas de arena
│       │   ├── css                          // Archivos CSS para estilos
│       │   │   └── styles.css               // Estilos para la aplicación
│       │   └── html                         // Archivos HTML
│       │       └── index.html               // Página principal
├── pom.xml                                  // Archivo de configuración de Maven
└── README.md                                // Documentación del proyecto
</pre>

<details>
<summary><h2>Dependencies</h2></summary>

● **Spring Web**  
   Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.  
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   ```
● **Spring Boot DevTools**  
   Provides fast application restarts, LiveReload, and configurations for enhanced development experience.  
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <scope>runtime</scope>
      <optional>true</optional>
   </dependency>
   ```
● **Spring Data JPA**  
   Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
   </dependency>
   ```
● **Thymeleaf**  
   A modern server-side Java template engine for both web and standalone environments. Allows HTML to be correctly displayed in browsers and as static prototypes.
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-thymeleaf</artifactId>
   </dependency>
   ```
● **H2 Database**  
   Provides a fast in-memory database that supports JDBC API and R2DBC access, with a small (2MB) footprint. Supports embedded and server modes as well as a browser-based console application.  
   ```xml
   <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <scope>runtime</scope>
   </dependency>
   ```
● **WebSocket**  
   Build Servlet-based WebSocket applications with SockJS and STOMP.  
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-websocket</artifactId>
   </dependency>
   ```
● **Spring Security**  
   Highly customizable authentication and access-control framework for Spring applications.  
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   ```
● **GraphQL DGS Code Generation**  
   Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files. 
   ```xml
   <dependency>
      <groupId>com.netflix.graphql.dgs</groupId>
      <artifactId>dgs-codegen</artifactId>
      <version>X.X.X</version>
   </dependency>

   ```
● **Lombok**  
   Java annotation library which helps to reduce boilerplate code.  
   ```xml
   <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
   </dependency>
   ```
● **Spring Reactive Web**  
   Build reactive web applications with Spring WebFlux and Netty.  
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webflux</artifactId>
   </dependency>
   ```
● **Spring Boot Actuator**  
   Supports built-in (or custom) endpoints that let you monitor and manage your application - such as application health, metrics, sessions, etc
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
   ```
</details>
