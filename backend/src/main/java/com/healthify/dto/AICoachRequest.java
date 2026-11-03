package com.healthify.dto;

import java.util.List;
import java.util.Map;

public class AICoachRequest {
    private String message;
    private String question;
    private String email;
    private Map<String, Object> fullUserData;
    private List<Map<String, String>> history; // Conversation turns: [{"role":"user","content":"..."}, ...]
    private Map<String, Object> activeDietPlan;
    private List<String> confirmedAvailableFoods;
    private Long activeDietPlanId;
    private String fileData;
    private String mimeType;
    private String filename;

    public AICoachRequest() {}

    public String getMessage() {
        return message != null && !message.isEmpty() ? message : question;
    }

    public void setMessage(String message) { this.message = message; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Map<String, Object> getFullUserData() { return fullUserData; }
    public void setFullUserData(Map<String, Object> fullUserData) { this.fullUserData = fullUserData; }

    public List<Map<String, String>> getHistory() { return history; }
    public void setHistory(List<Map<String, String>> history) { this.history = history; }

    public Map<String, Object> getActiveDietPlan() { return activeDietPlan; }
    public void setActiveDietPlan(Map<String, Object> activeDietPlan) { this.activeDietPlan = activeDietPlan; }

    public List<String> getConfirmedAvailableFoods() { return confirmedAvailableFoods; }
    public void setConfirmedAvailableFoods(List<String> confirmedAvailableFoods) { this.confirmedAvailableFoods = confirmedAvailableFoods; }

    public Long getActiveDietPlanId() { return activeDietPlanId; }
    public void setActiveDietPlanId(Long activeDietPlanId) { this.activeDietPlanId = activeDietPlanId; }

    public String getFileData() { return fileData; }
    public void setFileData(String fileData) { this.fileData = fileData; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
}
