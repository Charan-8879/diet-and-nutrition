package com.healthify.controller;

import com.healthify.dto.DailyDataDTO;
import com.healthify.dto.FoodItemDTO;
import com.healthify.service.TrackingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DailyDataController {

    private final TrackingService trackingService;

    public DailyDataController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @GetMapping("/daily-data")
    public ResponseEntity<?> getDailyData(@RequestParam String email) {
        try {
            DailyDataDTO data = trackingService.getDailyData(email);
            return ResponseEntity.ok(Map.of("success", true, "data", data));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/daily-data")
    public ResponseEntity<?> saveDailyData(@RequestBody DailyDataDTO dto) {
        try {
            DailyDataDTO saved = trackingService.saveDailyData(dto);
            return ResponseEntity.ok(Map.of("success", true, "message", "Daily data saved", "data", saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/food-logs")
    public ResponseEntity<?> addFood(@RequestParam String email, @RequestBody FoodItemDTO item) {
        try {
            FoodItemDTO saved = trackingService.addFood(email, item);
            return ResponseEntity.ok(Map.of("success", true, "item", saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @DeleteMapping("/food-logs/{id}")
    public ResponseEntity<?> removeFood(@PathVariable Long id) {
        try {
            trackingService.removeFood(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Food item removed"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @DeleteMapping("/food-logs/clear")
    public ResponseEntity<?> clearFood(@RequestParam String email) {
        try {
            trackingService.clearFood(email);
            return ResponseEntity.ok(Map.of("success", true, "message", "Food logs cleared"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
