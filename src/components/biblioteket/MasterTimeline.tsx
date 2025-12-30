'use client';

import { MasterTimelineEvent } from '@/lib/loaders/biblioteket-loader';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HistorieIcon, KulturIcon, LitteraturIcon, IldsjelIcon } from './CategoryIcons';
import {
  springs,
  fadeLeftVariants,
  fadeRightVariants,
  expandCollapseVariants,
  containerVariants,
} from '@/lib/animations';

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

interface MasterTimelineProps {
  events: MasterTimelineEvent[];
}

type CategoryKey = 'historie' | 'kultur' | 'litteratur' | 'ildsjeler';

const categoryLabels: Record<CategoryKey, string> = {
  historie: 'Byhistorie',
  kultur: 'Kultur',
  litteratur: 'Litteratur',
  ildsjeler: 'Ildsjeler',
};

const categoryColors: Record<CategoryKey, { primary: string; gradient: string; glow: string }> = {
  historie: {
    primary: '#2C5F2D',
    gradient: 'from-natural-forest to-natural-sage',
    glow: 'rgba(44, 95, 45, 0.4)',
  },
  kultur: {
    primary: '#8B7355',
    gradient: 'from-natural-earth to-natural-sand',
    glow: 'rgba(139, 115, 85, 0.4)',
  },
  litteratur: {
    primary: '#97BC62',
    gradient: 'from-natural-sage to-natural-forest',
    glow: 'rgba(151, 188, 98, 0.4)',
  },
  ildsjeler: {
    primary: '#6B7280',
    gradient: 'from-natural-stone to-gray-500',
    glow: 'rgba(107, 114, 128, 0.4)',
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const CategoryIconComponent = ({ category, className }: { category: string; className?: string }) => {
  switch (category) {
    case 'historie':
      return <HistorieIcon className={className} />;
    case 'kultur':
      return <KulturIcon className={className} />;
    case 'litteratur':
      return <LitteraturIcon className={className} />;
    case 'ildsjeler':
      return <IldsjelIcon className={className} />;
    default:
      return null;
  }
};

/**
 * FilterButton - Animated filter toggle button
 */
function FilterButton({
  category,
  label,
  isActive,
  color,
  onToggle,
}: {
  category: string;
  label: string;
  isActive: boolean;
  color: string;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      aria-pressed={isActive}
      className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springs.snappy}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={{
          backgroundColor: isActive ? color : '#F9FAFB',
          opacity: 1,
        }}
        transition={springs.smooth}
      />

      {/* Content */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{ color: isActive ? '#FFFFFF' : '#4B5563' }}
        transition={{ duration: 0.2 }}
      >
        <CategoryIconComponent category={category} className="h-4 w-4" />
        <span className="hidden sm:inline">{label}</span>
      </motion.span>

      {/* Active shadow */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ boxShadow: 'none' }}
          animate={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}

/**
 * TimelineDot - Animated dot on the timeline
 */
function TimelineDot({ color, isVisible }: { color: string; isVisible: boolean }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={springs.bouncy}
        className="relative"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-2 rounded-full"
          animate={{
            boxShadow: [
              `0 0 0 0 ${color}00`,
              `0 0 0 8px ${color}00`,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Main dot */}
        <div
          className="h-4 w-4 rounded-full border-[3px] border-white shadow-lg"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </div>
  );
}

/**
 * ConnectingLine - Animated line connecting dot to card
 */
function ConnectingLine({ color, isLeft, isVisible }: { color: string; isLeft: boolean; isVisible: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 h-0.5"
      style={{
        width: '3rem',
        backgroundColor: color,
        [isLeft ? 'left' : 'right']: '50%',
        originX: isLeft ? 0 : 1,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isVisible ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
      transition={{ delay: 0.1, ...springs.snappy }}
    />
  );
}

/**
 * DecadeMarker - Animated decade label
 */
function DecadeMarker({ decade, index }: { decade: number; index: number }) {
  return (
    <motion.div
      className="relative mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.1, ...springs.gentle }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          className="rounded-xl bg-gray-900 px-6 py-3 text-lg font-bold text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={springs.smooth}
        >
          {decade}-tallet
        </motion.div>
      </div>
      <div className="h-16" />
    </motion.div>
  );
}

/**
 * TimelineCard - Main event card with animations
 */
function TimelineCard({
  event,
  isExpanded,
  onToggleExpand,
}: {
  event: MasterTimelineEvent;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border bg-white shadow-sm"
      style={{ borderColor: `${event.color}40` }}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
        transition: springs.smooth,
      }}
      layout
    >
      {/* Color accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: event.color }}
        layoutId={`accent-${event.id}`}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <motion.div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: event.color }}
            whileHover={{ scale: 1.05 }}
            transition={springs.snappy}
          >
            <CategoryIconComponent category={event.category} className="h-3 w-3" />
            <span>{categoryLabels[event.category as CategoryKey]}</span>
          </motion.div>

          <motion.button
            onClick={onToggleExpand}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label={isExpanded ? 'Lukk' : 'Utvid'}
            aria-expanded={isExpanded}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={springs.snappy}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>

        {/* Image with animated height */}
        {event.image && (
          <motion.div
            className="relative mb-3 overflow-hidden rounded-lg"
            animate={{ height: isExpanded ? 192 : 128 }}
            transition={springs.smooth}
          >
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Year badge */}
        <motion.div
          className="mb-2 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-bold"
          style={{ backgroundColor: `${event.color}15`, color: event.color }}
          whileHover={{ scale: 1.05 }}
        >
          {event.year}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="mb-2 font-bold text-gray-900"
          animate={{
            fontSize: isExpanded ? '1.125rem' : '1rem',
            lineHeight: isExpanded ? '1.75rem' : '1.5rem',
          }}
          transition={springs.smooth}
        >
          <span className={isExpanded ? '' : 'line-clamp-2'}>{event.title}</span>
        </motion.h3>

        {/* Description */}
        <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
          {event.description}
        </p>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={expandCollapseVariants}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={event.link}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 hover:gap-3"
                  style={{ backgroundColor: event.color }}
                >
                  Utforsk mer
                  <motion.svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ x: 4 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function MasterTimeline({ events }: MasterTimelineProps) {
  const [activeFilters, setActiveFilters] = useState<Set<CategoryKey>>(
    new Set(['historie', 'kultur', 'litteratur', 'ildsjeler'])
  );
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleFilter = (category: CategoryKey) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(category)) {
        if (newFilters.size > 1) {
          newFilters.delete(category);
        }
      } else {
        newFilters.add(category);
      }
      return newFilters;
    });
  };

  const toggleExpand = (eventId: string) => {
    setExpandedEvents((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(eventId)) {
        newExpanded.delete(eventId);
      } else {
        newExpanded.add(eventId);
      }
      return newExpanded;
    });
  };

  const filteredEvents = events.filter((e) => activeFilters.has(e.category as CategoryKey));
  const decades = Array.from(new Set(filteredEvents.map((e) => Math.floor(e.year / 10) * 10))).sort((a, b) => a - b);

  return (
    <div className="relative" ref={containerRef}>
      {/* Filter Buttons */}
      <motion.div
        className="sticky top-4 z-20 mb-10 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.smooth}
      >
        <motion.div
          className="inline-flex flex-wrap justify-center gap-2 rounded-2xl bg-white/90 backdrop-blur-md p-2 shadow-lg border border-gray-100"
          layout
        >
          {(Object.entries(categoryLabels) as [CategoryKey, string][]).map(([key, label]) => (
            <FilterButton
              key={key}
              category={key}
              label={label}
              isActive={activeFilters.has(key)}
              color={categoryColors[key].primary}
              onToggle={() => toggleFilter(key)}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Event Count */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-gray-500">
          <motion.span
            key={filteredEvents.length}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.snappy}
          >
            {filteredEvents.length}
          </motion.span>{' '}
          hendelser
          {activeFilters.size < 4 && activeFilters.size > 0 && (
            <span className="text-gray-400">
              {' '}
              · {Array.from(activeFilters).map((c) => categoryLabels[c]).join(', ')}
            </span>
          )}
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline Line with scroll progress */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden rounded-full">
          {/* Track */}
          <div className="absolute inset-0 bg-gray-200" />
          {/* Progress */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-natural-forest via-natural-sage to-natural-earth"
            style={{ scaleY: lineScaleY, height: '100%' }}
          />
        </div>

        {/* Events grouped by decade */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {decades.map((decade, decadeIndex) => {
              const decadeEvents = filteredEvents
                .filter((e) => Math.floor(e.year / 10) * 10 === decade)
                .sort((a, b) => a.year - b.year);

              // Calculate starting index for alternating left/right
              const startIndex = filteredEvents.filter((e) => Math.floor(e.year / 10) * 10 < decade).length;

              return (
                <div key={decade} className="mb-8">
                  {/* Decade Marker */}
                  <DecadeMarker decade={decade} index={decadeIndex} />

                  {/* Events for this decade */}
                  <div className="space-y-8">
                    {decadeEvents.map((event, eventIndex) => {
                      const globalIndex = startIndex + eventIndex;
                      const isLeft = globalIndex % 2 === 0;
                      const isExpanded = expandedEvents.has(event.id);

                      return (
                        <motion.div
                          key={event.id}
                          layout
                          variants={isLeft ? fadeLeftVariants : fadeRightVariants}
                          initial="hidden"
                          whileInView="visible"
                          exit="exit"
                          viewport={{ once: true, amount: 0.2, margin: '-50px' }}
                          className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                        >
                          {/* Connecting Line */}
                          <ConnectingLine color={event.color} isLeft={isLeft} isVisible={true} />

                          {/* Event Card */}
                          <motion.div
                            className={`relative ${isLeft ? 'mr-[calc(50%+4rem)]' : 'ml-[calc(50%+4rem)]'} w-5/12 max-w-md`}
                            layout
                          >
                            <TimelineCard
                              event={event}
                              isExpanded={isExpanded}
                              onToggleExpand={() => toggleExpand(event.id)}
                            />
                          </motion.div>

                          {/* Timeline Dot */}
                          <TimelineDot color={event.color} isVisible={true} />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* End Marker */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springs.gentle}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-gray-600"
          whileHover={{ scale: 1.05, backgroundColor: '#E5E7EB' }}
          transition={springs.smooth}
        >
          <motion.svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </motion.svg>
          <span className="text-sm font-medium">Historien fortsetter...</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
