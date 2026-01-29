'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SystemInfo as SystemInfoType, NetworkInterface } from '@/types/metrics';

interface SystemInfoProps {
  system: SystemInfoType;
  network: NetworkInterface[];
}

export function SystemInfo({ system, network }: SystemInfoProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <span className="text-lg">💻</span>
          System Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Hostname</span>
            <p className="text-white font-medium">{system.hostname}</p>
          </div>
          <div>
            <span className="text-slate-500">OS</span>
            <p className="text-white font-medium">{system.os}</p>
          </div>
          <div>
            <span className="text-slate-500">Kernel</span>
            <p className="text-white font-mono text-xs">{system.kernel}</p>
          </div>
          <div>
            <span className="text-slate-500">Architecture</span>
            <p className="text-white font-medium">{system.arch}</p>
          </div>
        </div>

        {network.length > 0 && (
          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-500 block mb-2">Network Interfaces</span>
            <div className="space-y-2">
              {network.map((iface) => (
                <div key={iface.name} className="flex items-center justify-between">
                  <Badge variant="outline" className="text-slate-400 border-slate-700">
                    {iface.name}
                  </Badge>
                  <span className="text-white font-mono text-xs">{iface.ip4}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
