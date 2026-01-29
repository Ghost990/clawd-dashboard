'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/chat/bernard', label: 'Bernard', icon: '🔧' },
  { href: '/chat/moni', label: 'Moni', icon: '💒' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-card border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center glow-cyan group-hover:scale-105 transition-transform">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight">Clawd</span>
            <span className="text-xs text-cyan-400 block -mt-1">Dashboard</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Navigation</p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  pathname === item.href
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-white border border-cyan-500/30 glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow"></span>
            <span className="text-sm text-green-400 font-medium">All systems online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
