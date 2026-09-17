package com.secondskin.sport.service;

import com.secondskin.sport.dto.SensorStatusDTO;
import com.secondskin.sport.entity.Device;
import com.secondskin.sport.entity.SensorData;
import com.secondskin.sport.repository.DeviceRepository;
import com.secondskin.sport.repository.SensorDataRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final SensorDataRepository sensorDataRepository;

    public DeviceService(DeviceRepository deviceRepository, SensorDataRepository sensorDataRepository) {
        this.deviceRepository = deviceRepository;
        this.sensorDataRepository = sensorDataRepository;
    }

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Optional<Device> getDeviceById(Long id) {
        return deviceRepository.findById(id);
    }

    public Device updateConnectionStatus(Long id, boolean connected) {
        return deviceRepository.findById(id).map(device -> {
            device.setConnected(connected);
            device.setLastSync(LocalDateTime.now());
            return deviceRepository.save(device);
        }).orElseThrow(() -> new RuntimeException("Device not found"));
    }

    public SensorStatusDTO getSensorStatus() {
        Optional<Device> deviceOpt = deviceRepository.findAll().stream().findFirst();
        Optional<SensorData> latestDataOpt = sensorDataRepository.findTop1ByOrderByTimestampDesc();

        String deviceId = deviceOpt.map(Device::getDeviceId).orElse("SSS-PATCH-001");
        String deviceName = deviceOpt.map(Device::getDeviceName).orElse("Second Skin Patch #001");
        boolean isConnected = deviceOpt.map(Device::isConnected).orElse(true);
        int batteryLevel = deviceOpt.map(Device::getBatteryLevel).orElse(82);

        SensorData latestData = latestDataOpt.orElseGet(() -> {
            SensorData mock = new SensorData();
            mock.setAccelerometerX(0.82);
            mock.setAccelerometerY(-0.21);
            mock.setAccelerometerZ(9.73);
            mock.setGyroscopeX(12.4);
            mock.setGyroscopeY(4.8);
            mock.setGyroscopeZ(-2.1);
            mock.setPitch(12.0);
            mock.setRoll(4.0);
            mock.setYaw(82.0);
            mock.setMovementIntensity(82);
            mock.setHeartRate(142);
            return mock;
        });

        return new SensorStatusDTO(deviceId, deviceName, isConnected, batteryLevel, "10 seconds ago", latestData);
    }
}
