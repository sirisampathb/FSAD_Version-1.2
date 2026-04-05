package com.example.monumentbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "monuments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Monument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(name = "built_year", nullable = false)
    private String builtYear;

    @Column(nullable = false)
    private String dynasty;

    @Column(nullable = false)
    private String style;

    @Column(nullable = false)
    private Boolean unesco = false;

    @Column
    private String image;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "monument_timeline", joinColumns = @JoinColumn(name = "monument_id"))
    private List<TimelineEvent> timeline;

    @ElementCollection
    @CollectionTable(name = "monument_fun_facts", joinColumns = @JoinColumn(name = "monument_id"))
    @Column(name = "fact", columnDefinition = "TEXT")
    private List<String> funFacts;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineEvent {
        private String year;
        private String event;
    }
}