import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './styles/global.css';

// Lazy load route pages for high Lighthouse Performance & code-splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Activities = lazy(() => import('./pages/Activities'));
const Sensors = lazy(() => import('./pages/Sensors'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

function PageFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '45vh',
      color: '#00f2fe',
      fontSize: '0.95rem',
      fontWeight: '600'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid rgba(0,242,254,0.15)',
        borderTopColor: '#00f2fe',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginRight: '12px'
      }} />
      Loading Telemetry...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="statistics"
            element={
              <Suspense fallback={<PageFallback />}>
                <Statistics />
              </Suspense>
            }
          />
          <Route
            path="activities"
            element={
              <Suspense fallback={<PageFallback />}>
                <Activities />
              </Suspense>
            }
          />
          <Route
            path="sensors"
            element={
              <Suspense fallback={<PageFallback />}>
                <Sensors />
              </Suspense>
            }
          />
          <Route
            path="reports"
            element={
              <Suspense fallback={<PageFallback />}>
                <Reports />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<PageFallback />}>
                <Settings />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
