package com.healthify.controller;

import com.healthify.dto.*;
import com.healthify.service.DietPlanningService;
import com.healthify.service.DietTrackingService;
import com.healthify.service.GroqCoachService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequestMapping("/api/diet")
public class DietPlanController {

    private final DietPlanningService dietPlanningService;
    private final DietTrackingService dietTrackingService;
    private final GroqCoachService groqCoachService;

    public DietPlanController(DietPlanningService dietPlanningService, DietTrackingService dietTrackingService, GroqCoachService groqCoachService) {
        this.dietPlanningService = dietPlanningService;
        this.dietTrackingService = dietTrackingService;
        this.groqCoachService = groqCoachService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generatePlan(@RequestBody Map<String, Object> req) {
        try {
            String email = (String) req.get("email");
            String planType = (String) req.getOrDefault("planType", "7_DAY");
            String goal = (String) req.get("goal");
            Double targetCalOverride = req.get("targetCalories") != null ? ((Number) req.get("targetCalories")).doubleValue() : null;
            String doctorNotes = (String) req.get("doctorNotes");

            @SuppressWarnings("unchecked")
            List<String> availableFoods = req.get("confirmedFoods") != null
                    ? (List<String>) req.get("confirmedFoods")
                    : (List<String>) req.get("availableFoods");

            @SuppressWarnings("unchecked")
            Map<String, Object> fallbackProfile = req.get("profileData") != null
                    ? (Map<String, Object>) req.get("profileData")
                    : (Map<String, Object>) req.get("userData");

            DietPlanDTO plan = dietPlanningService.generateFiveMealPlan(
                    email, planType, availableFoods, goal, targetCalOverride, doctorNotes, fallbackProfile);

            return ResponseEntity.ok(Map.of("success", true, "dietPlan", plan));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/confirmed-foods")
    public ResponseEntity<?> getConfirmedFoods(@RequestParam(required = false) String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
        }
        List<String> foods = dietPlanningService.getConfirmedFoodsForUser(email);
        return ResponseEntity.ok(Map.of("success", true, "confirmedFoods", foods, "count", foods.size()));
    }

    @PostMapping("/confirmed-foods")
    public ResponseEntity<?> saveConfirmedFoods(@RequestBody Map<String, Object> req) {
        try {
            String email = (String) req.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
            }
            @SuppressWarnings("unchecked")
            List<String> confirmedFoods = req.get("confirmedFoods") != null
                    ? (List<String>) req.get("confirmedFoods")
                    : (List<String>) req.get("availableFoods");

            List<String> saved = dietPlanningService.saveConfirmedFoodsForUser(email, confirmedFoods);
            return ResponseEntity.ok(Map.of("success", true, "confirmedFoods", saved, "count", saved.size(), "message", "Confirmed foods saved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editPlan(@RequestBody Map<String, Object> req) {
        try {
            String email = (String) req.get("email");
            Long planId = req.get("planId") != null ? ((Number) req.get("planId")).longValue() : null;
            String editRequest = (String) req.get("editRequest");

            // Option to pass current active plan from client
            DietPlanDTO currentPlan = null;
            DietPlanDTO updated = dietPlanningService.naturalLanguageEditPlan(email, planId, editRequest, currentPlan);

            return ResponseEntity.ok(Map.of("success", true, "updatedPlan", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActivePlan(@RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
        }
        DietPlanDTO plan = dietPlanningService.getActivePlan(email);
        return ResponseEntity.ok(Map.of("success", true, "dietPlan", plan != null ? plan : Collections.emptyMap()));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getPlanHistory(@RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
        }
        List<DietPlanDTO> list = dietPlanningService.getPlanHistory(email);
        return ResponseEntity.ok(Map.of("success", true, "plans", list));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable("id") Long id, @RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email is required"));
        }
        boolean deleted = dietPlanningService.deleteDietPlan(email, id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Diet plan deleted successfully"));
        } else {
            return ResponseEntity.status(404).body(Map.of("success", false, "error", "Diet plan not found or unauthorized"));
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deletePlanPost(@RequestBody Map<String, Object> req) {
        String email = (String) req.get("email");
        Long planId = req.get("planId") != null ? ((Number) req.get("planId")).longValue() :
                      (req.get("id") != null ? ((Number) req.get("id")).longValue() : null);
        if (email == null || planId == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Email and planId are required"));
        }
        boolean deleted = dietPlanningService.deleteDietPlan(email, planId);
        if (deleted) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Diet plan deleted successfully"));
        } else {
            return ResponseEntity.status(404).body(Map.of("success", false, "error", "Diet plan not found or unauthorized"));
        }
    }

    @PostMapping("/consume-meal")
    public ResponseEntity<?> consumeMeal(@RequestBody MealConsumptionDTO dto) {
        try {
            MealConsumptionDTO result = dietTrackingService.recordConsumption(dto);
            return ResponseEntity.ok(Map.of("success", true, "consumption", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/consumption")
    public ResponseEntity<?> getConsumption(@RequestParam String email, @RequestParam(required = false) String date) {
        try {
            Map<String, Object> res = dietTrackingService.getPlannedVsActualComparison(email, date);
            return ResponseEntity.ok(Map.of("success", true, "data", res));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/upload-document")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file,
                                            @RequestParam(value = "userGoal", required = false) String userGoal) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Uploaded file is empty"));
            }

            String filename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "document.txt";
            String contentType = file.getContentType() != null ? file.getContentType() : "application/octet-stream";
            byte[] bytes = file.getBytes();

            DocumentExtractionDTO extraction = groqCoachService.extractFoodAndNutritionFromImage(
                    bytes, contentType, filename, userGoal, null
            );

            return ResponseEntity.ok(Map.of("success", true, "extraction", extraction));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", "File processing failed: " + e.getMessage()));
        }
    }
}

