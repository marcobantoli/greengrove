package com.example.restservice.eventparticipant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.restservice.event.Event;
import com.example.restservice.event.EventRepository;
import com.example.restservice.user.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventParticipantService {

    private final EventParticipantRepository eventParticipantRepository;
    
    @Autowired
    private final EventRepository eventRepository;

    @Autowired
    public EventParticipantService(EventParticipantRepository eventParticipantRepository, EventRepository eventRepository) {
        this.eventParticipantRepository = eventParticipantRepository;
        this.eventRepository = eventRepository;
    }

    public List<EventParticipant> getAllEventParticipants() {
        return eventParticipantRepository.findAll();
    }

    public EventParticipant getEventParticipantById(UUID id) {
        return eventParticipantRepository.findById(id).orElse(null);
    }

    public EventParticipant createEventParticipant(UUID eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        UUID authenticatedUserId = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            authenticatedUserId = userDetails.getUserId();
        }
        
        User user = new User();
        user.setUserId(authenticatedUserId);

        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        EventParticipant eventParticipant = new EventParticipant();

        eventParticipant.setUser(user);
        eventParticipant.setEvent(event);
        eventParticipant.setJoinedAt(new Date());

        return eventParticipantRepository.save(eventParticipant);
    }

    /*
    public EventParticipant createEventParticipant(UUID eventId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        UUID authenticatedUserId = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            authenticatedUserId = userDetails.getUserId();
        }
        
        User user = new User();
        user.setUserId(authenticatedUserId);

        // Find the event by ID
        Event event = eventRepository.findById(eventId).orElseThrow(() -> 
            new RuntimeException("Event not found"));

        // Create new EventParticipant
        EventParticipant participant = new EventParticipant();
        participant.setUser(user);
        participant.setEvent(event);
        participant.setJoinedAt(new Date());

        // Save to database
        return eventParticipantRepository.save(participant);
    }
    */

    // Fetch events registered by the user
    public List<Event> getRegisteredEventsByUser(User user) {
        List<EventParticipant> participants = eventParticipantRepository.findAllByUser(user);
        
        // Extract events from the EventParticipant entities
        return participants.stream()
                .map(EventParticipant::getEvent)  // Extract the Event object
                .collect(Collectors.toList());
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
