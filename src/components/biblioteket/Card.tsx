'use client';

import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { springs, viewport, fadeUpVariants, cardHoverVariants, expandCollapseVariants } from '@/lib/animations';
import { colors } from '@/lib/design-tokens';
import { useState } from 'react';

// =============================================================================
// TYPES
// =============================================================================

type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost' | 'accent';
type CategoryColor = 'forest' | 'sage' | 'earth' | 'stone' | 'historie' | 'kultur' | 'litteratur' | 'ildsjeler';

interface BibliotekCardProps extends Omit<HTMLMotionProps<'article'>, 'variants'> {
  children: React.ReactNode;
  className?: string;
  /** Visual variant */
  variant?: CardVariant;
  /** Category color for accent */
  categoryColor?: CategoryColor;
  /** Enable hover effects */
  interactive?: boolean;
  /** Link href - makes entire card clickable */
  href?: string;
  /** Animate on scroll into view */
  animateOnView?: boolean;
  /** Index for staggered animations */
  index?: number;
}

// =============================================================================
// COLOR MAPPING
// =============================================================================

const getCategoryColorValue = (color: CategoryColor): string => {
  const colorMap: Record<CategoryColor, string> = {
    forest: colors.natural.forest.DEFAULT,
    sage: colors.natural.sage.DEFAULT,
    earth: colors.natural.earth.DEFAULT,
    stone: colors.natural.stone.DEFAULT,
    historie: colors.category.historie.primary,
    kultur: colors.category.kultur.primary,
    litteratur: colors.category.litteratur.primary,
    ildsjeler: colors.category.ildsjeler.primary,
  };
  return colorMap[color];
};

const getCategoryGradient = (color: CategoryColor): string => {
  const gradientMap: Record<CategoryColor, string> = {
    forest: 'from-natural-forest to-natural-sage',
    sage: 'from-natural-sage to-natural-forest',
    earth: 'from-natural-earth to-natural-sand',
    stone: 'from-natural-stone to-gray-500',
    historie: colors.category.historie.gradient,
    kultur: colors.category.kultur.gradient,
    litteratur: colors.category.litteratur.gradient,
    ildsjeler: colors.category.ildsjeler.gradient,
  };
  return gradientMap[color];
};

// =============================================================================
// MAIN CARD COMPONENT
// =============================================================================

/**
 * BibliotekCard - Unified card component for the Biblioteket section
 *
 * Features:
 * - Multiple visual variants
 * - Category-specific accent colors
 * - Hover lift and shadow effects
 * - Scroll-triggered animations
 * - Optional link wrapper
 *
 * @example
 * ```tsx
 * <BibliotekCard variant="elevated" categoryColor="historie" href="/historie/event">
 *   <BibliotekCardImage src="/image.jpg" alt="Event" />
 *   <BibliotekCardContent>
 *     <BibliotekCardTitle>Event Title</BibliotekCardTitle>
 *     <BibliotekCardDescription>Description text...</BibliotekCardDescription>
 *   </BibliotekCardContent>
 * </BibliotekCard>
 * ```
 */
export function BibliotekCard({
  children,
  className,
  variant = 'default',
  categoryColor,
  interactive = true,
  href,
  animateOnView = true,
  index = 0,
  onClick,
  ...props
}: BibliotekCardProps) {
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white border border-gray-100 shadow-sm',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-200',
    ghost: 'bg-gray-50/50',
    accent: 'bg-white border shadow-sm',
  };

  const isInteractive = interactive && (Boolean(href) || Boolean(onClick));

  const cardContent = (
    <motion.article
      variants={fadeUpVariants}
      initial={animateOnView ? 'hidden' : false}
      whileInView={animateOnView ? 'visible' : undefined}
      viewport={animateOnView ? viewport.default : undefined}
      whileHover={isInteractive ? {
        y: -4,
        boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
        transition: springs.smooth,
      } : undefined}
      whileTap={isInteractive ? {
        scale: 0.98,
        transition: { duration: 0.1 },
      } : undefined}
      custom={index}
      onClick={onClick}
      className={cn(
        'rounded-2xl overflow-hidden transition-colors relative',
        variantStyles[variant],
        isInteractive && 'cursor-pointer',
        className
      )}
      style={variant === 'accent' && categoryColor ? {
        borderColor: `${getCategoryColorValue(categoryColor)}40`,
      } : undefined}
      {...props}
    >
      {/* Category accent bar for accent variant */}
      {variant === 'accent' && categoryColor && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: getCategoryColorValue(categoryColor) }}
        />
      )}
      {children}
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// =============================================================================
// CARD SUB-COMPONENTS
// =============================================================================

/**
 * BibliotekCardImage - Image area with hover zoom
 */
export function BibliotekCardImage({
  src,
  alt,
  aspectRatio = '4/3',
  priority = false,
  className,
  overlay = false,
  overlayGradient = 'to-t',
}: {
  src: string;
  alt: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '4/5' | '3/2';
  priority?: boolean;
  className?: string;
  overlay?: boolean;
  overlayGradient?: 'to-t' | 'to-b' | 'to-l' | 'to-r';
}) {
  const aspectStyles: Record<string, string> = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '4/5': 'aspect-[4/5]',
    '3/2': 'aspect-[3/2]',
  };

  const gradientDirection: Record<string, string> = {
    'to-t': 'bg-gradient-to-t',
    'to-b': 'bg-gradient-to-b',
    'to-l': 'bg-gradient-to-l',
    'to-r': 'bg-gradient-to-r',
  };

  return (
    <div className={cn('relative overflow-hidden', aspectStyles[aspectRatio], className)}>
      <motion.div
        className="h-full w-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>
      {overlay && (
        <div
          className={cn(
            'absolute inset-0 from-black/80 via-black/40 to-transparent',
            gradientDirection[overlayGradient]
          )}
        />
      )}
    </div>
  );
}

/**
 * BibliotekCardContent - Padded content area
 */
export function BibliotekCardContent({
  children,
  className,
  padding = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div className={cn(paddingStyles[padding], className)}>
      {children}
    </div>
  );
}

/**
 * BibliotekCardTitle - Card heading
 */
export function BibliotekCardTitle({
  children,
  className,
  as: Component = 'h3',
  size = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeStyles = {
    sm: 'text-base font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-xl font-bold',
  };

  return (
    <Component className={cn('text-gray-900', sizeStyles[size], className)}>
      {children}
    </Component>
  );
}

/**
 * BibliotekCardDescription - Body text
 */
export function BibliotekCardDescription({
  children,
  className,
  lines = 2,
}: {
  children: React.ReactNode;
  className?: string;
  lines?: 2 | 3 | 4 | 'none';
}) {
  const lineClamp = {
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    none: '',
  };

  return (
    <p className={cn('text-sm text-gray-600 leading-relaxed', lineClamp[lines], className)}>
      {children}
    </p>
  );
}

/**
 * BibliotekCardBadge - Category/tag badge
 */
export function BibliotekCardBadge({
  children,
  color = 'neutral',
  icon,
  className,
}: {
  children: React.ReactNode;
  color?: CategoryColor | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}) {
  const getColorStyle = () => {
    if (color === 'neutral') {
      return 'bg-gray-100 text-gray-700';
    }
    const bgOpacity = color === 'sage' ? '/20' : '/10';
    return `text-white`;
  };

  const bgColor = color !== 'neutral' ? getCategoryColorValue(color as CategoryColor) : undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        color === 'neutral' && 'bg-gray-100 text-gray-700',
        className
      )}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {icon}
      {children}
    </span>
  );
}

/**
 * BibliotekCardMeta - Metadata row (date, count, etc.)
 */
export function BibliotekCardMeta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2 text-xs text-gray-500', className)}>
      {children}
    </div>
  );
}

/**
 * BibliotekCardTags - Tag/badge group
 */
export function BibliotekCardTags({
  tags,
  maxVisible = 3,
  color = 'neutral',
  className,
}: {
  tags: string[];
  maxVisible?: number;
  color?: CategoryColor | 'neutral';
  className?: string;
}) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
        >
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}

// =============================================================================
// EXPANDABLE CARD
// =============================================================================

/**
 * BibliotekExpandableCard - Card with expand/collapse functionality
 */
export function BibliotekExpandableCard({
  children,
  expandedContent,
  defaultExpanded = false,
  categoryColor,
  className,
  ...props
}: BibliotekCardProps & {
  expandedContent: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <BibliotekCard
      variant="accent"
      categoryColor={categoryColor}
      interactive
      onClick={() => setIsExpanded(!isExpanded)}
      className={className}
      {...props}
    >
      {children}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={expandCollapseVariants}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100">
              {expandedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={springs.snappy}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </BibliotekCard>
  );
}

// =============================================================================
// CATEGORY CARD (Pre-configured for category links)
// =============================================================================

/**
 * BibliotekCategoryCard - Pre-styled card for category navigation
 */
export function BibliotekCategoryCard({
  title,
  description,
  itemCount,
  image,
  href,
  className,
}: {
  title: string;
  description: string;
  itemCount: number;
  image: string;
  href: string;
  className?: string;
}) {
  return (
    <BibliotekCard
      href={href}
      variant="elevated"
      className={cn('group', className)}
    >
      <BibliotekCardImage
        src={image}
        alt={title}
        aspectRatio="4/3"
        overlay
        overlayGradient="to-t"
      />

      {/* Overlay content */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
          {itemCount} elementer
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/75 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Utforsk</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </BibliotekCard>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default BibliotekCard;
