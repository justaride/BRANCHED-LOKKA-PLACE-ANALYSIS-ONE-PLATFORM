'use client';

import { motion } from 'framer-motion';
import { stagger, viewport } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface MotionContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before children start animating */
  delay?: number;
  /** Stagger timing between children */
  staggerSpeed?: 'fast' | 'normal' | 'slow';
  /** When to trigger animation */
  viewportTrigger?: 'default' | 'eager' | 'strict';
}

/**
 * MotionContainer - Wrapper for staggered child animations
 *
 * Use this to wrap a group of items that should animate in sequence.
 * Children should use fadeUpVariants or similar for individual animations.
 *
 * @example
 * ```tsx
 * <MotionContainer staggerSpeed="fast">
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={fadeUpVariants}>
 *       {item.content}
 *     </motion.div>
 *   ))}
 * </MotionContainer>
 * ```
 */
export default function MotionContainer({
  children,
  className,
  delay = 0,
  staggerSpeed = 'normal',
  viewportTrigger = 'default',
}: MotionContainerProps) {
  const staggerValue = stagger[staggerSpeed];
  const viewportSettings = viewport[viewportTrigger];

  const customVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerValue,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={customVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionSection - Section element with staggered children
 */
export function MotionSection({
  children,
  className,
  delay = 0,
  staggerSpeed = 'normal',
  viewportTrigger = 'default',
  id,
}: MotionContainerProps & { id?: string }) {
  const staggerValue = stagger[staggerSpeed];
  const viewportSettings = viewport[viewportTrigger];

  const customVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerValue,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={customVariants}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}

/**
 * MotionGrid - Grid layout with staggered children
 */
export function MotionGrid({
  children,
  className,
  columns = 3,
  gap = 6,
  delay = 0,
  staggerSpeed = 'normal',
  viewportTrigger = 'default',
}: MotionContainerProps & {
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 5 | 6 | 8;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gridGap = {
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <MotionContainer
      className={cn('grid', gridCols[columns], gridGap[gap], className)}
      delay={delay}
      staggerSpeed={staggerSpeed}
      viewportTrigger={viewportTrigger}
    >
      {children}
    </MotionContainer>
  );
}

/**
 * MotionList - List with staggered item animations
 */
export function MotionList({
  children,
  className,
  ordered = false,
  delay = 0,
  staggerSpeed = 'normal',
  viewportTrigger = 'default',
}: MotionContainerProps & {
  ordered?: boolean;
}) {
  const staggerValue = stagger[staggerSpeed];
  const viewportSettings = viewport[viewportTrigger];

  const customVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerValue,
        delayChildren: delay,
      },
    },
  };

  const Component = ordered ? motion.ol : motion.ul;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={customVariants}
      className={cn('space-y-4', className)}
    >
      {children}
    </Component>
  );
}
