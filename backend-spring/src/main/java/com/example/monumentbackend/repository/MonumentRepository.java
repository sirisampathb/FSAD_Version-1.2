package com.example.monumentbackend.repository;

import com.example.monumentbackend.entity.Monument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonumentRepository extends JpaRepository<Monument, String> {
}