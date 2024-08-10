package com.example.restservice.eventorganization;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.example.restservice.event.Event;
import com.example.restservice.organization.Organization;

@Entity
@Table(name = "event_organizations")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class EventOrganization {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID eventOrgId;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    // Getters and Setters
}
