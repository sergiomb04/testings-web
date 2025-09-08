package me.imsergioh.testingsweb.command.client;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;
import me.imsergioh.testingsweb.object.event.EventType;
import org.bson.Document;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class TestCommand extends ClientCommand {

    private static final Set<String> clientsSubscribed = new HashSet<>();

    private static final AtomicInteger atomicInteger = new AtomicInteger(0);

    public TestCommand() {
        super("test");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String[] args) {
        int count = atomicInteger.incrementAndGet();
        clientsSubscribed.add(connection.getId());
        broadcast(count);
    }

    private void broadcast(int count) {
        clientsSubscribed.removeIf(id -> ClientConnection.get(id) == null);
        clientsSubscribed.forEach(id -> ClientConnection.get(id).sendEvent(EventType.SYNC_DATA, new Document("count", count)));
    }

}
