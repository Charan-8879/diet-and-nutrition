package com.healthify.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthify.dto.MealConsumptionDTO;
import com.healthify.entity.ChallengeProgress;
import com.healthify.entity.DietMealConsumption;
import com.healthify.entity.DietPlan;
import com.healthify.entity.FoodLog;
import com.healthify.entity.User;
import com.healthify.repository.ChallengeProgressRepository;
import com.healthify.repository.DietMealConsumptionRepository;
import com.healthify.repository.DietPlanRepository;
import com.healthify.repository.FoodLogRepository;
import com.healthify.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class DietTrackingService {

    private final UserRepository userRepository;
    private final DietMealConsumptionRepository consumptionRepository;
    private final FoodLogRepository foodLogRepository;
    private final DietPlanRepository dietPlanRepository;
    private final ChallengeProgressRepository challengeProgressRepository;
    private final ObjectMapper objectMapper;

    public DietTrackingService(UserRepository userRepository,
                               DietMealConsumptionRepository consumptionRepository,
                               FoodLogRepository foodLogRepository,
                               DietPlanRepository dietPlanRepository,
                               ChallengeProgressRepository challengeProgressRepository,
                               ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.consumptionRepository = consumptionRepository;
        this.foodLogRepository = foodLogRepository;
        this.dietPlanRepository = dietPlanRepository;
        this.challengeProgressRepository = challengeProgressRepository;
        this.objectMapper = objectMapper;
    }

    private String todayDate() {
        return LocalDate.now().toString();
    }

    @Transactional
    public MealConsumptionDTO recordConsumption(MealConsumptionDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        User user = userRepository.findByEmail(dto.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + dto.getEmail()));

        // 1. Backend Sequential Day Locking Check:
        if (dto.getDayNumber() != null) {
            challengeProgressRepository.findByUser(user).ifPresent(cp -> {
                if (cp.getHistoryJson() != null) {
                    try {
                        Map<String, Object> hist = objectMapper.readValue(cp.getHistoryJson(), new TypeReference<Map<String, Object>>() {});
                        if (hist.containsKey("Day " + dto.getDayNumber())) {
                            throw new IllegalStateException("Day " + dto.getDayNumber() + " is completed and locked. Modifications are not allowed.");
                        }
                    } catch (IllegalStateException e) {
                        throw e;
                    } catch (Exception ignored) {}
                }
            });
        }

        String date = dto.getLogDate() != null && !dto.getLogDate().isEmpty() ? dto.getLogDate() : todayDate();

        Optional<DietMealConsumption> existingOpt = consumptionRepository
                .findByUserAndPlanIdAndDayNumberAndMealTypeAndLogDate(
                        user, dto.getPlanId(), dto.getDayNumber(), dto.getMealType(), date);

        DietMealConsumption c = existingOpt.orElseGet(DietMealConsumption::new);
        c.setUser(user);
        c.setPlanId(dto.getPlanId());
        c.setDayNumber(dto.getDayNumber());
        c.setMealType(dto.getMealType());
        c.setMealName(dto.getMealName());
        c.setPlannedCal(dto.getPlannedCal());
        c.setPlannedProtein(dto.getPlannedProtein());
        c.setPlannedCarbs(dto.getPlannedCarbs());
        c.setPlannedFat(dto.getPlannedFat());
        c.setPlannedFibre(dto.getPlannedFibre());
        c.setActualCal(dto.getActualCal() != null ? dto.getActualCal() : dto.getPlannedCal());
        c.setActualProtein(dto.getActualProtein() != null ? dto.getActualProtein() : dto.getPlannedProtein());
        c.setActualCarbs(dto.getActualCarbs() != null ? dto.getActualCarbs() : dto.getPlannedCarbs());
        c.setActualFat(dto.getActualFat() != null ? dto.getActualFat() : dto.getPlannedFat());
        c.setActualFibre(dto.getActualFibre() != null ? dto.getActualFibre() : dto.getPlannedFibre());
        c.setStatus(dto.getStatus() != null ? dto.getStatus() : "CONSUMED");
        c.setLogDate(date);
        c.setConsumedAt(LocalDateTime.now());

        DietMealConsumption saved = consumptionRepository.save(c);

        // 2. Also record in FoodLog if consumed so Dashboard reflects it immediately
        if ("CONSUMED".equalsIgnoreCase(saved.getStatus())) {
            FoodLog fl = new FoodLog(
                    user,
                    saved.getMealName() != null ? saved.getMealName() : "Planned Meal (" + saved.getMealType() + ")",
                    150.0,
                    saved.getActualCal(),
                    saved.getActualProtein(),
                    saved.getActualFibre() != null ? saved.getActualFibre() : 3.0,
                    saved.getMealType(),
                    date
            );
            foodLogRepository.save(fl);
        }

        // 3. Update DietPlan plan_json in MySQL so status is permanently persisted
        dietPlanRepository.findTopByUserAndStatusOrderByCreatedAtDesc(user, "ACTIVE").ifPresent(plan -> {
            if (plan.getPlanJson() != null && !plan.getPlanJson().isEmpty()) {
                try {
                    List<Map<String, Object>> days = objectMapper.readValue(plan.getPlanJson(), new TypeReference<List<Map<String, Object>>>() {});
                    for (Map<String, Object> d : days) {
                        Number dn = (Number) d.get("dayNumber");
                        if (dn != null && dn.intValue() == (dto.getDayNumber() != null ? dto.getDayNumber() : 1)) {
                            @SuppressWarnings("unchecked")
                            List<Map<String, Object>> meals = (List<Map<String, Object>>) d.get("meals");
                            if (meals != null) {
                                for (Map<String, Object> m : meals) {
                                    String slot = (String) m.get("slot");
                                    String title = (String) m.get("slotTitle");
                                    if ((slot != null && slot.equalsIgnoreCase(dto.getMealType())) ||
                                        (title != null && title.equalsIgnoreCase(dto.getMealName()))) {
                                        m.put("status", saved.getStatus());
                                    }
                                }
                            }
                        }
                    }
                    plan.setPlanJson(objectMapper.writeValueAsString(days));
                    dietPlanRepository.save(plan);
                } catch (Exception ignored) {}
            }
        });

        dto.setStatus(saved.getStatus());
        dto.setLogDate(saved.getLogDate());
        return dto;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getPlannedVsActualComparison(String email, String date) {
        String queryDate = date != null && !date.isEmpty() ? date : todayDate();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("date", queryDate);

        if (email == null || email.trim().isEmpty()) {
            return result;
        }

        Optional<User> uOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (uOpt.isEmpty()) return result;
        User user = uOpt.get();

        List<DietMealConsumption> consumptions = consumptionRepository.findByUserAndLogDate(user, queryDate);

        double plannedCal = 0, plannedPro = 0, plannedCarbs = 0, plannedFat = 0, plannedFib = 0;
        double actualCal = 0, actualPro = 0, actualCarbs = 0, actualFat = 0, actualFib = 0;
        int consumedCount = 0, skippedCount = 0;

        for (DietMealConsumption c : consumptions) {
            if (c.getPlannedCal() != null) plannedCal += c.getPlannedCal();
            if (c.getPlannedProtein() != null) plannedPro += c.getPlannedProtein();
            if (c.getPlannedCarbs() != null) plannedCarbs += c.getPlannedCarbs();
            if (c.getPlannedFat() != null) plannedFat += c.getPlannedFat();
            if (c.getPlannedFibre() != null) plannedFib += c.getPlannedFibre();

            if ("CONSUMED".equalsIgnoreCase(c.getStatus())) {
                consumedCount++;
                if (c.getActualCal() != null) actualCal += c.getActualCal();
                if (c.getActualProtein() != null) actualPro += c.getActualProtein();
                if (c.getActualCarbs() != null) actualCarbs += c.getActualCarbs();
                if (c.getActualFat() != null) actualFat += c.getActualFat();
                if (c.getActualFibre() != null) actualFib += c.getActualFibre();
            } else if ("SKIPPED".equalsIgnoreCase(c.getStatus())) {
                skippedCount++;
            }
        }

        result.put("planned", Map.of("calories", Math.round(plannedCal), "protein", Math.round(plannedPro), "carbs", Math.round(plannedCarbs), "fat", Math.round(plannedFat), "fibre", Math.round(plannedFib)));
        result.put("actual", Map.of("calories", Math.round(actualCal), "protein", Math.round(actualPro), "carbs", Math.round(actualCarbs), "fat", Math.round(actualFat), "fibre", Math.round(actualFib)));
        result.put("remaining", Map.of("calories", Math.max(0, Math.round(plannedCal - actualCal)), "protein", Math.max(0, Math.round(plannedPro - actualPro))));
        result.put("mealsSummary", Map.of("consumed", consumedCount, "skipped", skippedCount, "totalTracked", consumptions.size()));

        return result;
    }
}

