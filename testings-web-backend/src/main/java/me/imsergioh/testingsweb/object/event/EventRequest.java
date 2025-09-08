package me.imsergioh.testingsweb.object.event;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.object.request.GenericRequest;
import me.imsergioh.testingsweb.object.request.IGenericRequest;
import me.imsergioh.testingsweb.object.request.RequestType;
import org.bson.Document;

import java.util.UUID;

public class EventRequest extends GenericRequest {

    private static final String PAYLOAD_FIELD = "payload";

    public static final String EVENT_TYPE_FIELD = "eventType";

    private final Document payload;

    private EventRequest(Document document) {
        this(IGenericRequest.getId(document), document.get(PAYLOAD_FIELD, Document.class));
    }

    public EventRequest(UUID uuid, Document payload) {
        super(uuid);
        this.payload = payload;
    }

    @Override
    public void handle(ClientConnection connection) {
        System.out.println("Handling event request " + getEventType().name());
    }

    public EventType getEventType() {
        if (payload == null || payload.get(EVENT_TYPE_FIELD) == null) return null;
        return EventType.parse(payload.getString(EVENT_TYPE_FIELD));
    }

    @Override
    public RequestType type() {
        return RequestType.EVENT;
    }

    @Override
    public Document toDocument() {
        return super.toDocument()
                .append(PAYLOAD_FIELD, payload);
    }
}
