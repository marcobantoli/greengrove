package com.example.restservice.user;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "users")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID userId;
    
    @Column(nullable = false, length = 100)
    private String firstName;
    
    @Column(nullable = false, length = 100)
    private String lastName;
    
    @Column(nullable = false, unique = true, length = 255)
    private String email;
    
    @Column(nullable = false, length = 255)
    private String passwordHash;
    
    @Column(length = 20)
    private String phone;
    
    @Column(length = 255)
    private String address;
    
    @Column(length = 100)
    private String city;
    
    @Column(length = 100)
    private String state;
    
    @Column(length = 20)
    private String zipCode;
    
    @Column(length = 100)
    private String country;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getters and Setters
}
