package com.example.monumentbackend.service;

import com.example.monumentbackend.dto.*;
import com.example.monumentbackend.entity.User;
import com.example.monumentbackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Constructor (IMPORTANT)
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (request.getMobile() != null && !request.getMobile().isEmpty()) {
            if (userRepository.existsByMobile(request.getMobile())) {
                throw new RuntimeException("Mobile number already registered");
            }
        }

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setMobile(request.getMobile());
        user.setAuthToken(UUID.randomUUID().toString());

        userRepository.save(user);

        UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
        return new AuthResponse(user.getAuthToken(), dto);
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                user.setAuthToken(UUID.randomUUID().toString());
                userRepository.save(user);

                UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
                return new AuthResponse(user.getAuthToken(), dto);
            }
        }

        throw new RuntimeException("Invalid credentials");
    }

    public String sendOtp(OtpRequest request) {
        Optional<User> userOpt = userRepository.findByMobile(request.getMobile());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Mobile number not found. Please register first.");
        }

        User user = userOpt.get();
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));
        user.setOtp(otp);
        user.setOtpExpiresAt(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        // In Demo/Free mode, we return the OTP in the response or just log it
        // In a real app, this would call an SMS API
        System.out.println("OTP for " + request.getMobile() + " is: " + otp);
        return "OTP sent successfully (Demo: " + otp + ")";
    }

    public AuthResponse verifyOtp(OtpVerifyRequest request) {
        Optional<User> userOpt = userRepository.findByMobile(request.getMobile());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Mobile number not found");
        }

        User user = userOpt.get();
        if (user.getOtp() == null || !user.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiresAt() == null || user.getOtpExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired");
        }

        // Clear OTP after successful use
        user.setOtp(null);
        user.setOtpExpiresAt(null);
        user.setAuthToken(UUID.randomUUID().toString());
        userRepository.save(user);

        UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
        return new AuthResponse(user.getAuthToken(), dto);
    }

    public Optional<User> getUserByToken(String token) {
        return userRepository.findByAuthToken(token);
    }

    public void logout(String token) {
        Optional<User> userOpt = userRepository.findByAuthToken(token);
        userOpt.ifPresent(user -> {
            user.setAuthToken(null);
            userRepository.save(user);
        });
    }
}