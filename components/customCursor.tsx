'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const cursorBorderRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const cursor = cursorRef.current
    const cursorBorder = cursorBorderRef.current
    if (!cursor || !cursorBorder) return

    gsap.set([cursor, cursorBorder], { x: -50, y: -50 })

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' })
    const xToBorder = gsap.quickTo(cursorBorder, 'x', { duration: 0.4, ease: 'power3.out' })
    const yToBorder = gsap.quickTo(cursorBorder, 'y', { duration: 0.4, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xToBorder(e.clientX)
      yToBorder(e.clientY)
    }

    const handleMouseDown = () => {
      if (cursor) gsap.to(cursor, { scale: 0.6, duration: 0.15 })
      if (cursorBorder) gsap.to(cursorBorder, { scale: 1.3, duration: 0.15 })
    }

    const handleMouseUp = () => {
      if (cursor) gsap.to(cursor, { scale: 1, duration: 0.15 })
      if (cursorBorder) gsap.to(cursorBorder, { scale: 1, duration: 0.15 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // ✅ Place this after useGSAP to avoid React Hook error
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[20px] h-[20px] bg-[#00FFFF] rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-transform duration-150 ease-out hidden md:block"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[50px] h-[50px] rounded-full pointer-events-none z-[9998] border-2 border-white opacity-30 mix-blend-difference transition-transform duration-300 ease-out hidden md:block"
        style={{
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      />
    </>
  )
}
