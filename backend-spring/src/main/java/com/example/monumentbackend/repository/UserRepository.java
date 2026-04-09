package com.example.monumentbackend.repository;

import com.example.monumentbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByAuthToken(String authToken);
    Optional<User> findByMobile(String mobile);
    boolean existsByUsername(String username);
    boolean existsByMobile(String mobile);
}
