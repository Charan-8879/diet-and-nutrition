package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_steps")
public class DailySteps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "log_date", nullable = false, length = 30)
    private String date;

    @Column(name = "steps_count", nullable = false)
    private Integer stepsCount = 0;

    @Column(name = "step_goal", nullable = false)
    private Integer stepGoal = 10000;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public DailySteps() {}

    public DailySteps(User user, String date, Integer stepsCount, Integer stepGoal) {
        this.user = user;
        this.date = date;
        this.stepsCount = stepsCount;
        this.stepGoal = stepGoal;
    }

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

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Integer getStepsCount() { return stepsCount; }
    public void setStepsCount(Integer stepsCount) { this.stepsCount = stepsCount; }

    public Integer getStepGoal() { return stepGoal; }
    public void setStepGoal(Integer stepGoal) { this.stepGoal = stepGoal; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
