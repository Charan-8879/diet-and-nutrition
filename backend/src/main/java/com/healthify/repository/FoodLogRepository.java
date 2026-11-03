package com.healthify.repository;

import com.healthify.entity.FoodLog;
import com.healthify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodLogRepository extends JpaRepository<FoodLog, Long> {
    List<FoodLog> findByUserOrderByCreatedAtDesc(User user);
    List<FoodLog> findByUserEmailOrderByCreatedAtDesc(String email);
    void deleteByUser(User user);
}
