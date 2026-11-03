package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String gender;
    private Double age;
    private Double weight;
    private Double height;
    private Double activity;
    private Double bmr;
    private Double tdee;

    @Column(name = "selected_goal", length = 100)
    private String selectedGoal;

    @Column(name = "target_calories")
    private Double targetCalories;

    @Lob
    @Column(name = "confirmed_foods_json", columnDefinition = "LONGTEXT")
    private String confirmedFoodsJson;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public UserProfile() {}

    @PrePersist
    @PreUpdate
    protected void onSave() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Double getAge() { return age; }
    public void setAge(Double age) { this.age = age; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public Double getActivity() { return activity; }
    public void setActivity(Double activity) { this.activity = activity; }

    public Double getBmr() { return bmr; }
    public void setBmr(Double bmr) { this.bmr = bmr; }

    public Double getTdee() { return tdee; }
    public void setTdee(Double tdee) { this.tdee = tdee; }

    public String getSelectedGoal() { return selectedGoal; }
    public void setSelectedGoal(String selectedGoal) { this.selectedGoal = selectedGoal; }

    public Double getTargetCalories() { return targetCalories; }
    public void setTargetCalories(Double targetCalories) { this.targetCalories = targetCalories; }

    public String getConfirmedFoodsJson() { return confirmedFoodsJson; }
    public void setConfirmedFoodsJson(String confirmedFoodsJson) { this.confirmedFoodsJson = confirmedFoodsJson; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
