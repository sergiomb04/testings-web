package me.imsergioh.testingsweb.object.user;

import org.bson.Document;

import java.util.UUID;

public record User(UUID id, UserRole role, String username, String password) {

    public Document getUserData() {
        return new Document()
                .append("role", role.name())
                .append("username", username);
    }

    public Document toDocument() {
        return new Document("_id", id.toString())
                .append("role", role.name())
                .append("username", username)
                .append("password", password);
    }

    public static User fromDB(Document document) {
        return new User(
                UUID.fromString(document.getString("_id")),
                UserRole.fromString(document.getString("role")),
                document.getString("username"),
                document.getString("password"));
    }

}
