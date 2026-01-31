'use client';

import { useEffect, useState, useCallback } from 'react';
import type { MetricsResponse } from '@/types/metrics';

function getBarColor(percent: number): string {
  if (percent >= 90) return 'bg-red-500';
  if (percent >= 75) return 'bg-orange-500';
  if (percent >= 50) return 'bg-yellow-500';
  return 'bg-emerald-500';
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export function MiniMetrics() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch {
      // Silent fail
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    // Auto-refresh disabled to prevent robot face reset
    // const interval = setInterval(fetchMetrics, 5000);
    // return () => clearInterval(interval);
  }, [fetchMetrics]);

  if (!metrics) {
    return (
      <div className="glass rounded-2xl p-4 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-white/10 rounded"></div>
          <div className="h-6 bg-white/10 rounded"></div>
          <div className="h-6 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const disk = metrics.disks[0];

  return (
    <div className="glass rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <span>📊</span> System Resources
        </h3>
        <button 
          onClick={fetchMetrics}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          title="Refresh"
        >
          🔄
        </button>
      </div>
      
      <div className="space-y-4 stagger-children">
        {/* CPU */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <span>🔥</span> CPU
            </span>
            <span className="text-lg font-bold text-white">{Math.round(metrics.cpu.usage)}%</span>
          </div>
          <div className="progress-mini">
            <div 
              className={`progress-mini-bar ${getBarColor(metrics.cpu.usage)}`}
              style={{ width: `${metrics.cpu.usage}%` }}
            ></div>
          </div>
        </div>

        {/* Memory */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <span>🧠</span> Memory
            </span>
            <span className="text-lg font-bold text-white">{Math.round(metrics.memory.usagePercent)}%</span>
          </div>
          <div className="progress-mini">
            <div 
              className={`progress-mini-bar ${getBarColor(metrics.memory.usagePercent)}`}
              style={{ width: `${metrics.memory.usagePercent}%` }}
            ></div>
          </div>
        </div>

        {/* Disk */}
        {disk && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-zinc-400 flex items-center gap-2">
                <span>💾</span> Disk
              </span>
              <span className="text-lg font-bold text-white">{Math.round(disk.usagePercent)}%</span>
            </div>
            <div className="progress-mini">
              <div 
                className={`progress-mini-bar ${getBarColor(disk.usagePercent)}`}
                style={{ width: `${disk.usagePercent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-zinc-500">Uptime</span>
          <p className="text-white font-semibold">{formatUptime(metrics.system.uptime)}</p>
        </div>
        {metrics.cpu.temperature && (
          <div>
            <span className="text-zinc-500">Temp</span>
            <p className="text-white font-semibold">{metrics.cpu.temperature}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}
