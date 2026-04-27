package com.example.monumentbackend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SavedMonumentResponse {
    private String id;
    private String monumentId;
    private String monumentName;
    private String monumentImage;
    private String monumentLocation;
}
