'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeUpVariants, cardHoverVariants, springs, viewport } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface MotionCardProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode;
  className?: string;
  /** Enable hover lift effect */
  hoverEffect?: boolean;
  /** Enable tap/click feedback */
  tapEffect?: boolean;
  /** Index for staggered animations (when used with MotionContainer) */
  index?: number;
  /** Whether this card should animate on scroll into view */
  animateOnView?: boolean;
  /** Card variant styling */
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
}

/**
 * MotionCard - Animated card component with hover/tap interactions
 *
 * Use standalone or inside MotionContainer for staggered grid animations.
 *
 * @example
 * ```tsx
 * // Standalone with scroll animation
 * <MotionCard hoverEffect animateOnView>
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </MotionCard>
 *
 * // Inside container (uses parent's stagger)
 * <MotionContainer>
 *   {items.map((item, i) => (
 *     <MotionCard key={item.id} index={i} variant="elevated">
 *       {item.content}
 *     </MotionCard>
 *   ))}
 * </MotionContainer>
 * ```
 */
export default function MotionCard({
  children,
  className,
  hoverEffect = true,
  tapEffect = true,
  index = 0,
  animateOnView = true,
  variant = 'default',
  onClick,
  ...props
}: MotionCardProps) {
  const variantStyles = {
    default: 'bg-white border border-gray-100 shadow-sm',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-200',
    ghost: 'bg-gray-50/50',
  };

  const isInteractive = Boolean(onClick) || hoverEffect;

  return (
    <motion.div
      variants={fadeUpVariants}
      initial={animateOnView ? 'hidden' : false}
      whileInView={animateOnView ? 'visible' : undefined}
      viewport={animateOnView ? viewport.default : undefined}
      whileHover={hoverEffect ? {
        y: -4,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        transition: springs.smooth,
      } : undefined}
      whileTap={tapEffect && isInteractive ? {
        scale: 0.98,
        transition: { duration: 0.1 },
      } : undefined}
      custom={index}
      onClick={onClick}
      className={cn(
        'rounded-2xl overflow-hidden transition-colors',
        variantStyles[variant],
        isInteractive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionCardContent - Padded content area for cards
 */
export function MotionCardContent({
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
 * MotionCardImage - Image area with hover zoom
 */
export function MotionCardImage({
  src,
  alt,
  aspectRatio = '4/3',
  className,
  hoverZoom = true,
}: {
  src: string;
  alt: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '4/5' | '3/2';
  className?: string;
  hoverZoom?: boolean;
}) {
  const aspectStyles = {
    '1/1': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '4/5': 'aspect-[4/5]',
    '3/2': 'aspect-[3/2]',
  };

  return (
    <div className={cn('relative overflow-hidden', aspectStyles[aspectRatio], className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={hoverZoom ? {
          scale: 1.05,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        } : undefined}
      />
    </div>
  );
}

/**
 * MotionCardBadge - Badge/tag component for cards
 */
export function MotionCardBadge({
  children,
  color = 'forest',
  className,
}: {
  children: React.ReactNode;
  color?: 'forest' | 'sage' | 'earth' | 'stone' | 'neutral';
  className?: string;
}) {
  const colorStyles = {
    forest: 'bg-natural-forest/10 text-natural-forest',
    sage: 'bg-natural-sage/20 text-natural-forest',
    earth: 'bg-natural-earth/10 text-natural-earth',
    stone: 'bg-natural-stone/10 text-natural-stone',
    neutral: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
}
