package com.secondskin.sport.dto;

public class ActivityAnalysisDTO {
    private int jumps;
    private double averageJumpHeightCm;
    private int directionChanges;
    private int movementIntensity;

    public ActivityAnalysisDTO() {}

    public ActivityAnalysisDTO(int jumps, double averageJumpHeightCm, int directionChanges, int movementIntensity) {
        this.jumps = jumps;
        this.averageJumpHeightCm = averageJumpHeightCm;
        this.directionChanges = directionChanges;
        this.movementIntensity = movementIntensity;
    }

    public int getJumps() { return jumps; }
    public void setJumps(int jumps) { this.jumps = jumps; }

    public double getAverageJumpHeightCm() { return averageJumpHeightCm; }
    public void setAverageJumpHeightCm(double averageJumpHeightCm) { this.averageJumpHeightCm = averageJumpHeightCm; }

    public int getDirectionChanges() { return directionChanges; }
    public void setDirectionChanges(int directionChanges) { this.directionChanges = directionChanges; }

    public int getMovementIntensity() { return movementIntensity; }
    public void setMovementIntensity(int movementIntensity) { this.movementIntensity = movementIntensity; }
}
