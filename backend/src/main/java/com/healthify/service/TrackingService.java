package com.healthify.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthify.dto.DailyDataDTO;
import com.healthify.dto.FoodItemDTO;
import com.healthify.entity.*;
import com.healthify.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TrackingService {

    private final UserRepository userRepository;
    private final FoodLogRepository foodLogRepository;
    private final WaterIntakeRepository waterIntakeRepository;
    private final DailyStepsRepository dailyStepsRepository;
    private final WorkoutLogRepository workoutLogRepository;
    private final ObjectMapper objectMapper;

    public TrackingService(UserRepository userRepository,
                           FoodLogRepository foodLogRepository,
                           WaterIntakeRepository waterIntakeRepository,
                           DailyStepsRepository dailyStepsRepository,
                           WorkoutLogRepository workoutLogRepository,
                           ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.foodLogRepository = foodLogRepository;
        this.waterIntakeRepository = waterIntakeRepository;
        this.dailyStepsRepository = dailyStepsRepository;
        this.workoutLogRepository = workoutLogRepository;
        this.objectMapper = objectMapper;
    }

    private String todayDate() {
        return LocalDate.now().toString();
    }

    @Transactional(readOnly = true)
    public DailyDataDTO getDailyData(String email) {
        DailyDataDTO dto = new DailyDataDTO();
        dto.setEmail(email);

        if (email == null || email.trim().isEmpty()) {
            return dto;
        }

        Optional<User> userOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return dto;
        }
        User user = userOpt.get();

        // 1. Meals
        List<FoodLog> meals = foodLogRepository.findByUserOrderByCreatedAtDesc(user);
        List<FoodItemDTO> foodList = new ArrayList<>();
        for (FoodLog f : meals) {
            foodList.add(new FoodItemDTO(f.getId(), f.getName(), f.getGrams(), f.getCal(), f.getProtein(), f.getFibre(), f.getType(), f.getDate()));
        }
        dto.setFoodLog(foodList);

        // 2. Water
        waterIntakeRepository.findByUserAndDate(user, todayDate())
                .or(() -> waterIntakeRepository.findTopByUserOrderByUpdatedAtDesc(user))
                .ifPresent(w -> dto.setWaterGlasses(w.getGlasses()));

        // 3. Steps
        dailyStepsRepository.findByUserAndDate(user, todayDate())
                .or(() -> dailyStepsRepository.findTopByUserOrderByUpdatedAtDesc(user))
                .ifPresent(s -> {
                    dto.setDailySteps(s.getStepsCount());
                    dto.setStepGoal(s.getStepGoal());
                });

        // 4. Workout
        workoutLogRepository.findTopByUserOrderByCreatedAtDesc(user).ifPresent(w -> {
            dto.setWorkoutMode(w.getWorkoutMode() != null ? w.getWorkoutMode() : "none");
            dto.setGymMode("gym".equalsIgnoreCase(w.getWorkoutMode()));
            if (w.getExercisesJson() != null && !w.getExercisesJson().isEmpty()) {
                try {
                    Map<String, Object> map = objectMapper.readValue(w.getExercisesJson(), new TypeReference<Map<String, Object>>() {});
                    dto.setCurrentWorkout(map);
                } catch (Exception ignored) {}
            }
        });

        return dto;
    }

    @Transactional
    public DailyDataDTO saveDailyData(DailyDataDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        String email = dto.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User("Athlete", email, "", "");
            return userRepository.save(newUser);
        });

        String today = todayDate();

        // 1. Save Water Intake
        WaterIntake water = waterIntakeRepository.findByUserAndDate(user, today).orElseGet(() -> {
            WaterIntake w = new WaterIntake();
            w.setUser(user);
            w.setDate(today);
            return w;
        });
        water.setGlasses(dto.getWaterGlasses() != null ? dto.getWaterGlasses() : 0);
        waterIntakeRepository.save(water);

        // 2. Save Daily Steps
        DailySteps steps = dailyStepsRepository.findByUserAndDate(user, today).orElseGet(() -> {
            DailySteps s = new DailySteps();
            s.setUser(user);
            s.setDate(today);
            return s;
        });
        steps.setStepsCount(dto.getDailySteps() != null ? dto.getDailySteps() : 0);
        steps.setStepGoal(dto.getStepGoal() != null ? dto.getStepGoal() : 10000);
        dailyStepsRepository.save(steps);

        // 3. Save Workout snapshot if present
        if (dto.getWorkoutMode() != null && !dto.getWorkoutMode().isEmpty()) {
            WorkoutLog log = new WorkoutLog();
            log.setUser(user);
            log.setWorkoutMode(dto.getWorkoutMode());
            log.setDate(today);
            if (dto.getCurrentWorkout() != null) {
                try {
                    log.setExercisesJson(objectMapper.writeValueAsString(dto.getCurrentWorkout()));
                    if (dto.getCurrentWorkout().containsKey("title")) {
                        log.setWorkoutTitle(String.valueOf(dto.getCurrentWorkout().get("title")));
                    }
                } catch (Exception ignored) {}
            }
            workoutLogRepository.save(log);
        }

        // 4. Save food items if provided (prevent wiping on empty list)
        if (dto.getFoodLog() != null && !dto.getFoodLog().isEmpty()) {
            foodLogRepository.deleteByUser(user);
            for (FoodItemDTO item : dto.getFoodLog()) {
                FoodLog f = new FoodLog(
                        user,
                        item.getName(),
                        item.getGrams() != null ? item.getGrams() : 100.0,
                        item.getCal() != null ? item.getCal() : 0.0,
                        item.getProtein() != null ? item.getProtein() : 0.0,
                        item.getFibre() != null ? item.getFibre() : 0.0,
                        item.getType() != null ? item.getType() : "food",
                        item.getDate() != null ? item.getDate() : today
                );
                foodLogRepository.save(f);
            }
        }

        return getDailyData(email);
    }

    @Transactional
    public FoodItemDTO addFood(String email, FoodItemDTO item) {
        User user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));

        FoodLog f = new FoodLog(
                user,
                item.getName(),
                item.getGrams() != null ? item.getGrams() : 100.0,
                item.getCal() != null ? item.getCal() : 0.0,
                item.getProtein() != null ? item.getProtein() : 0.0,
                item.getFibre() != null ? item.getFibre() : 0.0,
                item.getType() != null ? item.getType() : "food",
                item.getDate() != null ? item.getDate() : todayDate()
        );
        FoodLog saved = foodLogRepository.save(f);
        return new FoodItemDTO(saved.getId(), saved.getName(), saved.getGrams(), saved.getCal(), saved.getProtein(), saved.getFibre(), saved.getType(), saved.getDate());
    }

    @Transactional
    public void removeFood(Long foodId) {
        foodLogRepository.deleteById(foodId);
    }

    @Transactional
    public void clearFood(String email) {
        userRepository.findByEmail(email.trim().toLowerCase()).ifPresent(foodLogRepository::deleteByUser);
    }
}
