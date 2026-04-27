package com.example.monumentbackend.service;

import com.example.monumentbackend.dto.ReviewRequest;
import com.example.monumentbackend.dto.ReviewResponse;
import com.example.monumentbackend.entity.Monument;
import com.example.monumentbackend.entity.Review;
import com.example.monumentbackend.entity.User;
import com.example.monumentbackend.repository.MonumentRepository;
import com.example.monumentbackend.repository.ReviewRepository;
import com.example.monumentbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final MonumentRepository monumentRepository;

    @Transactional
    public ReviewResponse addReview(String userId, ReviewRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Monument monument = monumentRepository.findById(request.getMonumentId())
                .orElseThrow(() -> new RuntimeException("Monument not found"));

        Review review = new Review();
        review.setUser(user);
        review.setMonument(monument);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        
        Review saved = reviewRepository.save(review);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsForMonument(String monumentId) {
        return reviewRepository.findByMonumentIdOrderByCreatedAtDesc(monumentId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private ReviewResponse mapToResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .monumentId(review.getMonument().getId())
                .userId(review.getUser().getId())
                .username(review.getUser().getUsername())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
