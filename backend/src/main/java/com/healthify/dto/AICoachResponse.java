package com.healthify.dto;

import java.util.Map;

public class AICoachResponse {
    private boolean success;
    private String source;
    private String answer;
    private String error;
    private Object dietPlan;
    private Map<String, Object> extractedDocument;
    private String intentType; // "CHAT", "DIET_PLAN", "DIET_EDIT", "SHORT_INPUT_CLARIFICATION", "RECIPE_GENERATION"
    private Map<String, Object> groundingMetadata;
    private java.util.List<Map<String, String>> searchSources;
    private RecipeDTO recipe;

    public AICoachResponse() {}

    public AICoachResponse(boolean success, String source, String answer) {
        this.success = success;
        this.source = source;
        this.answer = answer;
    }

    public AICoachResponse(boolean success, String source, String answer, Object dietPlan, String intentType) {
        this.success = success;
        this.source = source;
        this.answer = answer;
        this.dietPlan = dietPlan;
        this.intentType = intentType;
    }

    public static AICoachResponse error(String error) {
        AICoachResponse resp = new AICoachResponse();
        resp.setSuccess(false);
        resp.setError(error);
        return resp;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public Object getDietPlan() { return dietPlan; }
    public void setDietPlan(Object dietPlan) { this.dietPlan = dietPlan; }

    public Map<String, Object> getExtractedDocument() { return extractedDocument; }
    public void setExtractedDocument(Map<String, Object> extractedDocument) { this.extractedDocument = extractedDocument; }

    public String getIntentType() { return intentType; }
    public void setIntentType(String intentType) { this.intentType = intentType; }

    public Map<String, Object> getGroundingMetadata() { return groundingMetadata; }
    public void setGroundingMetadata(Map<String, Object> groundingMetadata) { this.groundingMetadata = groundingMetadata; }

    public java.util.List<Map<String, String>> getSearchSources() { return searchSources; }
    public void setSearchSources(java.util.List<Map<String, String>> searchSources) { this.searchSources = searchSources; }

    public RecipeDTO getRecipe() { return recipe; }
    public void setRecipe(RecipeDTO recipe) { this.recipe = recipe; }
}
