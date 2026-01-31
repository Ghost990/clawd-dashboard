'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// Line icons as SVG components
const LineIcons = {
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <circle cx="9" cy="14" r="2" />
      <circle cx="15" cy="14" r="2" />
      <path d="M9 4v4M15 4v4M12 2v2" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 5-6" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

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
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 200; // pixels from corner
      const isNearCorner = 
        e.clientX > window.innerWidth - threshold &&
        e.clientY > window.innerHeight - threshold;
      
      setIsVisible(isNearCorner);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate visibility
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 20,
      duration: 0.3,
      ease: 'power2.out',
      pointerEvents: isVisible ? 'auto' : 'none',
    });
  }, [isVisible]);

  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
  };

  // Map button id to line icon
  const getIcon = (id: string) => {
    switch (id) {
      case 'bots': return LineIcons.robot;
      case 'metrics': return LineIcons.chart;
      case 'actions': return LineIcons.bolt;
      default: return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`floating-controls fixed ${positionClasses[position]} z-[200] flex gap-5`}
      style={{ opacity: 0 }}
    >
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={button.onClick}
          className={`
            group relative
            flex items-center justify-center
            transition-all duration-300
            hover:scale-125 active:scale-95
            ${button.isActive ? 'scale-110' : ''}
          `}
          title={button.label}
          style={{
            color: '#00e5ff',
            filter: button.isActive 
              ? 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.9))' 
              : 'drop-shadow(0 0 6px rgba(0, 229, 255, 0.5))',
          }}
        >
          {getIcon(button.id)}
          
          {/* Tooltip */}
          <span className="
            absolute -top-10 left-1/2 -translate-x-1/2
            px-3 py-1.5 rounded-lg text-xs font-medium
            bg-black/80 backdrop-blur-sm border border-cyan-500/30
            text-cyan-400 whitespace-nowrap
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
