package com.example.monumentbackend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonumentDTO {

    private String id;
    private String name;
    private String location;
    private String builtYear;
    private String dynasty;
    private String style;
    private Boolean unesco;
    private String image;
    private String description;
    private List<TimelineEventDTO> timeline;
    private List<String> funFacts;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineEventDTO {
        private String year;
        private String event;
    }
}