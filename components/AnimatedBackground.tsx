// components/AnimatedBackground.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!bgRef.current) return

    const dots = Array.from(
      bgRef.current.children
    ) as HTMLSpanElement[]
    dotsRef.current = dots

    gsap.to(dots, {
      duration: 10,
      x: () => `+=${Math.random() * 200 - 100}`,
      y: () => `+=${Math.random() * 200 - 100}`,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    })
  }, [])

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#eafff4] via-[#f0fff8] to-[#d9fff0]"
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#00A86B] opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}