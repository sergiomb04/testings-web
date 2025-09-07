package me.imsergioh.testingsweb.client.command;

import lombok.Getter;

@Getter
public abstract class ClientCommand implements IClientCommand {

    private final String name;

    public ClientCommand(String name) {
        this.name = name;
    }

}
