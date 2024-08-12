package com.example.restservice.eventparticipant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventParticipantService {

    private final EventParticipantRepository eventParticipantRepository;

    @Autowired
    public EventParticipantService(EventParticipantRepository eventParticipantRepository) {
        this.eventParticipantRepository = eventParticipantRepository;
    }

    public List<EventParticipant> getAllEventParticipants() {
        return eventParticipantRepository.findAll();
    }

    public EventParticipant getEventParticipantById(UUID id) {
        return eventParticipantRepository.findById(id).orElse(null);
    }

    public EventParticipant createEventParticipant(EventParticipant eventParticipant) {
        return eventParticipantRepository.save(eventParticipant);
    }

    public EventParticipant updateEventParticipant(UUID id, EventParticipant eventParticipantDetails) {
        return eventParticipantRepository.findById(id)
                .map(eventParticipant -> {
                    eventParticipant.setUser(eventParticipantDetails.getUser());
                    eventParticipant.setEvent(eventParticipantDetails.getEvent());
                    return eventParticipantRepository.save(eventParticipant);
                })
                .orElse(null);
    }

    public void deleteEventParticipant(UUID id) {
        eventParticipantRepository.deleteById(id);
    }
}
