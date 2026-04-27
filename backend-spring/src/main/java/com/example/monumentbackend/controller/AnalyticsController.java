package com.example.monumentbackend.controller;

import com.example.monumentbackend.dto.AnalyticsResponse;
import com.example.monumentbackend.repository.MonumentRepository;
import com.example.monumentbackend.repository.ReviewRepository;
import com.example.monumentbackend.repository.UserRepository;
import com.example.monumentbackend.entity.Monument;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final UserRepository userRepository;
    private final MonumentRepository monumentRepository;
    private final ReviewRepository reviewRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<AnalyticsResponse> getDashboardAnalytics() {
        long totalUsers = userRepository.count();
        long totalMonuments = monumentRepository.count();
        long totalReviews = reviewRepository.count();

        List<Monument> monuments = monumentRepository.findAll();
        
        Map<String, Long> byDynasty = monuments.stream()
                .collect(Collectors.groupingBy(Monument::getDynasty, Collectors.counting()));
                
        Map<String, Long> byStyle = monuments.stream()
                .collect(Collectors.groupingBy(Monument::getStyle, Collectors.counting()));

        return ResponseEntity.ok(AnalyticsResponse.builder()
                .totalUsers(totalUsers)
                .totalMonuments(totalMonuments)
                .totalReviews(totalReviews)
                .monumentsByDynasty(byDynasty)
                .monumentsByStyle(byStyle)
                .build());
    }
}
