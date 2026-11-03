package com.healthify.dto;

import java.util.*;

public class DietPlanDTO {
    private Long id;
    private String email;
    private String title;
    private String planType; // "DAILY", "7_DAY", "25_DAY"
    private String goal;
    private Double calorieTarget;
    private Double bmr;
    private Double tdee;
    private Double proteinTarget;
    private Double carbsTarget;
    private Double fatTarget;
    private Double fibreTarget;

    // Map of Day Number -> List of 5 Meals
    private Map<String, List<DietMealDTO>> days = new LinkedHashMap<>();

    // Ordered List of Day Objects containing daily totals and meals
    private List<DietDayDTO> daysList = new ArrayList<>();

    private List<String> confirmedFoods = new ArrayList<>();
    private String doctorNotes;
    private String status = "ACTIVE";
    private String createdAt;

    public DietPlanDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPlanType() { return planType; }
    public void setPlanType(String planType) { this.planType = planType; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public Double getCalorieTarget() { return calorieTarget; }
    public void setCalorieTarget(Double calorieTarget) { this.calorieTarget = calorieTarget; }

    public Double getBmr() { return bmr; }
    public void setBmr(Double bmr) { this.bmr = bmr; }

    public Double getTdee() { return tdee; }
    public void setTdee(Double tdee) { this.tdee = tdee; }

    public Double getProteinTarget() { return proteinTarget; }
    public void setProteinTarget(Double proteinTarget) { this.proteinTarget = proteinTarget; }

    public Double getCarbsTarget() { return carbsTarget; }
    public void setCarbsTarget(Double carbsTarget) { this.carbsTarget = carbsTarget; }

    public Double getFatTarget() { return fatTarget; }
    public void setFatTarget(Double fatTarget) { this.fatTarget = fatTarget; }

    public Double getFibreTarget() { return fibreTarget; }
    public void setFibreTarget(Double fibreTarget) { this.fibreTarget = fibreTarget; }

    public Map<String, List<DietMealDTO>> getDays() { return days; }
    public void setDays(Map<String, List<DietMealDTO>> days) { this.days = days; }

    public List<DietDayDTO> getDaysList() { return daysList; }
    public void setDaysList(List<DietDayDTO> daysList) { this.daysList = daysList; }

    public List<String> getConfirmedFoods() { return confirmedFoods; }
    public void setConfirmedFoods(List<String> confirmedFoods) { this.confirmedFoods = confirmedFoods; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}

