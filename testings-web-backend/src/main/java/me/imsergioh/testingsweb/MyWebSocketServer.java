package me.imsergioh.testingsweb;

import lombok.Getter;
import me.imsergioh.testingsweb.command.client.GetTestCommand;
import me.imsergioh.testingsweb.command.client.TestCommand;
import me.imsergioh.testingsweb.command.server.ReloadCommand;
import me.imsergioh.testingsweb.connection.MongoDBConnection;
import me.imsergioh.testingsweb.handler.ClientCommandsHandler;
import me.imsergioh.testingsweb.handler.ConsoleCommandsHandler;
import me.imsergioh.testingsweb.object.config.JsonConfig;
import me.imsergioh.testingsweb.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyWebSocketServer {

    private static JsonConfig backendConnectionsConfig;
    @Getter
    private static JsonConfig secretsConfig;
    @Getter
    private static MongoDBConnection mongoDBConnection;

    public static void main(String[] args) {
        init();
        testing();
        SpringApplication.run(MyWebSocketServer.class, args);
    }

    public static void init() {
        initConfigs();
        setupBackendConnections();

        // Client-Commands Registry
        ClientCommandsHandler.register(new TestCommand(), new GetTestCommand());

        // Server-Commands Registry
        ConsoleCommandsHandler.register("reload", new ReloadCommand());
    }

    private static void setupBackendConnections() {
        mongoDBConnection = new MongoDBConnection(backendConnectionsConfig.getString("mongodb_uri"));
    }

    private static void initConfigs() {
        backendConnectionsConfig = new JsonConfig("backend-connections.json")
                .setDefault("mongodb_uri", "mongodb://localhost:27017/")
                .save();
        secretsConfig = new JsonConfig("secrets.json")
                .setDefault("JWT_SECRET", "UnaClaveMuySeguraYLargaParaFirmarJWT1234567890")
                .save();
    }

    private static void testing() {
        System.out.println("Password: " +  UserService.getInstance().getHashedPassword("password123"));
    }

}
