import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Radio,
  Battery,
  BatteryCharging,
  RefreshCw,
  Power,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wifi,
} from 'lucide-react';
import SensorCard from '../components/SensorCard';
import { deviceService } from '../services/api';
import './Sensors.css';

export default function Sensors() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [sensorStatus, setSensorStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const loadData = async () => {
    try {
      const [devList, status] = await Promise.all([
        deviceService.getAll(),
        deviceService.getStatus(),
      ]);
      setDevices(devList);
      setSensorStatus(status);
      if (devList.length > 0 && !selectedDevice) {
        setSelectedDevice(devList[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(async () => {
      try {
        const status = await deviceService.getStatus();
        setSensorStatus(status);
      } catch (e) {}
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectToggle = async (deviceId, currentConnected) => {
    try {
      if (currentConnected) {
        await deviceService.disconnect(deviceId);
        setActionMessage(`Device #${deviceId} disconnected.`);
      } else {
        await deviceService.connect(deviceId);
        setActionMessage(`Device #${deviceId} connected via BLE 5.2.`);
      }
      loadData();
      setTimeout(() => setActionMessage(''), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSyncData = async (deviceId) => {
    setSyncing(true);
    try {
      await deviceService.sync(deviceId);
      setActionMessage('All cached IMU 6-DOF telemetry synchronized.');
      setTimeout(() => setActionMessage(''), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="sensors-page">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h1 className="hero-title">Sensor Management</h1>
          <p className="hero-subtitle">
            Configure, calibrate, and stream real-time biometric telemetry from Second Skin patches.
          </p>
        </div>

        {actionMessage && (
          <div className="action-notification">
            <CheckCircle2 size={16} />
            <span>{actionMessage}</span>
          </div>
        )}
      </div>

      {/* Device Management Cards Grid */}
      <div className="devices-grid">
        {devices.map((device) => {
          const isConnected = device.connected;
          return (
            <div
              key={device.id}
              className={`card device-card ${isConnected ? 'device-connected' : 'device-disconnected'}`}
            >
              <div className="device-card-header">
                <div className="device-icon-wrap">
                  <Cpu size={22} className={isConnected ? 'highlight-cyan' : ''} />
                </div>
                <div className="device-status-indicator">
                  <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
                  <span className={`device-conn-text ${isConnected ? 'connected' : 'disconnected'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>

              <div className="device-card-body">
                <h3 className="device-name">{device.deviceName}</h3>
                <span className="device-id-code">{device.deviceId}</span>

                <div className="device-stats-row">
                  <div className="device-stat">
                    <span className="dev-stat-label">Battery</span>
                    <div className="battery-row">
                      <BatteryCharging size={16} className="battery-icon" />
                      <span className="battery-number">{device.batteryLevel}%</span>
                    </div>
                  </div>

                  <div className="device-stat">
                    <span className="dev-stat-label">Last Sync</span>
                    <span className="last-sync-text">{device.lastSync ? '10 seconds ago' : 'Offline'}</span>
                  </div>

                  <div className="device-stat">
                    <span className="dev-stat-label">Firmware</span>
                    <span className="firmware-tag">{device.firmwareVersion || 'v2.4.1'}</span>
                  </div>
                </div>

                <div className="battery-bar-container">
                  <div
                    className="battery-bar-fill"
                    style={{
                      width: `${device.batteryLevel}%`,
                      backgroundColor:
                        device.batteryLevel > 50
                          ? 'var(--status-success)'
                          : device.batteryLevel > 20
                          ? 'var(--status-warning)'
                          : 'var(--status-danger)',
                    }}
                  />
                </div>
              </div>

              <div className="device-card-actions">
                <button
                  className={`btn btn-sm ${isConnected ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleConnectToggle(device.id, isConnected)}
                >
                  <Power size={14} />
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>

                <button
                  className="btn btn-outline-cyan btn-sm"
                  onClick={() => handleSyncData(device.id)}
                  disabled={!isConnected || syncing}
                >
                  <RefreshCw size={14} className={syncing ? 'spin-icon' : ''} />
                  {syncing ? 'Syncing...' : 'Sync Data'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE SENSOR TELEMETRY AREA */}
      <div className="live-sensor-area">
        <div className="section-title-wrap">
          <h2 className="section-heading">Live Telemetry Stream</h2>
          <span className="section-tag">REAL-TIME IMU 6-DOF</span>
        </div>
        <SensorCard sensorStatus={sensorStatus} />
      </div>

      {/* FUTURE IOT ARCHITECTURE SECTION */}
      <div className="card iot-architecture-card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Future IoT Pipeline Architecture</h3>
            <p className="card-subtitle">
              Ready for direct hardware integration with ESP32 microcontrollers & MPU-6050 IMU sensors.
            </p>
          </div>
          <span className="badge badge-sport">HARDWARE READY</span>
        </div>

        <div className="iot-pipeline-flow">
          <div className="flow-step">
            <div className="step-badge">1</div>
            <div className="step-content">
              <h4>Second Skin Patch</h4>
              <p>Flexible adhesive biocompatible substrate</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="step-badge">2</div>
            <div className="step-content">
              <h4>MPU6050 + ESP32</h4>
              <p>6-DOF Accelerometer & Gyroscope sampler</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="step-badge">3</div>
            <div className="step-content">
              <h4>BLE 5.2 / Wi-Fi</h4>
              <p>Low-latency telemetry packets</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="step-badge">4</div>
            <div className="step-content">
              <h4>Spring Boot API</h4>
              <p><code>POST /api/sensor-data</code></p>
            </div>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="step-badge">5</div>
            <div className="step-content">
              <h4>SQL Server</h4>
              <p>Persistent biometric database</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>

          <div className="flow-step highlight-step">
            <div className="step-badge">6</div>
            <div className="step-content">
              <h4>React Dashboard</h4>
              <p>Live visualization & analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
