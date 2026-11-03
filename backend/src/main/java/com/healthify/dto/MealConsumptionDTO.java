package com.healthify.dto;

public class MealConsumptionDTO {
    private String email;
    private Long planId;
    private Integer dayNumber;
    private String mealType;
    private String mealName;
    private Double plannedCal;
    private Double plannedProtein;
    private Double plannedCarbs;
    private Double plannedFat;
    private Double plannedFibre;
    private Double actualCal;
    private Double actualProtein;
    private Double actualCarbs;
    private Double actualFat;
    private Double actualFibre;
    private String status; // "CONSUMED", "SKIPPED", "PENDING"
    private String logDate;

    public MealConsumptionDTO() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public void setMealSlot(String mealSlot) { if (this.mealType == null) this.mealType = mealSlot; }

    public String getMealName() { return mealName; }
    public void setMealName(String mealName) { this.mealName = mealName; }

    public Double getPlannedCal() { return plannedCal; }
    public void setPlannedCal(Double plannedCal) { this.plannedCal = plannedCal; }
    public void setPlannedCalories(Double plannedCalories) { if (this.plannedCal == null) this.plannedCal = plannedCalories; }

    public Double getPlannedProtein() { return plannedProtein; }
    public void setPlannedProtein(Double plannedProtein) { this.plannedProtein = plannedProtein; }

    public Double getPlannedCarbs() { return plannedCarbs; }
    public void setPlannedCarbs(Double plannedCarbs) { this.plannedCarbs = plannedCarbs; }

    public Double getPlannedFat() { return plannedFat; }
    public void setPlannedFat(Double plannedFat) { this.plannedFat = plannedFat; }

    public Double getPlannedFibre() { return plannedFibre; }
    public void setPlannedFibre(Double plannedFibre) { this.plannedFibre = plannedFibre; }

    public Double getActualCal() { return actualCal; }
    public void setActualCal(Double actualCal) { this.actualCal = actualCal; }
    public void setActualCalories(Double actualCalories) { if (this.actualCal == null) this.actualCal = actualCalories; }

    public Double getActualProtein() { return actualProtein; }
    public void setActualProtein(Double actualProtein) { this.actualProtein = actualProtein; }

    public Double getActualCarbs() { return actualCarbs; }
    public void setActualCarbs(Double actualCarbs) { this.actualCarbs = actualCarbs; }

    public Double getActualFat() { return actualFat; }
    public void setActualFat(Double actualFat) { this.actualFat = actualFat; }

    public Double getActualFibre() { return actualFibre; }
    public void setActualFibre(Double actualFibre) { this.actualFibre = actualFibre; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLogDate() { return logDate; }
    public void setLogDate(String logDate) { this.logDate = logDate; }
}

