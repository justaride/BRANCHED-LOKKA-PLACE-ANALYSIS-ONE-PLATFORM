/**
 * Framer Motion Animation Configuration
 * Physics-based spring configurations and timing presets
 */

import type { Transition } from 'framer-motion';

// =============================================================================
// SPRING CONFIGURATIONS
// =============================================================================

/**
 * Spring physics presets for natural, Apple-like motion
 *
 * Stiffness: Higher = snappier response
 * Damping: Higher = less oscillation
 * Mass: Higher = heavier, slower motion
 */
export const springs = {
  /** Gentle, smooth motion - ideal for page transitions and reveals */
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
    mass: 1,
  } as Transition,

  /** Smooth, elegant motion - primary card animations */
  smooth: {
    type: 'spring',
    stiffness: 200,
    damping: 26,
    mass: 1,
  } as Transition,

  /** Bouncy, playful feel - interactive elements */
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
    mass: 0.8,
  } as Transition,

  /** Stiff, responsive - quick UI feedback */
  stiff: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    mass: 1,
  } as Transition,

  /** Snappy - expand/collapse, toggles */
  snappy: {
    type: 'spring',
    stiffness: 500,
    damping: 25,
    mass: 0.5,
  } as Transition,

  /** Slow, cinematic - hero animations */
  slow: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1.2,
  } as Transition,

  /** Ultra-responsive - micro-interactions */
  micro: {
    type: 'spring',
    stiffness: 600,
    damping: 35,
    mass: 0.3,
  } as Transition,
} as const;

// =============================================================================
// TIMING-BASED TRANSITIONS
// =============================================================================

/**
 * Easing-based transitions for non-spring animations
 * Custom cubic-bezier curves for smooth motion
 */
export const timing = {
  /** Very fast feedback (150ms) */
  fast: {
    duration: 0.15,
    ease: 'easeOut',
  } as Transition,

  /** Standard transition (200ms) */
  normal: {
    duration: 0.2,
    ease: 'easeInOut',
  } as Transition,

  /** Slow, deliberate (300ms) */
  slow: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,

  /** Very smooth, Apple-like (400ms) */
  smooth: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  } as Transition,

  /** Cinematic (500ms) */
  cinematic: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  } as Transition,
} as const;

// =============================================================================
// EASING CURVES
// =============================================================================

/**
 * Custom cubic-bezier curves
 * Format: [x1, y1, x2, y2]
 */
export const easings = {
  /** Standard ease-out (decelerate) */
  easeOut: [0.22, 1, 0.36, 1],

  /** Standard ease-in (accelerate) */
  easeIn: [0.64, 0, 0.78, 0],

  /** Smooth in-out */
  easeInOut: [0.45, 0, 0.55, 1],

  /** Apple-like smooth */
  smooth: [0.4, 0, 0.2, 1],

  /** Elastic feel */
  elastic: [0.68, -0.55, 0.265, 1.55],

  /** Emphasized exit */
  emphasizedExit: [0.3, 0, 0.8, 0.15],

  /** Emphasized enter */
  emphasizedEnter: [0.05, 0.7, 0.1, 1],
} as const;

// =============================================================================
// STAGGER CONFIGURATIONS
// =============================================================================

/**
 * Delay values for staggered child animations
 */
export const stagger = {
  /** Fast stagger (50ms between items) */
  fast: 0.05,

  /** Normal stagger (80ms between items) */
  normal: 0.08,

  /** Slow stagger (120ms between items) */
  slow: 0.12,

  /** Very slow stagger (200ms between items) */
  verySlow: 0.2,
} as const;

// =============================================================================
// VIEWPORT SETTINGS
// =============================================================================

/**
 * Viewport configuration for scroll-triggered animations
 */
export const viewport = {
  /** Standard - trigger once when 20% visible */
  default: {
    once: true,
    amount: 0.2,
    margin: '-50px',
  },

  /** Eager - trigger early */
  eager: {
    once: true,
    amount: 0.1,
    margin: '-100px',
  },

  /** Strict - trigger when mostly visible */
  strict: {
    once: true,
    amount: 0.5,
    margin: '0px',
  },

  /** Repeat - re-trigger on each scroll */
  repeat: {
    once: false,
    amount: 0.3,
    margin: '-50px',
  },
} as const;

// =============================================================================
// DURATION PRESETS
// =============================================================================

/**
 * Duration values in seconds
 */
export const durations = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1,
} as const;

// =============================================================================
// DELAY PRESETS
// =============================================================================

/**
 * Common delay values for orchestrated animations
 */
export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
} as const;

// =============================================================================
// REDUCED MOTION CONFIG
// =============================================================================

/**
 * Fallback transitions for users who prefer reduced motion
 */
export const reducedMotion = {
  transition: {
    duration: 0.01,
  } as Transition,

  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

// =============================================================================
// COMBINED TRANSITION PRESETS
// =============================================================================

/**
 * Ready-to-use transition combinations
 */
export const transitionPresets = {
  /** Default card animation */
  card: {
    ...springs.smooth,
    opacity: { duration: 0.2 },
  } as Transition,

  /** Hero text reveal */
  hero: {
    ...springs.gentle,
    opacity: { duration: 0.4, delay: 0.1 },
  } as Transition,

  /** Quick toggle/switch */
  toggle: springs.snappy,

  /** Filter state change */
  filter: {
    ...springs.bouncy,
    opacity: { duration: 0.15 },
  } as Transition,

  /** Expand/collapse */
  expand: {
    height: springs.snappy,
    opacity: { duration: 0.2, delay: 0.1 },
  } as Transition,

  /** Page section reveal */
  section: {
    ...springs.slow,
    opacity: { duration: 0.4 },
  } as Transition,

  /** Image hover zoom */
  imageHover: {
    duration: 0.4,
    ease: easings.smooth,
  } as Transition,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type SpringKey = keyof typeof springs;
export type TimingKey = keyof typeof timing;
export type StaggerKey = keyof typeof stagger;
export type ViewportKey = keyof typeof viewport;
