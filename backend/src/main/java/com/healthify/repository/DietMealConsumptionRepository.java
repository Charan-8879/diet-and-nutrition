package com.healthify.repository;

import com.healthify.entity.DietMealConsumption;
import com.healthify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DietMealConsumptionRepository extends JpaRepository<DietMealConsumption, Long> {
    List<DietMealConsumption> findByUserAndLogDate(User user, String logDate);
    Optional<DietMealConsumption> findByUserAndPlanIdAndDayNumberAndMealTypeAndLogDate(
            User user, Long planId, Integer dayNumber, String mealType, String logDate);
}

