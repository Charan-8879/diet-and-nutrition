package com.healthify.service;

import com.healthify.dto.DietFoodItemDTO;
import com.healthify.dto.DietMealDTO;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class NutritionCalculationService {

    public record FoodNutrient(String name, String emoji, double calPer100g, double proPer100g,
                               double carbsPer100g, double fatPer100g, double fibPer100g,
                               String defaultState, String category, String valueSource, boolean isEstimated) {}

    private final Map<String, FoodNutrient> database = new LinkedHashMap<>();

    public NutritionCalculationService() {
        initDatabase();
    }

    private void add(String name, String emoji, double cal, double pro, double carbs, double fat, double fib,
                     String state, String cat, String source, boolean isEstimated, String... aliases) {
        FoodNutrient fn = new FoodNutrient(name, emoji, cal, pro, carbs, fat, fib, state, cat, source, isEstimated);
        database.put(name.toLowerCase(), fn);
        for (String alias : aliases) {
            database.put(alias.toLowerCase(), fn);
        }
    }

    private void addUsda(String name, String emoji, double cal, double pro, double carbs, double fat, double fib, String state, String cat, String... aliases) {
        add(name, emoji, cal, pro, carbs, fat, fib, state, cat, "USDA FoodData Central", false, aliases);
    }

    private void addIfct(String name, String emoji, double cal, double pro, double carbs, double fat, double fib, String state, String cat, String... aliases) {
        add(name, emoji, cal, pro, carbs, fat, fib, state, cat, "ICMR-NIN IFCT", false, aliases);
    }

    private void initDatabase() {
        // --- GRAINS & STARCHES (Raw vs Cooked Grounded in USDA & IFCT) ---
        addUsda("Oats (Raw)", "🥣", 389, 16.9, 66.3, 6.9, 10.6, "raw", "grain", "oats", "dry oats", "raw oats", "rolled oats", "uncooked oats", "oatmeal");
        addUsda("Oats (Cooked/Porridge)", "🥣", 71, 2.5, 12.0, 1.5, 1.7, "cooked", "grain", "cooked oats", "oat porridge", "porridge");
        addUsda("White Rice (Raw)", "🍚", 360, 7.0, 79.0, 0.6, 1.3, "raw", "grain", "raw rice", "uncooked rice", "raw white rice", "uncooked white rice");
        addUsda("White Rice (Cooked)", "🍚", 130, 2.7, 28.2, 0.3, 0.4, "cooked", "grain", "rice", "cooked rice", "white rice", "boiled rice");
        addUsda("Brown Rice (Raw)", "🍚", 362, 7.5, 76.0, 2.7, 3.4, "raw", "grain", "raw brown rice", "uncooked brown rice");
        addUsda("Brown Rice (Cooked)", "🍚", 111, 2.6, 23.0, 0.9, 1.8, "cooked", "grain", "brown rice", "cooked brown rice");
        addIfct("Whole Wheat Chapati / Roti", "🫓", 260, 9.0, 52.0, 3.5, 7.0, "cooked", "grain", "chapati", "roti", "phulka");
        addUsda("Whole Wheat Bread", "🍞", 247, 13.0, 41.0, 3.4, 7.0, "cooked", "grain", "bread", "brown bread", "whole wheat bread");
        addUsda("Quinoa (Cooked)", "🌾", 120, 4.4, 21.3, 1.9, 2.8, "cooked", "grain", "quinoa", "cooked quinoa");
        addUsda("Sweet Potato (Boiled)", "🍠", 86, 1.6, 20.1, 0.1, 3.0, "cooked", "starch", "sweet potato", "boiled sweet potato");
        addIfct("Poha (Cooked)", "🥣", 130, 2.5, 26.0, 2.0, 1.2, "cooked", "grain", "poha", "flattened rice");
        addIfct("Idli (Steamed)", "⚪", 135, 4.0, 28.0, 0.5, 1.5, "cooked", "grain", "idli", "idlis", "steamed idli");
        addIfct("Sambar", "🍲", 55, 2.5, 9.0, 1.2, 2.2, "cooked", "legume", "sambar");
        addIfct("Dosa (Plain)", "🥞", 168, 4.5, 29.0, 3.8, 1.8, "cooked", "grain", "dosa", "plain dosa");
        addIfct("Coconut Chutney", "🥥", 180, 2.5, 6.0, 17.0, 3.0, "fresh", "condiment", "coconut chutney", "chutney");
        addIfct("Peanut / Groundnut Chutney", "🥜", 220, 6.5, 8.0, 18.0, 2.5, "fresh", "condiment", "peanut chutney", "groundnut chutney");
        addIfct("Pongal (Ven Pongal)", "🥣", 175, 4.2, 26.0, 6.0, 2.0, "cooked", "grain", "pongal", "ven pongal");
        addIfct("Upma (Rava Upma)", "🥣", 135, 3.5, 24.0, 3.0, 1.8, "cooked", "grain", "upma", "rava upma");

        // --- PROTEIN: DAIRY & VEG ---
        addIfct("Paneer (Raw/Fresh)", "🧀", 265, 18.3, 3.5, 20.8, 0.0, "raw", "dairy", "paneer", "cottage cheese", "fresh paneer", "raw paneer");
        addUsda("Tofu (Firm)", "🧊", 76, 8.0, 1.9, 4.8, 0.3, "raw", "soy", "tofu", "soya paneer");
        addIfct("Soy Chunks (Dried)", "🧆", 345, 52.0, 33.0, 0.5, 13.0, "raw", "soy", "soy chunks", "soya chunks", "meal maker");
        addUsda("Greek Yogurt", "🥛", 59, 10.0, 3.6, 0.4, 0.0, "fresh", "dairy", "greek yogurt", "hung curd");
        addIfct("Curd / Dahi (Low Fat)", "🥣", 60, 3.5, 4.5, 3.0, 0.0, "fresh", "dairy", "curd", "dahi", "yogurt");
        addIfct("Cow's Milk (Toned)", "🥛", 58, 3.2, 4.8, 3.1, 0.0, "fresh", "dairy", "milk");

        // --- PROTEIN: LEGUMES & DAL ---
        addIfct("Moong Dal (Raw)", "🥣", 347, 24.0, 59.8, 1.2, 16.3, "raw", "legume", "raw dal", "raw moong dal", "dry dal", "dry moong dal");
        addIfct("Moong Dal (Cooked)", "🥣", 105, 7.1, 19.0, 0.4, 5.3, "cooked", "legume", "moong dal", "yellow dal", "dal", "cooked dal");
        addUsda("Lentils / Dal (Cooked)", "🍲", 116, 9.0, 20.1, 0.4, 7.9, "cooked", "legume", "lentils", "masoor dal", "cooked lentils");
        addUsda("Chickpeas / Chana (Raw)", "🧆", 364, 19.3, 60.6, 6.0, 17.4, "raw", "legume", "raw chana", "raw chickpeas", "dry chickpeas");
        addUsda("Chickpeas / Chana (Cooked)", "🧆", 164, 8.9, 27.4, 2.6, 7.6, "cooked", "legume", "chickpeas", "chana", "boiled chana");
        addUsda("Kidney Beans / Rajma (Cooked)", "🫘", 127, 8.7, 22.8, 0.5, 6.4, "cooked", "legume", "rajma", "kidney beans");
        addUsda("Sprouted Moong (Raw)", "🌱", 31, 3.2, 5.9, 0.2, 1.8, "raw", "legume", "sprouts", "sprouted moong", "green gram sprouts");

        // --- PROTEIN: NON-VEG (Grounded in USDA FoodData Central & IFCT) ---
        addUsda("Chicken Breast (Raw)", "🍗", 120, 22.5, 0.0, 2.6, 0.0, "raw", "meat", "raw chicken breast", "raw chicken", "uncooked chicken breast");
        addUsda("Chicken Breast (Cooked/Grilled)", "🍗", 165, 31.0, 0.0, 3.6, 0.0, "cooked", "meat", "chicken breast", "grilled chicken", "chicken", "cooked chicken", "roasted chicken breast", "roasted chicken", "cooked chicken breast", "grilled chicken breast");
        addUsda("Eggs (Whole Boiled)", "🥚", 155, 13.0, 1.1, 11.0, 0.0, "cooked", "egg", "egg", "boiled egg", "eggs", "whole boiled egg");
        addUsda("Egg Whites (Boiled)", "🍳", 52, 11.0, 0.7, 0.2, 0.0, "cooked", "egg", "egg white", "egg whites", "boiled egg whites");
        addUsda("Salmon (Grilled)", "🐟", 208, 20.0, 0.0, 13.0, 0.0, "cooked", "fish", "salmon", "grilled salmon");
        addIfct("Fish (Rohu/Local White, Steamed)", "🐠", 97, 17.0, 0.0, 2.5, 0.0, "cooked", "fish", "fish", "rohu fish", "tilapia", "steamed fish");
        addUsda("Tuna (Canned in Water)", "🍣", 130, 28.0, 0.0, 1.0, 0.0, "cooked", "fish", "tuna");

        // --- NUTS & SEEDS ---
        addUsda("Almonds", "🥜", 579, 21.2, 21.6, 49.9, 12.5, "raw", "nuts", "almonds", "badam");
        addUsda("Walnuts", "🌰", 654, 15.2, 13.7, 65.2, 6.7, "raw", "nuts", "walnuts", "akhrot");
        addUsda("Peanuts (Roasted)", "🥜", 567, 25.8, 16.1, 49.2, 8.5, "cooked", "nuts", "peanuts", "groundnuts", "roasted peanuts");
        addUsda("Peanut Butter", "🥜", 588, 25.0, 20.0, 50.0, 6.0, "fresh", "nuts", "peanut butter");
        addUsda("Chia Seeds", "🥣", 486, 16.5, 42.1, 30.7, 34.4, "raw", "seeds", "chia seeds");
        addUsda("Flax Seeds", "🌱", 534, 18.3, 28.9, 42.2, 27.3, "raw", "seeds", "flax seeds");
        addUsda("Pumpkin Seeds", "🎃", 559, 30.2, 10.7, 49.1, 6.0, "raw", "seeds", "pumpkin seeds");

        // --- VEGETABLES ---
        addUsda("Spinach (Raw)", "🥬", 23, 2.9, 3.6, 0.4, 2.2, "raw", "veggie", "spinach", "palak");
        addUsda("Broccoli (Steamed)", "🥦", 34, 2.8, 6.6, 0.4, 2.6, "cooked", "veggie", "broccoli");
        addUsda("Cucumber", "🥒", 15, 0.7, 3.6, 0.1, 0.5, "fresh", "veggie", "cucumber", "salad");
        addUsda("Tomato", "🍅", 18, 0.9, 3.9, 0.2, 1.2, "fresh", "veggie", "tomato");
        addUsda("Mixed Green Salad", "🥗", 20, 1.5, 4.0, 0.2, 2.0, "fresh", "veggie", "salad", "mixed salad", "mixed green salad");
        addUsda("Carrot (Raw)", "🥕", 41, 0.9, 9.6, 0.2, 2.8, "fresh", "veggie", "carrot");

        // --- 7 ROTATING FRUITS (Dedicated 11:30 AM Mid-Morning Snack - Grounded in USDA & IFCT) ---
        addUsda("Apple", "🍎", 52, 0.3, 13.8, 0.2, 2.4, "fresh", "fruit", "apple", "apples");
        addUsda("Banana", "🍌", 89, 1.1, 22.8, 0.3, 2.6, "fresh", "fruit", "banana", "bananas", "fresh banana", "raw banana");
        addUsda("Papaya", "🍈", 43, 0.5, 10.8, 0.3, 1.7, "fresh", "fruit", "papaya");
        addIfct("Guava", "🍐", 68, 2.6, 14.3, 1.0, 5.4, "fresh", "fruit", "guava");
        addUsda("Orange", "🍊", 47, 0.9, 11.8, 0.1, 2.4, "fresh", "fruit", "orange", "oranges");
        addUsda("Watermelon", "🍉", 30, 0.6, 7.6, 0.2, 0.4, "fresh", "fruit", "watermelon");
        addUsda("Pomegranate", "🫐", 83, 1.7, 18.7, 1.2, 4.0, "fresh", "fruit", "pomegranate", "anar");

        // --- OILS & CONDIMENTS ---
        addUsda("Olive Oil", "🫒", 884, 0.0, 0.0, 100.0, 0.0, "raw", "oil", "olive oil");
        addIfct("Desi Ghee", "🧈", 900, 0.0, 0.0, 99.5, 0.0, "cooked", "oil", "ghee");
    }

    public List<String> findMatchingFoods(String text) {
        if (text == null || text.trim().isEmpty()) return Collections.emptyList();
        String lower = text.toLowerCase();
        Set<String> matches = new LinkedHashSet<>();
        for (Map.Entry<String, FoodNutrient> entry : database.entrySet()) {
            String alias = entry.getKey();
            if (alias.length() >= 3) {
                java.util.regex.Pattern p = java.util.regex.Pattern.compile("(?i)\\b" + java.util.regex.Pattern.quote(alias) + "\\b");
                if (p.matcher(lower).find()) {
                    matches.add(entry.getValue().name());
                }
            }
        }
        return new ArrayList<>(matches);
    }

    public FoodNutrient lookup(String foodName) {
        if (foodName == null || foodName.trim().isEmpty()) {
            return database.get("mixed green salad");
        }
        String clean = foodName.toLowerCase().trim();
        if (database.containsKey(clean)) return database.get(clean);

        // State-aware matching: raw vs cooked
        boolean isRaw = clean.contains("raw") || clean.contains("uncooked") || clean.contains("dry");
        boolean isCooked = clean.contains("cooked") || clean.contains("grilled") || clean.contains("roasted") || clean.contains("boiled") || clean.contains("steamed");

        // Strip state words to test base name
        String core = clean.replaceAll("\\b(raw|cooked|boiled|grilled|steamed|roasted|fresh|dry|uncooked)\\b", "").replaceAll("[\\(\\)]", "").trim();
        if (!core.isEmpty() && database.containsKey(core)) {
            return database.get(core);
        }

        // Exact Word Boundary matching (never arbitrary substring)
        for (Map.Entry<String, FoodNutrient> entry : database.entrySet()) {
            String key = entry.getKey();
            Pattern p = Pattern.compile("\\b" + Pattern.quote(key) + "\\b", Pattern.CASE_INSENSITIVE);
            if (p.matcher(clean).find()) {
                if (isRaw && "raw".equalsIgnoreCase(entry.getValue().defaultState())) return entry.getValue();
                if (isCooked && ("cooked".equalsIgnoreCase(entry.getValue().defaultState()) || "fresh".equalsIgnoreCase(entry.getValue().defaultState()))) return entry.getValue();
                return entry.getValue();
            }
        }

        // Generic healthy food fallback (clearly marked as ESTIMATED)
        return new FoodNutrient(foodName.trim(), "🥗", 120.0, 6.0, 15.0, 3.0, 2.5, isRaw ? "raw" : "cooked", "general", "ESTIMATED", true);
    }

    public DietFoodItemDTO createItem(String name, double grams, String state, String prepMethod) {
        FoodNutrient fn = lookup(name);
        double factor = grams / 100.0;
        double cal = Math.round(fn.calPer100g * factor * 10.0) / 10.0;
        double pro = Math.round(fn.proPer100g * factor * 10.0) / 10.0;
        double carbs = Math.round(fn.carbsPer100g * factor * 10.0) / 10.0;
        double fat = Math.round(fn.fatPer100g * factor * 10.0) / 10.0;
        double fib = Math.round(fn.fibPer100g * factor * 10.0) / 10.0;

        String unit = "g";
        String resolvedState = (state != null && !state.isEmpty()) ? state : fn.defaultState();
        String resolvedPrep = (prepMethod != null && !prepMethod.isEmpty()) ? prepMethod : "Freshly prepared";

        // CRITICAL: Always preserve user's actual confirmed food name
        String displayName = (name != null && !name.trim().isEmpty()) ? name.trim() : fn.name();

        return new DietFoodItemDTO(displayName, fn.emoji(), grams, unit, resolvedState, resolvedPrep, cal, pro, carbs, fat, fib, fn.valueSource(), fn.isEstimated());
    }

    public void recalculateDay(List<DietMealDTO> meals) {
        if (meals == null) return;
        for (DietMealDTO meal : meals) {
            meal.recalculateTotals();
        }
    }

    public Map<String, Double> computeDailyTotals(List<DietMealDTO> meals) {
        double unroundedCal = 0, unroundedPro = 0, unroundedCarbs = 0, unroundedFat = 0, unroundedFib = 0;
        if (meals != null) {
            for (DietMealDTO meal : meals) {
                meal.recalculateTotals();
                if (meal.getItems() != null && !meal.getItems().isEmpty()) {
                    for (DietFoodItemDTO it : meal.getItems()) {
                        FoodNutrient fn = lookup(it.getName());
                        double factor = it.getQuantity() != null ? (it.getQuantity() / 100.0) : 1.0;
                        unroundedCal += (fn.calPer100g() * factor);
                        unroundedPro += (fn.proPer100g() * factor);
                        unroundedCarbs += (fn.carbsPer100g() * factor);
                        unroundedFat += (fn.fatPer100g() * factor);
                        unroundedFib += (fn.fibPer100g() * factor);
                    }
                } else {
                    unroundedCal += (meal.getTotalCalories() != null ? meal.getTotalCalories() : 0.0);
                    unroundedPro += (meal.getTotalProtein() != null ? meal.getTotalProtein() : 0.0);
                    unroundedCarbs += (meal.getTotalCarbs() != null ? meal.getTotalCarbs() : 0.0);
                    unroundedFat += (meal.getTotalFat() != null ? meal.getTotalFat() : 0.0);
                    unroundedFib += (meal.getTotalFibre() != null ? meal.getTotalFibre() : 0.0);
                }
            }
        }
        Map<String, Double> totals = new LinkedHashMap<>();
        totals.put("calories", Math.round(unroundedCal * 10.0) / 10.0);
        totals.put("protein", Math.round(unroundedPro * 10.0) / 10.0);
        totals.put("carbs", Math.round(unroundedCarbs * 10.0) / 10.0);
        totals.put("fat", Math.round(unroundedFat * 10.0) / 10.0);
        totals.put("fibre", Math.round(unroundedFib * 10.0) / 10.0);
        return totals;
    }
}

