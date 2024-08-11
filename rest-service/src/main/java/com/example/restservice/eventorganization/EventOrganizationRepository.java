package com.example.restservice.eventorganization;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventOrganizationRepository extends JpaRepository<EventOrganization, UUID> {
    // Additional query methods can be defined here if needed
}
