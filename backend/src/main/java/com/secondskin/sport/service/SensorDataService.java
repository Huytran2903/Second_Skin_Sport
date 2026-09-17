package com.secondskin.sport.service;

import com.secondskin.sport.entity.SensorData;
import com.secondskin.sport.repository.SensorDataRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SensorDataService {
    private final SensorDataRepository sensorDataRepository;

    public SensorDataService(SensorDataRepository sensorDataRepository) {
        this.sensorDataRepository = sensorDataRepository;
    }

    public List<SensorData> getSensorDataBySessionId(Long sessionId) {
        return sensorDataRepository.findBySessionIdOrderByTimestampAsc(sessionId);
    }

    public SensorData saveSensorData(SensorData sensorData) {
        if (sensorData.getTimestamp() == null) {
            sensorData.setTimestamp(LocalDateTime.now());
        }
        return sensorDataRepository.save(sensorData);
    }

    public Optional<SensorData> getLatestSensorData() {
        return sensorDataRepository.findTop1ByOrderByTimestampDesc();
    }

    public List<SensorData> getRecentDataPoints(Long sessionId) {
        return sensorDataRepository.findTop60BySessionIdOrderByTimestampDesc(sessionId);
    }
}
