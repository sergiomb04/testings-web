package me.imsergioh.testingsweb.object.request;

public record ChangePasswordRequest(String username, String oldPassword, String newPassword) {

    public boolean isNotValid() {
        if (username == null || oldPassword == null || newPassword == null) return true;
        return username.length() < 6 || newPassword.length() < 6;
    }

}
