package me.imsergioh.testingsweb.command.client;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;

import java.util.UUID;

public class TestCommand extends ClientCommand {

    public TestCommand() {
        super("test");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String label, String[] args) {
        GetTestCommand.setText(label.replaceFirst(getName() + " ", ""));
        GetTestCommand.broadcast();
    }
}
