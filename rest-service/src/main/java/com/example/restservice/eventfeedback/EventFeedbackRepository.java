package com.example.restservice.eventfeedback;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventFeedbackRepository extends JpaRepository<EventFeedback, UUID> {
    // Additional query methods can be defined here if needed
}
