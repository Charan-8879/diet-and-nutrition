package com.healthify.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthify.dto.ChallengeDTO;
import com.healthify.entity.ChallengeProgress;
import com.healthify.entity.User;
import com.healthify.repository.ChallengeProgressRepository;
import com.healthify.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ChallengeService {

    private final ChallengeProgressRepository challengeRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ChallengeService(ChallengeProgressRepository challengeRepository,
                            UserRepository userRepository,
                            ObjectMapper objectMapper) {
        this.challengeRepository = challengeRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public ChallengeDTO getChallenge(String email) {
        ChallengeDTO dto = new ChallengeDTO();
        dto.setEmail(email);

        if (email == null || email.trim().isEmpty()) {
            return dto;
        }

        Optional<ChallengeProgress> opt = challengeRepository.findByUserEmail(email.trim().toLowerCase());
        if (opt.isPresent()) {
            ChallengeProgress cp = opt.get();
            dto.setTotalDays(cp.getTotalDays() != null ? cp.getTotalDays() : 25);
            dto.setCurrentDay(cp.getCurrentDay() != null ? cp.getCurrentDay() : 1);
            dto.setStartDate(cp.getStartDate());
            if (cp.getHistoryJson() != null && !cp.getHistoryJson().isEmpty()) {
                try {
                    Map<String, Object> map = objectMapper.readValue(cp.getHistoryJson(), new TypeReference<Map<String, Object>>() {});
                    dto.setHistory(map);
                } catch (Exception ignored) {}
            }
        }
        return dto;
    }

    @Transactional
    public ChallengeDTO saveChallenge(ChallengeDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        String email = dto.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User("Athlete", email, "", "");
            return userRepository.save(newUser);
        });

        ChallengeProgress cp = challengeRepository.findByUser(user).orElseGet(() -> {
            ChallengeProgress p = new ChallengeProgress();
            p.setUser(user);
            p.setTotalDays(dto.getTotalDays() != null ? dto.getTotalDays() : 25);
            p.setCurrentDay(dto.getCurrentDay() != null ? dto.getCurrentDay() : 1);
            p.setStartDate(dto.getStartDate() != null ? dto.getStartDate() : LocalDateTime.now().toString());
            return p;
        });

        if (dto.getTotalDays() != null) cp.setTotalDays(dto.getTotalDays());
        if (dto.getCurrentDay() != null) cp.setCurrentDay(dto.getCurrentDay());
        if (dto.getStartDate() != null) cp.setStartDate(dto.getStartDate());

        if (dto.getHistory() != null) {
            try {
                cp.setHistoryJson(objectMapper.writeValueAsString(dto.getHistory()));
            } catch (Exception ignored) {}
        }

        ChallengeProgress saved = challengeRepository.save(cp);
        return getChallenge(email);
    }
}
