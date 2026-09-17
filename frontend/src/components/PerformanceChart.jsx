import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './PerformanceChart.css';

export default function PerformanceChart() {
  const [timeRange, setTimeRange] = useState('7 Days');

  // Realistic sample points matching the selected range
  const chartDataMap = {
    Today: [
      { time: '17:30', acceleration: 2.1, speed: 14.5, intensity: 68 },
      { time: '17:35', acceleration: 3.4, speed: 18.2, intensity: 84 },
      { time: '17:40', acceleration: 2.8, speed: 16.0, intensity: 76 },
      { time: '17:45', acceleration: 3.9, speed: 21.4, intensity: 92 },
      { time: '17:50', acceleration: 3.1, speed: 17.8, intensity: 82 },
      { time: '17:55', acceleration: 4.2, speed: 22.8, intensity: 96 },
      { time: '18:00', acceleration: 2.6, speed: 15.2, intensity: 74 },
      { time: '18:05', acceleration: 3.7, speed: 19.5, intensity: 88 },
      { time: '18:10', acceleration: 1.8, speed: 11.0, intensity: 58 },
    ],
    '7 Days': [
      { time: '09/10', acceleration: 2.5, speed: 15.4, intensity: 72 },
      { time: '09/11', acceleration: 1.8, speed: 6.2, intensity: 75 },
      { time: '09/12', acceleration: 2.7, speed: 16.8, intensity: 80 },
      { time: '09/13', acceleration: 3.1, speed: 21.6, intensity: 92 },
      { time: '09/14', acceleration: 2.4, speed: 14.8, intensity: 79 },
      { time: '09/15', acceleration: 2.9, speed: 17.2, intensity: 84 },
      { time: '09/16', acceleration: 3.2, speed: 18.4, intensity: 88 },
    ],
    '30 Days': [
      { time: 'W1', acceleration: 2.4, speed: 14.0, intensity: 70 },
      { time: 'W2', acceleration: 2.8, speed: 16.5, intensity: 79 },
      { time: 'W3', acceleration: 3.0, speed: 18.2, intensity: 85 },
      { time: 'W4', acceleration: 3.2, speed: 19.4, intensity: 89 },
    ],
  };

  const data = chartDataMap[timeRange] || chartDataMap['7 Days'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-custom-tooltip">
          <div className="tooltip-label">{label}</div>
          <div className="tooltip-items">
            {payload.map((item, index) => (
              <div key={index} className="tooltip-item">
                <span className="tooltip-dot" style={{ backgroundColor: item.color }} />
                <span className="tooltip-name">{item.name}:</span>
                <span className="tooltip-val">{item.value} {item.unit || ''}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card performance-chart-card">
      <div className="chart-header">
        <div>
          <h2 className="card-title">Movement Performance</h2>
          <p className="card-subtitle">Real-time sensor telemetry & biometric movement intensity</p>
        </div>

        <div className="time-range-toggle">
          {['Today', '7 Days', '30 Days'].map((range) => (
            <button
              key={range}
              className={`range-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4facfe" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="neonGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff87" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00ff87" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '16px' }}
              formatter={(value) => <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{value}</span>}
            />

            <Area
              type="monotone"
              dataKey="acceleration"
              name="Acceleration (m/s²)"
              stroke="#00f2fe"
              strokeWidth={2.5}
              fill="url(#cyanGrad)"
              activeDot={{ r: 6, fill: '#00f2fe' }}
            />
            <Area
              type="monotone"
              dataKey="speed"
              name="Speed (km/h)"
              stroke="#4facfe"
              strokeWidth={2}
              fill="url(#blueGrad)"
            />
            <Area
              type="monotone"
              dataKey="intensity"
              name="Movement Intensity (%)"
              stroke="#00ff87"
              strokeWidth={2}
              fill="url(#neonGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
