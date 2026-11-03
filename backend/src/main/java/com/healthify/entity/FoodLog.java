package com.healthify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_logs")
public class FoodLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false)
    private Double grams;

    @Column(nullable = false)
    private Double cal;

    @Column(nullable = false)
    private Double protein;

    @Column(nullable = false)
    private Double fibre;

    @Column(length = 50)
    private String type;

    @Column(name = "log_date", length = 30)
    private String date;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public FoodLog() {}

    public FoodLog(User user, String name, Double grams, Double cal, Double protein, Double fibre, String type, String date) {
        this.user = user;
        this.name = name;
        this.grams = grams;
        this.cal = cal;
        this.protein = protein;
        this.fibre = fibre;
        this.type = type;
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

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getGrams() { return grams; }
    public void setGrams(Double grams) { this.grams = grams; }

    public Double getCal() { return cal; }
    public void setCal(Double cal) { this.cal = cal; }

    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }

    public Double getFibre() { return fibre; }
    public void setFibre(Double fibre) { this.fibre = fibre; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
