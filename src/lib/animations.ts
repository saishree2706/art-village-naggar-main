// Animation constants for consistent, buttery smooth animations

// Smooth, buttery easing curve (ease-out-expo feel)
export const EASING = [0.16, 1, 0.3, 1] as const;

// Duration presets (slower, more elegant)
export const DURATION = {
  fast: 0.4,
  normal: 0.7,
  slow: 1.0,
  slower: 1.4,
} as const;

// Stagger delays for sequential animations
export const STAGGER = {
  fast: 0.08,
  normal: 0.15,
  slow: 0.25,
} as const;

// Hero animation timing (consistent across all pages)
export const HERO_TIMING = {
  tagline: { delay: 0.3, duration: 1.2 },
  heading: { delay: 0.5, duration: 1.0 },
  description: { delay: 0.8, duration: 1.0 },
  cta: { delay: 1.1, duration: 1.0 },
  scrollIndicator: { delay: 1.6, duration: 1.0 },
} as const;

// Reusable animation variants for framer-motion
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DURATION.normal, ease: EASING },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
  transition: { duration: DURATION.slow, ease: EASING },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: DURATION.normal, ease: EASING },
};

// Page transition variant
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DURATION.normal, ease: EASING },
};

// Image crossfade variant
export const imageCrossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: EASING },
};

// Lightbox animation
export const lightboxImage = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3, ease: EASING },
};

// Scroll reveal default config
export const scrollRevealConfig = {
  duration: DURATION.slow,
  ease: EASING,
  offset: 30,
  margin: "-100px",
};
