package com.example.restservice.organization;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface OrganizationRepository extends JpaRepository<Organization, UUID> {
    // Additional query methods can be defined here if needed
}
