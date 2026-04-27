package com.example.monumentbackend.controller;

import com.example.monumentbackend.entity.Explore;
import com.example.monumentbackend.repository.ExploreRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/explore")
public class ExploreController {

    private final ExploreRepository exploreRepository;

    public ExploreController(ExploreRepository exploreRepository) {
        this.exploreRepository = exploreRepository;
    }

    @GetMapping
    public List<Explore> getAll() {
        return exploreRepository.findAll();
    }

    @PostMapping
    public Explore create(@RequestBody Explore explore) {
        return exploreRepository.save(explore);
    }

    @GetMapping("/{stateName}")
    public Explore getByStateName(@PathVariable String stateName) {
        return exploreRepository.findByStateName(stateName).orElse(null);
    }
}
