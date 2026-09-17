package com.secondskin.sport.dto;

import com.secondskin.sport.entity.SensorData;

public class SensorStatusDTO {
    private String deviceId;
    private String deviceName;
    private boolean connected;
    private int batteryLevel;
    private String lastSync;
    private SensorData currentData;

    public SensorStatusDTO() {}

    public SensorStatusDTO(String deviceId, String deviceName, boolean connected, int batteryLevel, String lastSync, SensorData currentData) {
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.connected = connected;
        this.batteryLevel = batteryLevel;
        this.lastSync = lastSync;
        this.currentData = currentData;
    }

    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }

    public String getDeviceName() { return deviceName; }
    public void setDeviceName(String deviceName) { this.deviceName = deviceName; }

    public boolean isConnected() { return connected; }
    public void setConnected(boolean connected) { this.connected = connected; }

    public int getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(int batteryLevel) { this.batteryLevel = batteryLevel; }

    public String getLastSync() { return lastSync; }
    public void setLastSync(String lastSync) { this.lastSync = lastSync; }

    public SensorData getCurrentData() { return currentData; }
    public void setCurrentData(SensorData currentData) { this.currentData = currentData; }
}
