package me.imsergioh.testingsweb;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;

import jakarta.websocket.server.ServerEndpoint;
import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.command.TestCommand;
import me.imsergioh.testingsweb.handler.CommandsHandler;
import org.glassfish.tyrus.server.Server;

import java.io.IOException;

@ServerEndpoint("/ws")
public class MyWebSocketServer {

    private static void init() {
        CommandsHandler.register(new TestCommand());
    }

    @OnOpen
    public void onOpen(Session session) {
        ClientConnection.register(session);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // TODO: MEJORAR PARA QUE SE PUEDAN EJECUTAR COMANDOS DE CLIENTE Y REALIZAR COSAS CHULAS (ACTUALMENTE SE HACE BROADCAST A TODOS LOS CLIENTES)
        ClientConnection.broadcast(message);
    }

    @OnClose
    public void onClose(Session session) {
        ClientConnection.unregister(session);
    }

    // Para arrancar un servidor embebido
    public static void main(String[] args) {
        Server server = new Server("localhost", 8080, "/", null, MyWebSocketServer.class);
        try {
            server.start();
            System.out.println("Servidor WebSocket iniciado en ws://localhost:8080/ws");
            init();
            Thread.currentThread().join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
