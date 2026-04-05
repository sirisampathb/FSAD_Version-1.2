package com.example.monumentbackend.dto;

public class UserDTO {

    private String id;
    private String username;
    private String role;

    // ✅ Constructor
    public UserDTO(String id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}