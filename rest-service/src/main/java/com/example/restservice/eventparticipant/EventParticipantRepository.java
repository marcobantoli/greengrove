package com.example.restservice.eventparticipant;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventParticipantRepository extends JpaRepository<EventParticipant, UUID> {
    // Additional query methods can be defined here if needed
}
