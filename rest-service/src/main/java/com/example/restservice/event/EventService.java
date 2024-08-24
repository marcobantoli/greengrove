package com.example.restservice.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import com.example.restservice.eventparticipant.EventParticipantRepository;
import com.example.restservice.user.User;
import com.example.restservice.user.UserRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventParticipantRepository eventParticipantRepository;

    @Autowired
    public EventService(EventRepository eventRepository, UserRepository userRepository, EventParticipantRepository eventParticipantRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.eventParticipantRepository = eventParticipantRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsForCurrentUser() {
        // Get the currently authenticated user
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        
        String email;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();    // This returns email
        } else {
            email = principal.toString();
        }

        // Fetch the User entity from the database based on the username
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the events the user is participating in
        return eventParticipantRepository.findAllEventsByUser(user);
    }

    public Event getEventById(UUID id) {
        return eventRepository.findById(id).orElse(null);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(UUID id, Event eventDetails) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(eventDetails.getName());
                    event.setDescription(eventDetails.getDescription());
                    event.setDate(eventDetails.getDate());
                    event.setLocation(eventDetails.getLocation());
                    return eventRepository.save(event);
                })
                .orElse(null);
    }

    public void deleteEvent(UUID id) {
        eventRepository.deleteById(id);
    }
}
