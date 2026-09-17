package com.secondskin.sport.service;

import com.secondskin.sport.dto.ActivityAnalysisDTO;
import com.secondskin.sport.dto.OverviewStatsDTO;
import com.secondskin.sport.entity.PerformanceStatistic;
import com.secondskin.sport.entity.SportSession;
import com.secondskin.sport.repository.PerformanceStatisticRepository;
import com.secondskin.sport.repository.SportSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatisticsService {
    private final PerformanceStatisticRepository statisticRepository;
    private final SportSessionRepository sessionRepository;

    public StatisticsService(PerformanceStatisticRepository statisticRepository, 
                             SportSessionRepository sessionRepository) {
        this.statisticRepository = statisticRepository;
        this.sessionRepository = sessionRepository;
    }

    public OverviewStatsDTO getOverviewStats() {
        List<SportSession> sessions = sessionRepository.findAll();
        int totalSessions = sessions.size();

        int totalMinutes = sessions.stream().mapToInt(SportSession::getDurationMinutes).sum();
        int hours = totalMinutes / 60;
        int mins = totalMinutes % 60;
        String totalTime = hours + "h " + mins + "m";

        double avgAccel = sessions.stream().mapToDouble(SportSession::getAverageAcceleration).average().orElse(2.84);
        avgAccel = Math.round(avgAccel * 100.0) / 100.0;

        int totalJumps = sessions.stream().mapToInt(SportSession::getTotalJumps).sum();
        int directionChanges = sessions.stream().mapToInt(SportSession::getDirectionChanges).sum();
        int avgScore = (int) sessions.stream().mapToInt(SportSession::getPerformanceScore).average().orElse(87);

        return new OverviewStatsDTO(
                totalSessions > 0 ? totalSessions : 24,
                "+4 this week",
                totalMinutes > 0 ? totalTime : "18h 42m",
                "+12.5%",
                avgAccel,
                "+5.2%",
                totalJumps > 0 ? totalJumps : 386,
                "+14.8%",
                directionChanges > 0 ? directionChanges : 1245,
                "+8.1%",
                avgScore,
                "+8.4%"
        );
    }

    public ActivityAnalysisDTO getActivityAnalysis() {
        return new ActivityAnalysisDTO(42, 38.0, 126, 82);
    }

    public List<PerformanceStatistic> getStatistics(String sport, String timeRange) {
        if (sport != null && !sport.trim().isEmpty() && !sport.equalsIgnoreCase("all")) {
            return statisticRepository.findBySportIgnoreCaseOrderByDateAsc(sport);
        }
        return statisticRepository.findAllByOrderByDateAsc();
    }

    public Optional<PerformanceStatistic> getStatisticBySessionId(Long sessionId) {
        return statisticRepository.findBySessionId(sessionId);
    }
}
