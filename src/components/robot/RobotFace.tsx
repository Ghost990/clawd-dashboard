'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// ============================================
// MOOD & BEHAVIOR SYSTEM
// ============================================

type Mood = 'neutral' | 'happy' | 'curious' | 'sleepy' | 'angry' | 'surprised' | 'suspicious' | 'love';

interface MoodStyle {
  eyelidScaleY: number;
  eyeScaleX: number;
  eyeScaleY: number;
  leftEyeSkewY: number;
  rightEyeSkewY: number;
  eyeRadius: string;
  glowIntensity: number;
}

const MOOD_STYLES: Record<Mood, MoodStyle> = {
  neutral: {
    eyelidScaleY: 0,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '20px',
    glowIntensity: 1,
  },
  happy: {
    eyelidScaleY: 0.5,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '20px',
    glowIntensity: 1.2,
  },
  curious: {
    eyelidScaleY: 0,
    eyeScaleX: 1.05,
    eyeScaleY: 1.15,
    leftEyeSkewY: 3,
    rightEyeSkewY: -3,
    eyeRadius: '22px',
    glowIntensity: 1.3,
  },
  sleepy: {
    eyelidScaleY: 0.7,
    eyeScaleX: 1,
    eyeScaleY: 0.6,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '15px',
    glowIntensity: 0.6,
  },
  angry: {
    eyelidScaleY: 0.3,
    eyeScaleX: 1,
    eyeScaleY: 0.7,
    leftEyeSkewY: 15,
    rightEyeSkewY: -15,
    eyeRadius: '12px',
    glowIntensity: 1.5,
  },
  surprised: {
    eyelidScaleY: 0,
    eyeScaleX: 1.1,
    eyeScaleY: 1.3,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '25px',
    glowIntensity: 1.4,
  },
  suspicious: {
    eyelidScaleY: 0.4,
    eyeScaleX: 1,
    eyeScaleY: 0.8,
    leftEyeSkewY: -5,
    rightEyeSkewY: 10,
    eyeRadius: '18px',
    glowIntensity: 0.9,
  },
  love: {
    eyelidScaleY: 0.3,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: -5,
    rightEyeSkewY: 5,
    eyeRadius: '50%',
    glowIntensity: 1.3,
  },
};

// Random range helper
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// ============================================
// COMPONENT
// ============================================

type LookDirection = 'center' | 'right' | 'left' | 'up' | 'down';

interface RobotFaceProps {
  className?: string;
  lookAt?: LookDirection;
}

export function RobotFace({ className = '', lookAt = 'center' }: RobotFaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftEyelidRef = useRef<HTMLDivElement>(null);
  const rightEyelidRef = useRef<HTMLDivElement>(null);
  const sweatDropRef = useRef<HTMLDivElement>(null);
  const angerVeinRef = useRef<HTMLDivElement>(null);
  
  const [currentMood, setCurrentMood] = useState<Mood>('neutral');
  const [showSweatDrop, setShowSweatDrop] = useState(false);
  const [showAngerVein, setShowAngerVein] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  
  // Activity tracking
  const lastActivityRef = useRef<number>(Date.now());
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mount check to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ============================================
  // BLINK ANIMATION
  // ============================================
  const blink = useCallback((isWink = false, winkSide: 'left' | 'right' = 'left') => {
    if (!leftEyelidRef.current || !rightEyelidRef.current) return;

    const targets = isWink 
      ? (winkSide === 'left' ? [leftEyelidRef.current] : [rightEyelidRef.current])
      : [leftEyelidRef.current, rightEyelidRef.current];

    const currentStyle = MOOD_STYLES[currentMood];
    
    gsap.timeline()
      .to(targets, {
        scaleY: 1,
        duration: 0.08,
        ease: 'power2.in',
      })
      .to(targets, {
        scaleY: currentStyle.eyelidScaleY,
        duration: 0.12,
        ease: 'power2.out',
      });
  }, [currentMood]);

  // ============================================
  // LOOK AROUND ANIMATION
  // ============================================
  const lookAround = useCallback(() => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    const directions = [
      { x: -30, y: 0 },   // left
      { x: 30, y: 0 },    // right
      { x: 0, y: -15 },   // up
      { x: 0, y: 15 },    // down
      { x: -20, y: -10 }, // up-left
      { x: 20, y: -10 },  // up-right
    ];
    
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const duration = randomRange(0.3, 0.5);
    const holdTime = randomRange(0.5, 2);

    gsap.timeline()
      .to([leftEyeRef.current, rightEyeRef.current], {
        x: dir.x,
        y: dir.y,
        duration,
        ease: 'power2.out',
      })
      .to([leftEyeRef.current, rightEyeRef.current], {
        x: 0,
        y: 0,
        duration,
        ease: 'power2.inOut',
        delay: holdTime,
      });
  }, []);

  // ============================================
  // EYE PULSE (BREATHING EFFECT)
  // ============================================
  const eyePulse = useCallback(() => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    const currentStyle = MOOD_STYLES[currentMood];
    const pulseAmount = 0.05;
    
    gsap.timeline()
      .to([leftEyeRef.current, rightEyeRef.current], {
        scaleX: currentStyle.eyeScaleX * (1 + pulseAmount),
        scaleY: currentStyle.eyeScaleY * (1 + pulseAmount),
        duration: 0.8,
        ease: 'sine.inOut',
      })
      .to([leftEyeRef.current, rightEyeRef.current], {
        scaleX: currentStyle.eyeScaleX,
        scaleY: currentStyle.eyeScaleY,
        duration: 0.8,
        ease: 'sine.inOut',
      });
  }, [currentMood]);

  // ============================================
  // MOOD CHANGE ANIMATION
  // ============================================
  useGSAP(() => {
    if (!mounted) return;
    
    const style = MOOD_STYLES[currentMood];
    
    // Animate eyes
    gsap.to(leftEyeRef.current, {
      scaleX: style.eyeScaleX,
      scaleY: style.eyeScaleY,
      skewY: style.leftEyeSkewY,
      borderRadius: style.eyeRadius,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(rightEyeRef.current, {
      scaleX: style.eyeScaleX,
      scaleY: style.eyeScaleY,
      skewY: style.rightEyeSkewY,
      borderRadius: style.eyeRadius,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Animate eyelids
    gsap.to([leftEyelidRef.current, rightEyelidRef.current], {
      scaleY: style.eyelidScaleY,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Update glow
    const glowSize = 40 * style.glowIntensity;
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      boxShadow: `0 0 ${glowSize}px rgba(0, 229, 255, 0.4), 0 0 ${glowSize * 2}px rgba(0, 229, 255, 0.2)`,
      duration: 0.4,
    });

    // Show/hide anime elements
    setShowSweatDrop(currentMood === 'sleepy' || currentMood === 'surprised');
    setShowAngerVein(currentMood === 'angry');

  }, { scope: containerRef, dependencies: [currentMood, mounted] });

  // ============================================
  // MICRO-BEHAVIOR SCHEDULER
  // ============================================
  useEffect(() => {
    if (!mounted) return;

    // Blink timer
    const scheduleBlink = () => {
      const delay = randomRange(2000, 6000);
      return setTimeout(() => {
        blink();
        // 20% chance of double blink
        if (Math.random() < 0.2) {
          setTimeout(() => blink(), 200);
        }
        blinkTimerRef.current = scheduleBlink();
      }, delay);
    };

    // Look around timer
    const scheduleLook = () => {
      const delay = randomRange(5000, 15000);
      return setTimeout(() => {
        lookAround();
        lookTimerRef.current = scheduleLook();
      }, delay);
    };

    // Wink timer
    const scheduleWink = () => {
      const delay = randomRange(20000, 60000);
      return setTimeout(() => {
        const side = Math.random() < 0.5 ? 'left' : 'right';
        blink(true, side);
        winkTimerRef.current = scheduleWink();
      }, delay);
    };

    // Eye pulse timer
    const schedulePulse = () => {
      const delay = randomRange(3000, 8000);
      return setTimeout(() => {
        eyePulse();
        pulseTimerRef.current = schedulePulse();
      }, delay);
    };

    const blinkTimerRef = { current: scheduleBlink() };
    const lookTimerRef = { current: scheduleLook() };
    const winkTimerRef = { current: scheduleWink() };
    const pulseTimerRef = { current: schedulePulse() };

    return () => {
      clearTimeout(blinkTimerRef.current);
      clearTimeout(lookTimerRef.current);
      clearTimeout(winkTimerRef.current);
      clearTimeout(pulseTimerRef.current);
    };
  }, [mounted, blink, lookAround, eyePulse]);

  // ============================================
  // ACTIVITY TRACKING & IDLE BEHAVIOR
  // ============================================
  const moodTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!mounted) return;

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
      // Return to neutral on activity (unless already neutral or happy)
      if (currentMood !== 'neutral' && currentMood !== 'happy') {
        setCurrentMood('neutral');
      }
    };

    // Random mood change - mostly stays neutral
    const scheduleRandomMood = () => {
      // Long base interval - mostly neutral (30-90 seconds)
      const baseDelay = randomRange(30000, 90000);
      
      moodTimerRef.current = setTimeout(() => {
        const idleTime = Date.now() - lastActivityRef.current;
        
        // Only change mood if idle for at least 20 seconds
        if (idleTime > 20000) {
          const roll = Math.random();
          
          if (currentMood === 'neutral') {
            // From neutral: small chance of other moods
            if (roll < 0.4) {
              // 40% - stay neutral (micro-behaviors keep it alive)
              // Do nothing
            } else if (roll < 0.6) {
              // 20% - curious
              setCurrentMood('curious');
            } else if (roll < 0.75) {
              // 15% - happy
              setCurrentMood('happy');
            } else if (roll < 0.88) {
              // 13% - sleepy (longer idle)
              if (idleTime > 60000) setCurrentMood('sleepy');
            } else if (roll < 0.95) {
              // 7% - suspicious
              setCurrentMood('suspicious');
            } else {
              // 5% - angry (rare, only if very idle)
              if (idleTime > 120000) setCurrentMood('angry');
            }
          } else {
            // From any other mood: high chance to return to neutral
            if (roll < 0.7) {
              setCurrentMood('neutral');
            }
            // 30% chance to stay in current mood a bit longer
          }
        }
        
        // Schedule next check
        scheduleRandomMood();
      }, baseDelay);
    };

    // Mouse/keyboard listeners
    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('keydown', resetActivity);
    window.addEventListener('click', resetActivity);
    window.addEventListener('scroll', resetActivity);

    // Start random mood scheduler
    scheduleRandomMood();

    return () => {
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('keydown', resetActivity);
      window.removeEventListener('click', resetActivity);
      window.removeEventListener('scroll', resetActivity);
      if (moodTimerRef.current) clearTimeout(moodTimerRef.current);
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [mounted, currentMood]);

  // ============================================
  // MOUSE FOLLOW (only when mouse is in center ~50% of screen)
  // ============================================
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container || !leftEyeRef.current || !rightEyeRef.current) return;

      // Check if mouse is in center 50% of screen
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      const thresholdX = window.innerWidth * 0.25; // 25% from center = 50% total zone
      const thresholdY = window.innerHeight * 0.25;
      
      const isInCenterZone = 
        Math.abs(e.clientX - screenCenterX) < thresholdX &&
        Math.abs(e.clientY - screenCenterY) < thresholdY;

      if (!isInCenterZone) {
        // Return eyes to center when mouse is outside zone
        gsap.to([leftEyeRef.current, rightEyeRef.current], {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        return;
      }

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      const maxMoveX = 25;
      const maxMoveY = 15;
      const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX * 50));
      const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY * 30));

      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: moveX,
        y: moveY,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  // ============================================
  // LOOK AT DIRECTION (for panel focus)
  // ============================================
  useEffect(() => {
    if (!mounted || !leftEyeRef.current || !rightEyeRef.current) return;
    if (lookAt === 'center') return; // Let mouse follow handle it

    const directions: Record<LookDirection, { x: number; y: number }> = {
      center: { x: 0, y: 0 },
      right: { x: 35, y: 0 },
      left: { x: -35, y: 0 },
      up: { x: 0, y: -20 },
      down: { x: 0, y: 20 },
    };

    const dir = directions[lookAt];
    
    // Slow smooth movement to look at panel
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      x: dir.x,
      y: dir.y,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Subtle up/down movement while looking
    const floatAnimation = gsap.to([leftEyeRef.current, rightEyeRef.current], {
      y: dir.y + 5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      floatAnimation.kill();
    };
  }, [mounted, lookAt]);

  // ============================================
  // EYE HOVER EFFECT (scared/surprised)
  // ============================================
  useEffect(() => {
    if (!mounted || !leftEyeRef.current || !rightEyeRef.current) return;
    if (lookAt !== 'center') return; // Don't interfere with panel look

    if (isEyeHovered) {
      // Random reaction: surprised or worried
      const reaction = Math.random() < 0.5 ? 'surprised' : 'worried';
      
      if (reaction === 'surprised') {
        // Wide eyes, look up
        gsap.to([leftEyeRef.current, rightEyeRef.current], {
          scaleX: 0.85,
          scaleY: 0.85,
          y: -15,
          duration: 0.2,
          ease: 'back.out(2)',
        });
      } else {
        // Small worried eyes, look up
        gsap.to([leftEyeRef.current, rightEyeRef.current], {
          scaleX: 0.8,
          scaleY: 0.7,
          y: -20,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    } else {
      // Return to normal
      const style = MOOD_STYLES[currentMood];
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        scaleX: style.eyeScaleX,
        scaleY: style.eyeScaleY,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [mounted, isEyeHovered, lookAt, currentMood]);

  // Don't render dynamic content until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div ref={containerRef} className={`robot-face-anime ${className}`}>
        <div className="eyes-container">
          <div className="eye-wrapper">
            <div className="eye" />
          </div>
          <div className="eye-wrapper">
            <div className="eye" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`robot-face-anime ${className}`}>
      {/* Eyes container */}
      <div 
        className="eyes-container"
        onMouseEnter={() => setIsEyeHovered(true)}
        onMouseLeave={() => setIsEyeHovered(false)}
      >
        {/* Left Eye */}
        <div className="eye-wrapper">
          <div ref={leftEyeRef} className="eye">
            <div 
              ref={leftEyelidRef}
              className="eyelid"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
        </div>

        {/* Right Eye */}
        <div className="eye-wrapper">
          <div ref={rightEyeRef} className="eye">
            <div 
              ref={rightEyelidRef}
              className="eyelid"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
        </div>
      </div>

      {/* Anime Elements */}
      {showSweatDrop && (
        <div ref={sweatDropRef} className="sweat-drop">
          <svg viewBox="0 0 20 30" className="w-8 h-12">
            <path
              d="M10 0 C10 0, 0 15, 0 20 C0 25, 4 30, 10 30 C16 30, 20 25, 20 20 C20 15, 10 0, 10 0"
              fill="rgba(0, 229, 255, 0.8)"
            />
          </svg>
        </div>
      )}

      {showAngerVein && (
        <div ref={angerVeinRef} className="anger-vein">
          <svg viewBox="0 0 40 40" className="w-10 h-10">
            <path
              d="M20 5 L20 18 M5 20 L18 20 M20 22 L20 35 M22 20 L35 20"
              stroke="rgba(0, 229, 255, 0.9)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="20" cy="20" r="3" fill="rgba(0, 229, 255, 0.9)" />
          </svg>
        </div>
      )}

      {/* Debug mood indicator (hidden in CSS) */}
      <div className="mood-indicator">
        {(['neutral', 'happy', 'curious', 'sleepy', 'angry', 'surprised'] as Mood[]).map((m) => (
          <button
            key={m}
            onClick={() => setCurrentMood(m)}
            className={`mood-dot ${currentMood === m ? 'active' : ''}`}
            title={m}
          />
        ))}
      </div>
    </div>
  );
}
