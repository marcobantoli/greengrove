package com.example.restservice.user;

import lombok.Getter;

@Getter
public class UserDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String city;
    private String state;
    
    public UserDto(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.city = user.getCity();
        this.state = user.getState();
    }
    // Getters and Setters
}
