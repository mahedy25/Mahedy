'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, Variants } from 'framer-motion'


const routeNames: Record<string, string> = {
  '/': 'Home',
  '/works': 'Works',
  '/about': 'About',
  '/contact': 'Contact'
}

export default function TransitionCurve({
  children,
  backgroundColor = '#000', // control animation start externally
}: {
  children: React.ReactNode
  backgroundColor?: string
    duration?: number
  startAnimation?: boolean
}) {
  const pathname = usePathname()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const resize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <div
        className="fixed top-0 left-0 w-full h-[calc(100vh+600px)] z-30"
        style={{ backgroundColor, opacity: dimensions.width === 0 ? 1 : 0 }}
      />

      <motion.p
        className="fixed z-40 left-1/2 top-[40%] -translate-x-1/2 text-white text-[46px] text-center"
        {...anim(textVariant)}
      >
        {routeNames[pathname] || ''}
      </motion.p>

      {dimensions.width > 0 && (
        <SVG width={dimensions.width} height={dimensions.height} />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}

function SVG({ width, height }: { width: number; height: number }) {
  const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `

  const targetPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `

  return (
    <motion.svg
      className="fixed top-0 left-0 w-screen h-[calc(100vh+600px)] z-20 pointer-events-none"
      {...anim(translateVariant)}
    >
      <motion.path
        fill="#000"
        {...anim(curveVariant(initialPath, targetPath))}
      />
    </motion.svg>
  )
}

// -----------------------------
// Animations
// -----------------------------

function anim(variants: Variants) {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit'
  }
}

const textVariant: Variants = {
  initial: { opacity: 1 },
  enter: {
    opacity: 0,
    top: '0%',
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: '47.5%' }
  },
  exit: {
    opacity: 1,
    top: '40%',
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }
  }
}

const translateVariant: Variants = {
  initial: { top: '-300px' },
  enter: {
    top: '-100vh',
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: '100vh' }
  },
  exit: {
    top: '-300px',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
  }
}

function curveVariant(initialPath: string, targetPath: string): Variants {
  return {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    }
  }
}
