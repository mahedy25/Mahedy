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

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3.out' })
    const xToBorder = gsap.quickTo(cursorBorder, 'x', { duration: 0.5, ease: 'power3.out' })
    const yToBorder = gsap.quickTo(cursorBorder, 'y', { duration: 0.5, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xToBorder(e.clientX)
      yToBorder(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // ✅ Conditionally render JSX, not hook
  if (isMobile) return <></>

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[30px] h-[30px] bg-[#00FFFF] border-2 border-white rounded-full pointer-events-none z-[999] mix-blend-difference"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[60px] h-[60px] border-3 border-[#FF073A] rounded-full pointer-events-none z-[999] mix-blend-difference opacity-50"
      />
    </>
  )
}
