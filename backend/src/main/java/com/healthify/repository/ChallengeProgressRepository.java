package com.healthify.repository;

import com.healthify.entity.ChallengeProgress;
import com.healthify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Long> {
    Optional<ChallengeProgress> findByUser(User user);
    Optional<ChallengeProgress> findByUserEmail(String email);
}
