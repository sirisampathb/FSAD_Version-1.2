package com.example.monumentbackend.controller;

import com.example.monumentbackend.entity.State;
import com.example.monumentbackend.repository.StateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
public class StateController {

    private final StateRepository stateRepository;

    public StateController(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @GetMapping
    public List<State> getAll() {
        return stateRepository.findAll();
    }

    @PostMapping
    public State create(@RequestBody State state) {
        return stateRepository.save(state);
    }
}
