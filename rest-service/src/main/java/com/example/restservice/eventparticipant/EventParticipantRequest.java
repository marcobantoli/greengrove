package com.example.restservice.eventparticipant;

import java.util.UUID;

public class EventParticipantRequest {
    private UUID eventId;

    public UUID getEventId() {
        return eventId;
    }

    public void setEventId(UUID eventId) {
        this.eventId = eventId;
    }
}