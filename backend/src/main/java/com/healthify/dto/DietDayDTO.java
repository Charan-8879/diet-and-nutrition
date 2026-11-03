package com.healthify.dto;

import java.util.ArrayList;
import java.util.List;

public class DietDayDTO {
    private Integer dayNumber;
    private String dayTitle;
    private Integer day;
    private Double targetCalories;
    private Double totalCalories;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFat;
    private Double totalFibre;
    private List<DietMealDTO> meals = new ArrayList<>();

    public DietDayDTO() {}

    public DietDayDTO(Integer dayNumber, String dayTitle, Double targetCalories,
                      Double totalCalories, Double totalProtein, Double totalCarbs,
                      Double totalFat, Double totalFibre, List<DietMealDTO> meals) {
        this.dayNumber = dayNumber;
        this.dayTitle = dayTitle != null ? dayTitle : ("Day " + dayNumber);
        this.day = dayNumber;
        this.targetCalories = targetCalories;
        this.totalCalories = totalCalories;
        this.totalProtein = totalProtein;
        this.totalCarbs = totalCarbs;
        this.totalFat = totalFat;
        this.totalFibre = totalFibre;
        this.meals = meals != null ? meals : new ArrayList<>();
    }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) {
        this.dayNumber = dayNumber;
        this.day = dayNumber;
    }

    public String getDayTitle() { return dayTitle; }
    public void setDayTitle(String dayTitle) { this.dayTitle = dayTitle; }

    public Integer getDay() { return day; }
    public void setDay(Integer day) {
        this.day = day;
        this.dayNumber = day;
    }

    public Double getTargetCalories() { return targetCalories; }
    public void setTargetCalories(Double targetCalories) { this.targetCalories = targetCalories; }

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

    public List<DietMealDTO> getMeals() { return meals; }
    public void setMeals(List<DietMealDTO> meals) { this.meals = meals; }
}

