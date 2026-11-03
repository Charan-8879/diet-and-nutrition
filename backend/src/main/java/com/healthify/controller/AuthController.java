package com.healthify.controller;

import com.healthify.dto.AuthRequest;
import com.healthify.dto.UserDTO;
import com.healthify.entity.User;
import com.healthify.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "User registered successfully",
                    "user", new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPhone())
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("success", false, "error", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            User user = userService.loginUser(request);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "User logged in successfully",
                    "user", new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPhone())
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("success", false, "error", "Login failed: " + e.getMessage()));
        }
    }

    @GetMapping("/check-phone")
    public ResponseEntity<?> checkPhoneAvailabilityGet(@RequestParam(value = "phone", required = false) String phone) {
        return checkPhoneInternal(phone);
    }

    @PostMapping("/check-phone")
    public ResponseEntity<?> checkPhoneAvailabilityPost(@RequestBody(required = false) Map<String, String> body) {
        String phone = body != null ? body.get("phone") : null;
        return checkPhoneInternal(phone);
    }

    private ResponseEntity<?> checkPhoneInternal(String phone) {
        try {
            if (phone == null || phone.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "available", false,
                        "error", "Phone number is required."
                ));
            }
            String cleanPhone = UserService.normalizeAndValidatePhone(phone, true);
            boolean exists = userService.isPhoneRegistered(cleanPhone);
            if (exists) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "available", false,
                        "phone", cleanPhone,
                        "message", "Phone number already registered. Please use another number."
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "available", true,
                        "phone", cleanPhone,
                        "message", "Phone number available."
                ));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "available", false,
                    "error", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "success", false,
                    "available", false,
                    "error", "Failed to check phone availability: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/demo")
    public ResponseEntity<?> demoLogin() {
        try {
            User user = userService.getOrCreateDemoUser();
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Demo user loaded successfully",
                    "user", new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPhone())
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
