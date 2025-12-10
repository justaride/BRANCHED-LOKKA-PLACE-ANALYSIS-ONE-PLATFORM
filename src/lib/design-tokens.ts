/**
 * Design Tokens for Biblioteket
 * Scandinavian minimalist design system based on Natural State brand
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary palette - Natural State brand
  natural: {
    forest: {
      DEFAULT: '#2C5F2D',
      light: '#3D7A3E',
      dark: '#1E4520',
      muted: 'rgba(44, 95, 45, 0.1)',
    },
    sage: {
      DEFAULT: '#97BC62',
      light: '#B0D07E',
      dark: '#7A9C4D',
      muted: 'rgba(151, 188, 98, 0.15)',
    },
    sand: {
      DEFAULT: '#E8DCC4',
      light: '#F5EFE4',
      dark: '#D4C5A8',
      muted: 'rgba(232, 220, 196, 0.4)',
    },
    stone: {
      DEFAULT: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      muted: 'rgba(107, 114, 128, 0.1)',
    },
    earth: {
      DEFAULT: '#8B7355',
      light: '#A68E6E',
      dark: '#6E5A42',
      muted: 'rgba(139, 115, 85, 0.1)',
    },
  },

  // Neutral grays - Scandinavian inspired
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic backgrounds
  background: {
    primary: '#F3F6F4',
    secondary: '#FFFFFF',
    tertiary: '#F9FAFB',
    elevated: '#FFFFFF',
  },

  // Semantic text colors
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Category colors for Biblioteket
  category: {
    historie: {
      primary: '#2C5F2D',
      gradient: 'from-natural-forest to-natural-sage',
      glow: 'rgba(44, 95, 45, 0.15)',
    },
    kultur: {
      primary: '#8B7355',
      gradient: 'from-natural-earth to-natural-sand',
      glow: 'rgba(139, 115, 85, 0.15)',
    },
    litteratur: {
      primary: '#97BC62',
      gradient: 'from-natural-sage to-natural-forest',
      glow: 'rgba(151, 188, 98, 0.15)',
    },
    ildsjeler: {
      primary: '#6B7280',
      gradient: 'from-natural-stone to-gray-500',
      glow: 'rgba(107, 114, 128, 0.15)',
    },
  },
} as const;

// =============================================================================
// SPACING SCALE (8px base grid)
// =============================================================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px - base unit
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
} as const;

// Semantic spacing for sections
export const sectionSpacing = {
  sm: { y: 'py-8 md:py-12' },
  md: { y: 'py-12 md:py-16' },
  lg: { y: 'py-16 md:py-20' },
  xl: { y: 'py-20 md:py-24' },
} as const;

// =============================================================================
// TYPOGRAPHY SCALE
// =============================================================================

export const typography = {
  // Display - for hero sections
  display: {
    xl: {
      size: '3.75rem',    // 60px
      lineHeight: '1',
      weight: '700',
      letterSpacing: '-0.02em',
      className: 'text-5xl md:text-6xl font-bold tracking-tight',
    },
    lg: {
      size: '3rem',       // 48px
      lineHeight: '1.1',
      weight: '700',
      letterSpacing: '-0.02em',
      className: 'text-4xl md:text-5xl font-bold tracking-tight',
    },
    md: {
      size: '2.25rem',    // 36px
      lineHeight: '1.2',
      weight: '700',
      letterSpacing: '-0.01em',
      className: 'text-3xl md:text-4xl font-bold tracking-tight',
    },
  },

  // Headings
  heading: {
    h1: {
      size: '2rem',       // 32px
      lineHeight: '1.25',
      weight: '700',
      className: 'text-2xl md:text-3xl font-bold',
    },
    h2: {
      size: '1.5rem',     // 24px
      lineHeight: '1.33',
      weight: '600',
      className: 'text-xl md:text-2xl font-semibold',
    },
    h3: {
      size: '1.25rem',    // 20px
      lineHeight: '1.4',
      weight: '600',
      className: 'text-lg md:text-xl font-semibold',
    },
    h4: {
      size: '1.125rem',   // 18px
      lineHeight: '1.5',
      weight: '600',
      className: 'text-base md:text-lg font-semibold',
    },
  },

  // Body text
  body: {
    lg: {
      size: '1.125rem',   // 18px
      lineHeight: '1.75',
      weight: '400',
      className: 'text-base md:text-lg leading-relaxed',
    },
    md: {
      size: '1rem',       // 16px
      lineHeight: '1.625',
      weight: '400',
      className: 'text-base leading-relaxed',
    },
    sm: {
      size: '0.875rem',   // 14px
      lineHeight: '1.5',
      weight: '400',
      className: 'text-sm',
    },
  },

  // Labels and captions
  label: {
    lg: {
      size: '0.875rem',   // 14px
      lineHeight: '1.25',
      weight: '500',
      className: 'text-sm font-medium',
    },
    md: {
      size: '0.75rem',    // 12px
      lineHeight: '1.25',
      weight: '500',
      className: 'text-xs font-medium',
    },
    sm: {
      size: '0.6875rem',  // 11px
      lineHeight: '1.25',
      weight: '500',
      className: 'text-[11px] font-medium',
    },
  },
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const radius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px - primary card radius
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

// =============================================================================
// SHADOWS (Scandinavian: subtle, diffuse)
// =============================================================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.03)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
  // Hover elevation shadows
  hover: {
    sm: '0 4px 12px rgba(0, 0, 0, 0.08)',
    md: '0 8px 24px rgba(0, 0, 0, 0.1)',
    lg: '0 12px 36px rgba(0, 0, 0, 0.12)',
  },
  // Glow effects for focus/active states
  glow: {
    forest: '0 0 0 3px rgba(44, 95, 45, 0.2)',
    sage: '0 0 0 3px rgba(151, 188, 98, 0.2)',
    stone: '0 0 0 3px rgba(107, 114, 128, 0.2)',
  },
} as const;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  behind: -1,
  base: 0,
  raised: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  // CSS transition strings
  all: {
    fast: 'all 150ms ease',
    normal: 'all 200ms ease',
    slow: 'all 300ms ease',
  },
  transform: {
    fast: 'transform 150ms ease',
    normal: 'transform 200ms ease',
  },
  opacity: {
    fast: 'opacity 150ms ease',
    normal: 'opacity 200ms ease',
  },
} as const;

// =============================================================================
// COMPONENT PRESETS
// =============================================================================

export const componentStyles = {
  // Card variants
  card: {
    default: 'rounded-2xl border border-gray-100 bg-white shadow-sm',
    elevated: 'rounded-2xl bg-white shadow-lg',
    outlined: 'rounded-2xl border-2 border-gray-200 bg-transparent',
    ghost: 'rounded-2xl bg-gray-50/50',
    interactive: 'cursor-pointer transition-all duration-200',
  },

  // Button variants
  button: {
    primary: 'bg-natural-forest text-white hover:bg-natural-forest/90',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-50',
  },

  // Badge variants
  badge: {
    default: 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
    forest: 'bg-natural-forest/10 text-natural-forest',
    sage: 'bg-natural-sage/20 text-natural-forest',
    earth: 'bg-natural-earth/10 text-natural-earth',
    stone: 'bg-natural-stone/10 text-natural-stone',
  },

  // Section spacing
  section: {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
  },
} as const;

// =============================================================================
// MEDIA QUERIES (for reference in JS)
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ColorCategory = keyof typeof colors.category;
export type SpacingKey = keyof typeof spacing;
export type ShadowKey = keyof typeof shadows;
export type RadiusKey = keyof typeof radius;
