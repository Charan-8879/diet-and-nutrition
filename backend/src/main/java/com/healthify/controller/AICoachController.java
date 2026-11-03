package com.healthify.controller;

import com.healthify.dto.AICoachRequest;
import com.healthify.dto.AICoachResponse;
import com.healthify.dto.DietPlanDTO;
import com.healthify.dto.DocumentExtractionDTO;
import com.healthify.entity.AIChatMessage;
import com.healthify.entity.User;
import com.healthify.repository.AIChatMessageRepository;
import com.healthify.repository.UserRepository;
import com.healthify.service.DietPlanningService;
import com.healthify.service.GroqCoachService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AICoachController {

    private final GroqCoachService groqCoachService;
    private final DietPlanningService dietPlanningService;
    private final AIChatMessageRepository aiChatMessageRepository;
    private final UserRepository userRepository;

    public AICoachController(GroqCoachService groqCoachService,
                              DietPlanningService dietPlanningService,
                              AIChatMessageRepository aiChatMessageRepository,
                              UserRepository userRepository) {
        this.groqCoachService = groqCoachService;
        this.dietPlanningService = dietPlanningService;
        this.aiChatMessageRepository = aiChatMessageRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<?> checkHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "backend", "Spring Boot (Healthify)",
                "database", "MySQL (healthify_db)",
                "hasGroqKey", groqCoachService.hasGroqKey(),
                "hasGrokKey", false,
                "hasGeminiKey", false,
                "model", groqCoachService.getGroqModel(),
                "visionModel", groqCoachService.getGroqVisionModel(),
                "provider", "GroqCloud"
        ));
    }

    @PostMapping({"/ai/coach", "/ai/chat"})
    public ResponseEntity<?> getCoachAnswer(@RequestBody AICoachRequest request) {
        try {
            String question = request.getMessage();
            String fileData = request.getFileData();
            String mimeType = request.getMimeType();
            String filename = request.getFilename();

            if ((question == null || question.trim().isEmpty()) && (fileData == null || fileData.trim().isEmpty())) {
                return ResponseEntity.badRequest().body(AICoachResponse.error("Message or attachment is required"));
            }

            Map<String, Object> userData = request.getFullUserData() != null ? request.getFullUserData() : Collections.emptyMap();

            GroqCoachService.CoachResult result = groqCoachService.answerQuestion(
                    question,
                    userData,
                    request.getHistory() != null ? request.getHistory() : Collections.emptyList(),
                    request.getActiveDietPlan() != null ? request.getActiveDietPlan() : Collections.emptyMap(),
                    request.getConfirmedAvailableFoods() != null ? request.getConfirmedAvailableFoods() : Collections.emptyList(),
                    fileData,
                    mimeType,
                    filename
            );

            AICoachResponse response = new AICoachResponse(true, result.source(), result.answer());
            response.setIntentType(result.intentType());
            response.setGroundingMetadata(result.groundingMetadata());
            response.setSearchSources(result.searchSources());
            response.setRecipe(result.recipe());
            if (result.recipe() != null && (response.getIntentType() == null || "GENERAL".equals(response.getIntentType()))) {
                response.setIntentType("RECIPE");
            }

            // If user explicitly asked to generate or edit a diet plan, automatically provide the structured plan!
            String q = (question != null ? question : "").toLowerCase().trim();
            if ("DIET_PLAN".equals(result.intentType()) || q.contains("generate plan") || q.contains("create diet plan") || q.contains("7-day diet") || q.contains("25-day diet")) {
                String planType = q.contains("25-day") ? "25_DAY" : (q.contains("daily") ? "DAILY" : "7_DAY");
                String goal = q.contains("gain") || q.contains("muscle") ? "Muscle Gain" : (q.contains("loss") || q.contains("cut") ? "Weight Loss" : "Maintain Weight");

                DietPlanDTO generated = dietPlanningService.generateFiveMealPlan(
                        request.getEmail(),
                        planType,
                        request.getConfirmedAvailableFoods(),
                        goal,
                        null,
                        null,
                        userData
                );
                response.setDietPlan(generated);
                response.setIntentType("DIET_PLAN");
            } else if ("DIET_EDIT".equals(result.intentType()) && request.getActiveDietPlan() != null) {
                try {
                    DietPlanDTO updated = dietPlanningService.naturalLanguageEditPlan(
                            request.getEmail(),
                            request.getActiveDietPlanId(),
                            question,
                            null
                    );
                    response.setDietPlan(updated);
                    response.setIntentType("DIET_EDIT");
                } catch (Exception ignored) {}
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(AICoachResponse.error("AI Coach error: " + e.getMessage()));
        }
    }

    @PostMapping(value = {"/ai/upload-document", "/diet/upload-document"})
    public ResponseEntity<?> uploadDocumentJson(@RequestBody(required = false) Map<String, Object> body) {
        try {
            String filename = body != null && body.containsKey("filename") ? String.valueOf(body.get("filename")) : "food_upload.jpg";
            String userGoal = body != null && body.containsKey("userGoal") ? String.valueOf(body.get("userGoal")) : "Weight Loss";
            String prompt = body != null && body.containsKey("prompt") ? String.valueOf(body.get("prompt")) : "";
            String mimeType = body != null && body.containsKey("mimeType") ? String.valueOf(body.get("mimeType")) : "image/jpeg";
            String fileData = body != null && body.containsKey("fileData") ? String.valueOf(body.get("fileData")) : null;
            String fileText = body != null && body.containsKey("fileText") ? String.valueOf(body.get("fileText")) : null;
            String ocrText = body != null && body.containsKey("ocrText") ? String.valueOf(body.get("ocrText")) : null;

            byte[] imageBytes = null;
            if (fileData != null && !fileData.trim().isEmpty()) {
                String cleanBase64 = fileData.contains(",") ? fileData.substring(fileData.indexOf(",") + 1) : fileData;
                imageBytes = Base64.getDecoder().decode(cleanBase64);
            }

            DocumentExtractionDTO extraction = groqCoachService.extractFoodAndNutrition(
                    imageBytes, fileText, ocrText, mimeType, filename, userGoal, prompt
            );

            return ResponseEntity.ok(Map.of("success", true, "extraction", extraction));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/ai/chat/message")
    public ResponseEntity<?> saveChatMessage(@RequestBody Map<String, Object> body) {
        try {
            String email = body.get("email") != null ? String.valueOf(body.get("email")).trim().toLowerCase() : null;
            Long userId = null;
            if (body.get("user_id") != null) {
                try {
                    userId = Long.valueOf(String.valueOf(body.get("user_id")));
                } catch (Exception ignored) {}
            }

            Optional<User> userOpt = Optional.empty();
            if (userId != null) {
                userOpt = userRepository.findById(userId);
            } else if (email != null && !email.isEmpty()) {
                userOpt = userRepository.findByEmail(email);
            }

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("success", false, "error", "User not found"));
            }

            User user = userOpt.get();
            String text = body.get("text") != null ? String.valueOf(body.get("text")) : (body.get("message") != null ? String.valueOf(body.get("message")) : "");
            String sender = body.get("sender") != null ? String.valueOf(body.get("sender")).toLowerCase() : "user";
            String source = body.get("source") != null ? String.valueOf(body.get("source")) : "groq";
            Long dietPlanId = null;
            if (body.get("diet_plan_id") != null || body.get("dietPlanId") != null) {
                try {
                    Object pId = body.get("diet_plan_id") != null ? body.get("diet_plan_id") : body.get("dietPlanId");
                    dietPlanId = Long.valueOf(String.valueOf(pId));
                } catch (Exception ignored) {}
            }
            String attachmentName = body.get("attachment_name") != null ? String.valueOf(body.get("attachment_name")) : (body.get("attachmentName") != null ? String.valueOf(body.get("attachmentName")) : null);
            String attachmentType = body.get("attachment_type") != null ? String.valueOf(body.get("attachment_type")) : (body.get("attachmentType") != null ? String.valueOf(body.get("attachmentType")) : null);
            Boolean hasAttachment = Boolean.TRUE.equals(body.get("has_attachment")) || Boolean.TRUE.equals(body.get("hasAttachment")) || (attachmentName != null && !attachmentName.isEmpty());

            AIChatMessage msg = new AIChatMessage(user, sender, text, source, dietPlanId, attachmentName, attachmentType, hasAttachment);
            AIChatMessage saved = aiChatMessageRepository.save(msg);

            Map<String, Object> resMsg = new HashMap<>();
            resMsg.put("id", saved.getId());
            resMsg.put("user_id", user.getId());
            resMsg.put("sender", saved.getSender());
            resMsg.put("text", saved.getMessageText());
            resMsg.put("source", saved.getSource());
            resMsg.put("dietPlanId", saved.getDietPlanId());
            resMsg.put("attachmentName", saved.getAttachmentName());
            resMsg.put("attachmentType", saved.getAttachmentType());
            resMsg.put("hasAttachment", saved.getHasAttachment());
            resMsg.put("createdAt", saved.getCreatedAt() != null ? saved.getCreatedAt().toString() : null);

            return ResponseEntity.ok(Map.of("success", true, "messageId", saved.getId(), "message", resMsg));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping("/ai/chat/history")
    public ResponseEntity<?> getChatHistory(@RequestParam(required = false) String email,
                                             @RequestParam(name = "user_id", required = false) Long userId,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "50") int limit) {
        try {
            Optional<User> userOpt = Optional.empty();
            if (userId != null) {
                userOpt = userRepository.findById(userId);
            } else if (email != null && !email.trim().isEmpty()) {
                userOpt = userRepository.findByEmail(email.trim().toLowerCase());
            }

            if (userOpt.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "messages", Collections.emptyList(), "total", 0, "page", page, "limit", limit));
            }

            User user = userOpt.get();
            int pageIndex = Math.max(0, page - 1);
            int pageSize = Math.min(100, Math.max(1, limit));

            Page<AIChatMessage> msgPage = aiChatMessageRepository.findByUserIdOrderByIdAsc(user.getId(), PageRequest.of(pageIndex, pageSize));

            List<Map<String, Object>> messages = msgPage.getContent().stream().map(m -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", m.getId());
                map.put("user_id", user.getId());
                map.put("sender", m.getSender());
                map.put("text", m.getMessageText());
                map.put("source", m.getSource());
                map.put("dietPlanId", m.getDietPlanId());
                if (Boolean.TRUE.equals(m.getHasAttachment())) {
                    map.put("attachment", Map.of("name", m.getAttachmentName() != null ? m.getAttachmentName() : "", "type", m.getAttachmentType() != null ? m.getAttachmentType() : ""));
                } else {
                    map.put("attachment", null);
                }
                map.put("createdAt", m.getCreatedAt() != null ? m.getCreatedAt().toString() : null);
                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "messages", messages,
                    "total", msgPage.getTotalElements(),
                    "page", page,
                    "limit", pageSize
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @DeleteMapping("/ai/chat/history")
    public ResponseEntity<?> deleteChatHistory(@RequestParam(required = false) String email,
                                                @RequestParam(name = "user_id", required = false) Long userId) {
        try {
            Optional<User> userOpt = Optional.empty();
            if (userId != null) {
                userOpt = userRepository.findById(userId);
            } else if (email != null && !email.trim().isEmpty()) {
                userOpt = userRepository.findByEmail(email.trim().toLowerCase());
            }

            if (userOpt.isPresent()) {
                aiChatMessageRepository.deleteByUserId(userOpt.get().getId());
            }

            return ResponseEntity.ok(Map.of("success", true, "message", "Chat history cleared successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
