package com.healthify.dto;

public class DietFoodItemDTO {
    private String name;
    private String emoji;
    private Double quantity;
    private String unit;
    private String state; // "raw", "cooked", "fresh"
    private String prepMethod;
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fat;
    private Double fibre;
    private String valueSource; // "USDA FoodData Central", "ICMR-NIN IFCT", "ESTIMATED"
    private Boolean isEstimated; // false for verified database items, true for fallback

    public DietFoodItemDTO() {}

    public DietFoodItemDTO(String name, String emoji, Double quantity, String unit, String state,
                           String prepMethod, Double calories, Double protein, Double carbs, Double fat, Double fibre) {
        this(name, emoji, quantity, unit, state, prepMethod, calories, protein, carbs, fat, fibre, "USDA FoodData Central / IFCT", false);
    }

    public DietFoodItemDTO(String name, String emoji, Double quantity, String unit, String state,
                           String prepMethod, Double calories, Double protein, Double carbs, Double fat, Double fibre,
                           String valueSource, Boolean isEstimated) {
        this.name = name;
        this.emoji = emoji != null ? emoji : "🥗";
        this.quantity = quantity;
        this.unit = unit != null ? unit : "g";
        this.state = state != null ? state : "raw";
        this.prepMethod = prepMethod != null ? prepMethod : "Prepared as desired";
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.fibre = fibre;
        this.valueSource = valueSource != null ? valueSource : "USDA FoodData Central / IFCT";
        this.isEstimated = isEstimated != null ? isEstimated : false;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPrepMethod() { return prepMethod; }
    public void setPrepMethod(String prepMethod) { this.prepMethod = prepMethod; }

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

    public String getValueSource() { return valueSource; }
    public void setValueSource(String valueSource) { this.valueSource = valueSource; }

    public Boolean getIsEstimated() { return isEstimated; }
    public void setIsEstimated(Boolean isEstimated) { this.isEstimated = isEstimated; }
}

