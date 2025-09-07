package me.imsergioh.testingsweb;

import me.imsergioh.testingsweb.handler.RequestsHandler;
import me.imsergioh.testingsweb.object.command.CommandRequest;
import me.imsergioh.testingsweb.object.event.EventRequest;
import me.imsergioh.testingsweb.object.event.EventType;
import org.bson.Document;

import java.util.UUID;

public class TestingsMain {

    public static void main(String[] args) {
        MyWebSocketServer.init();

        testCommandRequest();
    }

    // ✅
    private static void testEventRequest() {
        EventRequest request = new EventRequest(UUID.randomUUID(), new Document("eventType", EventType.TEST.name()));

        System.out.println(request.toDocument().toJson());

        RequestsHandler.handle(null, request.toDocument().toJson());
    }

    // ✅
    private static void testCommandRequest() {
        CommandRequest request = new CommandRequest("test arg1 arg2 arg3");

        RequestsHandler.handle(null, request.toDocument().toJson());
    }

}
