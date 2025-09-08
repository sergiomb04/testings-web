package me.imsergioh.testingsweb.command;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;

import java.util.UUID;

public class TestCommand extends ClientCommand {

    public TestCommand() {
        super("test");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String[] args) {
        System.out.println("TestCommand executed!");

        if (connection != null)
            connection.sendLogResponse(requestId, "ejecutado comando test!");
    }
}
