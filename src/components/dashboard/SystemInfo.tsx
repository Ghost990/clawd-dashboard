'use client';

import { Badge } from '@/components/ui/badge';
import type { SystemInfo as SystemInfoType, NetworkInterface } from '@/types/metrics';

interface SystemInfoProps {
  system: SystemInfoType;
  network: NetworkInterface[];
}

export function SystemInfo({ system, network }: SystemInfoProps) {
  return (
    <div className="glass-card rounded-2xl p-6 gradient-border">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">💻</span>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">System Information</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-wider">Hostname</span>
          <p className="text-lg font-bold text-white mt-1">{system.hostname}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-wider">Operating System</span>
          <p className="text-lg font-bold text-white mt-1">{system.os}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-wider">Kernel</span>
          <p className="text-sm font-mono text-cyan-400 mt-1">{system.kernel}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-wider">Architecture</span>
          <p className="text-lg font-bold text-white mt-1">{system.arch}</p>
        </div>
      </div>

      {network.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Network Interfaces</span>
          <div className="mt-3 space-y-2">
            {network.map((iface) => (
              <div key={iface.name} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono">
                  {iface.name}
                </Badge>
                <span className="text-white font-mono text-sm">{iface.ip4}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
