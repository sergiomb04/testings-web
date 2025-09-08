package me.imsergioh.testingsweb.command;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;

import java.util.Arrays;
import java.util.UUID;

public class TestCommand extends ClientCommand {

    public TestCommand() {
        super("test");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String[] args) {
        System.out.println(Arrays.toString(args));
        connection.sendErrorResponse(requestId, "No hay nada realmente para ejecutar.");
    }
}
