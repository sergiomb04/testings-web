package me.imsergioh.testingsweb;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.handler.RequestsHandler;

import java.util.UUID;

public class TestingsMain {

    public static void main(String[] args) {
        MyWebSocketServer.init();

        testInvalidRequestHandler();
    }

    private static void testInvalidRequestHandler() {
        RequestsHandler.handle(new ClientConnection(UUID.randomUUID().toString(), null), "texto");
    }

}
