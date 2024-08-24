package com.example.restservice.security;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponse {
    private String token;

    private long expiresIn;

    public String getToken() {
        return token;
    }

 // Getters and setters...
}