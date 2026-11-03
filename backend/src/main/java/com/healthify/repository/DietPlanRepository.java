package com.healthify.repository;

import com.healthify.entity.DietPlan;
import com.healthify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findByUserOrderByCreatedAtDesc(User user);
    Optional<DietPlan> findTopByUserAndStatusOrderByCreatedAtDesc(User user, String status);
}

