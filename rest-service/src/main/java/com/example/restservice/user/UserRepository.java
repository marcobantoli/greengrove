package com.example.restservice.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    // Additional query methods can be defined here if needed
}
