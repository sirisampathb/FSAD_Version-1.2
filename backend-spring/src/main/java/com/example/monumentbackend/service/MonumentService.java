package com.example.monumentbackend.service;

import com.example.monumentbackend.dto.CreateMonumentRequest;
import com.example.monumentbackend.dto.MonumentDTO;
import com.example.monumentbackend.entity.Monument;
import com.example.monumentbackend.repository.MonumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MonumentService {

    private final MonumentRepository monumentRepository;

    // ✅ Constructor
    public MonumentService(MonumentRepository monumentRepository) {
        this.monumentRepository = monumentRepository;
    }

    public MonumentDTO createMonument(CreateMonumentRequest request) {

        Monument m = new Monument();
        m.setName(request.getName());
        m.setLocation(request.getLocation());
        m.setBuiltYear(request.getBuiltYear());
        m.setDynasty(request.getDynasty());
        m.setStyle(request.getStyle());
        m.setUnesco(request.getUnesco() != null ? request.getUnesco() : false);
        m.setImage(request.getImage());
        m.setDescription(request.getDescription());
        m.setTimeline(request.getTimeline());
        m.setFunFacts(request.getFunFacts());

        Monument saved = monumentRepository.save(m);

        return mapToDTO(saved);
    }

    public List<MonumentDTO> getAllMonuments() {
        return monumentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public MonumentDTO getMonumentById(String id) {
        Monument m = monumentRepository.findById(id).orElseThrow();
        return mapToDTO(m);
    }

    public void deleteMonument(String id) {
        monumentRepository.deleteById(id);
    }

    private MonumentDTO mapToDTO(Monument m) {
        List<MonumentDTO.TimelineEventDTO> timelineEvents = null;
        if (m.getTimeline() != null) {
            timelineEvents = m.getTimeline().stream()
                    .map(t -> new MonumentDTO.TimelineEventDTO(t.getYear(), t.getEvent()))
                    .collect(Collectors.toList());
        }

        return new MonumentDTO(
                m.getId(),
                m.getName(),
                m.getLocation(),
                m.getBuiltYear(),
                m.getDynasty(),
                m.getStyle(),
                m.getUnesco(),
                m.getImage(),
                m.getDescription(),
                timelineEvents,
                m.getFunFacts()
        );
    }
}