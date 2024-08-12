package com.example.restservice.eventfeedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventFeedbackService {

    private final EventFeedbackRepository eventFeedbackRepository;

    @Autowired
    public EventFeedbackService(EventFeedbackRepository eventFeedbackRepository) {
        this.eventFeedbackRepository = eventFeedbackRepository;
    }

    public List<EventFeedback> getAllEventFeedbacks() {
        return eventFeedbackRepository.findAll();
    }

    public EventFeedback getEventFeedbackById(UUID id) {
        return eventFeedbackRepository.findById(id).orElse(null);
    }

    public EventFeedback createEventFeedback(EventFeedback eventFeedback) {
        return eventFeedbackRepository.save(eventFeedback);
    }

    public EventFeedback updateEventFeedback(UUID id, EventFeedback eventFeedbackDetails) {
        return eventFeedbackRepository.findById(id)
                .map(eventFeedback -> {
                    eventFeedback.setRating(eventFeedbackDetails.getRating());
                    eventFeedback.setComment(eventFeedbackDetails.getComment());
                    return eventFeedbackRepository.save(eventFeedback);
                })
                .orElse(null);
    }

    public void deleteEventFeedback(UUID id) {
        eventFeedbackRepository.deleteById(id);
    }
}
