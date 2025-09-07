package me.imsergioh.testingsweb.object.request;

public enum RequestType {

    COMMAND, EVENT, RESPONSE, ERROR;

    public static RequestType parse(String input) {
        try {
            return RequestType.valueOf(input.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

}
