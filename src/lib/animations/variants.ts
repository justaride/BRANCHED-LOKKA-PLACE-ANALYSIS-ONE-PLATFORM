/**
 * Framer Motion Animation Variants
 * Reusable animation patterns for the Biblioteket section
 */

import type { Variants } from 'framer-motion';
import { springs, stagger, easings } from './config';

// =============================================================================
// CONTAINER VARIANTS (for staggered children)
// =============================================================================

/**
 * Standard staggered container - use with child fadeUpVariants
 */
export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fast stagger container - for smaller items
 */
export const containerFastVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0.05,
    },
  },
};

/**
 * Slow stagger container - for larger items
 */
export const containerSlowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.15,
    },
  },
};

// =============================================================================
// FADE VARIANTS
// =============================================================================

/**
 * Simple fade in
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/**
 * Fade up - most common scroll reveal pattern
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2 },
  },
};

/**
 * Fade down
 */
export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
};

/**
 * Fade from left - timeline left cards
 */
export const fadeLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

/**
 * Fade from right - timeline right cards
 */
export const fadeRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

// =============================================================================
// SCALE VARIANTS
// =============================================================================

/**
 * Scale up from center
 */
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

/**
 * Scale from zero (for dots, icons)
 */
export const scaleFromZeroVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.bouncy,
  },
};

/**
 * Pop in - bouncy scale for emphasis
 */
export const popInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.bouncy,
  },
};

// =============================================================================
// CARD VARIANTS
// =============================================================================

/**
 * Card hover effect - lift and shadow
 */
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  },
  hover: {
    y: -4,
    scale: 1.01,
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: springs.smooth,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Card with reveal animation
 */
export const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.smooth,
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: springs.smooth,
  },
};

// =============================================================================
// TIMELINE-SPECIFIC VARIANTS
// =============================================================================

/**
 * Timeline dot pulse animation
 */
export const dotPulseVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0 0 rgba(44, 95, 45, 0.4)',
  },
  pulse: {
    scale: [1, 1.15, 1],
    boxShadow: [
      '0 0 0 0 rgba(44, 95, 45, 0.4)',
      '0 0 0 8px rgba(44, 95, 45, 0)',
      '0 0 0 0 rgba(44, 95, 45, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Timeline connecting line scale
 */
export const lineScaleVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      ...springs.snappy,
    },
  },
};

// =============================================================================
// EXPAND/COLLAPSE VARIANTS
// =============================================================================

/**
 * Height expand/collapse with opacity
 */
export const expandCollapseVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: springs.snappy,
      opacity: { duration: 0.15 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: springs.snappy,
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
};

/**
 * Accordion item variant
 */
export const accordionVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.15 },
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.25, delay: 0.15 },
    },
  },
};

// =============================================================================
// IMAGE VARIANTS
// =============================================================================

/**
 * Image hover zoom
 */
export const imageHoverVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
};

/**
 * Image reveal with scale
 */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
    },
  },
};

// =============================================================================
// FILTER/TOGGLE VARIANTS
// =============================================================================

/**
 * Filter button toggle
 */
export const filterToggleVariants: Variants = {
  inactive: {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    scale: 1,
  },
  active: {
    scale: 1,
    transition: springs.bouncy,
  },
};

/**
 * Checkbox/switch toggle
 */
export const toggleVariants: Variants = {
  off: {
    x: 0,
    backgroundColor: '#e5e7eb',
  },
  on: {
    x: 20,
    backgroundColor: '#2C5F2D',
    transition: springs.snappy,
  },
};

// =============================================================================
// SKELETON/LOADING VARIANTS
// =============================================================================

/**
 * Shimmer animation for skeleton loaders
 */
export const shimmerVariants: Variants = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    },
  },
};

/**
 * Pulse animation for loading states
 */
export const pulseVariants: Variants = {
  initial: {
    opacity: 0.6,
  },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// =============================================================================
// PAGE/SECTION VARIANTS
// =============================================================================

/**
 * Page section reveal
 */
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springs.slow,
      staggerChildren: 0.1,
    },
  },
};

/**
 * Hero text staggered reveal
 */
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      ...springs.gentle,
    },
  }),
};

// =============================================================================
// CAROUSEL/SLIDER VARIANTS
// =============================================================================

/**
 * Carousel slide variants with direction support
 */
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 1.02,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
  }),
};

/**
 * Fade slide for smoother carousel
 */
export const fadeSlideVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 1.05,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

// =============================================================================
// NAVIGATION VARIANTS
// =============================================================================

/**
 * Nav menu slide down
 */
export const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: springs.smooth,
  },
};

/**
 * Hamburger icon line variants
 */
export const hamburgerLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: 45,
    y: 6,
    transition: springs.snappy,
  },
};

// =============================================================================
// UTILITY VARIANTS
// =============================================================================

/**
 * Presence variants for AnimatePresence
 */
export const presenceVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

/**
 * List item variants for AnimatePresence list
 */
export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.smooth,
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.15 },
  },
};

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type VariantKey =
  | 'hidden'
  | 'visible'
  | 'exit'
  | 'hover'
  | 'tap'
  | 'rest'
  | 'initial'
  | 'animate'
  | 'collapsed'
  | 'expanded'
  | 'active'
  | 'inactive';
