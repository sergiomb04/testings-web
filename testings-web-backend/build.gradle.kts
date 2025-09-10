plugins {
    id("java")
    id("application")
    id("com.github.johnrengelman.shadow") version "8.1.1"
    id ("org.springframework.boot") version "3.3.4"
    id ("io.spring.dependency-management") version "1.1.6"
}

group = "me.imsergioh.testingsweb"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation ("org.springframework.boot:spring-boot-starter-web")
    implementation ("org.springframework.boot:spring-boot-starter-websocket")
    testImplementation ("org.springframework.boot:spring-boot-starter-test")

    implementation ("org.glassfish.tyrus:tyrus-server:2.1.1")
    implementation ("org.glassfish.tyrus:tyrus-container-grizzly-server:2.1.1")

    implementation ("org.glassfish.tyrus:tyrus-client:2.1.1")

    compileOnly("org.projectlombok:lombok:1.18.30")
    annotationProcessor("org.projectlombok:lombok:1.18.30")
    testCompileOnly("org.projectlombok:lombok:1.18.30")
    testAnnotationProcessor("org.projectlombok:lombok:1.18.30")

    implementation("org.mongodb:bson:5.5.1")
}

application {
    mainClass.set("me.imsergioh.testingsweb.MyWebSocketServer")
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

tasks.named<Jar>("jar") {
    manifest {
        attributes["Main-Class"] = application.mainClass.get()
    }
}

tasks.shadowJar {
    archiveBaseName.set("server")   // nombre base
    archiveVersion.set("")          // vacío = sin versión en el nombre
    archiveClassifier.set("")       // vacío = sin "-all"
}

tasks.named<JavaExec>("run") {
    standardInput = System.`in`
}


