package com.example.restservice.eventfeedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/event-feedbacks")
public class EventFeedbackController {

    private final EventFeedbackService eventFeedbackService;

    @Autowired
    public EventFeedbackController(EventFeedbackService eventFeedbackService) {
        this.eventFeedbackService = eventFeedbackService;
    }

    @GetMapping
    public List<EventFeedback> getAllEventFeedbacks() {
        return eventFeedbackService.getAllEventFeedbacks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventFeedback> getEventFeedbackById(@PathVariable UUID id) {
        EventFeedback eventFeedback = eventFeedbackService.getEventFeedbackById(id);
        return eventFeedback != null ? ResponseEntity.ok(eventFeedback) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public EventFeedback createEventFeedback(@RequestBody EventFeedback eventFeedback) {
        return eventFeedbackService.createEventFeedback(eventFeedback);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventFeedback> updateEventFeedback(@PathVariable UUID id, @RequestBody EventFeedback eventFeedbackDetails) {
        EventFeedback updatedEventFeedback = eventFeedbackService.updateEventFeedback(id, eventFeedbackDetails);
        return updatedEventFeedback != null ? ResponseEntity.ok(updatedEventFeedback) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventFeedback(@PathVariable UUID id) {
        eventFeedbackService.deleteEventFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
