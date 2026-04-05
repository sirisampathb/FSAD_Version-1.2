package com.example.monumentbackend.dto;

import com.example.monumentbackend.entity.Monument;
import java.util.List;

public class CreateMonumentRequest {

    private String name;
    private String location;
    private String builtYear;
    private String dynasty;
    private String style;
    private Boolean unesco;
    private String image;
    private String description;
    private List<Monument.TimelineEvent> timeline;
    private List<String> funFacts;

    // ✅ GETTERS (VERY IMPORTANT)

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public String getBuiltYear() {
        return builtYear;
    }

    public String getDynasty() {
        return dynasty;
    }

    public String getStyle() {
        return style;
    }

    public Boolean getUnesco() {
        return unesco;
    }

    public String getImage() {
        return image;
    }

    public String getDescription() {
        return description;
    }

    public List<Monument.TimelineEvent> getTimeline() {
        return timeline;
    }

    public List<String> getFunFacts() {
        return funFacts;
    }
}