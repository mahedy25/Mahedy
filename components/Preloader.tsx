'use client'

import { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'

const words = ["Welcome", "Willkommen", "Bienvenido", "환영합니다", "أهلاً وسهلاً", "欢迎", "ようこそ", "স্বাগতম"]

const opacity: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
}

const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.35 }
  }
}

export default function Preloader() {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) return
    const timeout = setTimeout(() => {
      setIndex(prev => prev + 1)
    }, index === 0 ? 1000 : 150)
    return () => clearTimeout(timeout)
  }, [index])

  // Paths now exactly match TransitionCurve initial/target for seamless morph
  const initialPath = `
    M0 300 
    Q${dimension.width / 2} 0 ${dimension.width} 300
    L${dimension.width} ${dimension.height + 300}
    Q${dimension.width / 2} ${dimension.height + 600} 0 ${dimension.height + 300}
    L0 0
  `
  const targetPath = `
    M0 300 
    Q${dimension.width / 2} 0 ${dimension.width} 300
    L${dimension.width} ${dimension.height}
    Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}
    L0 0
  `

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.35 }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.35 }
    }
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[99] flex items-center justify-center bg-[#141516]"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="absolute z-10 flex items-center text-white text-[42px]"
          >
            <span className="w-[10px] h-[10px] bg-white rounded-full mr-[10px]" />
            {words[index]}
          </motion.p>

          <svg
            className="absolute top-0 w-full"
            style={{ height: `calc(100% + 300px)` }}
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#141516"
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}
