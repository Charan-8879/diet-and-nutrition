package com.healthify.dto;

import java.util.HashMap;
import java.util.Map;

public class ChallengeDTO {
    private String email;
    private Integer totalDays = 25;
    private Integer currentDay = 1;
    private String startDate;
    private Map<String, Object> history = new HashMap<>();

    public ChallengeDTO() {}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getTotalDays() { return totalDays; }
    public void setTotalDays(Integer totalDays) { this.totalDays = totalDays; }

    public Integer getCurrentDay() { return currentDay; }
    public void setCurrentDay(Integer currentDay) { this.currentDay = currentDay; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public Map<String, Object> getHistory() { return history; }
    public void setHistory(Map<String, Object> history) { this.history = history; }
}
