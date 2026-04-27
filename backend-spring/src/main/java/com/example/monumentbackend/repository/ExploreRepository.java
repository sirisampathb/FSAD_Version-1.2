package com.example.monumentbackend.repository;

import com.example.monumentbackend.entity.Explore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExploreRepository extends JpaRepository<Explore, String> {
    Optional<Explore> findByStateName(String stateName);
}
