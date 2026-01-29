'use client';

import { useEffect, useState, useCallback } from 'react';
import { MetricCard } from './MetricCard';
import { UptimeDisplay } from './UptimeDisplay';
import { SystemInfo } from './SystemInfo';
import { Skeleton } from '@/components/ui/skeleton';
import type { MetricsResponse } from '@/types/metrics';

function formatBytes(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(0)} MB`;
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
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 bg-slate-800" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={fetchMetrics}
          className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!metrics) return null;

  const mainDisk = metrics.disks[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SystemInfo system={metrics.system} network={metrics.network} />
        
        {metrics.cpu.temperature && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-2">🌡️ Temperature</h3>
            <p className="text-2xl font-bold text-white">{metrics.cpu.temperature}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}
