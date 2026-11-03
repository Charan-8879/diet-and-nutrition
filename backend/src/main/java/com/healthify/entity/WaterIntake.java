package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "water_intake")
public class WaterIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "log_date", nullable = false, length = 30)
    private String date;

    @Column(nullable = false)
    private Integer glasses = 0;

    @Column(name = "target_glasses")
    private Integer targetGlasses = 12;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public WaterIntake() {}

    public WaterIntake(User user, String date, Integer glasses, Integer targetGlasses) {
        this.user = user;
        this.date = date;
        this.glasses = glasses;
        this.targetGlasses = targetGlasses;
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

    public Integer getGlasses() { return glasses; }
    public void setGlasses(Integer glasses) { this.glasses = glasses; }

    public Integer getTargetGlasses() { return targetGlasses; }
    public void setTargetGlasses(Integer targetGlasses) { this.targetGlasses = targetGlasses; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
