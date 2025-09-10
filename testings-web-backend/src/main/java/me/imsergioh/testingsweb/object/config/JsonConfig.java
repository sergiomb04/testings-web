package me.imsergioh.testingsweb.object.config;

import org.bson.Document;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

public class JsonConfig {

    private final File file;
    private Document config;

    public JsonConfig(String filePath) {
        this.file = new File(filePath);
        this.config = new Document();
        load();
    }

    public JsonConfig load() {
        try {
            if (!file.exists()) {
                file.createNewFile();
                save(); // crear archivo vacío
            } else {
                String content = new String(Files.readAllBytes(file.toPath()));
                if (!content.isEmpty()) {
                    this.config = Document.parse(content);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return this;
    }

    public JsonConfig save() {
        try (FileWriter writer = new FileWriter(file)) {
            writer.write(config.toJson());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return this;
    }

    public <T> T get(String key, Class<T> clazz) {
        Object value = config.get(key);
        if (value != null && clazz.isInstance(value)) {
            return clazz.cast(value);
        }
        return null;
    }

    public JsonConfig setDefault(String key, Object value) {
        if (config.containsKey(key)) return this;
        config.put(key, value);
        return this;
    }

    public JsonConfig set(String key, Object value) {
        config.put(key, value);
        return this;
    }

    public String getString(String key) {
        return get(key, String.class);
    }

    public Document getDocument() {
        return config;
    }
}

