'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect user's preference for reduced motion
 * Returns true if user prefers reduced motion
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 *
 * const variants = prefersReducedMotion
 *   ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
 *   : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
 * ```
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return prefersReducedMotion;
}

/**
 * Get animation variants based on reduced motion preference
 * Returns simplified variants if user prefers reduced motion
 */
export function getAccessibleVariants<T extends Record<string, unknown>>(
    fullVariants: T,
    reducedVariants: T,
    prefersReducedMotion: boolean
): T {
    return prefersReducedMotion ? reducedVariants : fullVariants;
}

/**
 * Simplified fade variants for reduced motion users
 */
export const reducedMotionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.01 },
    },
};

export default useReducedMotion;
