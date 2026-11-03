package com.healthify.dto;

import java.util.ArrayList;
import java.util.List;

public class DietMealDTO {
    private String slot; // "breakfast", "pre_lunch", "lunch", "evening_snack", "dinner"
    private String title; // "Breakfast", "Pre-Lunch (Mid-Morning)", "Lunch", "Evening Snack", "Dinner"
    private String timing; // "8:00 AM", etc.
    private List<DietFoodItemDTO> items = new ArrayList<>();
    private Double totalCalories = 0.0;
    private Double totalProtein = 0.0;
    private Double totalCarbs = 0.0;
    private Double totalFat = 0.0;
    private Double totalFibre = 0.0;
    private String status = "PENDING"; // "CONSUMED", "SKIPPED", "PENDING"

    public DietMealDTO() {}

    public DietMealDTO(String slot, String title, String timing) {
        this.slot = slot;
        this.title = title;
        this.timing = timing;
    }

    public void recalculateTotals() {
        double cal = 0, pro = 0, carbs = 0, fat = 0, fib = 0;
        if (items != null) {
            for (DietFoodItemDTO item : items) {
                if (item.getCalories() != null) cal += item.getCalories();
                if (item.getProtein() != null) pro += item.getProtein();
                if (item.getCarbs() != null) carbs += item.getCarbs();
                if (item.getFat() != null) fat += item.getFat();
                if (item.getFibre() != null) fib += item.getFibre();
            }
        }
        this.totalCalories = Math.round(cal * 10.0) / 10.0;
        this.totalProtein = Math.round(pro * 10.0) / 10.0;
        this.totalCarbs = Math.round(carbs * 10.0) / 10.0;
        this.totalFat = Math.round(fat * 10.0) / 10.0;
        this.totalFibre = Math.round(fib * 10.0) / 10.0;
    }

    public String getSlot() { return slot; }
    public void setSlot(String slot) { this.slot = slot; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTiming() { return timing; }
    public void setTiming(String timing) { this.timing = timing; }

    public List<DietFoodItemDTO> getItems() { return items; }
    public void setItems(List<DietFoodItemDTO> items) {
        this.items = items;
        recalculateTotals();
    }

    public Double getTotalCalories() { return totalCalories; }
    public void setTotalCalories(Double totalCalories) { this.totalCalories = totalCalories; }

    public Double getTotalProtein() { return totalProtein; }
    public void setTotalProtein(Double totalProtein) { this.totalProtein = totalProtein; }

    public Double getTotalCarbs() { return totalCarbs; }
    public void setTotalCarbs(Double totalCarbs) { this.totalCarbs = totalCarbs; }

    public Double getTotalFat() { return totalFat; }
    public void setTotalFat(Double totalFat) { this.totalFat = totalFat; }

    public Double getTotalFibre() { return totalFibre; }
    public void setTotalFibre(Double totalFibre) { this.totalFibre = totalFibre; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

