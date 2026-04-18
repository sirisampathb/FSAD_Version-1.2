package com.example.monumentbackend.service;

import com.example.monumentbackend.dto.*;
import com.example.monumentbackend.entity.User;
import com.example.monumentbackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Constructor (IMPORTANT)
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        logger.info("Registration attempt for username: {}", request.getUsername());
        
        if (userRepository.existsByUsername(request.getUsername())) {
            logger.warn("Registration failed: Username already exists - {}", request.getUsername());
            throw new RuntimeException("Username already exists");
        }
        if (request.getMobile() != null && !request.getMobile().isEmpty()) {
            if (userRepository.existsByMobile(request.getMobile())) {
                logger.warn("Registration failed: Mobile already registered - {}", request.getMobile());
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

        logger.debug("Creating new user: {} with role: {}", user.getUsername(), user.getRole());
        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getUsername());

        UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
        return new AuthResponse(user.getAuthToken(), dto);
    }

    public AuthResponse login(LoginRequest request) {
        logger.info("Login attempt for username: {}", request.getUsername());
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                logger.debug("Password verified for user: {}", request.getUsername());
                user.setAuthToken(UUID.randomUUID().toString());
                userRepository.save(user);
                logger.info("Login successful for user: {}", request.getUsername());

                UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
                return new AuthResponse(user.getAuthToken(), dto);
            } else {
                logger.warn("Login failed: Invalid password for user - {}", request.getUsername());
            }
        } else {
            logger.warn("Login failed: User not found - {}", request.getUsername());
        }

        throw new RuntimeException("Invalid credentials");
    }

    public String sendOtp(OtpRequest request) {
        logger.info("OTP request for mobile: {}", request.getMobile());
        Optional<User> userOpt = userRepository.findByMobile(request.getMobile());
        if (userOpt.isEmpty()) {
            logger.warn("OTP failed: Mobile number not found - {}", request.getMobile());
            throw new RuntimeException("Mobile number not found. Please register first.");
        }

        User user = userOpt.get();
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));
        user.setOtp(otp);
        user.setOtpExpiresAt(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        logger.debug("OTP generated for user: {}, mobile: {}", user.getUsername(), request.getMobile());
        logger.info("OTP sent to mobile: {} (Demo mode - OTP: {})", request.getMobile(), otp);
        
        // In Demo/Free mode, we return the OTP in the response or just log it
        // In a real app, this would call an SMS API
        return "OTP sent successfully (Demo: " + otp + ")";
    }

    public AuthResponse verifyOtp(OtpVerifyRequest request) {
        logger.info("OTP verification attempt for mobile: {}", request.getMobile());
        Optional<User> userOpt = userRepository.findByMobile(request.getMobile());
        if (userOpt.isEmpty()) {
            logger.warn("OTP verification failed: Mobile not found - {}", request.getMobile());
            throw new RuntimeException("Mobile number not found");
        }

        User user = userOpt.get();
        if (user.getOtp() == null || !user.getOtp().equals(request.getOtp())) {
            logger.warn("OTP verification failed: Invalid OTP for mobile - {}", request.getMobile());
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiresAt() == null || user.getOtpExpiresAt().isBefore(LocalDateTime.now())) {
            logger.warn("OTP verification failed: OTP expired for mobile - {}", request.getMobile());
            throw new RuntimeException("OTP has expired");
        }

        // Clear OTP after successful use
        user.setOtp(null);
        user.setOtpExpiresAt(null);
        user.setAuthToken(UUID.randomUUID().toString());
        userRepository.save(user);
        logger.info("OTP verified successfully for user: {}, mobile: {}", user.getUsername(), request.getMobile());

        UserDTO dto = new UserDTO(user.getId(), user.getUsername(), user.getRole());
        return new AuthResponse(user.getAuthToken(), dto);
    }

    public Optional<User> getUserByToken(String token) {
        return userRepository.findByAuthToken(token);
    }

    public void logout(String token) {
        logger.debug("Logout request for token: {}", token.substring(0, Math.min(8, token.length())) + "...");
        Optional<User> userOpt = userRepository.findByAuthToken(token);
        userOpt.ifPresent(user -> {
            user.setAuthToken(null);
            userRepository.save(user);
            logger.info("User logged out successfully: {}", user.getUsername());
        });
        if (userOpt.isEmpty()) {
            logger.warn("Logout failed: Invalid or expired token");
        }
    }
}
