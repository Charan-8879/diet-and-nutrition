package com.healthify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping({"/api/health", "/health"})
    public ResponseEntity<?> checkHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "backend", "Spring Boot",
                "database", "healthify_db",
                "version", "2.5.0"
        ));
    }
}

