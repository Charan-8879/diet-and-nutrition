package com.healthify.repository;

import com.healthify.entity.DailySteps;
import com.healthify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DailyStepsRepository extends JpaRepository<DailySteps, Long> {
    Optional<DailySteps> findByUserAndDate(User user, String date);
    Optional<DailySteps> findTopByUserOrderByUpdatedAtDesc(User user);
}
