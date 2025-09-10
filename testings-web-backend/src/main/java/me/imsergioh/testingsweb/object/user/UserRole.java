package me.imsergioh.testingsweb.object.user;

public enum UserRole {

    GUEST, USER, MOD, ADMIN;

    public static UserRole fromString(String name) {
        try {
            return valueOf(name);
        } catch (IllegalArgumentException e) {
            return GUEST;
        }
    }

}
