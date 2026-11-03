package com.healthify.repository;

import com.healthify.entity.AIChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AIChatMessageRepository extends JpaRepository<AIChatMessage, Long> {

    List<AIChatMessage> findByUserIdOrderByIdAsc(Long userId);

    Page<AIChatMessage> findByUserIdOrderByIdAsc(Long userId, Pageable pageable);

    long countByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM AIChatMessage m WHERE m.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}

