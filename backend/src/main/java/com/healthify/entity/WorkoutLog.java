package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workout_logs")
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "workout_mode", length = 50)
    private String workoutMode;

    @Column(name = "workout_title", length = 150)
    private String workoutTitle;

    @Column(name = "exercises_json", columnDefinition = "TEXT")
    private String exercisesJson;

    @Column(name = "trained_muscles", length = 255)
    private String trainedMuscles;

    private Boolean completed = false;

    @Column(name = "log_date", length = 30)
    private String date;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public WorkoutLog() {}

    public WorkoutLog(User user, String workoutMode, String workoutTitle, String exercisesJson, String trainedMuscles, Boolean completed, String date) {
        this.user = user;
        this.workoutMode = workoutMode;
        this.workoutTitle = workoutTitle;
        this.exercisesJson = exercisesJson;
        this.trainedMuscles = trainedMuscles;
        this.completed = completed;
        this.date = date;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getWorkoutMode() { return workoutMode; }
    public void setWorkoutMode(String workoutMode) { this.workoutMode = workoutMode; }

    public String getWorkoutTitle() { return workoutTitle; }
    public void setWorkoutTitle(String workoutTitle) { this.workoutTitle = workoutTitle; }

    public String getExercisesJson() { return exercisesJson; }
    public void setExercisesJson(String exercisesJson) { this.exercisesJson = exercisesJson; }

    public String getTrainedMuscles() { return trainedMuscles; }
    public void setTrainedMuscles(String trainedMuscles) { this.trainedMuscles = trainedMuscles; }

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
