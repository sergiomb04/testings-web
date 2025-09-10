package me.imsergioh.testingsweb.service;

import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import lombok.Getter;
import me.imsergioh.testingsweb.MyWebSocketServer;
import me.imsergioh.testingsweb.object.user.User;
import me.imsergioh.testingsweb.object.user.UserRole;
import org.bson.Document;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;
import java.util.regex.Pattern;

public class UserService {

    private static final String DATABASE = "web";
    private static final String COLLECTION = "users";

    @Getter
    private static final UserService instance = new UserService();

    @Getter
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String username, String password) throws MongoException {
        UUID uuid = UUID.randomUUID();
        UserRole role = UserRole.USER;
        User user = new User(uuid, role, username, getHashedPassword(password));
        getCollection().insertOne(user.toDocument());
        return user;
    }

    public String getHashedPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public User getByUsername(String username) {
        Document document = search(new Document("username",
                new Document("$regex", "^" + Pattern.quote(username) + "$")
                        .append("$options", "i")
        ));
        if (document == null) return null;
        return User.fromDB(document);
    }

    public User getById(UUID id) {
        Document document = search(new Document("_id", id.toString()));
        if (document == null) return null;
        return User.fromDB(document);
    }

    private static Document search(Document query) {
        return getCollection().find(query).first();
    }

    private static MongoCollection<Document> getCollection() {
        return MyWebSocketServer.getMongoDBConnection().getCollection(DATABASE, COLLECTION);
    }

}
