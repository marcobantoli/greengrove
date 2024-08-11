package com.example.restservice.reward;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RewardRepository extends JpaRepository<Reward, UUID> {
    // Additional query methods can be defined here if needed
}
