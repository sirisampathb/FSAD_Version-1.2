package com.example.monumentbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<TimelineEvent> timeline;

    @Column(name = "fun_facts", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> funFacts;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineEvent {
        private String year;
        private String event;
    }
}