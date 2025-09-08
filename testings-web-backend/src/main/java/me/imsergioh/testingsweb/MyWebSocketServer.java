package me.imsergioh.testingsweb;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.command.client.TestCommand;
import me.imsergioh.testingsweb.command.server.ReloadCommand;
import me.imsergioh.testingsweb.handler.ClientCommandsHandler;
import me.imsergioh.testingsweb.handler.ConsoleCommandsHandler;
import me.imsergioh.testingsweb.handler.RequestsHandler;
import org.glassfish.tyrus.server.Server;

@ServerEndpoint("/ws")
public class MyWebSocketServer {

    public static void init() {
        // Client-Commands Registry
        ClientCommandsHandler.register(new TestCommand());

        // Server-Commands Registry
        ConsoleCommandsHandler.register("reload", new ReloadCommand());
    }

    @OnOpen
    public void onOpen(Session session) {
        ClientConnection.register(session);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        RequestsHandler.handle(ClientConnection.get(session), message);
    }

    @OnClose
    public void onClose(Session session) {
        ClientConnection.unregister(session);
    }

    public static void main(String[] args) {
        Server server = new Server("localhost", 8080, "/", null, MyWebSocketServer.class);
        try {
            server.start();
            System.out.println("Servidor WebSocket iniciado en ws://localhost:8080/ws");
            init();
            ConsoleCommandsHandler.startConsoleListener();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
