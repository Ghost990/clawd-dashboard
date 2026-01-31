// ============================================
// ROBOT PERSONALITY & BEHAVIOR SYSTEM
// ============================================

export type Mood = 
  | 'neutral' 
  | 'happy' 
  | 'curious' 
  | 'sleepy' 
  | 'angry' 
  | 'surprised' 
  | 'suspicious' 
  | 'confused'
  | 'excited'
  | 'bored'
  | 'focused'
  | 'mischievous'
  | 'love';

export interface MoodStyle {
  leftEye: {
    scaleX: number;
    scaleY: number;
    skewY: number;
    rotation: number;
  };
  rightEye: {
    scaleX: number;
    scaleY: number;
    skewY: number;
    rotation: number;
  };
  eyelidScaleY: number;
  eyeRadius: string;
  glowIntensity: number;
  transitionDuration: number;
}

export const MOOD_STYLES: Record<Mood, MoodStyle> = {
  neutral: {
    leftEye: { scaleX: 1, scaleY: 1, skewY: 0, rotation: 0 },
    rightEye: { scaleX: 1, scaleY: 1, skewY: 0, rotation: 0 },
    eyelidScaleY: 0,
    eyeRadius: '20px',
    glowIntensity: 1,
    transitionDuration: 0.4,
  },
  happy: {
    leftEye: { scaleX: 1, scaleY: 1, skewY: 0, rotation: 0 },
    rightEye: { scaleX: 1, scaleY: 1, skewY: 0, rotation: 0 },
    eyelidScaleY: 0.5,
    eyeRadius: '20px',
    glowIntensity: 1.3,
    transitionDuration: 0.3,
  },
  curious: {
    leftEye: { scaleX: 1.1, scaleY: 1.15, skewY: 3, rotation: 0 },
    rightEye: { scaleX: 1.05, scaleY: 1.1, skewY: -3, rotation: 0 },
    eyelidScaleY: 0,
    eyeRadius: '22px',
    glowIntensity: 1.2,
    transitionDuration: 0.35,
  },
  sleepy: {
    leftEye: { scaleX: 1, scaleY: 0.5, skewY: 0, rotation: 0 },
    rightEye: { scaleX: 1, scaleY: 0.5, skewY: 0, rotation: 0 },
    eyelidScaleY: 0.7,
    eyeRadius: '15px',
    glowIntensity: 0.5,
    transitionDuration: 0.8,
  },
  angry: {
    leftEye: { scaleX: 1, scaleY: 0.7, skewY: 15, rotation: 0 },
    rightEye: { scaleX: 1, scaleY: 0.7, skewY: -15, rotation: 0 },
    eyelidScaleY: 0.3,
    eyeRadius: '12px',
    glowIntensity: 1.5,
    transitionDuration: 0.2,
  },
  surprised: {
    leftEye: { scaleX: 1.2, scaleY: 1.3, skewY: 0, rotation: 0 },
    rightEye: { scaleX: 1.2, scaleY: 1.3, skewY: 0, rotation: 0 },
    eyelidScaleY: 0,
    eyeRadius: '30px',
    glowIntensity: 1.5,
    transitionDuration: 0.15,
  },
  suspicious: {
    leftEye: { scaleX: 1, scaleY: 0.7, skewY: -5, rotation: 0 },
    rightEye: { scaleX: 0.9, scaleY: 0.5, skewY: 5, rotation: 0 },
    eyelidScaleY: 0.5,
    eyeRadius: '18px',
    glowIntensity: 0.9,
    transitionDuration: 0.4,
  },
  confused: {
    leftEye: { scaleX: 1.1, scaleY: 1.1, skewY: 5, rotation: 3 },
    rightEye: { scaleX: 0.9, scaleY: 0.9, skewY: -5, rotation: -3 },
    eyelidScaleY: 0.2,
    eyeRadius: '20px',
    glowIntensity: 1,
    transitionDuration: 0.35,
  },
  excited: {
    leftEye: { scaleX: 1.15, scaleY: 1.2, skewY: 0, rotation: 0 },
    rightEye: { scaleX: 1.15, scaleY: 1.2, skewY: 0, rotation: 0 },
    eyelidScaleY: 0,
    eyeRadius: '25px',
    glowIntensity: 1.6,
    transitionDuration: 0.2,
  },
  bored: {
    leftEye: { scaleX: 1, scaleY: 0.8, skewY: 0, rotation: -2 },
    rightEye: { scaleX: 1, scaleY: 0.8, skewY: 0, rotation: 2 },
    eyelidScaleY: 0.4,
    eyeRadius: '18px',
    glowIntensity: 0.7,
    transitionDuration: 0.6,
  },
  focused: {
    leftEye: { scaleX: 0.95, scaleY: 0.9, skewY: 0, rotation: 0 },
    rightEye: { scaleX: 0.95, scaleY: 0.9, skewY: 0, rotation: 0 },
    eyelidScaleY: 0.2,
    eyeRadius: '18px',
    glowIntensity: 1.2,
    transitionDuration: 0.3,
  },
  mischievous: {
    leftEye: { scaleX: 1, scaleY: 0.9, skewY: -8, rotation: 0 },
    rightEye: { scaleX: 1, scaleY: 1, skewY: 0, rotation: 0 },
    eyelidScaleY: 0.3,
    eyeRadius: '20px',
    glowIntensity: 1.2,
    transitionDuration: 0.3,
  },
  love: {
    leftEye: { scaleX: 1, scaleY: 1, skewY: -5, rotation: 0 },
    rightEye: { scaleX: 1, scaleY: 1, skewY: 5, rotation: 0 },
    eyelidScaleY: 0.3,
    eyeRadius: '50%',
    glowIntensity: 1.4,
    transitionDuration: 0.4,
  },
};

// Mood transition probabilities - what moods naturally flow into
export const MOOD_TRANSITIONS: Record<Mood, Partial<Record<Mood, number>>> = {
  neutral: { curious: 0.2, happy: 0.15, bored: 0.1, focused: 0.05 },
  happy: { neutral: 0.4, excited: 0.2, mischievous: 0.15 },
  curious: { neutral: 0.3, surprised: 0.2, focused: 0.15, confused: 0.1 },
  sleepy: { neutral: 0.3, bored: 0.2, angry: 0.1 },
  angry: { neutral: 0.5, suspicious: 0.2 },
  surprised: { neutral: 0.4, curious: 0.2, confused: 0.15, excited: 0.1 },
  suspicious: { neutral: 0.4, curious: 0.2, angry: 0.1 },
  confused: { neutral: 0.4, curious: 0.3 },
  excited: { happy: 0.3, neutral: 0.3, mischievous: 0.15 },
  bored: { sleepy: 0.3, neutral: 0.3, curious: 0.1 },
  focused: { neutral: 0.4, curious: 0.2 },
  mischievous: { happy: 0.3, neutral: 0.3, excited: 0.15 },
  love: { happy: 0.4, neutral: 0.3 },
};

// Personality traits that influence behavior
export interface PersonalityTraits {
  playfulness: number;    // 0-1: how often it does silly things
  curiosity: number;      // 0-1: how much it reacts to stimuli
  energy: number;         // 0-1: affects animation speed and frequency
  moodStability: number;  // 0-1: how long it stays in a mood
}

export const DEFAULT_PERSONALITY: PersonalityTraits = {
  playfulness: 0.7,
  curiosity: 0.8,
  energy: 0.6,
  moodStability: 0.5,
};

// Helper to pick next mood based on transitions
export function getNextMood(currentMood: Mood, personality: PersonalityTraits): Mood {
  const transitions = MOOD_TRANSITIONS[currentMood];
  const roll = Math.random();
  
  // Higher mood stability = more likely to stay in current mood
  if (roll < personality.moodStability * 0.5) {
    return currentMood;
  }
  
  // Pick from transitions
  let cumulative = 0;
  const transitionRoll = Math.random();
  
  for (const [mood, probability] of Object.entries(transitions)) {
    cumulative += probability as number;
    if (transitionRoll < cumulative) {
      return mood as Mood;
    }
  }
  
  return 'neutral';
}

// Event types that can trigger reactions
export type TriggerEvent = 
  | 'mouseEnter'
  | 'mouseLeave'
  | 'mouseMove'
  | 'mouseFast'
  | 'mouseStop'
  | 'click'
  | 'keyPress'
  | 'idle'
  | 'longIdle';

// Reaction mapping - what mood to show for each event
export const EVENT_REACTIONS: Record<TriggerEvent, Mood[]> = {
  mouseEnter: ['curious', 'happy', 'surprised'],
  mouseLeave: ['confused', 'neutral', 'sad' as Mood].filter(m => m !== 'sad') as Mood[],
  mouseMove: ['focused', 'curious'],
  mouseFast: ['surprised', 'excited', 'confused'],
  mouseStop: ['curious', 'neutral'],
  click: ['surprised', 'curious', 'excited'],
  keyPress: ['focused', 'curious'],
  idle: ['bored', 'neutral', 'sleepy'],
  longIdle: ['sleepy', 'bored', 'angry'],
};

export function getReactionMood(event: TriggerEvent, personality: PersonalityTraits): Mood {
  const possibleMoods = EVENT_REACTIONS[event];
  
  // More curious personality = more likely to react strongly
  if (personality.curiosity > 0.7 && Math.random() < 0.3) {
    return 'curious';
  }
  
  return possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
}

// Wink configuration
export interface WinkConfig {
  duration: number;        // How long the wink lasts
  otherEyeSquint: number;  // How much the other eye squints (0-1)
  anticipation: number;    // Small movement before wink
  followThrough: number;   // Extra movement after wink
}

export const WINK_CONFIG: WinkConfig = {
  duration: 0.4,
  otherEyeSquint: 0.3,
  anticipation: 0.05,
  followThrough: 0.1,
};

// Blink configuration
export interface BlinkConfig {
  minInterval: number;
  maxInterval: number;
  duration: number;
  doubleBinkChance: number;
}

export const BLINK_CONFIG: BlinkConfig = {
  minInterval: 2000,
  maxInterval: 6000,
  duration: 0.12,
  doubleBinkChance: 0.2,
};
