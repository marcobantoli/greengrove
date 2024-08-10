package com.example.restservice.communitymember;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.example.restservice.user.User;
import com.example.restservice.community.Community;

@Entity
@Table(name = "community_members")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class CommunityMember {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID memberId;
    
    @ManyToOne
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date joinedAt;

    // Getters and Setters
}
