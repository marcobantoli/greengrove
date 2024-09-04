package com.example.restservice.point;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restservice.user.User;

import java.util.List;
import java.util.UUID;

public interface PointRepository extends JpaRepository<Point, UUID> {
    // Additional query methods can be defined here if needed
    List<Point> findByUser(User user);
}
