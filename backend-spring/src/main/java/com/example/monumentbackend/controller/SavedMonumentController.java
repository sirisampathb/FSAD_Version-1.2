package com.example.monumentbackend.controller;

import com.example.monumentbackend.dto.SavedMonumentResponse;
import com.example.monumentbackend.service.SavedMonumentService;
import com.example.monumentbackend.repository.UserRepository;
import com.example.monumentbackend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-monuments")
@RequiredArgsConstructor
public class SavedMonumentController {

    private final SavedMonumentService savedMonumentService;
    private final UserRepository userRepository;

    @PostMapping("/{monumentId}")
    public ResponseEntity<Void> toggleSave(
            @RequestHeader("Authorization") String token,
            @PathVariable String monumentId) {
        String authToken = token.replace("Bearer ", "");
        User user = userRepository.findByAuthToken(authToken)
            .orElseThrow(() -> new RuntimeException("Unauthorized"));
            
        savedMonumentService.toggleSaveMonument(user.getId(), monumentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<SavedMonumentResponse>> getSavedMonuments(
            @RequestHeader("Authorization") String token) {
        String authToken = token.replace("Bearer ", "");
        User user = userRepository.findByAuthToken(authToken)
            .orElseThrow(() -> new RuntimeException("Unauthorized"));
            
        return ResponseEntity.ok(savedMonumentService.getSavedMonuments(user.getId()));
    }

    @GetMapping("/{monumentId}/check")
    public ResponseEntity<Boolean> isSaved(
            @RequestHeader("Authorization") String token,
            @PathVariable String monumentId) {
        String authToken = token.replace("Bearer ", "");
        User user = userRepository.findByAuthToken(authToken)
            .orElseThrow(() -> new RuntimeException("Unauthorized"));
            
        return ResponseEntity.ok(savedMonumentService.isSaved(user.getId(), monumentId));
    }
}
