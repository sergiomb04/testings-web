package me.imsergioh.testingsweb.command;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;

public class TestCommand extends ClientCommand {

    public TestCommand() {
        super("test");
        System.out.println("Comando test registrado correctamente");
    }

    @Override
    public void performCommand(ClientConnection connection, String[] args) {
        connection.sendText("ejecutado comando test!");
    }
}
