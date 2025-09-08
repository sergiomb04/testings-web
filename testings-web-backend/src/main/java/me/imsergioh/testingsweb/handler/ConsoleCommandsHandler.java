package me.imsergioh.testingsweb.handler;

import me.imsergioh.testingsweb.object.server.ServerCommand;
import me.imsergioh.testingsweb.util.CommandsUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class ConsoleCommandsHandler {

    private static final Map<String, ServerCommand> commands = new HashMap<>();

    public static void register(String name, ServerCommand command) {
        commands.put(name, command);
    }

    private static void performCommand(String label) {
        String name = CommandsUtil.getCommandName(label);
        ServerCommand command = commands.get(name);
        if (command == null) {
            System.out.println("Unknown console command: " + name);
            return;
        }
        command.performCommand(label, CommandsUtil.getCommandArgs(label));
    }

    public static void startConsoleListener() {
        try (Scanner scanner = new Scanner(System.in)) {
            while (true) {
                String line = scanner.nextLine().trim();
                if (!line.isEmpty()) {
                    performCommand(line);
                }
            }
        }
    }
}
