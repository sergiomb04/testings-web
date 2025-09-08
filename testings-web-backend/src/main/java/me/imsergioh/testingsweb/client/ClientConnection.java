package me.imsergioh.testingsweb.client;

import jakarta.websocket.Session;
import lombok.Getter;
import me.imsergioh.testingsweb.object.command.CommandRequest;
import me.imsergioh.testingsweb.object.event.EventRequest;
import me.imsergioh.testingsweb.object.event.EventType;
import me.imsergioh.testingsweb.object.request.IGenericRequest;
import org.bson.Document;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Consumer;

@Getter
public class ClientConnection {

    @Getter
    private static final Map<String, ClientConnection> clients = new HashMap<>();

    private final String id;
    private final Session session;

    private ClientConnection(Session session)  {
        this(session.getId(), session);
    }

    public ClientConnection(String sessionId, Session session) {
        this.id = sessionId;
        this.session = session;
        clients.put(id, this);
        System.out.println("Nueva conexión: " + id);
    }

    public void sendCommand(String label)  {
        sendRequest(new CommandRequest(label));
    }

    public void sendEvent(EventType type, Document extraPayload)  {
        Document payload = new Document(EventRequest.EVENT_TYPE_FIELD, type.name());
        payload.putAll(extraPayload);

        sendRequest(new EventRequest(UUID.randomUUID(), payload));
    }

    public void sendLogResponse(UUID requestId, String message) {
        sendEvent(EventType.RESPONSE, new Document("id", requestId.toString()).append("message", message));
    }

    public void sendErrorResponse(UUID requestId, String message) {
        sendEvent(EventType.ERROR, new Document("id", requestId.toString()).append("message", message));
    }

    private void sendRequest(IGenericRequest request)  {
        try {
            session.getBasicRemote().sendText(request.toDocument().toJson());
        } catch (IOException e) {
            disconnect(e);
            throw new RuntimeException(e);
        }
    }

    public void disconnect() {disconnect(null);}

    public void disconnect(Exception exception) {
        try {
            session.close();
            if (exception != null) exception.printStackTrace(System.out);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        ClientConnection connection = clients.remove(id);
        if (connection != null) {
            System.out.println("Conexión cerrada: " + session.getId());
        }
    }

    public static void broadcast(IGenericRequest request) {
        clients.values().forEach(client -> {
            client.sendRequest(request);
        });
    }

    public static void forEach(Consumer<ClientConnection> consumer) {
        clients.values().forEach(consumer);
    }

    public static void unregister(Session session) {
        clients.get(session.getId()).disconnect();
    }

    public static void register(Session session) {
        new ClientConnection(session);
    }

    public static ClientConnection get(Session session) {
        return clients.get(session.getId());
    }
}
