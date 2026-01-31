'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type Mood = 'happy' | 'curious' | 'sleepy' | 'excited' | 'thinking';

interface RobotFaceProps {
  mood?: Mood;
  className?: string;
}

export function RobotFace({ mood = 'happy', className = '' }: RobotFaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftEyelidRef = useRef<SVGRectElement>(null);
  const rightEyelidRef = useRef<SVGRectElement>(null);
  const leftHighlightRef = useRef<SVGCircleElement>(null);
  const rightHighlightRef = useRef<SVGCircleElement>(null);
  
  const [currentMood, setCurrentMood] = useState<Mood>(mood);

  // Eye dimensions and positions
  const eyeConfig = {
    happy: { eyeScaleY: 1, pupilY: 0, eyelidY: -60 },
    curious: { eyeScaleY: 1.1, pupilY: -5, eyelidY: -60 },
    sleepy: { eyeScaleY: 0.5, pupilY: 5, eyelidY: -30 },
    excited: { eyeScaleY: 1.2, pupilY: -3, eyelidY: -60 },
    thinking: { eyeScaleY: 0.9, pupilY: 0, eyelidY: -50 },
  };

  // Blink animation
  useGSAP(() => {
    if (!leftEyelidRef.current || !rightEyelidRef.current) return;

    const blinkTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    blinkTimeline
      .to([leftEyelidRef.current, rightEyelidRef.current], {
        y: 0,
        duration: 0.1,
        ease: 'power2.in',
      })
      .to([leftEyelidRef.current, rightEyelidRef.current], {
        y: -60,
        duration: 0.15,
        ease: 'power2.out',
      });

    // Random double blink
    const doubleBlink = () => {
      if (Math.random() > 0.7) {
        gsap.timeline()
          .to([leftEyelidRef.current, rightEyelidRef.current], {
            y: 0, duration: 0.08, ease: 'power2.in'
          })
          .to([leftEyelidRef.current, rightEyelidRef.current], {
            y: -60, duration: 0.1, ease: 'power2.out'
          })
          .to([leftEyelidRef.current, rightEyelidRef.current], {
            y: 0, duration: 0.08, ease: 'power2.in', delay: 0.1
          })
          .to([leftEyelidRef.current, rightEyelidRef.current], {
            y: -60, duration: 0.1, ease: 'power2.out'
          });
      }
    };

    const interval = setInterval(doubleBlink, 5000);
    return () => clearInterval(interval);
  }, { scope: containerRef });

  // Pupil follow mouse
  useGSAP(() => {
    if (!leftPupilRef.current || !rightPupilRef.current) return;
    if (!leftHighlightRef.current || !rightHighlightRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      const maxMove = 15;
      const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX * 30));
      const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY * 30));

      gsap.to([leftPupilRef.current, rightPupilRef.current], {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to([leftHighlightRef.current, rightHighlightRef.current], {
        x: moveX * 0.5,
        y: moveY * 0.5,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  // Mood change animation
  useGSAP(() => {
    const config = eyeConfig[currentMood];
    
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      scaleY: config.eyeScaleY,
      duration: 0.4,
      ease: 'power2.inOut',
    });

    gsap.to([leftPupilRef.current, rightPupilRef.current], {
      y: config.pupilY,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to([leftEyelidRef.current, rightEyelidRef.current], {
      y: config.eyelidY,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, { scope: containerRef, dependencies: [currentMood] });

  // Idle animation - subtle breathing/floating
  useGSAP(() => {
    gsap.to(containerRef.current, {
      y: -5,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, { scope: containerRef });

  // Cycle through moods for demo
  useEffect(() => {
    const moods: Mood[] = ['happy', 'curious', 'excited', 'thinking', 'sleepy'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % moods.length;
      setCurrentMood(moods[index]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`robot-face ${className}`}
    >
      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-full"
        style={{ maxWidth: '600px' }}
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <radialGradient id="pupilGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f0a1a" />
          </radialGradient>
        </defs>

        {/* Left eye socket/white */}
        <ellipse
          cx="130"
          cy="150"
          rx="55"
          ry="60"
          fill="url(#eyeGradient)"
          filter="url(#glow)"
          ref={leftEyeRef}
          style={{ transformOrigin: '130px 150px' }}
        />

        {/* Right eye socket/white */}
        <ellipse
          cx="270"
          cy="150"
          rx="55"
          ry="60"
          fill="url(#eyeGradient)"
          filter="url(#glow)"
          ref={rightEyeRef}
          style={{ transformOrigin: '270px 150px' }}
        />

        {/* Left pupil */}
        <circle
          ref={leftPupilRef}
          cx="130"
          cy="150"
          r="25"
          fill="url(#pupilGradient)"
        />

        {/* Right pupil */}
        <circle
          ref={rightPupilRef}
          cx="270"
          cy="150"
          r="25"
          fill="url(#pupilGradient)"
        />

        {/* Left highlight */}
        <circle
          ref={leftHighlightRef}
          cx="120"
          cy="140"
          r="8"
          fill="rgba(255,255,255,0.9)"
          filter="url(#innerGlow)"
        />

        {/* Right highlight */}
        <circle
          ref={rightHighlightRef}
          cx="260"
          cy="140"
          r="8"
          fill="rgba(255,255,255,0.9)"
          filter="url(#innerGlow)"
        />

        {/* Left eyelid */}
        <rect
          ref={leftEyelidRef}
          x="70"
          y="85"
          width="120"
          height="70"
          fill="var(--bg-dark, #09090b)"
          style={{ transform: 'translateY(-60px)' }}
        />

        {/* Right eyelid */}
        <rect
          ref={rightEyelidRef}
          x="210"
          y="85"
          width="120"
          height="70"
          fill="var(--bg-dark, #09090b)"
          style={{ transform: 'translateY(-60px)' }}
        />
      </svg>

      {/* Mood indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {(['happy', 'curious', 'excited', 'thinking', 'sleepy'] as Mood[]).map((m) => (
          <button
            key={m}
            onClick={() => setCurrentMood(m)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentMood === m 
                ? 'bg-violet-500 scale-125 shadow-lg shadow-violet-500/50' 
                : 'bg-zinc-700 hover:bg-zinc-600'
            }`}
            title={m}
          />
        ))}
      </div>
    </div>
  );
}
