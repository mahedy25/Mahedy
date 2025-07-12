'use client'

import { useGSAP } from '@gsap/react'
import Spline from '@splinetool/react-spline'
import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const firstLineRef = useRef(null)
  const secondLineRef = useRef(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(firstLineRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    }).from(
      secondLineRef.current,
      {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      },
      '-=0.8'
    )
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.round((e.clientX / window.innerWidth) * 100)
      const y = Math.round((e.clientY / window.innerHeight) * 100)

      gsap.to(overlayRef.current, {
        '--x': `${x}%`,
        '--y': `${y}%`,
        duration: 0.3,
        ease: 'sine.out',
      } as gsap.TweenVars)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Main Section */}
      <section className="relative h-screen flex md:flex-row flex-col-reverse items-center justify-center text-center md:text-start overflow-x-hidden z-10">
        {/* Left Side */}
        <div className="max-w-7xl mx-auto w-full z-10 px-6 lg:px-12">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h1
              ref={firstLineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 leading-tight z-10"
            >
              Hi, I&apos;m <br />
              <span className="text-[#00FFFF]">MAHEDY HASAN</span>
            </h1>

            <h2
              ref={secondLineRef}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-slate-300 tracking-tight z-10"
            >
              Crafting Code That Speaks Design.
            </h2>
          </div>
        </div>

        {/* Spline */}
        <Spline
          className="absolute right-[-28%] hidden md:block"
          scene="https://prod.spline.design/EehE9S4DiNckWvlX/scene.splinecode"
        />
      </section>

      {/* Overlay */}
      <div
        ref={overlayRef}
        style={{
          clipPath: isHovered
            ? 'circle(300px at var(--x, 50%) var(--y, 50%))'
            : 'circle(80px at var(--x, 50%) var(--y, 50%))',
          transition: 'clip-path 0.3s ease-out',
        }}
        className="absolute top-0 left-0 w-full h-screen bg-black text-white z-20 pointer-events-none"
      >
        <section className="relative bg-[#FDF6EC] h-screen flex md:flex-row flex-col-reverse items-center justify-center text-[#0F0F0F] text-center md:text-start overflow-x-hidden">
          {/* Left Side */}
          <div className="max-w-7xl mx-auto w-full z-10 px-6 lg:px-12">
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight z-10 mb-4">
                Next JS Front End <br /> Web Developer
              </h1>

              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#FF073A] leading-snug tracking-tight z-10">
                I create UI/UX rich websites <br /> that users love to interact with.
              </h2>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
