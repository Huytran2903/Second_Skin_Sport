package com.secondskin.sport.repository;

import com.secondskin.sport.entity.SportSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SportSessionRepository extends JpaRepository<SportSession, Long> {
    List<SportSession> findAllByOrderByStartTimeDesc();
    List<SportSession> findBySportIgnoreCaseOrderByStartTimeDesc(String sport);
    List<SportSession> findByStatus(String status);
}
