'use client';

import { useEffect, useState } from 'react';

export function Header() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('hu-HU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
      setDate(now.toLocaleDateString('hu-HU', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 glass-card border-b border-white/5 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Monitor</h1>
        <p className="text-xs text-slate-500">Real-time metrics & control</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-2xl font-bold text-white font-mono tracking-tight glow-text-cyan">{time}</p>
          <p className="text-xs text-slate-500">{date}</p>
        </div>
      </div>
    </header>
  );
}
