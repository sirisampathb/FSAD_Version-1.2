package com.example.monumentbackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "role")
    private String role;

    @Column(name = "auth_token")
    private String authToken;

    @Column(name = "mobile", unique = true)
    private String mobile;

    @Column(name = "otp")
    private String otp;

    @Column(name = "otp_expires_at")
    private LocalDateTime otpExpiresAt;

    // ✅ GETTERS

    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return passwordHash; }
    public String getRole() { return role; }
    public String getAuthToken() { return authToken; }
    public String getMobile() { return mobile; }
    public String getOtp() { return otp; }
    public LocalDateTime getOtpExpiresAt() { return otpExpiresAt; }

    // ✅ SETTERS

    public void setId(String id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String passwordHash) { this.passwordHash = passwordHash; }
    public void setRole(String role) { this.role = role; }
    public void setAuthToken(String authToken) { this.authToken = authToken; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public void setOtp(String otp) { this.otp = otp; }
    public void setOtpExpiresAt(LocalDateTime otpExpiresAt) { this.otpExpiresAt = otpExpiresAt; }
}