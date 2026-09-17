package com.secondskin.sport.controller;

import com.secondskin.sport.entity.SensorData;
import com.secondskin.sport.entity.SportSession;
import com.secondskin.sport.service.SensorDataService;
import com.secondskin.sport.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    private final SessionService sessionService;
    private final SensorDataService sensorDataService;

    public SessionController(SessionService sessionService, SensorDataService sensorDataService) {
        this.sessionService = sessionService;
        this.sensorDataService = sensorDataService;
    }

    @GetMapping
    public ResponseEntity<List<SportSession>> getAllSessions(
            @RequestParam(required = false) String sport) {
        return ResponseEntity.ok(sessionService.getAllSessions(sport));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SportSession> getSessionById(@PathVariable Long id) {
        return sessionService.getSessionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SportSession> createSession(@RequestBody SportSession session) {
        return ResponseEntity.ok(sessionService.createSession(session));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SportSession> updateSession(@PathVariable Long id, @RequestBody SportSession session) {
        return ResponseEntity.ok(sessionService.updateSession(id, session));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/sensor-data")
    public ResponseEntity<List<SensorData>> getSessionSensorData(@PathVariable Long id) {
        return ResponseEntity.ok(sensorDataService.getSensorDataBySessionId(id));
    }
}
