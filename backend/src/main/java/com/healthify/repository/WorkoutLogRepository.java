package com.healthify.repository;

import com.healthify.entity.User;
import com.healthify.entity.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
    List<WorkoutLog> findByUserOrderByCreatedAtDesc(User user);
    Optional<WorkoutLog> findTopByUserOrderByCreatedAtDesc(User user);
}
