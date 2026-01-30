'use client';

import { useState } from 'react';
import { BotControlCard } from '@/components/dashboard/BotControlCard';
import { MiniMetrics } from '@/components/dashboard/MiniMetrics';

const bots = [
  {
    name: 'Bernard',
    serviceName: 'clawdbot-bernard',
    port: 19001,
    emoji: '🔧',
    description: 'Dev partner — coder, thinker, collaborator',
    workspace: '/home/ankyr/clawd',
    chatPath: '/chat/bernard',
  },
  {
    name: 'Moni',
    serviceName: 'clawdbot-moni',
    port: 19002,
    emoji: '💒',
    description: 'Wedding planner assistant',
    workspace: '/home/ankyr/.clawdbot-soul2',
    chatPath: '/chat/moni',
  },
];

export default function Home() {
  const [rustdeskLoading, setRustdeskLoading] = useState(false);
  const [rustdeskStatus, setRustdeskStatus] = useState<string | null>(null);

  const launchRustdesk = async () => {
    setRustdeskLoading(true);
    setRustdeskStatus(null);
    try {
      const res = await fetch('/api/rustdesk', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setRustdeskStatus('✓ Started');
      } else {
        setRustdeskStatus(`✗ ${data.error}`);
      }
    } catch (e) {
      setRustdeskStatus('✗ Failed to connect');
    } finally {
      setRustdeskLoading(false);
      // Clear status after 3 seconds
      setTimeout(() => setRustdeskStatus(null), 3000);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-headline text-white mb-2">
          Control Center
        </h1>
        <p className="text-lg text-zinc-500">
          Manage your Clawdbot instances
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bot Control Cards */}
        <div className="lg:col-span-2 space-y-6 stagger-children">
          {bots.map((bot) => (
            <BotControlCard key={bot.name} {...bot} />
          ))}
        </div>

        {/* Sidebar - System Metrics */}
        <div className="space-y-6">
          <MiniMetrics />
          
          {/* Quick Actions */}
          <div className="glass rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>⚡</span> Quick Actions
            </h3>
            <div className="space-y-2">
              <a 
                href="http://127.0.0.1:19001" 
                target="_blank" 
                rel="noopener"
                className="btn-control btn-secondary w-full justify-start"
              >
                🌐 Bernard Dashboard
              </a>
              <a 
                href="http://127.0.0.1:19002" 
                target="_blank" 
                rel="noopener"
                className="btn-control btn-secondary w-full justify-start"
              >
                🌐 Moni Dashboard
              </a>
              <button className="btn-control btn-secondary w-full justify-start opacity-50 cursor-not-allowed">
                📊 View Logs
              </button>
              <button 
                onClick={launchRustdesk}
                disabled={rustdeskLoading}
                className="btn-control btn-primary w-full justify-start"
              >
                {rustdeskLoading ? (
                  <>🔄 Starting...</>
                ) : (
                  <>🖥️ Remote Access (RustDesk)</>
                )}
              </button>
              {rustdeskStatus && (
                <p className={`text-xs mt-1 ${rustdeskStatus.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                  {rustdeskStatus}
                </p>
              )}
            </div>
          </div>

          {/* System Info */}
          <div className="glass rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>💻</span> Host
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Machine</span>
                <span className="text-white font-mono">ThinkPad T470</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">OS</span>
                <span className="text-white">Ubuntu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Gateway Port</span>
                <span className="text-white font-mono">19001, 19002</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
