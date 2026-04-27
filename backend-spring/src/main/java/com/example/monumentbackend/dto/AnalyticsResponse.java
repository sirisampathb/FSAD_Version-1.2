package com.example.monumentbackend.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class AnalyticsResponse {
    private long totalUsers;
    private long totalMonuments;
    private long totalReviews;
    private Map<String, Long> monumentsByDynasty;
    private Map<String, Long> monumentsByStyle;
}
