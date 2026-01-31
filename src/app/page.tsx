'use client';

import { useState } from 'react';
import { RobotFace } from '@/components/robot/RobotFace';
import { GlassOverlay } from '@/components/overlay/GlassOverlay';
import { FloatingControls } from '@/components/controls/FloatingControls';
import { BotsPanel } from '@/components/panels/BotsPanel';
import { MiniMetrics } from '@/components/dashboard/MiniMetrics';
import { BotCards } from '@/components/dashboard/BotCards';

type ViewMode = 'screensaver' | 'dashboard';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('screensaver');
  const [showBots, setShowBots] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
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
    } catch {
      setRustdeskStatus('✗ Failed to connect');
    } finally {
      setRustdeskLoading(false);
      setTimeout(() => setRustdeskStatus(null), 3000);
    }
  };

  const controlButtons = [
    {
      id: 'bots',
      icon: '🤖',
      label: 'Bot Controls',
      isActive: showBots,
      onClick: () => {
        setShowBots(!showBots);
        setShowMetrics(false);
        setShowQuickActions(false);
      },
    },
    {
      id: 'metrics',
      icon: '📊',
      label: 'System Metrics',
      isActive: showMetrics,
      onClick: () => {
        setShowMetrics(!showMetrics);
        setShowBots(false);
        setShowQuickActions(false);
      },
    },
    {
      id: 'actions',
      icon: '⚡',
      label: 'Quick Actions',
      isActive: showQuickActions,
      onClick: () => {
        setShowQuickActions(!showQuickActions);
        setShowBots(false);
        setShowMetrics(false);
      },
    },
  ];

  return (
    <div className="robot-home">
      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={viewMode === 'screensaver' ? 'active' : ''}
          onClick={() => setViewMode('screensaver')}
        >
          🤖 Screensaver
        </button>
        <button 
          className={viewMode === 'dashboard' ? 'active' : ''}
          onClick={() => setViewMode('dashboard')}
        >
          📊 Dashboard
        </button>
      </div>

      {viewMode === 'screensaver' ? (
        <div className="screensaver-view">
          {/* Full screen robot background */}
          <div className="robot-container">
            <RobotFace 
              className="robot-face-centered" 
              lookAt={showBots || showMetrics || showQuickActions ? 'right' : 'center'}
            />
          </div>

          {/* Floating controls only in screensaver */}
          <FloatingControls buttons={controlButtons} position="bottom-right" />
        </div>
      ) : (
        <div className="dashboard-view">
          <BotCards />
        </div>
      )}

      {/* Brand */}
      <div className="fixed top-6 left-6 z-30">
        <h1 className="text-2xl font-black text-white/80 tracking-tight">
          Clawd<span className="text-violet-400">bot</span>
        </h1>
        <p className="text-xs text-zinc-500">Control Center</p>
      </div>

      {/* Bot Panel Overlay */}
      <GlassOverlay
        isOpen={showBots}
        onClose={() => setShowBots(false)}
        title="Bot Controls"
        position="right"
      >
        <BotsPanel />
      </GlassOverlay>

      {/* Metrics Overlay */}
      <GlassOverlay
        isOpen={showMetrics}
        onClose={() => setShowMetrics(false)}
        title="System Metrics"
        position="right"
      >
        <div className="w-80">
          <MiniMetrics />
        </div>
      </GlassOverlay>

      {/* Quick Actions Overlay */}
      <GlassOverlay
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        title="Quick Actions"
        position="right"
      >
        <div className="space-y-3 w-72">
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
            <p className={`text-xs ${rustdeskStatus.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
              {rustdeskStatus}
            </p>
          )}
          
          <div className="pt-4 mt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Host Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Machine</span>
                <span className="text-white font-mono text-xs">ThinkPad T470</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">OS</span>
                <span className="text-white text-xs">Ubuntu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Ports</span>
                <span className="text-white font-mono text-xs">19001, 19002</span>
              </div>
            </div>
          </div>
        </div>
      </GlassOverlay>
    </div>
  );
}
