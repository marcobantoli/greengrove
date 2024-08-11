package com.example.restservice.point;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PointRepository extends JpaRepository<Point, UUID> {
    // Additional query methods can be defined here if needed
}
