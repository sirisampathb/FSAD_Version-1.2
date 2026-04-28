package com.example.monumentbackend.repository;

import com.example.monumentbackend.entity.Monument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MonumentRepository extends JpaRepository<Monument, String> {
    Optional<Monument> findByNameIgnoreCase(String name);
}