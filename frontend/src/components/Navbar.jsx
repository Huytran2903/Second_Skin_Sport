import React from 'react';
import { Menu, Bell, Radio, BatteryCharging, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onToggleSidebar, patchStatus }) {
  const isConnected = patchStatus?.connected ?? true;
  const battery = patchStatus?.batteryLevel ?? 82;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={onToggleSidebar} aria-label="Open Menu">
          <Menu size={22} />
        </button>
        <div className="navbar-heading">
          <div className="system-pill">
            <span className="live-dot" />
            LIVE TELEMETRY
          </div>
        </div>
      </div>

      <div className="navbar-right">
        {/* Device Quick Status Pill */}
        <div className="sensor-quick-pill">
          <Radio size={15} className={isConnected ? 'icon-connected' : 'icon-disconnected'} />
          <span className="patch-name">{patchStatus?.deviceName || 'Patch #001'}</span>
          <span className="divider-dot">•</span>
          <span className={`status-label ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <span className="divider-dot">•</span>
          <span className="battery-badge">
            <BatteryCharging size={14} />
            {battery}%
          </span>
        </div>

        {/* Notification Bell */}
        <button className="nav-action-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-badge">2</span>
        </button>

        {/* User Profile */}
        <div className="user-profile-widget">
          <div className="avatar-circle">
            <User size={18} />
          </div>
          <div className="user-info-text">
            <span className="user-name">Alex Johnson</span>
            <span className="user-role">Pro Athlete • Basketball</span>
          </div>
        </div>
      </div>
    </header>
  );
}
