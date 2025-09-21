package me.imsergioh.testingsweb.object.request;

public record ChangePasswordRequest(String username, String oldPassword, String newPassword) {

}
