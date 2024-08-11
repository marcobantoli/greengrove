package com.example.restservice.userreward;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

import com.example.restservice.user.User;

public interface UserRewardRepository extends JpaRepository<UserReward, UUID> {
    List<UserReward> findByUser(User user);
    // Additional query methods can be defined here if needed
}
