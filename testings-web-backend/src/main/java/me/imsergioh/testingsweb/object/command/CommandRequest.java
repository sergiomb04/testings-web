package me.imsergioh.testingsweb.object.command;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.handler.CommandsHandler;
import me.imsergioh.testingsweb.object.request.GenericRequest;
import me.imsergioh.testingsweb.object.request.IGenericRequest;
import me.imsergioh.testingsweb.object.request.RequestType;
import org.bson.Document;

import java.util.UUID;

public class CommandRequest extends GenericRequest {

    private static final String LABEL_FIELD = "label";

    private final String label;

    private CommandRequest(Document document) {
        this(IGenericRequest.getId(document), document.getString(LABEL_FIELD));
    }

    private CommandRequest(UUID uuid, String label) {
        super(uuid);
        this.label = label;
    }

    public CommandRequest(String label) {
        this(UUID.randomUUID(), label);
    }

    @Override
    public void handle(ClientConnection connection) {
        CommandsHandler.performCommand(connection, id(), label);
    }

    @Override
    public RequestType type() {
        return RequestType.COMMAND;
    }

    @Override
    public Document toDocument() {
        return super.toDocument()
                .append("type", RequestType.COMMAND.name())
                .append(LABEL_FIELD, label);
    }
}
