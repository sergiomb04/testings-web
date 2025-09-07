package me.imsergioh.testingsweb.client;

import jakarta.websocket.Session;
import lombok.Getter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Getter
public class ClientConnection {

    @Getter
    private static final Map<String, ClientConnection> clients = new HashMap<>();

    private final String id;
    private final Session session;

    private ClientConnection(Session session)  {
        this.id = session.getId();
        this.session = session;
        clients.put(id, this);
        System.out.println("Nueva conexión: " + id);
    }

    public void sendText(String text)  {
        try {
            session.getBasicRemote().sendText(text);
        } catch (IOException e) {
            disconnect(e);
            throw new RuntimeException(e);
        }
    }

    public void disconnect() {disconnect(null);}

    public void disconnect(Exception exception) {
        try {
            session.close();
            System.out.println("Conexión cerrada: " + session.getId());
            if (exception != null) exception.printStackTrace(System.out);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        clients.remove(id);
    }

    public static void broadcast(String input) {
        clients.forEach((id, client) -> {
            client.sendText(input);
        });
    }

    public static void unregister(Session session) {
        clients.get(session.getId()).disconnect();
    }

    public static void register(Session session) {
        new ClientConnection(session);
    }

}
