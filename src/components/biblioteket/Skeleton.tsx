'use client';

/**
 * Biblioteket-specific skeleton loading components
 * Re-exports base skeletons and adds domain-specific variants
 */

import { cn } from '@/lib/utils';
import {
  Skeleton,
  SkeletonText,
  CardSkeleton,
  TimelineSkeleton,
  GridSkeleton,
  StatsSkeleton,
} from '@/components/animations/SkeletonLoader';

// Re-export base components
export {
  Skeleton,
  SkeletonText,
  CardSkeleton,
  TimelineSkeleton,
  GridSkeleton,
  StatsSkeleton,
};

/**
 * IldsjelCardSkeleton - Skeleton for hero/person cards
 */
export function IldsjelCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-gray-100 overflow-hidden',
        className
      )}
    >
      {/* Portrait image */}
      <Skeleton className="aspect-[4/5] rounded-none" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Period badge */}
        <Skeleton className="h-5 w-24 rounded-full" />

        {/* Name */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description */}
        <SkeletonText lines={2} lastLineWidth="60%" />

        {/* Category tags */}
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * IldsjelGridSkeleton - Grid of ildsjel cards
 */
export function IldsjelGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <IldsjelCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * LitteraturItemSkeleton - Skeleton for literature list items
 */
export function LitteraturItemSkeleton({
  variant = 'card',
  className,
}: {
  variant?: 'card' | 'row';
  className?: string;
}) {
  if (variant === 'row') {
    return (
      <div className={cn('flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100', className)}>
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl bg-white border border-gray-100 p-5', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-14 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-6 w-4/5 mb-2" />
      <SkeletonText lines={2} lastLineWidth="70%" />
      <div className="flex gap-2 mt-3">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

/**
 * LitteraturListSkeleton - Full literature list skeleton
 */
export function LitteraturListSkeleton({
  count = 6,
  variant = 'card',
  className,
}: {
  count?: number;
  variant?: 'card' | 'row';
  className?: string;
}) {
  if (variant === 'row') {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <LitteraturItemSkeleton key={i} variant="row" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <LitteraturItemSkeleton key={i} variant="card" />
      ))}
    </div>
  );
}

/**
 * HistorieEventSkeleton - Skeleton for history event cards
 */
export function HistorieEventSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-4', className)}>
      {/* Year marker */}
      <div className="flex-shrink-0 w-20">
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>

      {/* Content */}
      <div className="flex-1 rounded-xl bg-white border border-gray-100 p-5">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <SkeletonText lines={3} lastLineWidth="50%" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * HistorieTimelineSkeleton - Full history timeline skeleton
 */
export function HistorieTimelineSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <HistorieEventSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * KulturEventSkeleton - Skeleton for culture events
 */
export function KulturEventSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl bg-white border border-gray-100 p-5', className)}>
      <div className="flex items-start gap-4">
        {/* Period */}
        <Skeleton className="h-6 w-24 rounded-full flex-shrink-0" />

        {/* Content */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-4/5" />
          <SkeletonText lines={2} lastLineWidth="60%" />

          {/* People/Places */}
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-18 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * KulturListSkeleton - Full culture list skeleton
 */
export function KulturListSkeleton({
  count = 5,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <KulturEventSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * BibliotekPageSkeleton - Full page skeleton with hero and content
 */
export function BibliotekPageSkeleton({
  showStats = true,
  contentVariant = 'grid',
  className,
}: {
  showStats?: boolean;
  contentVariant?: 'grid' | 'timeline' | 'list';
  className?: string;
}) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Hero skeleton */}
      <div className="relative py-16 md:py-24 bg-gray-100">
        <div className="max-w-3xl px-6">
          <Skeleton className="h-5 w-32 rounded-full mb-4" />
          <Skeleton className="h-5 w-40 rounded-full mb-4" />
          <Skeleton className="h-12 w-4/5 mb-4" />
          <Skeleton className="h-12 w-3/5 mb-6" />
          <SkeletonText lines={2} lastLineWidth="80%" />
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="px-6">
          <StatsSkeleton count={4} />
        </div>
      )}

      {/* Content */}
      <div className="px-6">
        {contentVariant === 'grid' && <GridSkeleton count={6} columns={3} />}
        {contentVariant === 'timeline' && <TimelineSkeleton count={4} />}
        {contentVariant === 'list' && <LitteraturListSkeleton count={6} />}
      </div>
    </div>
  );
}

/**
 * MasterTimelineSkeleton - Skeleton for the main biblioteket timeline
 */
export function MasterTimelineSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {/* Filter bar skeleton */}
      <div className="sticky top-4 z-20 mb-10 flex justify-center">
        <div className="inline-flex gap-2 rounded-2xl bg-white p-2 shadow-lg border border-gray-100">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Event count */}
      <div className="mb-8 text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>

      {/* Timeline */}
      <TimelineSkeleton count={4} />
    </div>
  );
}
