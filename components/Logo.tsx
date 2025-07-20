'use client'

import Link from 'next/link'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Lobster_Two } from 'next/font/google'

const lobster = Lobster_Two({
  weight: '400',
  subsets: ['latin'],
})

export default function Logo() {
  const [hovered, setHovered] = useState(false)
  const logoRef = useRef<HTMLHeadingElement | null>(null)

  // ✅ GSAP entry animation from bottom
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.2,
      }
    )
  }, [])

  return (
    <div className='md:ml-12 ml-4 mt-4'>
      <Link href="/">
        <h1
          ref={logoRef}
          className={`${lobster.className} text-2xl cursor-pointer`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '200px',
            height: '32px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* "Coded by - Mahedy" layer */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={hovered ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                display: 'flex',
                gap: '4px',
              }}
            >
              <span>Coded by - </span>
              <span>Mahedy</span>
            </motion.div>

            {/* "Mahedy Hasan" hover layer */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="hasan"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                >
                  Mahedy Hasan
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </h1>
      </Link>
    </div>
  )
}
