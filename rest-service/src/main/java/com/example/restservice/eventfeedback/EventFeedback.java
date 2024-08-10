package com.example.restservice.eventfeedback;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.example.restservice.event.Event;
import com.example.restservice.user.User;

@Entity
@Table(name = "event_feedback")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class EventFeedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID feedbackId;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private Integer rating;
    
    @Column(columnDefinition = "TEXT")
    private String comment;
    
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date createdAt;

    // Getters and Setters
}
