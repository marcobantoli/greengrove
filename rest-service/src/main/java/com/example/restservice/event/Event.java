package com.example.restservice.event;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;
import java.time.LocalDate;
import java.time.LocalTime;

import com.example.restservice.user.User;
import com.example.restservice.organization.Organization;

@Entity
@Table(name = "events")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID eventId;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate date;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private LocalTime time;
    
    @Column(nullable = false, length = 255)
    private String location;
    
    @Column(nullable = true, precision = 8, scale = 6)
    private BigDecimal latitude;
    
    @Column(nullable = true, precision = 9, scale = 6)
    private BigDecimal longitude;
    
    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = true)
    private Organization organization;
    
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
    
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date createdAt;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    // Getters and Setters
}
