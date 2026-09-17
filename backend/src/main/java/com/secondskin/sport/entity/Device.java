package com.secondskin.sport.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "devices")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;
    private String deviceId;
    private boolean connected;
    private int batteryLevel;
    private LocalDateTime lastSync;
    private String firmwareVersion;
    private String connectionType; // BLE, WiFi

    public Device() {
        this.lastSync = LocalDateTime.now();
    }

    public Device(String deviceName, String deviceId, boolean connected, int batteryLevel, String firmwareVersion, String connectionType) {
        this.deviceName = deviceName;
        this.deviceId = deviceId;
        this.connected = connected;
        this.batteryLevel = batteryLevel;
        this.lastSync = LocalDateTime.now();
        this.firmwareVersion = firmwareVersion;
        this.connectionType = connectionType;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDeviceName() { return deviceName; }
    public void setDeviceName(String deviceName) { this.deviceName = deviceName; }

    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }

    public boolean isConnected() { return connected; }
    public void setConnected(boolean connected) { this.connected = connected; }

    public int getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(int batteryLevel) { this.batteryLevel = batteryLevel; }

    public LocalDateTime getLastSync() { return lastSync; }
    public void setLastSync(LocalDateTime lastSync) { this.lastSync = lastSync; }

    public String getFirmwareVersion() { return firmwareVersion; }
    public void setFirmwareVersion(String firmwareVersion) { this.firmwareVersion = firmwareVersion; }

    public String getConnectionType() { return connectionType; }
    public void setConnectionType(String connectionType) { this.connectionType = connectionType; }
}
