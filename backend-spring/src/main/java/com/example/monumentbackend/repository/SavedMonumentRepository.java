package com.example.monumentbackend.repository;

import com.example.monumentbackend.entity.SavedMonument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedMonumentRepository extends JpaRepository<SavedMonument, String> {
    List<SavedMonument> findByUserId(String userId);
    Optional<SavedMonument> findByUserIdAndMonumentId(String userId, String monumentId);
    boolean existsByUserIdAndMonumentId(String userId, String monumentId);
}
