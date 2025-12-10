'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { shimmerVariants, pulseVariants } from '@/lib/animations';

interface SkeletonProps {
  className?: string;
  /** Animation style */
  animation?: 'shimmer' | 'pulse' | 'none';
}

/**
 * Skeleton - Base skeleton loading component
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * <Skeleton className="h-48 rounded-xl" animation="pulse" />
 * ```
 */
export function Skeleton({
  className,
  animation = 'shimmer',
}: SkeletonProps) {
  if (animation === 'none') {
    return (
      <div className={cn('bg-gray-200 rounded', className)} />
    );
  }

  if (animation === 'pulse') {
    return (
      <motion.div
        className={cn('bg-gray-200 rounded', className)}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />
    );
  }

  // Shimmer animation
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-200 rounded',
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
    </div>
  );
}

/**
 * SkeletonText - Text line skeleton
 */
export function SkeletonText({
  lines = 1,
  className,
  lastLineWidth = '60%',
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 ? `w-[${lastLineWidth}]` : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonAvatar - Circular avatar skeleton
 */
export function SkeletonAvatar({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <Skeleton
      className={cn('rounded-full', sizeStyles[size], className)}
    />
  );
}

/**
 * CardSkeleton - Complete card loading skeleton
 */
export function CardSkeleton({
  hasImage = true,
  className,
}: {
  hasImage?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-gray-100 overflow-hidden',
        className
      )}
    >
      {hasImage && (
        <Skeleton className="aspect-[4/3] rounded-none" />
      )}
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={2} lastLineWidth="80%" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * TimelineCardSkeleton - Timeline event card skeleton
 */
export function TimelineCardSkeleton({
  isLeft = true,
  className,
}: {
  isLeft?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex items-center',
        isLeft ? 'justify-start' : 'justify-end',
        className
      )}
    >
      {/* Connecting line */}
      <Skeleton
        className={cn(
          'absolute top-1/2 h-0.5 w-12',
          isLeft ? 'left-1/2' : 'right-1/2'
        )}
      />

      {/* Card */}
      <div
        className={cn(
          'w-5/12 max-w-md',
          isLeft ? 'mr-[calc(50%+4rem)]' : 'ml-[calc(50%+4rem)]'
        )}
      >
        <div className="rounded-xl bg-white border border-gray-100 overflow-hidden">
          <Skeleton className="h-1 rounded-none" />
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-lg" />
            </div>
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-6 w-4/5" />
            <SkeletonText lines={2} />
          </div>
        </div>
      </div>

      {/* Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
}

/**
 * TimelineSkeleton - Full timeline loading skeleton
 */
export function TimelineSkeleton({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {/* Timeline line */}
      <Skeleton className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full" />

      {/* Timeline cards */}
      <div className="space-y-8">
        {Array.from({ length: count }).map((_, i) => (
          <TimelineCardSkeleton key={i} isLeft={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

/**
 * GridSkeleton - Grid of card skeletons
 */
export function GridSkeleton({
  count = 6,
  columns = 3,
  hasImage = true,
  className,
}: {
  count?: number;
  columns?: 2 | 3 | 4;
  hasImage?: boolean;
  className?: string;
}) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} hasImage={hasImage} />
      ))}
    </div>
  );
}

/**
 * HeroSkeleton - Hero section skeleton
 */
export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative py-16 md:py-24', className)}>
      <Skeleton className="absolute inset-0" animation="pulse" />
      <div className="relative z-10 max-w-3xl px-4">
        <Skeleton className="h-6 w-32 rounded-full mb-6" />
        <Skeleton className="h-6 w-40 rounded-full mb-4" />
        <Skeleton className="h-12 w-4/5 mb-4" />
        <Skeleton className="h-12 w-3/5 mb-6" />
        <SkeletonText lines={3} lastLineWidth="70%" />
      </div>
    </div>
  );
}

/**
 * StatsSkeleton - Stats grid skeleton
 */
export function StatsSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}
