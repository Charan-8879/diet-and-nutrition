package com.healthify.dto;

public class ProfileDTO {
    private String email;
    private String gender;
    private Double age;
    private Double weight;
    private Double height;
    private Double activity;
    private Double bmr;
    private Double tdee;
    private String selectedGoal;
    private Double targetCalories;
    private String updatedAt;

    public ProfileDTO() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

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

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
