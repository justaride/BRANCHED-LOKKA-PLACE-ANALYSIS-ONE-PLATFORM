'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { sectionRevealVariants, heroTextVariants, springs, viewport } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface MotionSectionProps extends Omit<HTMLMotionProps<'section'>, 'variants'> {
  children: React.ReactNode;
  className?: string;
  /** Section ID for navigation */
  id?: string;
  /** Delay before animation starts */
  delay?: number;
  /** Animation variant to use */
  variant?: 'reveal' | 'fade' | 'none';
}

/**
 * MotionSection - Animated page section with scroll-triggered reveal
 *
 * Wraps page sections with smooth entrance animations that trigger
 * when scrolling into view. Children can use variants for coordinated animation.
 *
 * @example
 * ```tsx
 * <MotionSection id="about" className="py-16 bg-white">
 *   <Container>
 *     <motion.h2 variants={heroTextVariants} custom={0}>
 *       About Us
 *     </motion.h2>
 *     <motion.p variants={heroTextVariants} custom={1}>
 *       Description text...
 *     </motion.p>
 *   </Container>
 * </MotionSection>
 * ```
 */
export default function MotionSection({
  children,
  className,
  id,
  delay = 0,
  variant = 'reveal',
  ...props
}: MotionSectionProps) {
  const variants = {
    reveal: sectionRevealVariants,
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, delay },
      },
    },
    none: undefined,
  };

  return (
    <motion.section
      id={id}
      initial={variant !== 'none' ? 'hidden' : undefined}
      whileInView={variant !== 'none' ? 'visible' : undefined}
      viewport={viewport.default}
      variants={variants[variant]}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

/**
 * MotionHero - Hero section with staggered text animation
 */
export function MotionHero({
  children,
  className,
  backgroundImage,
  overlay = true,
  ...props
}: MotionSectionProps & {
  backgroundImage?: string;
  overlay?: boolean;
}) {
  return (
    <MotionSection
      className={cn(
        'relative overflow-hidden',
        backgroundImage && 'text-white',
        className
      )}
      {...props}
    >
      {backgroundImage && (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          )}
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </MotionSection>
  );
}

/**
 * MotionHeading - Animated heading with optional line decoration
 */
export function MotionHeading({
  children,
  className,
  as: Component = 'h2',
  index = 0,
  decoration = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  index?: number;
  decoration?: boolean;
}) {
  return (
    <motion.div
      variants={heroTextVariants}
      custom={index}
      className={cn(decoration && 'relative', className)}
    >
      {decoration && (
        <motion.div
          className="absolute -left-4 top-0 bottom-0 w-1 bg-natural-forest rounded-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2, ...springs.snappy }}
          style={{ originY: 0 }}
        />
      )}
      <Component>{children}</Component>
    </motion.div>
  );
}

/**
 * MotionParagraph - Animated paragraph text
 */
export function MotionParagraph({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.p
      variants={heroTextVariants}
      custom={index}
      className={cn('leading-relaxed', className)}
    >
      {children}
    </motion.p>
  );
}

/**
 * MotionDivider - Animated section divider
 */
export function MotionDivider({
  className,
  color = 'gray',
}: {
  className?: string;
  color?: 'gray' | 'forest' | 'sage';
}) {
  const colorStyles = {
    gray: 'bg-gray-200',
    forest: 'bg-natural-forest/20',
    sage: 'bg-natural-sage/30',
  };

  return (
    <motion.div
      className={cn('h-px', colorStyles[color], className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={springs.slow}
      style={{ originX: 0 }}
    />
  );
}
