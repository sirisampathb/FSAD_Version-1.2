package com.example.monumentbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "explore")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Explore {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String stateName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String image; // Hero image for the state

    @Column(name = "best_time_to_visit")
    private String bestTimeToVisit;

    @Column
    private String color;

    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> highlights;

    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> foods;
}
