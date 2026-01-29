'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <span className="text-lg">⏱️</span>
          Uptime
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 text-center">
          {days > 0 && (
            <div>
              <div className="text-2xl font-bold text-white">{days}</div>
              <div className="text-xs text-slate-500">days</div>
            </div>
          )}
          <div>
            <div className="text-2xl font-bold text-white">{String(hours).padStart(2, '0')}</div>
            <div className="text-xs text-slate-500">hours</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{String(minutes).padStart(2, '0')}</div>
            <div className="text-xs text-slate-500">min</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400 font-mono">{String(secs).padStart(2, '0')}</div>
            <div className="text-xs text-slate-500">sec</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
