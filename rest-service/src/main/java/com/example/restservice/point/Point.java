package com.example.restservice.point;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.example.restservice.user.User;
import com.example.restservice.event.Event;

@Entity
@Table(name = "points")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Point {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID pointId;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @Column(nullable = false)
    private Integer points;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date earnedAt;

    // Getters and Setters
}
