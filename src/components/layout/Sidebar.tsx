'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Control', icon: '🎛️' },
  { href: '/chat/bernard', label: 'Bernard', icon: '🔧' },
  { href: '/chat/moni', label: 'Moni', icon: '💒' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 lg:w-64 glass border-r border-white/5 flex flex-col transition-all">
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl glow-purple group-hover:scale-105 transition-transform">
            🤖
          </div>
          <div className="hidden lg:block">
            <span className="font-black text-xl text-white tracking-tight">CLAWD</span>
            <span className="text-[10px] text-violet-400 block -mt-1 font-semibold tracking-widest uppercase">Dashboard</span>
          </div>
        </Link>
      </div>
      
      {/* Nav */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl text-sm font-semibold transition-all justify-center lg:justify-start',
                  pathname === item.href
                    ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/10 text-white border border-violet-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Status */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 justify-center lg:justify-start">
          <span className="status-dot status-online"></span>
          <span className="text-xs text-emerald-400 font-semibold hidden lg:inline">Online</span>
        </div>
      </div>
    </aside>
  );
}
