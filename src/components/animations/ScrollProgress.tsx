'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  /** Progress bar color */
  color?: string;
  /** Height of the progress bar */
  height?: number;
  /** Position of the bar */
  position?: 'top' | 'bottom';
  /** Additional className */
  className?: string;
}

/**
 * ScrollProgress - Horizontal scroll progress indicator
 *
 * Shows reading progress at the top or bottom of the viewport.
 *
 * @example
 * ```tsx
 * // In layout or page
 * <ScrollProgress color="#2C5F2D" />
 * ```
 */
export default function ScrollProgress({
  color = '#2C5F2D',
  height = 3,
  position = 'top',
  className,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  // Add spring physics for smooth movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50 origin-left',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{
        scaleX,
        height,
        backgroundColor: color,
      }}
    />
  );
}

/**
 * TimelineProgress - Vertical progress line for timelines
 *
 * Shows scroll progress through a timeline section.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <TimelineProgress containerRef={timelineRef} />
 *   <div ref={timelineRef}>
 *     {timelineItems}
 *   </div>
 * </div>
 * ```
 */
export function TimelineProgress({
  containerRef,
  color = '#2C5F2D',
  trackColor = '#E5E5E5',
  width = 4,
  className,
}: {
  containerRef?: React.RefObject<HTMLElement>;
  color?: string;
  trackColor?: string;
  width?: number;
  className?: string;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={cn(
        'absolute left-1/2 top-0 bottom-0 -translate-x-1/2',
        className
      )}
      style={{ width }}
    >
      {/* Track */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: trackColor }}
      />
      {/* Progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top rounded-full"
        style={{
          scaleY,
          backgroundColor: color,
          height: '100%',
        }}
      />
    </div>
  );
}

/**
 * SectionProgress - Progress indicator for a specific section
 *
 * Shows progress through a section with optional label.
 */
export function SectionProgress({
  label,
  color = '#2C5F2D',
  className,
}: {
  label?: string;
  color?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const width = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <motion.div
        className="fixed bottom-4 left-4 right-4 z-40"
        style={{ opacity }}
      >
        <div className="mx-auto max-w-md bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-100">
          {label && (
            <p className="text-xs text-gray-500 text-center mb-2">{label}</p>
          )}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ width, backgroundColor: color }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * CircularProgress - Circular scroll progress indicator
 */
export function CircularProgress({
  size = 48,
  strokeWidth = 3,
  color = '#2C5F2D',
  trackColor = '#E5E5E5',
  showPercentage = false,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showPercentage?: boolean;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();

  const circumference = (size - strokeWidth) * Math.PI;

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  // Percentage value available for future text display
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showPercentage && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-xs font-medium"
          style={{ color }}
        >
          {/* Note: For actual percentage display, you'd need to use useMotionValueEvent */}
        </motion.span>
      )}
    </div>
  );
}
