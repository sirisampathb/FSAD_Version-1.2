package com.example.monumentbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "saved_monuments", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "monument_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedMonument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "monument_id", nullable = false)
    private Monument monument;
}
