package me.imsergioh.testingsweb.object.event;

public enum EventType {

    RESPONSE, SYNC_DATA, TEST;

    public static EventType parse(String input) {
        try {
            return EventType.valueOf(input.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
