package me.imsergioh.testingsweb.object.request;

import java.util.UUID;

public abstract class GenericRequest implements IGenericRequest {

    protected final UUID id;

    public GenericRequest(UUID uuid) {
        this.id = uuid;
    }

    public GenericRequest() {
        this(UUID.randomUUID());
    }

    @Override
    public UUID id() {
        return id;
    }
}
