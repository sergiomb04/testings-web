package me.imsergioh.testingsweb.handler;

import me.imsergioh.testingsweb.client.ClientConnection;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        ClientConnection.register(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        System.out.println("Mensaje recibido: " + message.getPayload());
        RequestsHandler.handle(ClientConnection.get(session), message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        ClientConnection.unregister(session);
    }
}
