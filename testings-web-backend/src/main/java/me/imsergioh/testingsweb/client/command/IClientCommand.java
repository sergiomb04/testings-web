package me.imsergioh.testingsweb.client.command;

import me.imsergioh.testingsweb.client.ClientConnection;

import java.util.UUID;

public interface IClientCommand {

    void performCommand(ClientConnection connection, UUID requestId, String[] args);

}
