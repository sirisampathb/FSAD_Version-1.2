package com.example.monumentbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    private String username;

    @Column(name = "password")
    private String passwordHash;

    private String role;
    private String authToken;

    // ✅ GETTERS

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getRole() {
        return role;
    }

    public String getAuthToken() {
        return authToken;
    }

    // ✅ SETTERS

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}