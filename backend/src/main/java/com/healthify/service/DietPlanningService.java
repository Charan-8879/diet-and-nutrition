package com.healthify.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthify.dto.*;
import com.healthify.entity.DietPlan;
import com.healthify.entity.User;
import com.healthify.entity.UserProfile;
import com.healthify.repository.DietPlanRepository;
import com.healthify.repository.UserProfileRepository;
import com.healthify.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DietPlanningService {

    private static final Logger log = LoggerFactory.getLogger(DietPlanningService.class);

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final DietPlanRepository dietPlanRepository;
    private final NutritionCalculationService nutritionService;
    private final ObjectMapper objectMapper;

    public DietPlanningService(UserRepository userRepository,
                               UserProfileRepository userProfileRepository,
                               DietPlanRepository dietPlanRepository,
                               NutritionCalculationService nutritionService,
                               ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.dietPlanRepository = dietPlanRepository;
        this.nutritionService = nutritionService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public DietPlanDTO generateFiveMealPlan(String email, String planType, List<String> availableFoods,
                                            String goal, Double targetCalOverride, String doctorNotes,
                                            Map<String, Object> fallbackProfileData) {
        User user = null;
        UserProfile profile = null;

        if (email != null && !email.trim().isEmpty()) {
            Optional<User> uOpt = userRepository.findByEmail(email.trim().toLowerCase());
            if (uOpt.isPresent()) {
                user = uOpt.get();
                profile = userProfileRepository.findByUser(user).orElse(null);
            }
        }

        // 1. Resolve Profile Calculator Values (Primary Calorie Source)
        double weight = 70.0;
        double height = 175.0;
        double age = 25.0;
        String gender = "male";
        double activity = 1.375;
        double bmr;
        double tdee;
        String resolvedGoal = goal != null && !goal.isEmpty() ? goal : "Maintain Weight";

        if (profile != null && profile.getWeight() != null && profile.getHeight() != null) {
            weight = profile.getWeight();
            height = profile.getHeight();
            if (profile.getAge() != null) age = profile.getAge();
            if (profile.getGender() != null) gender = profile.getGender();
            if (profile.getActivity() != null) activity = profile.getActivity();
            if (profile.getSelectedGoal() != null && (goal == null || goal.isEmpty())) {
                resolvedGoal = profile.getSelectedGoal();
            }
        } else if (fallbackProfileData != null && !fallbackProfileData.isEmpty()) {
            if (fallbackProfileData.containsKey("weight")) weight = ((Number) fallbackProfileData.get("weight")).doubleValue();
            if (fallbackProfileData.containsKey("height")) height = ((Number) fallbackProfileData.get("height")).doubleValue();
            if (fallbackProfileData.containsKey("age")) age = ((Number) fallbackProfileData.get("age")).doubleValue();
            if (fallbackProfileData.containsKey("gender")) gender = String.valueOf(fallbackProfileData.get("gender"));
            if (fallbackProfileData.containsKey("activity")) activity = ((Number) fallbackProfileData.get("activity")).doubleValue();
            if (fallbackProfileData.containsKey("selectedGoal") && (goal == null || goal.isEmpty())) {
                resolvedGoal = String.valueOf(fallbackProfileData.get("selectedGoal"));
            }
        }

        // Verified Mifflin-St Jeor formula from existing profile calculator
        if ("female".equalsIgnoreCase(gender)) {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        }
        tdee = bmr * activity;

        // Calculate Target Calories
        double targetCalories;
        if (targetCalOverride != null && targetCalOverride > 500) {
            targetCalories = targetCalOverride;
        } else if (profile != null && profile.getTargetCalories() != null && profile.getTargetCalories() > 500) {
            targetCalories = profile.getTargetCalories();
        } else {
            String g = resolvedGoal.toLowerCase();
            if (g.contains("muscle") || g.contains("fast gain") || g.contains("bulk")) {
                targetCalories = Math.round(tdee * 1.20);
            } else if (g.contains("mild gain") || g.contains("lean gain")) {
                targetCalories = Math.round(tdee * 1.10);
            } else if (g.contains("extreme loss")) {
                targetCalories = Math.round(tdee * 0.65);
            } else if (g.contains("loss") || g.contains("fat loss") || g.contains("cut")) {
                targetCalories = Math.round(tdee * 0.80);
            } else {
                targetCalories = Math.round(tdee);
            }
        }

        // Macro distribution based on goal
        double proteinTarget = Math.round(weight * (resolvedGoal.toLowerCase().contains("gain") || resolvedGoal.toLowerCase().contains("muscle") ? 2.0 : 1.8));
        double fatCalories = targetCalories * 0.25;
        double fatTarget = Math.round(fatCalories / 9.0);
        double carbCalories = targetCalories - (proteinTarget * 4.0) - fatCalories;
        double carbsTarget = Math.max(50, Math.round(carbCalories / 4.0));
        double fibreTarget = 32.0;

        // 2. Select Foods Dynamically (NEVER hardcode defaults)
        List<String> confirmedFoods;
        if (availableFoods != null && !availableFoods.isEmpty()) {
            confirmedFoods = new ArrayList<>(availableFoods);
            saveConfirmedFoodsForUser(email, confirmedFoods);
        } else {
            List<String> savedFoods = getConfirmedFoodsForUser(email);
            if (!savedFoods.isEmpty()) {
                confirmedFoods = new ArrayList<>(savedFoods);
            } else {
                confirmedFoods = resolveDynamicFoodsList(resolvedGoal, null);
            }
        }

        int totalDays = "25_DAY".equalsIgnoreCase(planType) ? 25 : ("7_DAY".equalsIgnoreCase(planType) ? 7 : 1);
        String resolvedPlanType = "25_DAY".equalsIgnoreCase(planType) ? "25_DAY" : ("7_DAY".equalsIgnoreCase(planType) ? "7_DAY" : "DAILY");

        Map<String, List<DietMealDTO>> days = new LinkedHashMap<>();
        List<DietDayDTO> daysList = new ArrayList<>();

        for (int day = 1; day <= totalDays; day++) {
            List<DietMealDTO> dayMeals = generateFiveMealsForDay(day, targetCalories, proteinTarget, confirmedFoods, resolvedGoal);
            days.put("Day " + day, dayMeals);

            Map<String, Double> dayTotals = nutritionService.computeDailyTotals(dayMeals);
            daysList.add(new DietDayDTO(day, "Day " + day, targetCalories,
                    dayTotals.get("calories"), dayTotals.get("protein"), dayTotals.get("carbs"),
                    dayTotals.get("fat"), dayTotals.get("fibre"), dayMeals));
        }

        DietPlanDTO dto = new DietPlanDTO();
        dto.setEmail(email);
        dto.setTitle(String.format("5-Meal %s Plan (%,d kcal/day)", resolvedGoal, (int) targetCalories));
        dto.setPlanType(resolvedPlanType);
        dto.setGoal(resolvedGoal);
        dto.setCalorieTarget(targetCalories);
        dto.setBmr(Math.round(bmr * 10.0) / 10.0);
        dto.setTdee(Math.round(tdee * 10.0) / 10.0);
        dto.setProteinTarget(proteinTarget);
        dto.setCarbsTarget(carbsTarget);
        dto.setFatTarget(fatTarget);
        dto.setFibreTarget(fibreTarget);
        dto.setDays(days);
        dto.setDaysList(daysList);
        dto.setConfirmedFoods(confirmedFoods);

        String limitationNote = evaluateConfirmedPoolFeasibility(confirmedFoods, targetCalories);
        if (limitationNote != null) {
            doctorNotes = (doctorNotes != null && !doctorNotes.trim().isEmpty())
                    ? doctorNotes + "\n\n⚠️ Nutrition Limitation Note: " + limitationNote
                    : "⚠️ Nutrition Limitation Note: " + limitationNote;
        }
        dto.setDoctorNotes(doctorNotes);
        dto.setStatus("ACTIVE");
        dto.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));

        // Persist in MySQL if user exists
        if (user != null) {
            savePlanToDatabase(user, dto);
        }

        return dto;
    }

    private static final String[] ROTATING_FRUITS_7 = {
        "Apple", "Banana", "Papaya", "Guava", "Orange", "Watermelon", "Pomegranate"
    };

    private static final String[][] INDIAN_BREAKFASTS_7 = {
        {"Idli (Steamed)", "Sambar", "Coconut Chutney"},
        {"Dosa (Plain)", "Sambar", "Coconut Chutney"},
        {"Poha (Cooked)", "Curd / Dahi (Low Fat)"},
        {"Pongal (Ven Pongal)", "Coconut Chutney", "Sambar"},
        {"Upma (Rava Upma)", "Sambar", "Curd / Dahi (Low Fat)"},
        {"Whole Wheat Chapati / Roti", "Curd / Dahi (Low Fat)", "Eggs (Whole Boiled)"},
        {"Idli (Steamed)", "Peanut / Groundnut Chutney", "Sambar"}
    };

    private static final String[][] INDIAN_LUNCH_COMBOS_7 = {
        {"White Rice (Cooked)", "Moong Dal (Cooked)", "Spinach (Raw)", "Paneer (Fresh/Raw)"},
        {"Whole Wheat Chapati / Roti", "Chicken Breast (Grilled)", "Moong Dal (Cooked)", "Cucumber"},
        {"White Rice (Cooked)", "Chicken Breast (Grilled)", "Mixed Green Salad", "Sambar"},
        {"Brown Rice (Cooked)", "Moong Dal (Cooked)", "Paneer (Fresh/Raw)", "Cucumber"},
        {"Whole Wheat Chapati / Roti", "Moong Dal (Cooked)", "Paneer (Fresh/Raw)", "Mixed Green Salad"},
        {"White Rice (Cooked)", "Fish (Steamed Rohu)", "Moong Dal (Cooked)", "Cucumber"},
        {"White Rice (Cooked)", "Chicken Breast (Grilled)", "Moong Dal (Cooked)", "Cucumber"}
    };

    private static final String[][] INDIAN_SNACKS_7 = {
        {"Almonds", "Curd / Dahi (Low Fat)"},
        {"Sprouted Moong (Raw)", "Almonds"},
        {"Paneer (Fresh/Raw)", "Cucumber"},
        {"Peanuts (Roasted)", "Curd / Dahi (Low Fat)"},
        {"Greek Yogurt", "Almonds"},
        {"Chickpeas / Chana (Cooked)", "Almonds"},
        {"Eggs (Whole Boiled)", "Almonds"}
    };

    private static final String[][] INDIAN_DINNER_COMBOS_7 = {
        {"Whole Wheat Chapati / Roti", "Moong Dal (Cooked)", "Paneer (Fresh/Raw)"},
        {"Idli (Steamed)", "Sambar", "Eggs (Whole Boiled)"},
        {"Whole Wheat Chapati / Roti", "Paneer (Fresh/Raw)", "Cucumber"},
        {"Dosa (Plain)", "Sambar", "Paneer (Fresh/Raw)"},
        {"Whole Wheat Chapati / Roti", "Moong Dal (Cooked)", "Curd / Dahi (Low Fat)"},
        {"Brown Rice (Cooked)", "Fish (Steamed Rohu)", "Moong Dal (Cooked)"},
        {"Whole Wheat Chapati / Roti", "Curd / Dahi (Low Fat)", "Paneer (Fresh/Raw)"}
    };

    private boolean isFruitName(String name) {
        if (name == null) return false;
        String l = name.toLowerCase();
        return l.contains("apple") || l.contains("banana") || l.contains("papaya") ||
               l.contains("guava") || l.contains("orange") || l.contains("watermelon") ||
               l.contains("pomegranate") || l.contains("fruit") || l.contains("berry");
    }

    private boolean isMeatName(String name) {
        if (name == null) return false;
        String l = name.toLowerCase();
        return l.contains("chicken") || l.contains("mutton") || l.contains("lamb") ||
               l.contains("fish") || l.contains("salmon") || l.contains("tuna") || l.contains("shrimp");
    }

    private String evaluateConfirmedPoolFeasibility(List<String> pool, double targetCal) {
        if (pool == null || pool.isEmpty()) return null;
        double totalCalPer100 = 0;
        boolean hasStapleOrProtein = false;
        for (String f : pool) {
            NutritionCalculationService.FoodNutrient fn = nutritionService.lookup(f);
            if (fn != null) {
                double cal = fn.calPer100g();
                double pro = fn.proPer100g();
                totalCalPer100 += cal;
                if (cal >= 80 || pro >= 6) hasStapleOrProtein = true;
            }
        }
        double avgCal = totalCalPer100 / pool.size();
        if (avgCal < 45 || !hasStapleOrProtein) {
            return String.format("Your confirmed food list contains predominantly low-caloric/high-water vegetables (average ~%.0f kcal/100g). Reaching %.0f kcal exclusively with these foods would require consuming >4-5 kg of food daily, which is physiologically unrealistic. We recommend adding whole grains (rice, roti, oats) or protein staples (paneer, eggs, chicken, lentils).", avgCal, targetCal);
        }
        return null;
    }

    private List<DietMealDTO> generateFiveMealsForDay(int day, double dailyCal, double dailyPro, List<String> foods, String goal) {
        List<DietMealDTO> meals = new ArrayList<>();

        // Calorie shares: Breakfast 24%, Pre-Lunch 10%, Lunch 34%, Evening Snack 12%, Dinner 20%
        double calBreakfast = dailyCal * 0.24;
        double calPreLunch = dailyCal * 0.10;
        double calLunch = dailyCal * 0.34;
        double calSnack = dailyCal * 0.12;
        double calDinner = dailyCal * 0.20;

        boolean isDefaultPool = (foods == null || foods.isEmpty());
        List<String> pool = !isDefaultPool ? foods : resolveDynamicFoodsList(goal, null);
        int[] eggMealsCount = new int[]{0};

        // 1. Breakfast: Realistic Indian breakfast staples or non-meat items (NEVER chicken + rice)
        DietMealDTO b = new DietMealDTO("breakfast", "🌅 Breakfast", "8:00 AM");
        b.setItems(buildBreakfastItems(pool, isDefaultPool, calBreakfast, day, eggMealsCount));
        b.recalculateTotals();
        meals.add(b);

        // 2. Pre-Lunch: Dedicated 11:30 AM Mid-Morning Fruit Snack
        DietMealDTO pl = new DietMealDTO("pre_lunch", "🍎 Pre-Lunch (11:30 AM Fruit Snack)", "11:30 AM");
        pl.setItems(buildFruitSnackItems(pool, isDefaultPool, calPreLunch, day));
        pl.recalculateTotals();
        meals.add(pl);

        // 3. Lunch: Hearty balanced combinations (1:30 PM)
        DietMealDTO l = new DietMealDTO("lunch", "🍱 Lunch", "1:30 PM");
        l.setItems(buildMealItems(pool, isDefaultPool, calLunch, "main", day, eggMealsCount));
        l.recalculateTotals();
        meals.add(l);

        // 4. Evening Snack (5:00 PM) - Authentic Indian Snack
        DietMealDTO es = new DietMealDTO("evening_snack", "☕ Evening Snack", "5:00 PM");
        es.setItems(buildMealItems(pool, isDefaultPool, calSnack, "snack", day, eggMealsCount));
        es.recalculateTotals();
        meals.add(es);

        // 5. Dinner (8:30 PM): Lighter portion
        DietMealDTO d = new DietMealDTO("dinner", "🌙 Dinner", "8:30 PM");
        d.setItems(buildMealItems(pool, isDefaultPool, calDinner, "dinner", day, eggMealsCount));
        d.recalculateTotals();
        meals.add(d);

        return meals;
    }

    private List<DietFoodItemDTO> buildBreakfastItems(List<String> pool, boolean isDefaultPool, double targetCal, int day, int[] eggMealsCount) {
        List<DietFoodItemDTO> items = new ArrayList<>();
        if (isDefaultPool) {
            String[] combo = INDIAN_BREAKFASTS_7[(day - 1) % INDIAN_BREAKFASTS_7.length];
            for (String item : combo) {
                if (item.toLowerCase().contains("egg")) {
                    if (eggMealsCount[0] < 2) {
                        eggMealsCount[0]++;
                        items.add(nutritionService.createItem(item, 100.0, null, "Freshly prepared"));
                    } else {
                        items.add(nutritionService.createItem("Paneer (Fresh/Raw)", 60.0, null, "Freshly prepared"));
                    }
                } else {
                    items.add(nutritionService.createItem(item, 100.0, null, "Freshly prepared"));
                }
            }
        } else {
            List<String> nonMeats = new ArrayList<>();
            for (String f : pool) {
                if (!isMeatName(f)) nonMeats.add(f);
            }
            if (nonMeats.isEmpty()) nonMeats.addAll(pool);

            int poolSize = nonMeats.size();
            int offset = ((day - 1) * 2) % poolSize;
            String item1 = nonMeats.get(offset % poolSize);
            String item2 = nonMeats.get((offset + 1) % poolSize);

            boolean mealHasEgg = false;
            if (item1.toLowerCase().contains("egg")) {
                if (eggMealsCount[0] < 2) mealHasEgg = true;
                else item1 = "Paneer (Fresh/Raw)";
            }
            if (item2.toLowerCase().contains("egg")) {
                if (eggMealsCount[0] < 2) mealHasEgg = true;
                else item2 = "Curd / Dahi (Low Fat)";
            }
            if (mealHasEgg) eggMealsCount[0]++;

            items.add(nutritionService.createItem(item1, 100.0, null, "Wholesome breakfast portion"));
            if (poolSize > 1) {
                items.add(nutritionService.createItem(item2, 110.0, null, "Fresh breakfast accompaniment"));
            }
        }
        scaleItemsToTargetCal(items, targetCal);
        return items;
    }

    private List<DietFoodItemDTO> buildFruitSnackItems(List<String> pool, boolean isDefaultPool, double targetCal, int day) {
        List<DietFoodItemDTO> items = new ArrayList<>();
        List<String> fruitsInPool = new ArrayList<>();
        for (String f : pool) {
            if (isFruitName(f)) fruitsInPool.add(f);
        }

        String fruitName;
        if (!fruitsInPool.isEmpty()) {
            fruitName = fruitsInPool.get((day - 1) % fruitsInPool.size());
        } else {
            fruitName = ROTATING_FRUITS_7[(day - 1) % ROTATING_FRUITS_7.length];
        }

        items.add(nutritionService.createItem(fruitName, 130.0, null, "Fresh sliced fruit snack"));
        items.add(nutritionService.createItem("Almonds", 20.0, null, "Healthy raw almonds"));
        scaleItemsToTargetCal(items, targetCal);
        return items;
    }

    private void scaleItemsToTargetCal(List<DietFoodItemDTO> items, double targetCal) {
        if (items == null || items.isEmpty()) return;

        double currentCal = 0;
        for (DietFoodItemDTO item : items) {
            currentCal += item.getCalories();
        }
        if (currentCal <= 0) return;

        double ratio = targetCal / currentCal;

        boolean hasChicken = false;
        boolean hasEgg = false;
        for (DietFoodItemDTO item : items) {
            if (item.getName() != null) {
                String nl = item.getName().toLowerCase();
                if (nl.contains("chicken")) hasChicken = true;
                if (nl.contains("egg")) hasEgg = true;
            }
        }

        if (hasChicken || (hasEgg && ratio > 1.0)) {
            List<DietFoodItemDTO> cappedItems = new ArrayList<>();
            List<DietFoodItemDTO> uncappedItems = new ArrayList<>();
            double cappedTotalCal = 0;

            for (DietFoodItemDTO item : items) {
                double origGrams = item.getQuantity() != null ? item.getQuantity() : 100.0;
                String nl = item.getName() != null ? item.getName().toLowerCase() : "";
                if (nl.contains("chicken")) {
                    double scaledGrams = Math.min(150.0, Math.max(50.0, Math.round(origGrams * ratio)));
                    DietFoodItemDTO scaled = nutritionService.createItem(
                        item.getName(), scaledGrams, "cooked", "Skinless lean chicken breast grilled with spices (150g max cooked weight)"
                    );
                    item.setQuantity(scaled.getQuantity());
                    item.setCalories(scaled.getCalories());
                    item.setProtein(scaled.getProtein());
                    item.setCarbs(scaled.getCarbs());
                    item.setFat(scaled.getFat());
                    item.setFibre(scaled.getFibre());
                    cappedItems.add(item);
                    cappedTotalCal += scaled.getCalories();
                } else if (nl.contains("egg")) {
                    double scaledGrams = Math.min(100.0, Math.max(50.0, Math.round(origGrams * ratio)));
                    DietFoodItemDTO scaled = nutritionService.createItem(
                        item.getName(), scaledGrams, item.getState() != null ? item.getState() : "cooked",
                        item.getPrepMethod() != null ? item.getPrepMethod() : "Boiled whole eggs seasoned with black pepper (cooked weight)"
                    );
                    item.setQuantity(scaled.getQuantity());
                    item.setCalories(scaled.getCalories());
                    item.setProtein(scaled.getProtein());
                    item.setCarbs(scaled.getCarbs());
                    item.setFat(scaled.getFat());
                    item.setFibre(scaled.getFibre());
                    cappedItems.add(item);
                    cappedTotalCal += scaled.getCalories();
                } else {
                    uncappedItems.add(item);
                }
            }

            if (uncappedItems.isEmpty()) return;

            double remainingTargetCal = Math.max(30.0, targetCal - cappedTotalCal);
            double uncappedCurrentCal = 0;
            for (DietFoodItemDTO item : uncappedItems) {
                uncappedCurrentCal += item.getCalories();
            }

            double uncappedRatio = uncappedCurrentCal > 0 ? (remainingTargetCal / uncappedCurrentCal) : 1.0;
            for (DietFoodItemDTO item : uncappedItems) {
                double orig = item.getQuantity() != null ? item.getQuantity() : 100.0;
                double newGrams = Math.max(15.0, Math.round(orig * uncappedRatio));
                DietFoodItemDTO scaled = nutritionService.createItem(item.getName(), newGrams, item.getState(), item.getPrepMethod());
                item.setQuantity(scaled.getQuantity());
                item.setCalories(scaled.getCalories());
                item.setProtein(scaled.getProtein());
                item.setCarbs(scaled.getCarbs());
                item.setFat(scaled.getFat());
                item.setFibre(scaled.getFibre());
            }
            return;
        }

        for (DietFoodItemDTO item : items) {
            double origGrams = item.getQuantity() != null ? item.getQuantity() : 100.0;
            double newGrams = Math.max(10.0, Math.round(origGrams * ratio));
            DietFoodItemDTO scaled = nutritionService.createItem(item.getName(), newGrams, item.getState(), item.getPrepMethod());
            item.setQuantity(scaled.getQuantity());
            item.setCalories(scaled.getCalories());
            item.setProtein(scaled.getProtein());
            item.setCarbs(scaled.getCarbs());
            item.setFat(scaled.getFat());
            item.setFibre(scaled.getFibre());
        }
    }

    private List<DietFoodItemDTO> buildMealItems(List<String> pool, boolean isDefaultPool, double targetCal, String mealCategory, int day, int[] eggMealsCount) {
        List<DietFoodItemDTO> items = new ArrayList<>();
        if (pool == null || pool.isEmpty()) {
            return items;
        }

        if (isDefaultPool) {
            if ("main".equals(mealCategory)) {
                String[] combo = INDIAN_LUNCH_COMBOS_7[(day - 1) % INDIAN_LUNCH_COMBOS_7.length];
                for (String name : combo) {
                    items.add(nutritionService.createItem(name, 120.0, null, "Freshly prepared wholesome"));
                }
            } else if ("snack".equals(mealCategory)) {
                String[] combo = INDIAN_SNACKS_7[(day - 1) % INDIAN_SNACKS_7.length];
                for (String name : combo) {
                    if (name.toLowerCase().contains("egg")) {
                        if (eggMealsCount[0] < 2) {
                            eggMealsCount[0]++;
                            items.add(nutritionService.createItem(name, 50.0, null, "Wholesome evening snack"));
                        } else {
                            items.add(nutritionService.createItem("Curd / Dahi (Low Fat)", 100.0, null, "Wholesome evening snack"));
                        }
                    } else {
                        items.add(nutritionService.createItem(name, 50.0, null, "Wholesome evening snack"));
                    }
                }
            } else if ("dinner".equals(mealCategory)) {
                String[] combo = INDIAN_DINNER_COMBOS_7[(day - 1) % INDIAN_DINNER_COMBOS_7.length];
                for (String name : combo) {
                    if (name.toLowerCase().contains("egg")) {
                        if (eggMealsCount[0] < 2) {
                            eggMealsCount[0]++;
                            items.add(nutritionService.createItem(name, 100.0, null, "Light evening portion"));
                        } else {
                            items.add(nutritionService.createItem("Paneer (Fresh/Raw)", 60.0, null, "Light evening portion"));
                        }
                    } else {
                        items.add(nutritionService.createItem(name, 100.0, null, "Light evening portion"));
                    }
                }
            }
        } else {
            // Strictly use confirmed pool
            List<String> candidates = new ArrayList<>(pool);
            Collections.rotate(candidates, ((day - 1) * 2) % candidates.size());

            if ("snack".equals(mealCategory)) {
                String snackItem = null;
                for (String f : candidates) {
                    String l = f.toLowerCase();
                    if (l.contains("egg")) {
                        if (eggMealsCount[0] < 2) {
                            eggMealsCount[0]++;
                            snackItem = f;
                            break;
                        }
                    } else if (l.contains("paneer") || l.contains("almond") || l.contains("peanut") || l.contains("curd") || l.contains("yogurt") || isFruitName(f)) {
                        snackItem = f;
                        break;
                    }
                }
                if (snackItem == null) snackItem = "Curd / Dahi (Low Fat)";
                items.add(nutritionService.createItem(snackItem, 80.0, null, "Wholesome snack portion"));
            } else if ("main".equals(mealCategory)) {
                String carb = pool.stream().filter(f -> f.toLowerCase().contains("rice") || f.toLowerCase().contains("roti") || f.toLowerCase().contains("chapati")).findFirst().orElse("White Rice (Cooked)");
                String protein = candidates.get(0);
                if (protein.toLowerCase().contains("rice") || protein.toLowerCase().contains("roti")) {
                    protein = candidates.size() > 1 ? candidates.get(1) : "Chicken Breast (Grilled)";
                }
                boolean lunchHasEgg = false;
                if (protein.toLowerCase().contains("egg")) {
                    if (eggMealsCount[0] < 2) {
                        lunchHasEgg = true;
                    } else {
                        protein = "Paneer (Fresh/Raw)";
                    }
                }
                if (lunchHasEgg) eggMealsCount[0]++;

                items.add(nutritionService.createItem(carb, 150.0, null, "Steamed wholesome portion"));
                items.add(nutritionService.createItem(protein, 120.0, null, "Hearty protein portion"));

                String side = "Mixed Green Salad";
                for (String c : candidates) {
                    if (c.toLowerCase().contains("salad") || c.toLowerCase().contains("cucumber") || c.toLowerCase().contains("spinach")) {
                        side = c;
                        break;
                    }
                }
                items.add(nutritionService.createItem(side, 70.0, null, "Fresh side accompaniment"));
            } else {
                String carb = pool.stream().filter(f -> f.toLowerCase().contains("roti") || f.toLowerCase().contains("chapati") || f.toLowerCase().contains("rice")).findFirst().orElse("Whole Wheat Chapati / Roti");
                String protein = candidates.size() > 1 ? candidates.get(candidates.size() - 1) : candidates.get(0);
                if (protein.toLowerCase().contains("rice") || protein.toLowerCase().contains("roti") || protein.toLowerCase().contains("chicken")) {
                    protein = "Paneer (Fresh/Raw)";
                }
                boolean dinnerHasEgg = false;
                if (protein.toLowerCase().contains("egg")) {
                    if (eggMealsCount[0] < 2) {
                        dinnerHasEgg = true;
                    } else {
                        protein = "Paneer (Fresh/Raw)";
                    }
                }
                if (dinnerHasEgg) eggMealsCount[0]++;

                items.add(nutritionService.createItem(carb, 100.0, null, "Light evening grain"));
                items.add(nutritionService.createItem(protein, 100.0, null, "Light evening protein"));
            }
        }

        scaleItemsToTargetCal(items, targetCal);
        return items;
    }

    public List<String> resolveDynamicFoodsList(String goal, String preference) {
        List<String> list = new ArrayList<>();
        list.add("Idli (Steamed)");
        list.add("Sambar");
        list.add("Dosa (Plain)");
        list.add("Poha (Cooked)");
        list.add("Upma (Rava Upma)");
        list.add("Pongal (Ven Pongal)");
        list.add("Whole Wheat Chapati / Roti");
        list.add("Brown Rice (Cooked)");
        list.add("White Rice (Cooked)");
        list.add("Moong Dal (Cooked)");
        list.add("Paneer (Raw/Fresh)");
        list.add("Curd / Dahi (Low Fat)");
        list.add("Greek Yogurt");
        list.add("Apple");
        list.add("Banana");
        list.add("Papaya");
        list.add("Guava");
        list.add("Orange");
        list.add("Watermelon");
        list.add("Pomegranate");
        list.add("Almonds");
        list.add("Spinach (Raw)");
        list.add("Cucumber");
        if (!"vegetarian".equalsIgnoreCase(preference) && !"vegan".equalsIgnoreCase(preference)) {
            list.add("Chicken Breast (Cooked/Grilled)");
            list.add("Eggs (Whole Boiled)");
            list.add("Fish (Rohu/Local White, Steamed)");
        }
        return list;
    }

    @Transactional
    public DietPlanDTO naturalLanguageEditPlan(String email, Long planId, String editRequest, DietPlanDTO activePlan) {
        DietPlanDTO plan = activePlan;
        if (plan == null && planId != null) {
            plan = getPlanById(planId);
        }
        if (plan == null) {
            throw new IllegalArgumentException("No active diet plan found to edit.");
        }

        String req = editRequest != null ? editRequest.toLowerCase().trim() : "";
        Map<String, List<DietMealDTO>> days = plan.getDays();
        if (days == null || days.isEmpty()) return plan;

        // Iterate through days and apply precision modifications
        for (Map.Entry<String, List<DietMealDTO>> entry : days.entrySet()) {
            List<DietMealDTO> meals = entry.getValue();

            // 1. "Make dinner lighter"
            if (req.contains("dinner") && (req.contains("light") || req.contains("less") || req.contains("reduce"))) {
                for (DietMealDTO meal : meals) {
                    if ("dinner".equalsIgnoreCase(meal.getSlot())) {
                        for (DietFoodItemDTO item : meal.getItems()) {
                            double newG = Math.max(30, Math.round(item.getQuantity() * 0.70));
                            DietFoodItemDTO sc = nutritionService.createItem(item.getName(), newG, item.getState(), item.getPrepMethod());
                            item.setQuantity(sc.getQuantity());
                            item.setCalories(sc.getCalories());
                            item.setProtein(sc.getProtein());
                            item.setCarbs(sc.getCarbs());
                            item.setFat(sc.getFat());
                            item.setFibre(sc.getFibre());
                        }
                        meal.recalculateTotals();
                    }
                }
            }

            // 2. "Make the plan vegetarian"
            if (req.contains("vegetarian") || req.contains("veg only")) {
                for (DietMealDTO meal : meals) {
                    List<DietFoodItemDTO> newItems = new ArrayList<>();
                    for (DietFoodItemDTO item : meal.getItems()) {
                        String name = item.getName().toLowerCase();
                        if (name.contains("chicken") || name.contains("egg") || name.contains("fish") || name.contains("meat")) {
                            DietFoodItemDTO vegSub = nutritionService.createItem("Paneer (Raw/Fresh)", item.getQuantity(), "fresh", "Freshly cut paneer cubes");
                            newItems.add(vegSub);
                        } else {
                            newItems.add(item);
                        }
                    }
                    meal.setItems(newItems);
                }
            }

            // 3. "Replace snack with a fruit"
            if (req.contains("snack") && (req.contains("fruit") || req.contains("apple") || req.contains("banana"))) {
                for (DietMealDTO meal : meals) {
                    if ("evening_snack".equalsIgnoreCase(meal.getSlot()) || "pre_lunch".equalsIgnoreCase(meal.getSlot())) {
                        List<DietFoodItemDTO> fruitItems = List.of(
                                nutritionService.createItem(req.contains("banana") ? "Banana" : "Apple", 150.0, "fresh", "Washed & fresh")
                        );
                        meal.setItems(fruitItems);
                    }
                }
            }

            // 4. "Replace [X] with [Y]"
            if (req.contains("replace") && req.contains("with")) {
                String[] parts = req.split("with");
                String oldItemQuery = parts[0].replace("replace", "").trim();
                String newItemQuery = parts.length > 1 ? parts[1].trim() : "";
                if (!oldItemQuery.isEmpty() && !newItemQuery.isEmpty()) {
                    for (DietMealDTO meal : meals) {
                        for (int i = 0; i < meal.getItems().size(); i++) {
                            DietFoodItemDTO it = meal.getItems().get(i);
                            if (it.getName().toLowerCase().contains(oldItemQuery)) {
                                DietFoodItemDTO rep = nutritionService.createItem(newItemQuery, it.getQuantity(), null, "Freshly prepared");
                                meal.getItems().set(i, rep);
                            }
                        }
                        meal.recalculateTotals();
                    }
                }
            }

            // 5. "Increase calories" / "Decrease calories"
            if (req.contains("increase cal") || req.contains("more calories")) {
                for (DietMealDTO meal : meals) {
                    for (DietFoodItemDTO item : meal.getItems()) {
                        double newG = Math.round(item.getQuantity() * 1.15);
                        DietFoodItemDTO sc = nutritionService.createItem(item.getName(), newG, item.getState(), item.getPrepMethod());
                        item.setQuantity(sc.getQuantity());
                        item.setCalories(sc.getCalories());
                        item.setProtein(sc.getProtein());
                        item.setCarbs(sc.getCarbs());
                        item.setFat(sc.getFat());
                        item.setFibre(sc.getFibre());
                    }
                    meal.recalculateTotals();
                }
            } else if (req.contains("decrease cal") || req.contains("lower calories") || req.contains("cut calories")) {
                for (DietMealDTO meal : meals) {
                    for (DietFoodItemDTO item : meal.getItems()) {
                        double newG = Math.max(25, Math.round(item.getQuantity() * 0.88));
                        DietFoodItemDTO sc = nutritionService.createItem(item.getName(), newG, item.getState(), item.getPrepMethod());
                        item.setQuantity(sc.getQuantity());
                        item.setCalories(sc.getCalories());
                        item.setProtein(sc.getProtein());
                        item.setCarbs(sc.getCarbs());
                        item.setFat(sc.getFat());
                        item.setFibre(sc.getFibre());
                    }
                    meal.recalculateTotals();
                }
            }
        }

        // Recalculate daily totals and target
        List<DietMealDTO> day1 = days.get("Day 1") != null ? days.get("Day 1") : days.values().iterator().next();
        Map<String, Double> newTotals = nutritionService.computeDailyTotals(day1);
        plan.setCalorieTarget(newTotals.get("calories"));
        plan.setProteinTarget(newTotals.get("protein"));
        plan.setCarbsTarget(newTotals.get("carbs"));
        plan.setFatTarget(newTotals.get("fat"));
        plan.setFibreTarget(newTotals.get("fibre"));

        // If saved in DB, update
        final DietPlanDTO finalPlan = plan;
        if (finalPlan.getId() != null) {
            dietPlanRepository.findById(finalPlan.getId()).ifPresent(entity -> {
                try {
                    entity.setPlanJson(objectMapper.writeValueAsString(finalPlan.getDays()));
                    entity.setCalorieTarget(finalPlan.getCalorieTarget());
                    entity.setProteinTarget(finalPlan.getProteinTarget());
                    entity.setCarbsTarget(finalPlan.getCarbsTarget());
                    entity.setFatTarget(finalPlan.getFatTarget());
                    entity.setFibreTarget(finalPlan.getFibreTarget());
                    dietPlanRepository.save(entity);
                } catch (Exception ignored) {}
            });
        }

        return plan;
    }

    private void savePlanToDatabase(User user, DietPlanDTO dto) {
        try {
            DietPlan entity = new DietPlan();
            entity.setUser(user);
            entity.setTitle(dto.getTitle());
            entity.setPlanType(dto.getPlanType());
            entity.setGoal(dto.getGoal());
            entity.setCalorieTarget(dto.getCalorieTarget());
            entity.setBmr(dto.getBmr());
            entity.setTdee(dto.getTdee());
            entity.setProteinTarget(dto.getProteinTarget());
            entity.setCarbsTarget(dto.getCarbsTarget());
            entity.setFatTarget(dto.getFatTarget());
            entity.setFibreTarget(dto.getFibreTarget());
            entity.setPlanJson(objectMapper.writeValueAsString(dto.getDays()));
            entity.setConfirmedFoodsJson(objectMapper.writeValueAsString(dto.getConfirmedFoods()));
            entity.setDoctorNotes(dto.getDoctorNotes());
            entity.setStatus("ACTIVE");

            DietPlan saved = dietPlanRepository.save(entity);
            dto.setId(saved.getId());
        } catch (Exception e) {
            log.warn("Could not save diet plan to MySQL: {}", e.getMessage());
        }
    }

    public DietPlanDTO getActivePlan(String email) {
        if (email == null || email.trim().isEmpty()) return null;
        return userRepository.findByEmail(email.trim().toLowerCase())
                .flatMap(user -> dietPlanRepository.findTopByUserAndStatusOrderByCreatedAtDesc(user, "ACTIVE"))
                .map(this::toDTO)
                .orElse(null);
    }

    public List<DietPlanDTO> getPlanHistory(String email) {
        if (email == null || email.trim().isEmpty()) return Collections.emptyList();
        return userRepository.findByEmail(email.trim().toLowerCase())
                .map(user -> dietPlanRepository.findByUserOrderByCreatedAtDesc(user).stream().map(this::toDTO).toList())
                .orElse(Collections.emptyList());
    }

    @Transactional
    public boolean deleteDietPlan(String email, Long planId) {
        if (email == null || planId == null) return false;
        Optional<User> userOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (userOpt.isEmpty()) return false;
        User user = userOpt.get();
        Optional<DietPlan> planOpt = dietPlanRepository.findById(planId);
        if (planOpt.isPresent()) {
            DietPlan plan = planOpt.get();
            if (plan.getUser() != null && plan.getUser().getId().equals(user.getId())) {
                dietPlanRepository.delete(plan);
                return true;
            }
        }
        return false;
    }

    public DietPlanDTO getPlanById(Long id) {
        return dietPlanRepository.findById(id).map(this::toDTO).orElse(null);
    }

    private DietPlanDTO toDTO(DietPlan entity) {
        DietPlanDTO dto = new DietPlanDTO();
        dto.setId(entity.getId());
        dto.setEmail(entity.getUser().getEmail());
        dto.setTitle(entity.getTitle());
        dto.setPlanType(entity.getPlanType());
        dto.setGoal(entity.getGoal());
        dto.setCalorieTarget(entity.getCalorieTarget());
        dto.setBmr(entity.getBmr());
        dto.setTdee(entity.getTdee());
        dto.setProteinTarget(entity.getProteinTarget());
        dto.setCarbsTarget(entity.getCarbsTarget());
        dto.setFatTarget(entity.getFatTarget());
        dto.setFibreTarget(entity.getFibreTarget());
        dto.setDoctorNotes(entity.getDoctorNotes());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) : "");

        try {
            if (entity.getPlanJson() != null) {
                Map<String, List<DietMealDTO>> days = objectMapper.readValue(entity.getPlanJson(), new TypeReference<Map<String, List<DietMealDTO>>>() {});
                dto.setDays(days);
            }
            if (entity.getConfirmedFoodsJson() != null) {
                List<String> foods = objectMapper.readValue(entity.getConfirmedFoodsJson(), new TypeReference<List<String>>() {});
                dto.setConfirmedFoods(foods);
            }
        } catch (Exception e) {
            log.warn("Error parsing diet plan JSON: {}", e.getMessage());
        }
        return dto;
    }

    @Transactional(readOnly = true)
    public List<String> getConfirmedFoodsForUser(String email) {
        if (email == null || email.trim().isEmpty()) return Collections.emptyList();
        Optional<User> uOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (uOpt.isEmpty()) return Collections.emptyList();

        User user = uOpt.get();
        // 1. Check UserProfile first
        Optional<UserProfile> pOpt = userProfileRepository.findByUser(user);
        if (pOpt.isPresent() && pOpt.get().getConfirmedFoodsJson() != null && !pOpt.get().getConfirmedFoodsJson().trim().isEmpty()) {
            try {
                List<String> list = objectMapper.readValue(pOpt.get().getConfirmedFoodsJson(), new TypeReference<List<String>>() {});
                if (list != null && !list.isEmpty()) return list;
            } catch (Exception ignored) {}
        }

        // 2. Fallback to active DietPlan confirmed_foods_json
        List<DietPlan> plans = dietPlanRepository.findByUserOrderByCreatedAtDesc(user);
        for (DietPlan plan : plans) {
            if (plan.getConfirmedFoodsJson() != null && !plan.getConfirmedFoodsJson().trim().isEmpty()) {
                try {
                    List<String> list = objectMapper.readValue(plan.getConfirmedFoodsJson(), new TypeReference<List<String>>() {});
                    if (list != null && !list.isEmpty()) return list;
                } catch (Exception ignored) {}
            }
        }
        return Collections.emptyList();
    }

    @Transactional
    public List<String> saveConfirmedFoodsForUser(String email, List<String> confirmedFoods) {
        if (email == null || email.trim().isEmpty()) return Collections.emptyList();
        Optional<User> uOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (uOpt.isEmpty()) return Collections.emptyList();

        User user = uOpt.get();
        UserProfile profile = userProfileRepository.findByUser(user).orElseGet(() -> {
            UserProfile newProfile = new UserProfile();
            newProfile.setUser(user);
            return newProfile;
        });

        List<String> cleanedList = new ArrayList<>();
        if (confirmedFoods != null) {
            for (String f : confirmedFoods) {
                if (f != null && !f.trim().isEmpty() && !cleanedList.contains(f.trim())) {
                    cleanedList.add(f.trim());
                }
            }
        }

        try {
            String json = objectMapper.writeValueAsString(cleanedList);
            profile.setConfirmedFoodsJson(json);
            userProfileRepository.save(profile);
        } catch (Exception e) {
            log.error("Failed to serialize confirmed foods for user {}: {}", email, e.getMessage());
        }

        return cleanedList;
    }
}

