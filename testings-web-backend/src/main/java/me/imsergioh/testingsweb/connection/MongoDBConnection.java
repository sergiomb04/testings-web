package me.imsergioh.testingsweb.connection;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import lombok.Getter;
import org.bson.Document;

@Getter
public class MongoDBConnection {

    private final MongoClient client;

    public MongoDBConnection(String uri) {
        client = MongoClients.create(uri);
    }

    public MongoDatabase getDatabase(String name) {
        return client.getDatabase(name);
    }

    public MongoCollection<Document> getCollection(String database, String collection) {
        return client.getDatabase(database).getCollection(collection);
    }

}
