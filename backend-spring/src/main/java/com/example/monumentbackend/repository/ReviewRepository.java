package com.example.monumentbackend.repository;

import com.example.monumentbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByMonumentIdOrderByCreatedAtDesc(String monumentId);
    List<Review> findByUserId(String userId);
}
