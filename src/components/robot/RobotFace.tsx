'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type Mood = 'happy' | 'curious' | 'angry' | 'surprised' | 'sleepy' | 'love';

interface RobotFaceProps {
  mood?: Mood;
  className?: string;
}

export function RobotFace({ mood = 'happy', className = '' }: RobotFaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftEyelidRef = useRef<HTMLDivElement>(null);
  const rightEyelidRef = useRef<HTMLDivElement>(null);
  
  const [currentMood, setCurrentMood] = useState<Mood>(mood);

  // Blink animation
  useGSAP(() => {
    if (!leftEyelidRef.current || !rightEyelidRef.current) return;

    const blink = () => {
      const tl = gsap.timeline();
      tl.to([leftEyelidRef.current, rightEyelidRef.current], {
        scaleY: 1,
        duration: 0.08,
        ease: 'power2.in',
      })
      .to([leftEyelidRef.current, rightEyelidRef.current], {
        scaleY: 0,
        duration: 0.12,
        ease: 'power2.out',
      });
    };

    // Regular blink
    const blinkInterval = setInterval(() => {
      blink();
      // Random double blink
      if (Math.random() > 0.7) {
        setTimeout(blink, 200);
      }
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, { scope: containerRef });

  // Pupil follow mouse
  useGSAP(() => {
    if (!leftPupilRef.current || !rightPupilRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      const maxMoveX = 30;
      const maxMoveY = 20;
      const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX * 60));
      const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY * 40));

      gsap.to([leftPupilRef.current, rightPupilRef.current], {
        x: moveX,
        y: moveY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  // Mood styles
  const moodStyles = {
    happy: {
      eyeHeight: '120px',
      eyeRadius: '12px',
      eyeSkewY: '0deg',
      pupilSize: '40px',
      pupilRadius: '8px',
    },
    curious: {
      eyeHeight: '140px',
      eyeRadius: '12px',
      eyeSkewY: '0deg',
      pupilSize: '50px',
      pupilRadius: '10px',
    },
    angry: {
      eyeHeight: '80px',
      eyeRadius: '4px',
      eyeSkewY: '-8deg',
      pupilSize: '35px',
      pupilRadius: '6px',
    },
    surprised: {
      eyeHeight: '160px',
      eyeRadius: '20px',
      eyeSkewY: '0deg',
      pupilSize: '30px',
      pupilRadius: '50%',
    },
    sleepy: {
      eyeHeight: '40px',
      eyeRadius: '4px',
      eyeSkewY: '0deg',
      pupilSize: '35px',
      pupilRadius: '6px',
    },
    love: {
      eyeHeight: '100px',
      eyeRadius: '50%',
      eyeSkewY: '0deg',
      pupilSize: '0px',
      pupilRadius: '0',
    },
  };

  // Mood change animation
  useGSAP(() => {
    const style = moodStyles[currentMood];
    
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      height: style.eyeHeight,
      borderRadius: style.eyeRadius,
      skewY: style.eyeSkewY,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to([leftPupilRef.current, rightPupilRef.current], {
      width: style.pupilSize,
      height: style.pupilSize,
      borderRadius: style.pupilRadius,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Mirror skew for right eye when angry
    if (currentMood === 'angry' && rightEyeRef.current) {
      gsap.to(rightEyeRef.current, {
        skewY: '8deg',
        duration: 0.3,
      });
    }
  }, { scope: containerRef, dependencies: [currentMood] });

  // Cycle through moods
  useEffect(() => {
    const moods: Mood[] = ['happy', 'curious', 'surprised', 'happy', 'sleepy', 'angry', 'love'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % moods.length;
      setCurrentMood(moods[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`robot-face-anime ${className}`}
    >
      {/* Eyes container */}
      <div className="eyes-container">
        {/* Left Eye */}
        <div className="eye-wrapper">
          <div 
            ref={leftEyeRef}
            className="eye"
          >
            {currentMood === 'love' ? (
              <div className="heart">❤️</div>
            ) : (
              <div 
                ref={leftPupilRef}
                className="pupil"
              />
            )}
          </div>
          {/* Eyelid */}
          <div 
            ref={leftEyelidRef}
            className="eyelid"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* Right Eye */}
        <div className="eye-wrapper">
          <div 
            ref={rightEyeRef}
            className="eye"
          >
            {currentMood === 'love' ? (
              <div className="heart">❤️</div>
            ) : (
              <div 
                ref={rightPupilRef}
                className="pupil"
              />
            )}
          </div>
          {/* Eyelid */}
          <div 
            ref={rightEyelidRef}
            className="eyelid"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      {/* Mood indicator */}
      <div className="mood-indicator">
        {(['happy', 'curious', 'surprised', 'angry', 'sleepy', 'love'] as Mood[]).map((m) => (
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
