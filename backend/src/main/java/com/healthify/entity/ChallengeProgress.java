package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "challenge_progress")
public class ChallengeProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "total_days", nullable = false)
    private Integer totalDays = 25;

    @Column(name = "current_day", nullable = false)
    private Integer currentDay = 1;

    @Column(name = "start_date", length = 50)
    private String startDate;

    @Column(name = "history_json", columnDefinition = "LONGTEXT")
    private String historyJson;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ChallengeProgress() {}

    public ChallengeProgress(User user, Integer totalDays, Integer currentDay, String startDate, String historyJson) {
        this.user = user;
        this.totalDays = totalDays != null ? totalDays : 25;
        this.currentDay = currentDay != null ? currentDay : 1;
        this.startDate = startDate;
        this.historyJson = historyJson != null ? historyJson : "{}";
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

    public Integer getTotalDays() { return totalDays; }
    public void setTotalDays(Integer totalDays) { this.totalDays = totalDays; }

    public Integer getCurrentDay() { return currentDay; }
    public void setCurrentDay(Integer currentDay) { this.currentDay = currentDay; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getHistoryJson() { return historyJson; }
    public void setHistoryJson(String historyJson) { this.historyJson = historyJson; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
