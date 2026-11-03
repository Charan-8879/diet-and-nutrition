package com.healthify.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DailyDataDTO {
    private String email;
    private List<FoodItemDTO> foodLog = new ArrayList<>();
    private Integer waterGlasses = 0;
    private Boolean gymMode = false;
    private String workoutMode = "none";
    private Map<String, Object> currentWorkout;
    private Integer dailySteps = 0;
    private Integer stepGoal = 10000;

    public DailyDataDTO() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<FoodItemDTO> getFoodLog() { return foodLog; }
    public void setFoodLog(List<FoodItemDTO> foodLog) { this.foodLog = foodLog; }

    public Integer getWaterGlasses() { return waterGlasses; }
    public void setWaterGlasses(Integer waterGlasses) { this.waterGlasses = waterGlasses; }

    public Boolean getGymMode() { return gymMode; }
    public void setGymMode(Boolean gymMode) { this.gymMode = gymMode; }

    public String getWorkoutMode() { return workoutMode; }
    public void setWorkoutMode(String workoutMode) { this.workoutMode = workoutMode; }

    public Map<String, Object> getCurrentWorkout() { return currentWorkout; }
    public void setCurrentWorkout(Map<String, Object> currentWorkout) { this.currentWorkout = currentWorkout; }

    public Integer getDailySteps() { return dailySteps; }
    public void setDailySteps(Integer dailySteps) { this.dailySteps = dailySteps; }

    public Integer getStepGoal() { return stepGoal; }
    public void setStepGoal(Integer stepGoal) { this.stepGoal = stepGoal; }
}
