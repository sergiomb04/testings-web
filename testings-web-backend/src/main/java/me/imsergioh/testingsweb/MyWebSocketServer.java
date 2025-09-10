package me.imsergioh.testingsweb;

import me.imsergioh.testingsweb.command.client.GetTestCommand;
import me.imsergioh.testingsweb.command.client.TestCommand;
import me.imsergioh.testingsweb.command.server.ReloadCommand;
import me.imsergioh.testingsweb.handler.ClientCommandsHandler;
import me.imsergioh.testingsweb.handler.ConsoleCommandsHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyWebSocketServer {

    public static void main(String[] args) {
        init();
        SpringApplication.run(MyWebSocketServer.class, args);
    }

    public static void init() {
        // Client-Commands Registry
        ClientCommandsHandler.register(new TestCommand(), new GetTestCommand());

        // Server-Commands Registry
        ConsoleCommandsHandler.register("reload", new ReloadCommand());
    }
}
