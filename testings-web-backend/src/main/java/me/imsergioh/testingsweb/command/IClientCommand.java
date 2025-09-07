package me.imsergioh.testingsweb.command;

import me.imsergioh.testingsweb.client.ClientConnection;

public interface IClientCommand {

    void performCommand(ClientConnection connection, String[] args);

}
