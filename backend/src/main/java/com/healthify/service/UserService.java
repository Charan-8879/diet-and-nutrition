package com.healthify.service;

import com.healthify.dto.AuthRequest;
import com.healthify.entity.User;
import com.healthify.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static String hashPassword(String password) {
        if (password == null || password.isEmpty()) {
            return "";
        }
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    public static boolean verifyPassword(String inputPassword, String storedHashOrPassword) {
        if (inputPassword == null || storedHashOrPassword == null) return false;
        String hashedInput = hashPassword(inputPassword);
        return hashedInput.equalsIgnoreCase(storedHashOrPassword) || inputPassword.equals(storedHashOrPassword);
    }

    public static String validateAndNormalizeEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email address is required.");
        }
        String trimmed = email.trim().toLowerCase();
        if (trimmed.startsWith(".") || trimmed.endsWith(".") || trimmed.contains("..") || trimmed.contains("@.")) {
            throw new IllegalArgumentException("Please enter a valid email address. Email cannot start or end with a dot, or contain consecutive dots (entered '" + trimmed + "').");
        }
        String emailRegex = "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$";
        if (!trimmed.matches(emailRegex)) {
            throw new IllegalArgumentException("Please enter a valid email address with a domain (e.g. username@example.com). Incomplete formats such as '" + trimmed + "' are not allowed.");
        }
        return trimmed;
    }

    public static void validateEmail(String email) {
        validateAndNormalizeEmail(email);
    }

    public static String normalizeAndValidatePhone(String phone, boolean required) {
        if (phone == null || phone.trim().isEmpty() || "N/A".equalsIgnoreCase(phone.trim())) {
            if (required) {
                throw new IllegalArgumentException("Phone number is required.");
            }
            return "";
        }
        String clean = phone.trim().replaceAll("[\\s\\-\\(\\)\\.]", "");
        if (clean.startsWith("+91")) {
            clean = clean.substring(3);
        } else if (clean.startsWith("+")) {
            clean = clean.substring(1);
        }
        if (clean.length() == 12 && clean.startsWith("91") && clean.substring(2, 3).matches("[6-9]")) {
            clean = clean.substring(2);
        } else if (clean.length() == 11 && clean.startsWith("0") && clean.substring(1, 2).matches("[6-9]")) {
            clean = clean.substring(1);
        }
        if (!clean.matches("^\\d+$")) {
            throw new IllegalArgumentException("Phone number must contain only numeric digits (no alphabets or special characters allowed).");
        }
        if (clean.length() != 10) {
            throw new IllegalArgumentException("Phone number must contain exactly 10 digits for Indian mobile numbers (entered " + clean.length() + " digits).");
        }
        if (!clean.matches("^[6-9]\\d{9}$")) {
            throw new IllegalArgumentException("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
        }
        return clean;
    }

    public static void validatePhoneNumber(String phone, boolean required) {
        normalizeAndValidatePhone(phone, required);
    }

    @Transactional(readOnly = true)
    public boolean isPhoneRegistered(String phone) {
        String cleanPhone = normalizeAndValidatePhone(phone, true);
        return userRepository.existsByPhone(cleanPhone);
    }

    @Transactional(readOnly = true)
    public boolean isEmailRegistered(String email) {
        String cleanEmail = validateAndNormalizeEmail(email);
        return userRepository.existsByEmail(cleanEmail);
    }

    @Transactional
    public User registerUser(AuthRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Registration request cannot be empty.");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Full name is required.");
        }
        String email = validateAndNormalizeEmail(request.getEmail());
        String phone = normalizeAndValidatePhone(request.getPhone(), true);
        if (request.getPassword() == null || request.getPassword().length() < 4) {
            throw new IllegalArgumentException("Password must be at least 4 characters long.");
        }

        String hashedPassword = hashPassword(request.getPassword());

        Optional<User> existingEmailUser = userRepository.findByEmail(email);
        if (existingEmailUser.isPresent()) {
            User existing = existingEmailUser.get();
            // If the user row exists but has an empty or uninitialized password (incomplete registration)
            if (existing.getPassword() == null || existing.getPassword().trim().isEmpty()) {
                existing.setName(request.getName().trim());
                existing.setPhone(phone);
                existing.setPassword(hashedPassword);
                return userRepository.save(existing);
            }
            throw new IllegalArgumentException("Email already registered: " + email + ". Please click 'Login' to sign in with your password.");
        }

        Optional<User> existingPhoneUser = userRepository.findByPhone(phone);
        if (existingPhoneUser.isPresent()) {
            User existing = existingPhoneUser.get();
            if (existing.getPassword() != null && !existing.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Phone number already registered: " + phone + ". Please use your registered email to log in or use a different phone number.");
            }
        }

        User user = new User(
                request.getName().trim(),
                email,
                phone,
                hashedPassword
        );
        return userRepository.save(user);
    }

    @Transactional
    public User loginUser(AuthRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Login request cannot be empty.");
        }
        String email = validateAndNormalizeEmail(request.getEmail());
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email + ". Please register first."));

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            // First time login for user without password - set password securely
            user.setPassword(hashPassword(request.getPassword()));
            if (request.getName() != null && !request.getName().trim().isEmpty() && (user.getName() == null || user.getName().isEmpty())) {
                user.setName(request.getName().trim());
            }
            return userRepository.save(user);
        }

        if (!verifyPassword(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password. Please check your credentials.");
        }

        // Auto-upgrade legacy plain-text password to SHA-256 hash
        if (!user.getPassword().equalsIgnoreCase(hashPassword(request.getPassword()))) {
            user.setPassword(hashPassword(request.getPassword()));
            userRepository.save(user);
        }

        return user;
    }

    @Transactional
    public User getOrCreateDemoUser() {
        String demoEmail = "champion@healthify.app";
        return userRepository.findByEmail(demoEmail).orElseGet(() -> {
            User demo = new User("Fitness Champion", demoEmail, "9876543210", hashPassword("DemoPassword123"));
            return userRepository.save(demo);
        });
    }

    public Optional<User> findByEmail(String email) {
        if (email == null) return Optional.empty();
        return userRepository.findByEmail(email.trim().toLowerCase());
    }
}
