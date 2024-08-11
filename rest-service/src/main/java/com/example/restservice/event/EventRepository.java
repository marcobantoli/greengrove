package com.example.restservice.event;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    // Additional query methods can be defined here if needed
}
