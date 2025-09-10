package me.imsergioh.testingsweb.command.client;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;
import me.imsergioh.testingsweb.object.event.EventType;
import me.imsergioh.testingsweb.service.TextService;
import java.util.UUID;

public class GetTestCommand extends ClientCommand {

    public GetTestCommand() {
        super("getTest");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String label, String[] args) {
        TextService.getInstance().subscribe(connection.getId());
        connection.sendEvent(EventType.SYNC_DATA, TextService.getInstance().getResponse());
    }
}
