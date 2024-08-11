package com.example.restservice.community;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CommunityRepository extends JpaRepository<Community, UUID> {
    // Additional query methods can be defined here if needed
}
