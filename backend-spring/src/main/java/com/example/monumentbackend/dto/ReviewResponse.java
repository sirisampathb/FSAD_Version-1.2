package com.example.monumentbackend.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ReviewResponse {
    private String id;
    private String monumentId;
    private String userId;
    private String username;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
