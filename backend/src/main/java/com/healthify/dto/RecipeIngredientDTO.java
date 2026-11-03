package com.healthify.dto;

public class RecipeIngredientDTO {
    private String name;
    private double quantity;
    private String unit = "g";
    private String prepState = "fresh";
    private double calories;
    private double protein;
    private double carbs;
    private double fat;
    private double fibre;
    private String valueSource = "BACKEND_CALCULATED";

    public RecipeIngredientDTO() {}

    public RecipeIngredientDTO(String name, double quantity, String unit, String prepState, double calories, double protein, double carbs, double fat, double fibre) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit != null ? unit : "g";
        this.prepState = prepState != null ? prepState : "fresh";
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.fibre = fibre;
        this.valueSource = "BACKEND_CALCULATED";
    }

    public RecipeIngredientDTO(String name, double quantity, String unit, String prepState, double calories, double protein, double carbs, double fat, double fibre, String valueSource) {
        this(name, quantity, unit, prepState, calories, protein, carbs, fat, fibre);
        this.valueSource = valueSource != null ? valueSource : "BACKEND_CALCULATED";
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getQuantity() { return quantity; }
    public void setQuantity(double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getPrepState() { return prepState; }
    public void setPrepState(String prepState) { this.prepState = prepState; }

    public double getCalories() { return calories; }
    public void setCalories(double calories) { this.calories = calories; }

    public double getProtein() { return protein; }
    public void setProtein(double protein) { this.protein = protein; }

    public double getCarbs() { return carbs; }
    public void setCarbs(double carbs) { this.carbs = carbs; }

    public double getFat() { return fat; }
    public void setFat(double fat) { this.fat = fat; }

    public double getFibre() { return fibre; }
    public void setFibre(double fibre) { this.fibre = fibre; }

    public String getValueSource() { return valueSource; }
    public void setValueSource(String valueSource) { this.valueSource = valueSource; }
}

