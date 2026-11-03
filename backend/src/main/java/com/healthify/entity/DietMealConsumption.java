package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diet_meal_consumptions")
public class DietMealConsumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "plan_id")
    private Long planId;

    @Column(name = "day_number")
    private Integer dayNumber;

    @Column(name = "meal_type", length = 50)
    private String mealType; // "breakfast", "pre_lunch", "lunch", "evening_snack", "dinner"

    @Column(name = "meal_name", length = 150)
    private String mealName;

    @Column(name = "planned_cal")
    private Double plannedCal;

    @Column(name = "planned_protein")
    private Double plannedProtein;

    @Column(name = "planned_carbs")
    private Double plannedCarbs;

    @Column(name = "planned_fat")
    private Double plannedFat;

    @Column(name = "planned_fibre")
    private Double plannedFibre;

    @Column(name = "actual_cal")
    private Double actualCal;

    @Column(name = "actual_protein")
    private Double actualProtein;

    @Column(name = "actual_carbs")
    private Double actualCarbs;

    @Column(name = "actual_fat")
    private Double actualFat;

    @Column(name = "actual_fibre")
    private Double actualFibre;

    @Column(length = 30)
    private String status; // "CONSUMED", "SKIPPED", "PENDING"

    @Column(name = "log_date", length = 30)
    private String logDate; // YYYY-MM-DD

    @Column(name = "consumed_at")
    private LocalDateTime consumedAt;

    public DietMealConsumption() {}

    @PrePersist
    protected void onCreate() {
        if (this.consumedAt == null) this.consumedAt = LocalDateTime.now();
        if (this.status == null) this.status = "CONSUMED";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Long getPlanId() { return planId; }
    public void setPlanId(Long planId) { this.planId = planId; }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public String getMealName() { return mealName; }
    public void setMealName(String mealName) { this.mealName = mealName; }

    public Double getPlannedCal() { return plannedCal; }
    public void setPlannedCal(Double plannedCal) { this.plannedCal = plannedCal; }

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

    public LocalDateTime getConsumedAt() { return consumedAt; }
    public void setConsumedAt(LocalDateTime consumedAt) { this.consumedAt = consumedAt; }
}

