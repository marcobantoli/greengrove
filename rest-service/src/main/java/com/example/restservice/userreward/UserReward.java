package com.example.restservice.userreward;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.example.restservice.user.User;
import com.example.restservice.reward.Reward;

@Entity
@Table(name = "user_rewards")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class UserReward {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID userRewardId;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "reward_id", nullable = false)
    private Reward reward;
    
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date redeemedAt;

    // Getters and Setters
}
