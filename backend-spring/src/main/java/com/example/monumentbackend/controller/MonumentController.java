package com.example.monumentbackend.controller;

import com.example.monumentbackend.dto.CreateMonumentRequest;
import com.example.monumentbackend.dto.MonumentDTO;
import com.example.monumentbackend.service.MonumentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monuments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000", "http://localhost:5173"}, allowCredentials = "true")
public class MonumentController {

    private final MonumentService monumentService;

    // ✅ Constructor (IMPORTANT)
    public MonumentController(MonumentService monumentService) {
        this.monumentService = monumentService;
    }

    @PostMapping
    public MonumentDTO create(@RequestBody CreateMonumentRequest request) {
        return monumentService.createMonument(request);
    }

    @GetMapping
    public List<MonumentDTO> getAll() {
        return monumentService.getAllMonuments();
    }

    @GetMapping("/{id}")
    public MonumentDTO getById(@PathVariable String id) {
        return monumentService.getMonumentById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        monumentService.deleteMonument(id);
    }
}