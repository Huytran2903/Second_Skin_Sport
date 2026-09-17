package com.secondskin.sport.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "performance_statistics")
public class PerformanceStatistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;
    private Long userId;
    private LocalDate date;
    private String sport;

    private double averageSpeed;       // km/h
    private double averageAcceleration; // m/s²
    private double totalDistance;      // km
    private int totalJumps;
    private int directionChanges;
    private int movementIntensity;     // %
    private int performanceScore;      // %

    public PerformanceStatistic() {}

    public PerformanceStatistic(Long sessionId, Long userId, LocalDate date, String sport, 
                                double averageSpeed, double averageAcceleration, double totalDistance, 
                                int totalJumps, int directionChanges, int movementIntensity, int performanceScore) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.date = date;
        this.sport = sport;
        this.averageSpeed = averageSpeed;
        this.averageAcceleration = averageAcceleration;
        this.totalDistance = totalDistance;
        this.totalJumps = totalJumps;
        this.directionChanges = directionChanges;
        this.movementIntensity = movementIntensity;
        this.performanceScore = performanceScore;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getSport() { return sport; }
    public void setSport(String sport) { this.sport = sport; }

    public double getAverageSpeed() { return averageSpeed; }
    public void setAverageSpeed(double averageSpeed) { this.averageSpeed = averageSpeed; }

    public double getAverageAcceleration() { return averageAcceleration; }
    public void setAverageAcceleration(double averageAcceleration) { this.averageAcceleration = averageAcceleration; }

    public double getTotalDistance() { return totalDistance; }
    public void setTotalDistance(double totalDistance) { this.totalDistance = totalDistance; }

    public int getTotalJumps() { return totalJumps; }
    public void setTotalJumps(int totalJumps) { this.totalJumps = totalJumps; }

    public int getDirectionChanges() { return directionChanges; }
    public void setDirectionChanges(int directionChanges) { this.directionChanges = directionChanges; }

    public int getMovementIntensity() { return movementIntensity; }
    public void setMovementIntensity(int movementIntensity) { this.movementIntensity = movementIntensity; }

    public int getPerformanceScore() { return performanceScore; }
    public void setPerformanceScore(int performanceScore) { this.performanceScore = performanceScore; }
}
