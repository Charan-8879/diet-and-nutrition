package scratch;

import com.healthify.dto.DietFoodItemDTO;
import com.healthify.dto.DietMealDTO;
import com.healthify.dto.DietPlanDTO;
import com.healthify.service.DietPlanningService;
import com.healthify.service.NutritionCalculationService;

import java.util.List;

public class TestDietPlanningService {

    public static void main(String[] args) {
        System.out.println("==================================================================");
        System.out.println("SPRING BOOT DIET PLANNING SERVICE - UNIT TEST RUNNER");
        System.out.println("==================================================================\n");

        int passed = 0;
        int failed = 0;

        NutritionCalculationService nutritionService = new NutritionCalculationService();
        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        DietPlanningService dietPlanningService = new DietPlanningService(null, null, null, nutritionService, mapper);

        // Test 1: Generate plan with Dosa & Sambar
        List<String> confirmedFoods = List.of("Dosa", "Sambar");
        DietPlanDTO plan = dietPlanningService.generateFiveMealPlan(
                null, "7_DAY", confirmedFoods, "Maintain Weight", 2100.0, null, null
        );

        if (plan != null && plan.getDays() != null && plan.getDays().size() == 7) {
            System.out.println("✅ PASS: 7-day plan successfully generated via Java DietPlanningService");
            passed++;
        } else {
            System.err.println("❌ FAIL: Could not generate 7-day plan");
            failed++;
        }

        // Test 2: Verify 5 meals per day
        boolean all5Meals = true;
        for (List<DietMealDTO> meals : plan.getDays().values()) {
            if (meals == null || meals.size() != 5) {
                all5Meals = false;
            }
        }
        if (all5Meals) {
            System.out.println("✅ PASS: Every day contains exactly 5 distinct meals");
            passed++;
        } else {
            System.err.println("❌ FAIL: Some days do not contain 5 meals");
            failed++;
        }

        // Test 3: Chicken rule verification (max 150g) and Egg rule (max 2 meals/day)
        DietPlanDTO chickenPlan = dietPlanningService.generateFiveMealPlan(
                null, "7_DAY", List.of("Chicken", "Rice", "Eggs"), "Muscle Gain", 2600.0, null, null
        );

        double maxChickenFound = 0;
        int maxEggMeals = 0;
        for (var entry : chickenPlan.getDays().entrySet()) {
            int eggCount = 0;
            String dayKey = entry.getKey();
            List<DietMealDTO> meals = entry.getValue();
            for (DietMealDTO meal : meals) {
                boolean hasEgg = false;
                for (DietFoodItemDTO item : meal.getItems()) {
                    if (item.getName() != null && item.getName().toLowerCase().contains("chicken")) {
                        if (item.getQuantity() > maxChickenFound) maxChickenFound = item.getQuantity();
                    }
                    if (item.getName() != null && item.getName().toLowerCase().contains("egg")) {
                        hasEgg = true;
                    }
                }
                if (hasEgg) {
                    eggCount++;
                    System.out.println("      Day " + dayKey + " - Meal with egg: " + meal.getSlot());
                }
            }
            if (eggCount > maxEggMeals) maxEggMeals = eggCount;
        }

        if (maxChickenFound <= 150.0) {
            System.out.println("✅ PASS: Chicken portion never exceeds 150g in Java service (Max found: " + maxChickenFound + "g <= 150g)");
            passed++;
        } else {
            System.err.println("❌ FAIL: Chicken exceeded 150g: " + maxChickenFound + "g");
            failed++;
        }

        if (maxEggMeals <= 2) {
            System.out.println("✅ PASS: Eggs appear in at most 2 meals per day in Java service (Max found: " + maxEggMeals + " meals/day <= 2)");
            passed++;
        } else {
            System.err.println("❌ FAIL: Eggs appeared in " + maxEggMeals + " meals/day");
            failed++;
        }

        System.out.println("\n==================================================================");
        System.out.println("SPRING BOOT VERIFICATION COMPLETE: " + passed + " PASSED, " + failed + " FAILED");
        System.out.println("==================================================================\n");

        System.exit(failed > 0 ? 1 : 0);
    }
}
