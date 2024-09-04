package com.example.restservice.eventparticipant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.restservice.event.Event;
import com.example.restservice.user.User;
import com.example.restservice.user.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/event-participants")
public class EventParticipantController {

    private final EventParticipantService eventParticipantService;

    @Autowired
    public EventParticipantController(EventParticipantService eventParticipantService) {
        this.eventParticipantService = eventParticipantService;
    }

    @GetMapping
    public List<EventParticipant> getAllEventParticipants() {
        return eventParticipantService.getAllEventParticipants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventParticipant> getEventParticipantById(@PathVariable UUID id) {
        EventParticipant eventParticipant = eventParticipantService.getEventParticipantById(id);
        return eventParticipant != null ? ResponseEntity.ok(eventParticipant) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EventParticipant> createEventParticipant(@RequestBody EventParticipantRequest request) {
        EventParticipant eventParticipant = eventParticipantService.createEventParticipant(request.getEventId());
        return ResponseEntity.ok(eventParticipant);
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<Event>> getRegisteredEventsForCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        UUID authenticatedUserId = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            authenticatedUserId = userDetails.getUserId();
        }
        
        User user = new User();
        user.setUserId(authenticatedUserId);

        // Fetch events the user is registered for
        List<Event> registeredEvents = eventParticipantService.getRegisteredEventsByUser(user);
        
        return ResponseEntity.ok(registeredEvents);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventParticipant> updateEventParticipant(@PathVariable UUID id, @RequestBody EventParticipant eventParticipantDetails) {
        EventParticipant updatedEventParticipant = eventParticipantService.updateEventParticipant(id, eventParticipantDetails);
        return updatedEventParticipant != null ? ResponseEntity.ok(updatedEventParticipant) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventParticipant(@PathVariable UUID id) {
        eventParticipantService.deleteEventParticipant(id);
        return ResponseEntity.noContent().build();
    }
}
