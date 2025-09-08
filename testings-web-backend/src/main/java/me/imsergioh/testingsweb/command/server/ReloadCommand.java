package me.imsergioh.testingsweb.command.server;

import me.imsergioh.testingsweb.object.server.ServerCommand;

public class ReloadCommand implements ServerCommand {

    @Override
    public void performCommand(String label, String[] args) {
        System.out.println("Reloading server...");

        // HACER COSAS 😊

        System.out.println("Recargado correctamente!");
    }
}
