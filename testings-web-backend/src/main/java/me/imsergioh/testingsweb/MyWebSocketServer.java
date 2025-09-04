package me.imsergioh.testingsweb;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;

import jakarta.websocket.server.ServerEndpoint;
import org.glassfish.tyrus.server.Server;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/ws")
public class MyWebSocketServer {

    private static final Set<Session> sessions = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("Nueva conexión: " + session.getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("Mensaje recibido: " + message);
        // reenviar a todos los clientes
        for (Session s : sessions) {
            if (s.isOpen()) {
                s.getBasicRemote().sendText(message);
            }
        }
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        System.out.println("Conexión cerrada: " + session.getId());
    }

    // Para arrancar un servidor embebido
    public static void main(String[] args) {
        Server server = new Server("localhost", 8080, "/", null, MyWebSocketServer.class);
        try {
            server.start();
            System.out.println("Servidor WebSocket iniciado en ws://localhost:8080/ws");
            Thread.currentThread().join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
