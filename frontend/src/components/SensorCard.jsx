import React from 'react';
import { Cpu, RotateCcw, Activity, Heart, ShieldCheck } from 'lucide-react';
import './SensorCard.css';

export default function SensorCard({ sensorStatus }) {
  const isConnected = sensorStatus?.connected ?? true;
  const current = sensorStatus?.currentData || {
    accelerometerX: 0.82,
    accelerometerY: -0.21,
    accelerometerZ: 9.73,
    gyroscopeX: 12.4,
    gyroscopeY: 4.8,
    gyroscopeZ: -2.1,
    pitch: 12.0,
    roll: 4.0,
    yaw: 82.0,
    movementIntensity: 82,
    heartRate: 142,
  };

  return (
    <div className="card sensor-overview-card">
      <div className="sensor-card-top-header">
        <div className="sensor-title-group">
          <div className="sensor-chip-icon">
            <Cpu size={20} />
          </div>
          <div>
            <h2 className="card-title">Live Sensor Telemetry</h2>
            <p className="card-subtitle">Tri-axial Inertial Measurement Unit (IMU 6-DOF)</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="sensor-status-badge-wrapper">
          <span className="status-caption">Sensor Status:</span>
          <div className={`status-pill ${isConnected ? 'status-online' : 'status-offline'}`}>
            <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      </div>

      <div className="sensor-subcards-grid">
        {/* Subcard 1: Accelerometer */}
        <div className="sensor-subcard">
          <div className="subcard-header">
            <span className="subcard-name">ACCELEROMETER</span>
            <span className="subcard-unit">m/s²</span>
          </div>
          <div className="axis-readings">
            <div className="axis-item">
              <span className="axis-tag x">X</span>
              <span className="axis-num">{current.accelerometerX.toFixed(2)}</span>
            </div>
            <div className="axis-item">
              <span className="axis-tag y">Y</span>
              <span className="axis-num">{current.accelerometerY.toFixed(2)}</span>
            </div>
            <div className="axis-item">
              <span className="axis-tag z">Z</span>
              <span className="axis-num">{current.accelerometerZ.toFixed(2)}</span>
            </div>
          </div>
          <div className="subcard-footer">
            <span>Resultant: 9.77 G-force</span>
          </div>
        </div>

        {/* Subcard 2: Gyroscope */}
        <div className="sensor-subcard">
          <div className="subcard-header">
            <span className="subcard-name">GYROSCOPE</span>
            <span className="subcard-unit">°/s</span>
          </div>
          <div className="axis-readings">
            <div className="axis-item">
              <span className="axis-tag x">X</span>
              <span className="axis-num">{current.gyroscopeX.toFixed(1)}</span>
            </div>
            <div className="axis-item">
              <span className="axis-tag y">Y</span>
              <span className="axis-num">{current.gyroscopeY.toFixed(1)}</span>
            </div>
            <div className="axis-item">
              <span className="axis-tag z">Z</span>
              <span className="axis-num">{current.gyroscopeZ.toFixed(1)}</span>
            </div>
          </div>
          <div className="subcard-footer">
            <span>Rotational Velocity</span>
          </div>
        </div>

        {/* Subcard 3: Orientation */}
        <div className="sensor-subcard">
          <div className="subcard-header">
            <span className="subcard-name">ORIENTATION</span>
            <span className="subcard-unit">Degrees</span>
          </div>
          <div className="axis-readings">
            <div className="axis-item">
              <span className="axis-tag pitch">Pitch</span>
              <span className="axis-num">{Math.round(current.pitch)}°</span>
            </div>
            <div className="axis-item">
              <span className="axis-tag roll">Roll</span>
              <span className="axis-num">{Math.round(current.roll)}°</span>
            </div>
            <div className="axis-item">
              <span className="axis-tag yaw">Yaw</span>
              <span className="axis-num">{Math.round(current.yaw)}°</span>
            </div>
          </div>
          <div className="subcard-footer">
            <span>Spatial Posture</span>
          </div>
        </div>

        {/* Subcard 4: Biometrics / Patch Health */}
        <div className="sensor-subcard">
          <div className="subcard-header">
            <span className="subcard-name">HEART & PATCH</span>
            <span className="subcard-unit">Live</span>
          </div>
          <div className="axis-readings">
            <div className="axis-item">
              <span className="axis-tag heart"><Heart size={10} /> HR</span>
              <span className="axis-num highlight-neon">{current.heartRate || 142} <small>bpm</small></span>
            </div>
            <div className="axis-item">
              <span className="axis-tag intensity"><Activity size={10} /> Int.</span>
              <span className="axis-num highlight-cyan">{current.movementIntensity}%</span>
            </div>
          </div>
          <div className="subcard-footer">
            <span>Skin Temp: 36.4°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
