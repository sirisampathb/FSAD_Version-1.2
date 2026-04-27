package com.example.monumentbackend.controller;

import com.example.monumentbackend.dto.ReviewRequest;
import com.example.monumentbackend.dto.ReviewResponse;
import com.example.monumentbackend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final com.example.monumentbackend.repository.UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(
            @RequestHeader("Authorization") String token,
            @RequestBody ReviewRequest request) {
        String authToken = token.replace("Bearer ", "");
        com.example.monumentbackend.entity.User user = userRepository.findByAuthToken(authToken)
            .orElseThrow(() -> new RuntimeException("Unauthorized"));
        return ResponseEntity.ok(reviewService.addReview(user.getId(), request));
    }

    @GetMapping("/monument/{monumentId}")
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable String monumentId) {
        return ResponseEntity.ok(reviewService.getReviewsForMonument(monumentId));
    }
}
