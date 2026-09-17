package com.secondskin.sport.controller;

import com.secondskin.sport.entity.SensorData;
import com.secondskin.sport.service.SensorDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensor-data")
public class SensorDataController {
    private final SensorDataService sensorDataService;

    public SensorDataController(SensorDataService sensorDataService) {
        this.sensorDataService = sensorDataService;
    }

    @PostMapping
    public ResponseEntity<SensorData> postSensorData(@RequestBody SensorData sensorData) {
        return ResponseEntity.ok(sensorDataService.saveSensorData(sensorData));
    }

    @GetMapping("/latest")
    public ResponseEntity<SensorData> getLatestSensorData() {
        return sensorDataService.getLatestSensorData()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<SensorData>> getRecentDataPoints(@PathVariable Long sessionId) {
        return ResponseEntity.ok(sensorDataService.getSensorDataBySessionId(sessionId));
    }
}
