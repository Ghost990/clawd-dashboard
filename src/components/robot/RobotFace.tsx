'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// ============================================
// MOOD & BEHAVIOR SYSTEM
// ============================================

type Mood = 'neutral' | 'happy' | 'curious' | 'sleepy' | 'angry' | 'surprised' | 'suspicious' | 'love' | 'confused' | 'excited' | 'bored' | 'focused' | 'mischievous' | 'dizzy';

interface MoodStyle {
  eyelidScaleY: number;
  eyeScaleX: number;
  eyeScaleY: number;
  leftEyeSkewY: number;
  rightEyeSkewY: number;
  eyeRadius: string;
  glowIntensity: number;
  leftBrowY: number;
  leftBrowRotate: number;
  rightBrowY: number;
  rightBrowRotate: number;
  pupilScale: number;
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
    leftBrowY: 0,
    leftBrowRotate: 0,
    rightBrowY: 0,
    rightBrowRotate: 0,
    pupilScale: 1,
  },
  happy: {
    eyelidScaleY: 0.5,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '20px',
    glowIntensity: 1.2,
    leftBrowY: -5,
    leftBrowRotate: -5,
    rightBrowY: -5,
    rightBrowRotate: 5,
    pupilScale: 1.1,
  },
  curious: {
    eyelidScaleY: 0,
    eyeScaleX: 1.05,
    eyeScaleY: 1.15,
    leftEyeSkewY: 3,
    rightEyeSkewY: -3,
    eyeRadius: '22px',
    glowIntensity: 1.3,
    leftBrowY: -8,
    leftBrowRotate: 10,
    rightBrowY: -12,
    rightBrowRotate: -5,
    pupilScale: 1.2,
  },
  sleepy: {
    eyelidScaleY: 0.7,
    eyeScaleX: 1,
    eyeScaleY: 0.6,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '15px',
    glowIntensity: 0.6,
    leftBrowY: 5,
    leftBrowRotate: -10,
    rightBrowY: 5,
    rightBrowRotate: 10,
    pupilScale: 0.8,
  },
  angry: {
    eyelidScaleY: 0.3,
    eyeScaleX: 1,
    eyeScaleY: 0.7,
    leftEyeSkewY: 15,
    rightEyeSkewY: -15,
    eyeRadius: '12px',
    glowIntensity: 1.5,
    leftBrowY: 0,
    leftBrowRotate: 25,
    rightBrowY: 0,
    rightBrowRotate: -25,
    pupilScale: 0.7,
  },
  surprised: {
    eyelidScaleY: 0,
    eyeScaleX: 1.1,
    eyeScaleY: 1.3,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '25px',
    glowIntensity: 1.4,
    leftBrowY: -15,
    leftBrowRotate: 0,
    rightBrowY: -15,
    rightBrowRotate: 0,
    pupilScale: 1.3,
  },
  suspicious: {
    eyelidScaleY: 0.4,
    eyeScaleX: 1,
    eyeScaleY: 0.8,
    leftEyeSkewY: -5,
    rightEyeSkewY: 10,
    eyeRadius: '18px',
    glowIntensity: 0.9,
    leftBrowY: -5,
    leftBrowRotate: -15,
    rightBrowY: 3,
    rightBrowRotate: 20,
    pupilScale: 0.9,
  },
  love: {
    eyelidScaleY: 0.3,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: -5,
    rightEyeSkewY: 5,
    eyeRadius: '50%',
    glowIntensity: 1.4,
    leftBrowY: -8,
    leftBrowRotate: -8,
    rightBrowY: -8,
    rightBrowRotate: 8,
    pupilScale: 1.2,
  },
  confused: {
    eyelidScaleY: 0.2,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: 8,
    rightEyeSkewY: -5,
    eyeRadius: '20px',
    glowIntensity: 1,
    leftBrowY: -10,
    leftBrowRotate: 20,
    rightBrowY: 0,
    rightBrowRotate: -10,
    pupilScale: 1,
  },
  excited: {
    eyelidScaleY: 0,
    eyeScaleX: 1.15,
    eyeScaleY: 1.2,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '25px',
    glowIntensity: 1.6,
    leftBrowY: -12,
    leftBrowRotate: -8,
    rightBrowY: -12,
    rightBrowRotate: 8,
    pupilScale: 1.3,
  },
  bored: {
    eyelidScaleY: 0.4,
    eyeScaleX: 1,
    eyeScaleY: 0.8,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '18px',
    glowIntensity: 0.7,
    leftBrowY: 3,
    leftBrowRotate: -5,
    rightBrowY: 3,
    rightBrowRotate: 5,
    pupilScale: 0.9,
  },
  focused: {
    eyelidScaleY: 0.2,
    eyeScaleX: 0.95,
    eyeScaleY: 0.9,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '18px',
    glowIntensity: 1.2,
    leftBrowY: -3,
    leftBrowRotate: 5,
    rightBrowY: -3,
    rightBrowRotate: -5,
    pupilScale: 0.85,
  },
  mischievous: {
    eyelidScaleY: 0.35,
    eyeScaleX: 1,
    eyeScaleY: 0.9,
    leftEyeSkewY: -10,
    rightEyeSkewY: 0,
    eyeRadius: '20px',
    glowIntensity: 1.3,
    leftBrowY: -5,
    leftBrowRotate: 15,
    rightBrowY: -8,
    rightBrowRotate: -5,
    pupilScale: 1,
  },
  dizzy: {
    eyelidScaleY: 0,
    eyeScaleX: 1,
    eyeScaleY: 1,
    leftEyeSkewY: 0,
    rightEyeSkewY: 0,
    eyeRadius: '20px',
    glowIntensity: 0.8,
    leftBrowY: 0,
    leftBrowRotate: 0,
    rightBrowY: 0,
    rightBrowRotate: 0,
    pupilScale: 1,
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
  const leftBrowRef = useRef<HTMLDivElement>(null);
  const rightBrowRef = useRef<HTMLDivElement>(null);
  const sweatDropRef = useRef<HTMLDivElement>(null);
  const angerVeinRef = useRef<HTMLDivElement>(null);
  
  const [currentMood, setCurrentMood] = useState<Mood>('neutral');
  const [showSweatDrop, setShowSweatDrop] = useState(false);
  const [showAngerVein, setShowAngerVein] = useState(false);
  const [showTongue, setShowTongue] = useState(false);
  const [showMusicNotes, setShowMusicNotes] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showThinkingDots, setShowThinkingDots] = useState(false);
  const [showQuestionMark, setShowQuestionMark] = useState(false);
  const [showEyebrows, setShowEyebrows] = useState(false);
  const [showSleepingZs, setShowSleepingZs] = useState(false);
  const [isListeningToMusic, setIsListeningToMusic] = useState(false);
  const [showDizzyEyes, setShowDizzyEyes] = useState(false);
  const [showDizzySpiral, setShowDizzySpiral] = useState(false);
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
    if (!leftEyelidRef.current || !rightEyelidRef.current || !leftEyeRef.current || !rightEyeRef.current) return;

    const currentStyle = MOOD_STYLES[currentMood];
    
    if (isWink) {
      // Enhanced wink: longer duration, other eye squints
      const winkingEyelid = winkSide === 'left' ? leftEyelidRef.current : rightEyelidRef.current;
      const otherEyelid = winkSide === 'left' ? rightEyelidRef.current : leftEyelidRef.current;
      const otherEye = winkSide === 'left' ? rightEyeRef.current : leftEyeRef.current;
      
      const tl = gsap.timeline();
      
      // Anticipation - slight squint before wink
      tl.to(winkingEyelid, {
        scaleY: 0.3,
        duration: 0.05,
        ease: 'power1.in',
      })
      // Main wink - close winking eye
      .to(winkingEyelid, {
        scaleY: 1,
        duration: 0.1,
        ease: 'power2.in',
      })
      // Other eye squints slightly
      .to(otherEyelid, {
        scaleY: currentStyle.eyelidScaleY + 0.3,
        duration: 0.1,
        ease: 'power2.out',
      }, '<')
      .to(otherEye, {
        scaleY: 0.9,
        duration: 0.1,
        ease: 'power2.out',
      }, '<')
      // Hold the wink longer
      .to({}, { duration: 0.35 })
      // Open winking eye with follow-through
      .to(winkingEyelid, {
        scaleY: currentStyle.eyelidScaleY - 0.1,
        duration: 0.15,
        ease: 'power2.out',
      })
      // Return other eye to normal
      .to(otherEyelid, {
        scaleY: currentStyle.eyelidScaleY,
        duration: 0.15,
        ease: 'power2.out',
      }, '<')
      .to(otherEye, {
        scaleY: currentStyle.eyeScaleY,
        duration: 0.15,
        ease: 'power2.out',
      }, '<')
      // Settle to normal
      .to(winkingEyelid, {
        scaleY: currentStyle.eyelidScaleY,
        duration: 0.1,
        ease: 'sine.out',
      });
    } else {
      // Normal blink
      gsap.timeline()
        .to([leftEyelidRef.current, rightEyelidRef.current], {
          scaleY: 1,
          duration: 0.08,
          ease: 'power2.in',
        })
        .to([leftEyelidRef.current, rightEyelidRef.current], {
          scaleY: currentStyle.eyelidScaleY,
          duration: 0.12,
          ease: 'power2.out',
        });
    }
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

    // Eyebrows only for specific moods (angry, confused, suspicious)
    const showBrows = currentMood === 'angry' || currentMood === 'confused' || currentMood === 'suspicious';
    setShowEyebrows(showBrows);
    
    if (showBrows) {
      gsap.to(leftBrowRef.current, {
        y: style.leftBrowY,
        rotation: style.leftBrowRotate,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      gsap.to(rightBrowRef.current, {
        y: style.rightBrowY,
        rotation: style.rightBrowRotate,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Update glow
    const glowSize = 40 * style.glowIntensity;
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      boxShadow: `0 0 ${glowSize}px rgba(0, 229, 255, 0.4), 0 0 ${glowSize * 2}px rgba(0, 229, 255, 0.2)`,
      duration: 0.4,
    });

    // Show/hide anime elements based on mood
    setShowSweatDrop(currentMood === 'sleepy' || currentMood === 'surprised');
    setShowAngerVein(currentMood === 'angry');
    setShowSparkles(currentMood === 'happy' || currentMood === 'love' || currentMood === 'excited');
    setShowThinkingDots(currentMood === 'focused' || currentMood === 'bored');
    setShowQuestionMark(currentMood === 'confused');

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
  const THIRTY_MINUTES = 30 * 60 * 1000; // 30 min in ms
  const ONE_HOUR = 60 * 60 * 1000; // 1 hour in ms
  
  useEffect(() => {
    if (!mounted) return;

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
      // Wake up on activity
      setShowSleepingZs(false);
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
        
        // 1 hour idle = fully asleep with Zs
        if (idleTime > ONE_HOUR) {
          setCurrentMood('sleepy');
          setShowSleepingZs(true);
          scheduleRandomMood();
          return;
        }
        
        // 30 minutes idle = sleepy
        if (idleTime > THIRTY_MINUTES) {
          setCurrentMood('sleepy');
          scheduleRandomMood();
          return;
        }
        
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
  // MOUSE FOLLOW (tracks across whole screen with velocity detection)
  // ============================================
  const lastMousePosRef = useRef({ x: 0, y: 0, time: Date.now() });
  const mouseVelocityRef = useRef(0);
  const continuousMovementRef = useRef(0); // Track continuous movement duration
  const lastMovementTimeRef = useRef(Date.now());
  
  // Circular motion detection
  const angleHistoryRef = useRef<number[]>([]);
  const totalAngleRef = useRef(0);
  const lastAngleRef = useRef(0);
  const circleCenterRef = useRef({ x: 0, y: 0 });
  const circleStartTimeRef = useRef(Date.now());
  
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container || !leftEyeRef.current || !rightEyeRef.current) return;

      // Calculate mouse velocity
      const now = Date.now();
      const dt = now - lastMousePosRef.current.time;
      if (dt > 0) {
        const dx = e.clientX - lastMousePosRef.current.x;
        const dy = e.clientY - lastMousePosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        mouseVelocityRef.current = distance / dt; // pixels per ms
        
        // Track continuous movement (reset if gap > 200ms)
        if (now - lastMovementTimeRef.current < 200) {
          continuousMovementRef.current += dt;
        } else {
          continuousMovementRef.current = 0;
          // Reset circle tracking on pause
          totalAngleRef.current = 0;
          angleHistoryRef.current = [];
        }
        lastMovementTimeRef.current = now;
        
        // === CIRCULAR MOTION DETECTION ===
        // Track angle from screen center
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const currentAngle = Math.atan2(e.clientY - screenCenterY, e.clientX - screenCenterX);
        
        // Calculate angle difference (handling wrap-around)
        let angleDiff = currentAngle - lastAngleRef.current;
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        // Only count if mouse is moving (not just tiny jitter)
        if (distance > 5) {
          totalAngleRef.current += angleDiff;
          angleHistoryRef.current.push(angleDiff);
          
          // Keep last 50 angle samples
          if (angleHistoryRef.current.length > 50) {
            angleHistoryRef.current.shift();
          }
          
          // Check if we've completed a circle (2*PI radians = 360 degrees)
          // Check for consistent direction (all same sign)
          const allSameDirection = angleHistoryRef.current.length > 20 &&
            angleHistoryRef.current.every(a => a > 0) || 
            angleHistoryRef.current.every(a => a < 0);
          
          if (Math.abs(totalAngleRef.current) > Math.PI * 2 && allSameDirection) {
            // Completed a circle! Get dizzy
            if (currentMood !== 'dizzy') {
              setCurrentMood('dizzy');
              setShowDizzyEyes(true);
              setShowDizzySpiral(true);
              
              // Spin the eyes!
              gsap.to([leftEyeRef.current, rightEyeRef.current], {
                rotation: 360,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                  gsap.set([leftEyeRef.current, rightEyeRef.current], { rotation: 0 });
                },
              });
              
              // Reset after 4 seconds
              setTimeout(() => {
                setCurrentMood('neutral');
                setShowDizzyEyes(false);
                setShowDizzySpiral(false);
              }, 4000);
            }
            // Reset tracking
            totalAngleRef.current = 0;
            angleHistoryRef.current = [];
          }
        }
        
        lastAngleRef.current = currentAngle;
      }
      lastMousePosRef.current = { x: e.clientX, y: e.clientY, time: now };

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate direction from face center to mouse
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Normalize and scale - eyes follow across whole screen
      const maxMoveX = 35;
      const maxMoveY = 20;
      const screenDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
      
      const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, (deltaX / screenDiagonal) * 200));
      const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, (deltaY / screenDiagonal) * 120));

      // Faster tracking for fast mouse movement
      const velocity = mouseVelocityRef.current;
      const trackingSpeed = velocity > 2 ? 0.05 : velocity > 0.5 ? 0.1 : 0.2;
      
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: moveX,
        y: moveY,
        duration: trackingSpeed,
        ease: velocity > 1 ? 'none' : 'power2.out',
        overwrite: 'auto',
      });

      // Confused after 2+ seconds of continuous movement
      if (continuousMovementRef.current > 2000 && currentMood === 'neutral') {
        setCurrentMood('confused');
        continuousMovementRef.current = 0; // Reset to avoid re-triggering
        // Return to neutral after a moment
        setTimeout(() => {
          setCurrentMood((prev) => prev === 'confused' ? 'neutral' : prev);
        }, 3000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, currentMood]);

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
  // PLAYFUL BEHAVIORS (silly/fun animations)
  // ============================================
  const doPlayfulAction = useCallback(() => {
    if (!mounted || !leftEyeRef.current || !rightEyeRef.current) return;

    const actions = ['tongue', 'listenToMusic', 'hum', 'wiggle', 'crossEyes', 'winkWink', 'spinLook'];
    const action = actions[Math.floor(Math.random() * actions.length)];

    switch (action) {
      case 'tongue':
        // Stick out tongue briefly
        setShowTongue(true);
        setCurrentMood('happy');
        setTimeout(() => {
          setShowTongue(false);
          setCurrentMood('neutral');
        }, 3000);
        break;

      case 'listenToMusic':
        // Listen to music - 15-20 seconds of vibing
        setIsListeningToMusic(true);
        setShowMusicNotes(true);
        setCurrentMood('happy');
        
        // Rhythmic head bob animation
        const musicDuration = randomRange(15000, 20000);
        const bobAnimation = gsap.timeline({ repeat: -1 });
        bobAnimation
          .to([leftEyeRef.current, rightEyeRef.current], {
            y: -8,
            rotation: 3,
            duration: 0.4,
            ease: 'power1.inOut',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            y: 0,
            rotation: -3,
            duration: 0.4,
            ease: 'power1.inOut',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            y: -5,
            rotation: 0,
            duration: 0.3,
            ease: 'power1.inOut',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            y: 0,
            rotation: 0,
            duration: 0.3,
            ease: 'power1.inOut',
          });
        
        setTimeout(() => {
          bobAnimation.kill();
          gsap.to([leftEyeRef.current, rightEyeRef.current], {
            y: 0,
            rotation: 0,
            duration: 0.3,
          });
          setShowMusicNotes(false);
          setIsListeningToMusic(false);
          setCurrentMood('neutral');
        }, musicDuration);
        break;

      case 'hum':
        // Humming - shorter, subtler music moment (5-8 seconds)
        setShowMusicNotes(true);
        setCurrentMood('happy');
        
        const humDuration = randomRange(5000, 8000);
        // Gentle side-to-side sway
        const humAnimation = gsap.timeline({ repeat: -1 });
        humAnimation
          .to([leftEyeRef.current, rightEyeRef.current], {
            x: 5,
            duration: 0.6,
            ease: 'sine.inOut',
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            x: -5,
            duration: 0.6,
            ease: 'sine.inOut',
          });
        
        setTimeout(() => {
          humAnimation.kill();
          gsap.to([leftEyeRef.current, rightEyeRef.current], {
            x: 0,
            duration: 0.3,
          });
          setShowMusicNotes(false);
          setCurrentMood('neutral');
        }, humDuration);
        break;

      case 'wiggle':
        // Silly wiggle
        gsap.to([leftEyeRef.current, rightEyeRef.current], {
          rotation: 5,
          duration: 0.1,
          yoyo: true,
          repeat: 7,
          ease: 'sine.inOut',
          onComplete: () => {
            gsap.set([leftEyeRef.current, rightEyeRef.current], { rotation: 0 });
          },
        });
        break;

      case 'crossEyes':
        // Cross eyes briefly
        gsap.to(leftEyeRef.current, { x: 15, duration: 0.3 });
        gsap.to(rightEyeRef.current, { x: -15, duration: 0.3 });
        setTimeout(() => {
          gsap.to([leftEyeRef.current, rightEyeRef.current], {
            x: 0,
            duration: 0.3,
          });
        }, 1500);
        break;

      case 'winkWink':
        // Double wink (alternating)
        blink(true, 'left');
        setTimeout(() => blink(true, 'right'), 400);
        setTimeout(() => blink(true, 'left'), 800);
        break;

      case 'spinLook':
        // Look around in a circle
        const timeline = gsap.timeline();
        timeline
          .to([leftEyeRef.current, rightEyeRef.current], { x: 20, y: 0, duration: 0.3 })
          .to([leftEyeRef.current, rightEyeRef.current], { x: 20, y: -15, duration: 0.3 })
          .to([leftEyeRef.current, rightEyeRef.current], { x: 0, y: -15, duration: 0.3 })
          .to([leftEyeRef.current, rightEyeRef.current], { x: -20, y: -15, duration: 0.3 })
          .to([leftEyeRef.current, rightEyeRef.current], { x: -20, y: 0, duration: 0.3 })
          .to([leftEyeRef.current, rightEyeRef.current], { x: 0, y: 0, duration: 0.3 });
        break;
    }
  }, [mounted, blink]);

  // Schedule playful behaviors (rare, random)
  useEffect(() => {
    if (!mounted) return;

    const schedulePlayful = () => {
      // Random interval: 45-120 seconds
      const delay = randomRange(45000, 120000);
      return setTimeout(() => {
        // Only play if in neutral or happy mood
        if (currentMood === 'neutral' || currentMood === 'happy') {
          doPlayfulAction();
        }
        playfulTimerRef.current = schedulePlayful();
      }, delay);
    };

    const playfulTimerRef = { current: schedulePlayful() };

    return () => {
      clearTimeout(playfulTimerRef.current);
    };
  }, [mounted, currentMood, doPlayfulAction]);

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

  // ============================================
  // EYE TWITCH (random micro-movement for organic feel)
  // ============================================
  useEffect(() => {
    if (!mounted) return;

    const scheduleTwitch = () => {
      const delay = randomRange(8000, 25000);
      return setTimeout(() => {
        if (leftEyeRef.current && rightEyeRef.current) {
          // Random tiny twitch
          const twitchEye = Math.random() < 0.5 ? leftEyeRef.current : rightEyeRef.current;
          gsap.timeline()
            .to(twitchEye, {
              x: '+=3',
              duration: 0.05,
              ease: 'none',
            })
            .to(twitchEye, {
              x: '-=3',
              duration: 0.05,
              ease: 'none',
            });
        }
        twitchTimerRef.current = scheduleTwitch();
      }, delay);
    };

    const twitchTimerRef = { current: scheduleTwitch() };

    return () => {
      clearTimeout(twitchTimerRef.current);
    };
  }, [mounted]);

  // ============================================
  // STARTLE REACTION (very fast mouse = jump back)
  // ============================================
  const startleReaction = useCallback(() => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;
    
    setCurrentMood('surprised');
    
    // Quick jump back
    gsap.timeline()
      .to([leftEyeRef.current, rightEyeRef.current], {
        y: -15,
        scaleY: 1.2,
        duration: 0.1,
        ease: 'back.out(3)',
      })
      .to([leftEyeRef.current, rightEyeRef.current], {
        y: 0,
        scaleY: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    
    // Back to neutral after a moment
    setTimeout(() => setCurrentMood('neutral'), 1000);
  }, []);

  // Check for startle-worthy velocity
  useEffect(() => {
    if (!mounted) return;
    
    let lastStartle = 0;
    
    const checkStartle = () => {
      const now = Date.now();
      if (mouseVelocityRef.current > 5 && now - lastStartle > 3000) {
        lastStartle = now;
        startleReaction();
      }
    };

    const interval = setInterval(checkStartle, 100);
    return () => clearInterval(interval);
  }, [mounted, startleReaction]);

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
          <div ref={leftBrowRef} className={`eyebrow eyebrow-left ${showEyebrows ? 'visible' : ''}`} />
          <div ref={leftEyeRef} className={`eye ${showDizzyEyes ? 'dizzy-eye' : ''}`}>
            {showDizzyEyes && (
              <div className="x-eye">
                <span className="x-line x-line-1" />
                <span className="x-line x-line-2" />
              </div>
            )}
            <div 
              ref={leftEyelidRef}
              className="eyelid"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
        </div>

        {/* Right Eye */}
        <div className="eye-wrapper">
          <div ref={rightBrowRef} className={`eyebrow eyebrow-right ${showEyebrows ? 'visible' : ''}`} />
          <div ref={rightEyeRef} className={`eye ${showDizzyEyes ? 'dizzy-eye' : ''}`}>
            {showDizzyEyes && (
              <div className="x-eye">
                <span className="x-line x-line-1" />
                <span className="x-line x-line-2" />
              </div>
            )}
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

      {/* Tongue */}
      {showTongue && (
        <div className="tongue">
          <svg viewBox="0 0 60 40" className="w-16 h-10">
            <ellipse cx="30" cy="20" rx="25" ry="18" fill="#ff6b9d" />
            <ellipse cx="30" cy="15" rx="20" ry="12" fill="#ff8fb3" />
            <path d="M30 5 L30 35" stroke="#ff5588" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Music Notes */}
      {showMusicNotes && (
        <div className="music-notes">
          <span className="note note-1">♪</span>
          <span className="note note-2">♫</span>
          <span className="note note-3">♪</span>
        </div>
      )}

      {/* Sparkles */}
      {showSparkles && (
        <div className="sparkles">
          <span className="sparkle sparkle-1">✦</span>
          <span className="sparkle sparkle-2">✧</span>
          <span className="sparkle sparkle-3">✦</span>
          <span className="sparkle sparkle-4">✧</span>
        </div>
      )}

      {/* Thinking Dots */}
      {showThinkingDots && (
        <div className="thinking-dots">
          <span className="dot dot-1">•</span>
          <span className="dot dot-2">•</span>
          <span className="dot dot-3">•</span>
        </div>
      )}

      {/* Question Mark */}
      {showQuestionMark && (
        <div className="question-mark">?</div>
      )}

      {/* Sleeping Zs */}
      {showSleepingZs && (
        <div className="sleeping-zs">
          <span className="z z-1">Z</span>
          <span className="z z-2">z</span>
          <span className="z z-3">Z</span>
        </div>
      )}

      {/* Music listening indicator */}
      {isListeningToMusic && (
        <div className="music-vibes">🎧</div>
      )}

      {/* Dizzy spiral */}
      {showDizzySpiral && (
        <div className="dizzy-spirals">
          <span className="spiral spiral-1">@</span>
          <span className="spiral spiral-2">@</span>
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
