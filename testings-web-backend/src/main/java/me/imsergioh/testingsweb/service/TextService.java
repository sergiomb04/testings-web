package me.imsergioh.testingsweb.service;

import lombok.Getter;
import lombok.Setter;
import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.object.event.EventType;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TextService {

    @Getter
    private static final TextService instance = new TextService();

    @Getter @Setter
    private String text = "Hola mundo!";

    private final Set<String> subscribers = new HashSet<>();

    public void subscribe(String clientId) {
        subscribers.add(clientId);
    }

    public void cleanup() {
        subscribers.removeIf(id -> ClientConnection.get(id) == null);
    }

    public void broadcast() {
        cleanup();
        subscribers.forEach(id -> {
            ClientConnection conn = ClientConnection.get(id);
            if (conn != null) {
                conn.sendEvent(EventType.SYNC_DATA, getResponse());
            }
        });
    }

    public Document getResponse() {
        return new Document("text", text);
    }
}
