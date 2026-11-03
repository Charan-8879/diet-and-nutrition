package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diet_plans")
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "plan_type", length = 50)
    private String planType; // "DAILY", "7_DAY", "25_DAY"

    @Column(length = 100)
    private String goal;

    @Column(name = "calorie_target")
    private Double calorieTarget;

    private Double bmr;
    private Double tdee;

    @Column(name = "protein_target")
    private Double proteinTarget;

    @Column(name = "carbs_target")
    private Double carbsTarget;

    @Column(name = "fat_target")
    private Double fatTarget;

    @Column(name = "fibre_target")
    private Double fibreTarget;

    @Lob
    @Column(name = "plan_json", columnDefinition = "LONGTEXT")
    private String planJson;

    @Lob
    @Column(name = "confirmed_foods_json", columnDefinition = "LONGTEXT")
    private String confirmedFoodsJson;

    @Column(name = "doctor_notes", columnDefinition = "TEXT")
    private String doctorNotes;

    @Column(length = 50)
    private String status; // "ACTIVE", "SAVED", "ARCHIVED"

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public DietPlan() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) this.status = "ACTIVE";
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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

    public String getPlanJson() { return planJson; }
    public void setPlanJson(String planJson) { this.planJson = planJson; }

    public String getConfirmedFoodsJson() { return confirmedFoodsJson; }
    public void setConfirmedFoodsJson(String confirmedFoodsJson) { this.confirmedFoodsJson = confirmedFoodsJson; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

