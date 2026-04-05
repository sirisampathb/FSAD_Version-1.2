package com.example.monumentbackend.dto;

public class AuthResponse {

    private String token;
    private UserDTO user;

    // ✅ Constructor
    public AuthResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public UserDTO getUser() {
        return user;
    }
}