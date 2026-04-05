package com.example.monumentbackend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimelineEventDTO {

    @NotBlank(message = "Year is required")
    private String year;

    @NotBlank(message = "Event description is required")
    private String event;

    private String significance;
}
