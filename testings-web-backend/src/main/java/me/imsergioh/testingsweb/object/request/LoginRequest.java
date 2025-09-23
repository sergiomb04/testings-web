package me.imsergioh.testingsweb.object.request;

public record LoginRequest(String username, String password) {

    public boolean isNotValid() {
        if (username == null || password == null) return true;
        return username.length() < 6 || password.length() < 6;
    }
}
