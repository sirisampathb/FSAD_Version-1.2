package com.example.monumentbackend.controller;

import com.example.monumentbackend.dto.AuthResponse;
import com.example.monumentbackend.dto.LoginRequest;
import com.example.monumentbackend.dto.RegisterRequest;
import com.example.monumentbackend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5000", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    // ✅ Constructor (VERY IMPORTANT)
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authorization) {

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String token = authorization.substring(7);
        var userOpt = authService.getUserByToken(token);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(value = "Authorization", required = false) String authorization) {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            authService.logout(authorization.substring(7));
        }
        return ResponseEntity.noContent().build();
    }
}