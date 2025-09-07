package me.imsergioh.testingsweb.handler;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.object.command.CommandRequest;
import me.imsergioh.testingsweb.object.event.EventRequest;
import me.imsergioh.testingsweb.object.request.IGenericRequest;
import me.imsergioh.testingsweb.object.request.RequestType;
import org.bson.Document;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class RequestsHandler {

    private static final Map<RequestType, Class<? extends IGenericRequest>> requestTypes = new HashMap<>();

    static {
        requestTypes.put(RequestType.EVENT, EventRequest.class);
        requestTypes.put(RequestType.COMMAND, CommandRequest.class);
    }

    public static void handle(ClientConnection connection, String input) {
        try {
            if (input == null) {
                connection.disconnect();
                return;
            }

            Document document = Document.parse(input);

            if (document == null) {
                connection.disconnect();
                return;
            }

            RequestType type = RequestType.parse(document.getString("type"));

            if (type == null) {
                connection.disconnect();
                return;
            }

            handleByType(connection, type, document);
        } catch (Exception e) {
            connection.disconnect(e);
        }
    }

    private static void handleByType(ClientConnection connection, RequestType type, Document document)
            throws NoSuchMethodException,
            InstantiationException, IllegalAccessException,
            IllegalArgumentException, InvocationTargetException {

        Class<? extends IGenericRequest> requestClass = requestTypes.get(type);
        if (requestClass == null) return;
        Constructor<?> constructor = requestClass.getConstructor(Document.class);
        constructor.setAccessible(true);
        IGenericRequest request = (IGenericRequest) constructor.newInstance(document);
        request.handle(connection);
    }

}
