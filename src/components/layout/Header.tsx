'use client';

import { useEffect, useState } from 'react';

export function Header() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('hu-HU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-white">System Monitor</h1>
      <div className="flex items-center gap-4">
        <span className="text-slate-400 font-mono text-sm">{time}</span>
      </div>
    </header>
  );
}
