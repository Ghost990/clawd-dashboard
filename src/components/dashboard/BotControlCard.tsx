'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BotControlCardProps {
  name: string;
  serviceName: string;
  port: number;
  emoji: string;
  description: string;
  workspace: string;
  chatPath: string;
  compact?: boolean;
}

interface BotStatus {
  active: boolean;
  memory?: string;
  cpu?: string;
  uptime?: string;
  skills?: string[];
}

export function BotControlCard({ name, serviceName, port, emoji, description, workspace, chatPath, compact = false }: BotControlCardProps) {
  const [status, setStatus] = useState<BotStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`/api/bot-status?service=${serviceName}`);
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({ active: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Auto-refresh disabled - use manual refresh button
    // const interval = setInterval(fetchStatus, 5000);
    // return () => clearInterval(interval);
  }, [serviceName]);

  const handleAction = async (action: 'restart' | 'stop' | 'start') => {
    setActionLoading(action);
    try {
      await fetch(`/api/bot-action?service=${serviceName}&action=${action}`, { method: 'POST' });
      setTimeout(fetchStatus, 2000);
    } finally {
      setTimeout(() => setActionLoading(null), 2000);
    }
  };

  if (compact) {
    return (
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xl">
              {emoji}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{name}</h3>
              <p className="text-zinc-500 text-xs">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status?.active ? 'bg-green-400' : 'bg-red-400'}`}></span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={chatPath} className="btn-control btn-primary flex-1 text-xs py-2">
            💬 Chat
          </Link>
          <button onClick={fetchStatus} className="btn-control btn-secondary text-xs py-2 px-3" title="Refresh status">
            🔃
          </button>
          <button onClick={() => handleAction('restart')} disabled={actionLoading !== null} className="btn-control btn-secondary text-xs py-2 px-3">
            🔄
          </button>
          <button onClick={() => handleAction(status?.active ? 'stop' : 'start')} disabled={actionLoading !== null} className={`btn-control text-xs py-2 px-3 ${status?.active ? 'btn-danger' : 'btn-secondary'}`}>
            {status?.active ? '⏹️' : '▶️'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 gradient-border animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl glow-purple">
            {emoji}
          </div>
          <div>
            <h2 className="text-title text-white">{name}</h2>
            <p className="text-zinc-500 text-sm">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`status-dot ${status?.active ? 'status-online' : 'status-offline'}`}></span>
          <span className={`text-sm font-semibold ${status?.active ? 'text-green-400' : 'text-red-400'}`}>
            {loading ? '...' : status?.active ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Stats */}
      {status?.active && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{status.memory || '-'}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">Memory</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{status.cpu || '-'}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">CPU</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{status.uptime || '-'}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">Uptime</div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">📍 Port</span>
          <span className="text-white font-mono">{port}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">📁 Workspace</span>
          <span className="text-white font-mono text-xs truncate max-w-[200px]">{workspace}</span>
        </div>
        {status?.skills && status.skills.length > 0 && (
          <div className="flex items-start justify-between">
            <span className="text-zinc-500">🧩 Skills</span>
            <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
              {status.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded text-xs">
                  {skill}
                </span>
              ))}
              {status.skills.length > 4 && (
                <span className="px-2 py-0.5 bg-zinc-700 text-zinc-400 rounded text-xs">
                  +{status.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Link href={chatPath} className="btn-control btn-primary flex-1">
          💬 Open Chat
        </Link>
        <button 
          onClick={() => handleAction('restart')}
          disabled={actionLoading !== null}
          className="btn-control btn-secondary"
        >
          {actionLoading === 'restart' ? '⏳' : '🔄'}
        </button>
        <button 
          onClick={() => handleAction(status?.active ? 'stop' : 'start')}
          disabled={actionLoading !== null}
          className={`btn-control ${status?.active ? 'btn-danger' : 'btn-secondary'}`}
        >
          {actionLoading === 'stop' || actionLoading === 'start' ? '⏳' : status?.active ? '⏹️' : '▶️'}
        </button>
      </div>
    </div>
  );
}
