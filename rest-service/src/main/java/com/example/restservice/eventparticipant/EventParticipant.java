package com.example.restservice.eventparticipant;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.example.restservice.user.User;
import com.example.restservice.event.Event;

@Entity
@Table(name = "event_participants")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class EventParticipant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID participantId;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date joinedAt;

    // Getters and Setters
}
