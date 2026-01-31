'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GlassOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: 'left' | 'right' | 'center' | 'bottom';
}

export function GlassOverlay({ 
  isOpen, 
  onClose, 
  children, 
  title,
  position = 'right' 
}: GlassOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      const from = position === 'left' ? { x: -50 } : 
                   position === 'right' ? { x: 50 } :
                   position === 'bottom' ? { y: 50 } : { scale: 0.9 };
      
      gsap.from(contentRef.current, {
        ...from,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
        },
      });
    }
  }, [isOpen, position]);

  const positionClasses = {
    left: 'justify-start items-center pl-8',
    right: 'justify-end items-center pr-8',
    center: 'justify-center items-center',
    bottom: 'justify-center items-end pb-8',
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 ${positionClasses[position]}`}
      style={{ display: 'none', opacity: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={contentRef}
        className="glass-overlay relative max-h-[90vh] overflow-auto"
      >
        {title && (
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <span className="text-zinc-400">✕</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
