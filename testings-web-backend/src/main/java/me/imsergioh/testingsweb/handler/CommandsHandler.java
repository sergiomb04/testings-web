package me.imsergioh.testingsweb.handler;

import me.imsergioh.testingsweb.client.ClientConnection;
import me.imsergioh.testingsweb.client.command.ClientCommand;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CommandsHandler {

    private static final Map<String, ClientCommand> commands = new HashMap<>();

    public static void register(ClientCommand... clientCommands) {
        for (ClientCommand command : clientCommands) {
            commands.put(command.getName(), command);
        }
    }

    public static void performCommand(ClientConnection connection, UUID requestId, String label) {
        String name = getCommandName(label);
        ClientCommand command = commands.get(name);
        if (command == null) {
            System.out.println("Unknown command: " + name);
            return;
        }
        command.performCommand(connection, requestId, getCommandArgs(label));
    }

    private static String[] getCommandArgs(String label) {
        if (label.contains(" ")) return label.replaceFirst(getCommandName(label) + " ", "").split(" ");
        return new String[0];
    }

    private static String getCommandName(String label) {
        if (label.contains(" ")) return label.split(" ")[0];
        return label;
    }
}
