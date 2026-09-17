import React from 'react';
import { ArrowUpRight, Compass, Gauge, Zap } from 'lucide-react';
import './ActivityCard.css';

export default function ActivityCard({ analysis }) {
  const jumps = analysis?.jumps ?? 42;
  const avgJump = analysis?.averageJumpHeightCm ?? 38.0;
  const directionChanges = analysis?.directionChanges ?? 126;
  const intensity = analysis?.movementIntensity ?? 82;

  return (
    <div className="activity-analysis-grid">
      {/* 1. Jump Analysis Card */}
      <div className="card activity-card">
        <div className="activity-card-header">
          <div className="activity-icon-badge jump">
            <ArrowUpRight size={18} />
          </div>
          <span className="activity-badge-tag">VERTICAL POWER</span>
        </div>
        <div className="activity-main-content">
          <h3 className="activity-title">Jump Analysis</h3>
          <div className="activity-split-values">
            <div className="split-item">
              <span className="split-label">Total Jumps</span>
              <span className="split-number">{jumps}</span>
            </div>
            <div className="split-divider" />
            <div className="split-item">
              <span className="split-label">Avg Height</span>
              <span className="split-number highlight-cyan">{avgJump} <small>cm</small></span>
            </div>
          </div>
        </div>
        <div className="activity-progress-wrap">
          <div className="activity-progress-bar">
            <div className="progress-fill cyan" style={{ width: '76%' }}></div>
          </div>
          <div className="progress-meta">
            <span>Peak Elevation: 46 cm</span>
            <span>Optimal Range</span>
          </div>
        </div>
      </div>

      {/* 2. Direction Changes Card */}
      <div className="card activity-card">
        <div className="activity-card-header">
          <div className="activity-icon-badge compass">
            <Compass size={18} />
          </div>
          <span className="activity-badge-tag">AGILITY INDEX</span>
        </div>
        <div className="activity-main-content">
          <h3 className="activity-title">Direction Changes</h3>
          <div className="activity-single-value">
            <span className="huge-number">{directionChanges}</span>
            <span className="value-tag">Cuts & Pivots</span>
          </div>
        </div>
        <div className="activity-progress-wrap">
          <div className="activity-progress-bar">
            <div className="progress-fill blue" style={{ width: '84%' }}></div>
          </div>
          <div className="progress-meta">
            <span>Rate: 3.2 cuts / min</span>
            <span>High Mobility</span>
          </div>
        </div>
      </div>

      {/* 3. Movement Intensity Card */}
      <div className="card activity-card">
        <div className="activity-card-header">
          <div className="activity-icon-badge gauge">
            <Gauge size={18} />
          </div>
          <span className="activity-badge-tag">EXERTION RATE</span>
        </div>
        <div className="activity-main-content">
          <h3 className="activity-title">Movement Intensity</h3>
          <div className="activity-single-value">
            <span className="huge-number highlight-neon">{intensity} <small>%</small></span>
            <span className="value-tag">Anaerobic Zone</span>
          </div>
        </div>
        <div className="activity-progress-wrap">
          <div className="activity-progress-bar">
            <div className="progress-fill neon" style={{ width: `${intensity}%` }}></div>
          </div>
          <div className="progress-meta">
            <span>Target: 80-90%</span>
            <span>In the Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
