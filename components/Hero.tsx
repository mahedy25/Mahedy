'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  // Ref for the container of animated lines
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all elements with class 'line' inside heroRef
      gsap.fromTo(
        '.line',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.3, // each line appears one after another
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen   px-6">
      <div ref={heroRef} className="max-w-3xl text-center space-y-4">
        <h1 className="text-5xl font-bold line">
          Welcome to My Awesome Website
        </h1>
        <p className="text-xl line">
          We create beautiful experiences with smooth animations.
        </p>
        <p className="text-lg line text-gray-400">
          Scroll down to explore more about what we do.
        </p>
      </div>
    </main>
  )
}
