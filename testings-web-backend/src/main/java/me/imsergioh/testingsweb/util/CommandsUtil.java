package me.imsergioh.testingsweb.util;

public class CommandsUtil {

    public static String[] getCommandArgs(String label) {
        if (label.contains(" ")) return label.replaceFirst(getCommandName(label) + " ", "").split(" ");
        return new String[0];
    }

    public static String getCommandName(String label) {
        if (label.contains(" ")) return label.split(" ")[0];
        return label;
    }

}
