package com.healthify.controller;

import com.healthify.dto.ProfileDTO;
import com.healthify.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestParam(required = false) String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
        }
        ProfileDTO profile = profileService.getProfile(email);
        return ResponseEntity.ok(Map.of("success", true, "profile", profile));
    }

    @PostMapping
    public ResponseEntity<?> saveProfile(@RequestBody ProfileDTO profileDTO) {
        try {
            ProfileDTO saved = profileService.saveOrUpdateProfile(profileDTO);
            return ResponseEntity.ok(Map.of("success", true, "message", "Profile saved successfully", "profile", saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
