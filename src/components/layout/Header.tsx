'use client';

import { useEffect, useState } from 'react';

export function Header() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('hu-HU', {
        hour: '2-digit',
        minute: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
        <span className="text-sm text-zinc-400">System Active</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-3xl font-black text-white tracking-tight glow-text">{time}</span>
      </div>
    </header>
  );
}
