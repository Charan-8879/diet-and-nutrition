package com.healthify.controller;

import com.healthify.dto.ChallengeDTO;
import com.healthify.service.ChallengeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping
    public ResponseEntity<?> getChallenge(@RequestParam String email) {
        try {
            ChallengeDTO challenge = challengeService.getChallenge(email);
            return ResponseEntity.ok(Map.of("success", true, "challenge", challenge));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> saveChallenge(@RequestBody ChallengeDTO dto) {
        try {
            ChallengeDTO saved = challengeService.saveChallenge(dto);
            return ResponseEntity.ok(Map.of("success", true, "message", "Challenge saved", "challenge", saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
