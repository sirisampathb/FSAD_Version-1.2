package com.example.monumentbackend.service;

import com.example.monumentbackend.dto.*;
import com.example.monumentbackend.entity.User;
import com.example.monumentbackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
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
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setAuthToken(UUID.randomUUID().toString());

        userRepository.save(user);

        UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
        return new AuthResponse(user.getAuthToken(), dto);
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                user.setAuthToken(UUID.randomUUID().toString());
                userRepository.save(user);

                UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
                return new AuthResponse(user.getAuthToken(), dto);
            }
        }

        throw new RuntimeException("Invalid credentials");
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