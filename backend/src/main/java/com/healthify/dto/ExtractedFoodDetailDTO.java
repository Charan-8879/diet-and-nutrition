package com.healthify.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashMap;
import java.util.Map;

/**
 * Detailed food item extracted from image, nutrition label, diet chart or document.
 * Clearly separates values directly extracted from printed labels vs backend-calculated vs AI-estimated.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExtractedFoodDetailDTO {
    private String name;
    private Double quantity;
    private String unit = "g";
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fat;
    private Double fibre;
    private String servingSize;
    // DIRECT_IMAGE_EXTRACTED, BACKEND_CALCULATED, AI_ESTIMATED
    private String valueSource = "BACKEND_CALCULATED";
    private boolean isUncertain = false;
    private String uncertaintyReason;
    private String state; // "raw", "cooked", "fresh"
    private String mealSlot; // "Breakfast", "Mid-Morning", "Lunch", "Evening Snack", "Dinner"
    private Double confidence = 0.95;
    private String prepInstruction;
    private Map<String, Object> percentages = new HashMap<>();

    public ExtractedFoodDetailDTO() {}

    public ExtractedFoodDetailDTO(String name, Double quantity, String unit, Double calories, Double protein, Double carbs, Double fat, Double fibre, String valueSource) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit != null ? unit : "g";
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.fibre = fibre;
        this.valueSource = valueSource != null ? valueSource : "BACKEND_CALCULATED";
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Double getCalories() { return calories; }
    public void setCalories(Double calories) { this.calories = calories; }

    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }

    public Double getCarbs() { return carbs; }
    public void setCarbs(Double carbs) { this.carbs = carbs; }

    public Double getFat() { return fat; }
    public void setFat(Double fat) { this.fat = fat; }

    public Double getFibre() { return fibre; }
    public void setFibre(Double fibre) { this.fibre = fibre; }

    public String getServingSize() { return servingSize; }
    public void setServingSize(String servingSize) { this.servingSize = servingSize; }

    public String getValueSource() { return valueSource; }
    public void setValueSource(String valueSource) { this.valueSource = valueSource; }

    public boolean isUncertain() { return isUncertain; }
    public void setUncertain(boolean uncertain) { isUncertain = uncertain; }

    public String getUncertaintyReason() { return uncertaintyReason; }
    public void setUncertaintyReason(String uncertaintyReason) { this.uncertaintyReason = uncertaintyReason; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getMealSlot() { return mealSlot; }
    public void setMealSlot(String mealSlot) { this.mealSlot = mealSlot; }

    public Double getConfidence() { return confidence; }
    public void setConfidence(Double confidence) { this.confidence = confidence; }

    public String getPrepInstruction() { return prepInstruction; }
    public void setPrepInstruction(String prepInstruction) { this.prepInstruction = prepInstruction; }

    public Map<String, Object> getPercentages() { return percentages; }
    public void setPercentages(Map<String, Object> percentages) { this.percentages = percentages; }
}

