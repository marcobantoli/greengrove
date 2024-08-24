package com.example.restservice.eventparticipant;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restservice.user.User;
import com.example.restservice.event.Event;

import java.util.List;
import java.util.UUID;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, UUID> {
    // Additional query methods can be defined here if needed
    List<Event> findAllEventsByUser(User user);
}