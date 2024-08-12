package com.example.restservice.eventparticipant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<EventParticipant> createEventParticipant(@RequestBody EventParticipant eventParticipant) {
        EventParticipant createdEventParticipant = eventParticipantService.createEventParticipant(eventParticipant);
        return ResponseEntity.ok(createdEventParticipant);
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
