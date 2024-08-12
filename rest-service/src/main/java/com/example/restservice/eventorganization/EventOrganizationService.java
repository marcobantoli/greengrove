package com.example.restservice.eventorganization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventOrganizationService {

    private final EventOrganizationRepository eventOrganizationRepository;

    @Autowired
    public EventOrganizationService(EventOrganizationRepository eventOrganizationRepository) {
        this.eventOrganizationRepository = eventOrganizationRepository;
    }

    public List<EventOrganization> getAllEventOrganizations() {
        return eventOrganizationRepository.findAll();
    }

    public EventOrganization getEventOrganizationById(UUID eventOrgId) {
        return eventOrganizationRepository.findById(eventOrgId).orElse(null);
    }

    public EventOrganization createEventOrganization(EventOrganization eventOrganization) {
        return eventOrganizationRepository.save(eventOrganization);
    }

    public EventOrganization updateEventOrganization(UUID eventOrgId, EventOrganization eventOrganizationDetails) {
        return eventOrganizationRepository.findById(eventOrgId)
                .map(eventOrganization -> {
                    eventOrganization.setEvent(eventOrganizationDetails.getEvent());
                    eventOrganization.setOrganization(eventOrganizationDetails.getOrganization());
                    return eventOrganizationRepository.save(eventOrganization);
                })
                .orElse(null);
    }

    public void deleteEventOrganization(UUID eventOrgId) {
        eventOrganizationRepository.deleteById(eventOrgId);
    }
}
