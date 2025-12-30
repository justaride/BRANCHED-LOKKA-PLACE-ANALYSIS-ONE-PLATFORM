'use client';

import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { imageRevealVariants, viewport } from '@/lib/animations';

interface AnimatedImageProps extends Omit<ImageProps, 'ref'> {
  /** Enable zoom on hover */
  hoverZoom?: boolean;
  /** Scale factor for zoom (default 1.05) */
  zoomScale?: number;
  /** Animate on scroll into view */
  animateOnView?: boolean;
  /** Wrapper className */
  wrapperClassName?: string;
}

/**
 * AnimatedImage - Next.js Image with Framer Motion animations
 *
 * Features:
 * - Hover zoom effect
 * - Scroll-triggered reveal animation
 * - Ken Burns subtle movement
 *
 * @example
 * ```tsx
 * <AnimatedImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   fill
 *   hoverZoom
 *   animateOnView
 * />
 * ```
 */
export default function AnimatedImage({
  src,
  alt,
  hoverZoom = true,
  zoomScale = 1.05,
  animateOnView = true,
  wrapperClassName,
  className,
  ...props
}: AnimatedImageProps) {
  return (
    <motion.div
      className={cn('overflow-hidden', wrapperClassName)}
      initial={animateOnView ? 'hidden' : undefined}
      whileInView={animateOnView ? 'visible' : undefined}
      viewport={animateOnView ? viewport.default : undefined}
      variants={animateOnView ? imageRevealVariants : undefined}
    >
      <motion.div
        whileHover={hoverZoom ? {
          scale: zoomScale,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        } : undefined}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          className={cn('object-cover', className)}
          {...props}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * ParallaxImage - Image with subtle parallax effect on scroll
 */
export function ParallaxImage({
  src,
  alt,
  intensity = 20,
  wrapperClassName,
  className,
  ...props
}: AnimatedImageProps & {
  intensity?: number;
}) {
  return (
    <div className={cn('overflow-hidden', wrapperClassName)}>
      <motion.div
        initial={{ y: -intensity }}
        whileInView={{ y: intensity }}
        viewport={{ once: false, amount: 0 }}
        transition={{ type: 'tween', ease: 'linear' }}
        className="h-[calc(100%+40px)] w-full -mt-5"
      >
        <Image
          src={src}
          alt={alt}
          className={cn('object-cover h-full w-full', className)}
          {...props}
        />
      </motion.div>
    </div>
  );
}

/**
 * KenBurnsImage - Slow zoom animation (cinematic effect)
 */
export function KenBurnsImage({
  src,
  alt,
  duration = 20,
  wrapperClassName,
  className,
  ...props
}: AnimatedImageProps & {
  duration?: number;
}) {
  return (
    <div className={cn('overflow-hidden', wrapperClassName)}>
      <motion.div
        animate={{
          scale: [1, 1.1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          className={cn('object-cover', className)}
          {...props}
        />
      </motion.div>
    </div>
  );
}

/**
 * RevealImage - Image that reveals with a sliding overlay
 */
export function RevealImage({
  src,
  alt,
  direction = 'left',
  wrapperClassName,
  className,
  ...props
}: AnimatedImageProps & {
  direction?: 'left' | 'right' | 'up' | 'down';
}) {
  const getOverlayAnimation = () => {
    switch (direction) {
      case 'left':
        return { x: ['0%', '100%'] };
      case 'right':
        return { x: ['0%', '-100%'] };
      case 'up':
        return { y: ['0%', '-100%'] };
      case 'down':
        return { y: ['0%', '100%'] };
    }
  };

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      <motion.div
        className="absolute inset-0 bg-natural-forest z-10"
        initial={{ x: 0, y: 0 }}
        whileInView={getOverlayAnimation()}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          className={cn('object-cover', className)}
          {...props}
        />
      </motion.div>
    </div>
  );
}
