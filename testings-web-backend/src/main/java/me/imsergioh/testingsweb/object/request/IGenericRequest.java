package me.imsergioh.testingsweb.object.request;

import me.imsergioh.testingsweb.client.ClientConnection;
import org.bson.Document;

import java.util.UUID;

public interface IGenericRequest {

    UUID id();
    RequestType type();

    void handle(ClientConnection connection);

    default Document toDocument() {
        final Document doc = new Document();
        doc.append("id", id());
        doc.append("type", type());
        return doc;
    }

    static UUID getId(Document document) {
        if (!document.containsKey("id")) return null;
        String id = document.getString("id");
        return UUID.fromString(id);

    }
}
