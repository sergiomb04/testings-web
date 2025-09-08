package me.imsergioh.testingsweb.command.client;

import lombok.Getter;
import lombok.Setter;
import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;
import me.imsergioh.testingsweb.object.event.EventType;
import org.bson.Document;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class GetTestCommand extends ClientCommand {

    @Getter @Setter
    private static String text = "Hola mundo!";
    private static final Set<String> clientsSubscribed = new HashSet<>();

    public GetTestCommand() {
        super("getTest");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String label, String[] args) {
        clientsSubscribed.add(connection.getId());
        connection.sendEvent(EventType.SYNC_DATA, new Document("text", text));
    }

    public static void broadcast() {
        clientsSubscribed.removeIf(id -> ClientConnection.get(id) == null);
        clientsSubscribed.forEach(id -> ClientConnection.get(id).sendEvent(EventType.SYNC_DATA, new Document("text", text)));
    }

}
