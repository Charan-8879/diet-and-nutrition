package com.healthify.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RecipeDTO {
    private String recipeName;
    private String description;
    private int prepTimeMinutes = 10;
    private int cookTimeMinutes = 0;
    private int servings = 1;
    private String pairingExplanation;
    private List<RecipeIngredientDTO> ingredients = new ArrayList<>();
    private List<Map<String, String>> optionalIngredients = new ArrayList<>();
    private List<String> instructions = new ArrayList<>();
    private double totalCalories;
    private double totalProtein;
    private double totalCarbs;
    private double totalFat;
    private double totalFibre;
    private double perServingCalories;
    private double perServingProtein;
    private String nutritionSource = "BACKEND_CALCULATED";

    public RecipeDTO() {}

    public RecipeDTO(String recipeName, String description, int prepTimeMinutes, int cookTimeMinutes, int servings, String pairingExplanation) {
        this.recipeName = recipeName;
        this.description = description;
        this.prepTimeMinutes = prepTimeMinutes;
        this.cookTimeMinutes = cookTimeMinutes;
        this.servings = servings > 0 ? servings : 1;
        this.pairingExplanation = pairingExplanation;
    }

    public void recalculateTotals() {
        double cal = 0, pro = 0, carbs = 0, fat = 0, fib = 0;
        if (ingredients != null) {
            for (RecipeIngredientDTO item : ingredients) {
                cal += item.getCalories();
                pro += item.getProtein();
                carbs += item.getCarbs();
                fat += item.getFat();
                fib += item.getFibre();
            }
        }
        this.totalCalories = Math.round(cal * 10.0) / 10.0;
        this.totalProtein = Math.round(pro * 10.0) / 10.0;
        this.totalCarbs = Math.round(carbs * 10.0) / 10.0;
        this.totalFat = Math.round(fat * 10.0) / 10.0;
        this.totalFibre = Math.round(fib * 10.0) / 10.0;

        int s = servings > 0 ? servings : 1;
        this.perServingCalories = Math.round((totalCalories / s) * 10.0) / 10.0;
        this.perServingProtein = Math.round((totalProtein / s) * 10.0) / 10.0;
    }

    public String getRecipeName() { return recipeName; }
    public void setRecipeName(String recipeName) { this.recipeName = recipeName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getPrepTimeMinutes() { return prepTimeMinutes; }
    public void setPrepTimeMinutes(int prepTimeMinutes) { this.prepTimeMinutes = prepTimeMinutes; }

    public int getCookTimeMinutes() { return cookTimeMinutes; }
    public void setCookTimeMinutes(int cookTimeMinutes) { this.cookTimeMinutes = cookTimeMinutes; }

    public int getServings() { return servings; }
    public void setServings(int servings) { this.servings = servings; }

    public String getPairingExplanation() { return pairingExplanation; }
    public void setPairingExplanation(String pairingExplanation) { this.pairingExplanation = pairingExplanation; }

    public List<RecipeIngredientDTO> getIngredients() { return ingredients; }
    public void setIngredients(List<RecipeIngredientDTO> ingredients) { this.ingredients = ingredients; }

    public List<Map<String, String>> getOptionalIngredients() { return optionalIngredients; }
    public void setOptionalIngredients(List<Map<String, String>> optionalIngredients) { this.optionalIngredients = optionalIngredients; }

    public List<String> getInstructions() { return instructions; }
    public void setInstructions(List<String> instructions) { this.instructions = instructions; }

    public double getTotalCalories() { return totalCalories; }
    public void setTotalCalories(double totalCalories) { this.totalCalories = totalCalories; }

    public double getTotalProtein() { return totalProtein; }
    public void setTotalProtein(double totalProtein) { this.totalProtein = totalProtein; }

    public double getTotalCarbs() { return totalCarbs; }
    public void setTotalCarbs(double totalCarbs) { this.totalCarbs = totalCarbs; }

    public double getTotalFat() { return totalFat; }
    public void setTotalFat(double totalFat) { this.totalFat = totalFat; }

    public double getTotalFibre() { return totalFibre; }
    public void setTotalFibre(double totalFibre) { this.totalFibre = totalFibre; }

    public double getPerServingCalories() { return perServingCalories; }
    public void setPerServingCalories(double perServingCalories) { this.perServingCalories = perServingCalories; }

    public double getPerServingProtein() { return perServingProtein; }
    public void setPerServingProtein(double perServingProtein) { this.perServingProtein = perServingProtein; }

    public String getNutritionSource() { return nutritionSource; }
    public void setNutritionSource(String nutritionSource) { this.nutritionSource = nutritionSource; }
}

