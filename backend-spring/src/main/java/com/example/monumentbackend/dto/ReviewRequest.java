package com.example.monumentbackend.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private String monumentId;
    private Integer rating;
    private String comment;
}
