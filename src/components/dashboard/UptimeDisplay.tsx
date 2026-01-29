'use client';

import { useEffect, useState } from 'react';

interface UptimeDisplayProps {
  initialUptime: number;
}

function formatUptime(seconds: number): { days: number; hours: number; minutes: number; secs: number } {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return { days, hours, minutes, secs };
}

export function UptimeDisplay({ initialUptime }: UptimeDisplayProps) {
  const [uptime, setUptime] = useState(initialUptime);

  useEffect(() => {
    setUptime(initialUptime);
  }, [initialUptime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, secs } = formatUptime(uptime);

  return (
    <div className="glass-card rounded-2xl p-6 gradient-border hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⏱️</span>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Uptime</h3>
      </div>
      
      <div className="flex gap-3">
        {days > 0 && (
          <div className="text-center">
            <div className="metric-value-sm text-white">{days}</div>
            <div className="text-xs text-slate-500 font-medium uppercase">Days</div>
          </div>
        )}
        <div className="text-center">
          <div className="metric-value-sm text-white">{String(hours).padStart(2, '0')}</div>
          <div className="text-xs text-slate-500 font-medium uppercase">Hours</div>
        </div>
        <div className="text-center">
          <div className="metric-value-sm text-white">{String(minutes).padStart(2, '0')}</div>
          <div className="text-xs text-slate-500 font-medium uppercase">Min</div>
        </div>
        <div className="text-center">
          <div className="metric-value-sm text-cyan-400 font-mono glow-text-cyan animate-pulse-glow">{String(secs).padStart(2, '0')}</div>
          <div className="text-xs text-slate-500 font-medium uppercase">Sec</div>
        </div>
      </div>
    </div>
  );
}
