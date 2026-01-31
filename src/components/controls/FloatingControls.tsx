'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ControlButton {
  id: string;
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface FloatingControlsProps {
  buttons: ControlButton[];
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function FloatingControls({ buttons, position = 'bottom-right' }: FloatingControlsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.children, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      delay: 0.5,
    });
  }, []);

  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
  };

  return (
    <div
      ref={containerRef}
      className={`fixed ${positionClasses[position]} z-40 flex gap-3`}
    >
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={button.onClick}
          className={`
            group relative w-14 h-14 rounded-2xl
            backdrop-blur-xl border transition-all duration-300
            flex items-center justify-center text-2xl
            hover:scale-110 active:scale-95
            ${button.isActive 
              ? 'bg-violet-500/30 border-violet-500/50 shadow-lg shadow-violet-500/25' 
              : 'bg-zinc-900/50 border-white/10 hover:bg-zinc-800/50 hover:border-white/20'
            }
          `}
          title={button.label}
        >
          <span className={`transition-transform duration-200 group-hover:scale-110 ${button.isActive ? 'drop-shadow-glow' : ''}`}>
            {button.icon}
          </span>
          
          {/* Tooltip */}
          <span className="
            absolute -top-10 left-1/2 -translate-x-1/2
            px-3 py-1.5 rounded-lg text-xs font-medium
            bg-zinc-900/90 backdrop-blur-sm border border-white/10
            text-white whitespace-nowrap
            opacity-0 group-hover:opacity-100
            -translate-y-1 group-hover:translate-y-0
            transition-all duration-200
            pointer-events-none
          ">
            {button.label}
          </span>
        </button>
      ))}
    </div>
  );
}
