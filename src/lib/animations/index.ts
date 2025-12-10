/**
 * Animation System Exports
 * Re-exports all animation configurations and variants
 */

// Configuration
export {
  springs,
  timing,
  easings,
  stagger,
  viewport,
  durations,
  delays,
  reducedMotion,
  transitionPresets,
  type SpringKey,
  type TimingKey,
  type StaggerKey,
  type ViewportKey,
} from './config';

// Variants
export {
  // Container variants
  containerVariants,
  containerFastVariants,
  containerSlowVariants,
  // Fade variants
  fadeVariants,
  fadeUpVariants,
  fadeDownVariants,
  fadeLeftVariants,
  fadeRightVariants,
  // Scale variants
  scaleUpVariants,
  scaleFromZeroVariants,
  popInVariants,
  // Card variants
  cardHoverVariants,
  cardRevealVariants,
  // Timeline variants
  dotPulseVariants,
  lineScaleVariants,
  // Expand/collapse
  expandCollapseVariants,
  accordionVariants,
  // Image variants
  imageHoverVariants,
  imageRevealVariants,
  // Filter/toggle variants
  filterToggleVariants,
  toggleVariants,
  // Loading variants
  shimmerVariants,
  pulseVariants,
  // Page/section variants
  sectionRevealVariants,
  heroTextVariants,
  // Carousel variants
  slideVariants,
  fadeSlideVariants,
  // Navigation variants
  menuVariants,
  hamburgerLineVariants,
  // Utility variants
  presenceVariants,
  listItemVariants,
  type VariantKey,
} from './variants';
