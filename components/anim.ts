import { Variants } from 'framer-motion'

// Sidebar slide-in animation
export const menuSlide: Variants = {
  initial: { x: 'calc(100% + 100px)' },
  enter: {
    x: '0',
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      when: 'beforeChildren',
      staggerChildren: 0.06, // faster stagger
        // very slight delay to start links
    },
  },
  exit: {
    x: 'calc(100% + 100px)',
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

// Link item animation (faster & responsive)
export const linkItem: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35, // faster link animation
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}
