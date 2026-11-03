package com.healthify.repository;

import com.healthify.entity.Supplement;
import com.healthify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplementRepository extends JpaRepository<Supplement, Long> {
    List<Supplement> findByUser(User user);
}
