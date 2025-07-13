'use client'
import Link from 'next/link'
import { Lobster } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const lobster = Lobster({
  variable: '--font-lobster',
  subsets: ['latin'],
  weight: ['400'],
})

export default function Logo() {
  const [hovered, setHovered] = useState(false)

  return (
    <div>
      <Link href="/">
        <motion.h1
          className={`${lobster.className} text-2xl cursor-pointer`}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '200px', // fixed width to prevent layout shift
            height: '32px', // adjust height based on font size
            overflow: 'hidden',
          }}
        >
          {/* Container with relative position */}
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
              <span>Coded by -</span>
              <span>Mahedy</span>
            </motion.div>

            {/* "Hasan" layer */}
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
        </motion.h1>
      </Link>
    </div>
  )
}
