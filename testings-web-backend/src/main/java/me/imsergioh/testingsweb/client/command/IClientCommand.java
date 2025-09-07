package me.imsergioh.testingsweb.client.command;

import me.imsergioh.testingsweb.client.ClientConnection;

public interface IClientCommand {

    void performCommand(ClientConnection connection, String[] args);

}
