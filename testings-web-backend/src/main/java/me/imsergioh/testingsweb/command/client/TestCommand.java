package me.imsergioh.testingsweb.command.client;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;
import me.imsergioh.testingsweb.service.TextService;

import java.util.UUID;

public class TestCommand extends ClientCommand {

    public TestCommand() {
        super("test");
    }

    @Override
    public void performCommand(ClientConnection connection, UUID requestId, String label, String[] args) {
        TextService.getInstance().setText(label.replaceFirst(getName() + " ", ""));
        TextService.getInstance().broadcast();
    }
}
