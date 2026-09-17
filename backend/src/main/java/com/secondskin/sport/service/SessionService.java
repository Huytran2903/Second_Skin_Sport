package com.secondskin.sport.service;

import com.secondskin.sport.entity.SportSession;
import com.secondskin.sport.repository.SportSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {
    private final SportSessionRepository sessionRepository;

    public SessionService(SportSessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public List<SportSession> getAllSessions(String sport) {
        if (sport != null && !sport.trim().isEmpty() && !sport.equalsIgnoreCase("all")) {
            return sessionRepository.findBySportIgnoreCaseOrderByStartTimeDesc(sport);
        }
        return sessionRepository.findAllByOrderByStartTimeDesc();
    }

    public Optional<SportSession> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    public SportSession createSession(SportSession session) {
        if (session.getStatus() == null) {
            session.setStatus("Completed");
        }
        return sessionRepository.save(session);
    }

    public SportSession updateSession(Long id, SportSession updated) {
        return sessionRepository.findById(id).map(session -> {
            session.setSport(updated.getSport());
            session.setDurationMinutes(updated.getDurationMinutes());
            session.setTotalJumps(updated.getTotalJumps());
            session.setDirectionChanges(updated.getDirectionChanges());
            session.setAverageAcceleration(updated.getAverageAcceleration());
            session.setAverageSpeed(updated.getAverageSpeed());
            session.setMovementIntensity(updated.getMovementIntensity());
            session.setPerformanceScore(updated.getPerformanceScore());
            session.setStatus(updated.getStatus());
            return sessionRepository.save(session);
        }).orElseThrow(() -> new RuntimeException("Session not found with id " + id));
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }
}
