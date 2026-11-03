package com.healthify.repository;

import com.healthify.entity.User;
import com.healthify.entity.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {
    Optional<WaterIntake> findByUserAndDate(User user, String date);
    Optional<WaterIntake> findTopByUserOrderByUpdatedAtDesc(User user);
}
