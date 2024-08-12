package com.example.restservice.eventorganization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/event-organizations")
public class EventOrganizationController {

    private final EventOrganizationService eventOrganizationService;

    @Autowired
    public EventOrganizationController(EventOrganizationService eventOrganizationService) {
        this.eventOrganizationService = eventOrganizationService;
    }

    @GetMapping
    public List<EventOrganization> getAllEventOrganizations() {
        return eventOrganizationService.getAllEventOrganizations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventOrganization> getEventOrganizationById(@PathVariable UUID id) {
        EventOrganization eventOrganization = eventOrganizationService.getEventOrganizationById(id);
        return eventOrganization != null ? ResponseEntity.ok(eventOrganization) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<EventOrganization> createEventOrganization(@RequestBody EventOrganization eventOrganization) {
        EventOrganization createdEventOrganization = eventOrganizationService.createEventOrganization(eventOrganization);
        return ResponseEntity.ok(createdEventOrganization);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventOrganization> updateEventOrganization(@PathVariable UUID id, @RequestBody EventOrganization eventOrganizationDetails) {
        EventOrganization updatedEventOrganization = eventOrganizationService.updateEventOrganization(id, eventOrganizationDetails);
        return updatedEventOrganization != null ? ResponseEntity.ok(updatedEventOrganization) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventOrganization(@PathVariable UUID id) {
        eventOrganizationService.deleteEventOrganization(id);
        return ResponseEntity.noContent().build();
    }
}
