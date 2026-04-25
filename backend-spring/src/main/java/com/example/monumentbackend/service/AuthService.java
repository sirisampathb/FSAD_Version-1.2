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
    private final EmailService emailService;

    // ✅ Constructor (IMPORTANT)
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public AuthResponse register(RegisterRequest request) {
        logger.info("Registration attempt for username: {}", request.getUsername());
        
        if (userRepository.existsByUsername(request.getUsername())) {
            logger.warn("Registration failed: Username already exists - {}", request.getUsername());
            throw new RuntimeException("Username already exists");
        }
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (userRepository.existsByEmail(request.getEmail())) {
                logger.warn("Registration failed: Email already registered - {}", request.getEmail());
                throw new RuntimeException("Email address already registered");
            }
        }

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEmail(request.getEmail());
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
        logger.info("OTP request for email: {}", request.getEmail());
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            logger.warn("OTP failed: Email not found - {}", request.getEmail());
            throw new RuntimeException("Email address not found. Please register first.");
        }

        User user = userOpt.get();
        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));
        user.setOtp(otp);
        user.setOtpExpiresAt(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        logger.debug("OTP generated for user: {}, email: {}", user.getUsername(), request.getEmail());
        
        // Send email
        emailService.sendOtpEmail(request.getEmail(), otp);
        logger.info("OTP sent to email: {}", request.getEmail());
        
        return "OTP sent successfully to email";
    }

    public AuthResponse verifyOtp(OtpVerifyRequest request) {
        logger.info("OTP verification attempt for email: {}", request.getEmail());
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            logger.warn("OTP verification failed: Email not found - {}", request.getEmail());
            throw new RuntimeException("Email address not found");
        }

        User user = userOpt.get();
        if (user.getOtp() == null || !user.getOtp().equals(request.getOtp())) {
            logger.warn("OTP verification failed: Invalid OTP for email - {}", request.getEmail());
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiresAt() == null || user.getOtpExpiresAt().isBefore(LocalDateTime.now())) {
            logger.warn("OTP verification failed: OTP expired for email - {}", request.getEmail());
            throw new RuntimeException("OTP has expired");
        }

        // Clear OTP after successful use
        user.setOtp(null);
        user.setOtpExpiresAt(null);
        user.setAuthToken(UUID.randomUUID().toString());
        userRepository.save(user);
        logger.info("OTP verified successfully for user: {}, email: {}", user.getUsername(), request.getEmail());

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
