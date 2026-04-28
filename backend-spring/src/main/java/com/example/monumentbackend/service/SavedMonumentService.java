package com.example.monumentbackend.service;

import com.example.monumentbackend.dto.SavedMonumentResponse;
import com.example.monumentbackend.entity.Monument;
import com.example.monumentbackend.entity.SavedMonument;
import com.example.monumentbackend.entity.User;
import com.example.monumentbackend.repository.MonumentRepository;
import com.example.monumentbackend.repository.SavedMonumentRepository;
import com.example.monumentbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavedMonumentService {

    private final SavedMonumentRepository savedMonumentRepository;
    private final UserRepository userRepository;
    private final MonumentRepository monumentRepository;

    @Transactional
    public void toggleSaveMonument(String userId, String monumentId) {
        if (savedMonumentRepository.existsByUserIdAndMonumentId(userId, monumentId)) {
            savedMonumentRepository.findByUserIdAndMonumentId(userId, monumentId)
                    .ifPresent(savedMonumentRepository::delete);
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Monument monument = monumentRepository.findById(monumentId)
                    .or(() -> monumentRepository.findByNameIgnoreCase(monumentId.replace("-", " ")))
                    .orElseThrow(() -> new RuntimeException("Monument not found: " + monumentId));

            SavedMonument savedMonument = new SavedMonument();
            savedMonument.setUser(user);
            savedMonument.setMonument(monument);
            savedMonumentRepository.save(savedMonument);
        }
    }

    @Transactional(readOnly = true)
    public List<SavedMonumentResponse> getSavedMonuments(String userId) {
        return savedMonumentRepository.findByUserId(userId).stream()
                .map(sm -> SavedMonumentResponse.builder()
                        .id(sm.getId())
                        .monumentId(sm.getMonument().getId())
                        .monumentName(sm.getMonument().getName())
                        .monumentImage(sm.getMonument().getImage())
                        .monumentLocation(sm.getMonument().getLocation())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean isSaved(String userId, String monumentId) {
        return savedMonumentRepository.existsByUserIdAndMonumentId(userId, monumentId);
    }
}
