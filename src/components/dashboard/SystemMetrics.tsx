'use client';

import { useEffect, useState, useCallback } from 'react';
import { MetricCard } from './MetricCard';
import { UptimeDisplay } from './UptimeDisplay';
import { SystemInfo } from './SystemInfo';
import type { MetricsResponse } from '@/types/metrics';

function formatBytes(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(0)} MB`;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
            <div className="h-4 w-20 bg-white/10 rounded mb-4"></div>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-full bg-white/10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-full bg-white/10 rounded"></div>
                <div className="h-3 w-2/3 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SystemMetrics() {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/metrics');
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const data = await res.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-red-400 text-lg font-semibold mb-2">Connection Error</p>
        <p className="text-slate-500 mb-4">{error}</p>
        <button 
          onClick={fetchMetrics}
          className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-xl text-cyan-400 font-semibold transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!metrics) return null;

  const mainDisk = metrics.disks[0];

  return (
    <div className="space-y-6">
      {/* Main metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="CPU Usage"
          value={metrics.cpu.usage}
          icon="🔥"
          subtitle={`${metrics.cpu.cores} cores @ ${metrics.cpu.speed}GHz`}
        />
        <MetricCard
          title="Memory"
          value={metrics.memory.usagePercent}
          icon="🧠"
          subtitle={`${formatBytes(metrics.memory.used)} / ${formatBytes(metrics.memory.total)}`}
        />
        {mainDisk && (
          <MetricCard
            title="Disk"
            value={mainDisk.usagePercent}
            icon="💾"
            subtitle={`${formatBytes(mainDisk.used)} / ${formatBytes(mainDisk.total)}`}
          />
        )}
        <UptimeDisplay initialUptime={metrics.system.uptime} />
      </div>

      {/* System info section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemInfo system={metrics.system} network={metrics.network} />
        
        {/* Temperature card */}
        <div className="glass-card rounded-2xl p-6 gradient-border">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🌡️</span>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">CPU Temperature</h3>
          </div>
          
          {metrics.cpu.temperature ? (
            <div className="flex items-baseline gap-2">
              <span className="metric-value text-white">{metrics.cpu.temperature}</span>
              <span className="text-2xl text-slate-500">°C</span>
            </div>
          ) : (
            <p className="text-slate-500">Temperature sensor not available</p>
          )}
          
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">CPU Model</span>
              <span className="text-white font-medium">{metrics.cpu.model}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
