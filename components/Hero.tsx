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
  const [isOpen, setIsOpen] = useState(false)

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

  const toggleOverlay = () => setIsOpen(!isOpen)

  return (
    <>
      {/* ✅ Main Section */}
      <section className="relative h-screen flex md:flex-row flex-col-reverse items-center justify-center text-center md:text-start overflow-x-hidden z-10">
  {/* Left Side */}
  <div className="max-w-7xl mx-auto w-full z-10 px-6 lg:px-12">
    <div>
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
        {/* ✅ Spline is back inside main section */}
        <Spline
          className='absolute right-[-28%] hidden md:block'
          scene='https://prod.spline.design/EehE9S4DiNckWvlX/scene.splinecode'
        />
      </section>

      {/* ✅ Overlay with duplicated hero layout and Spline */}
      <div
        ref={overlayRef}
        className={`absolute top-0 left-0 w-full h-screen bg-black text-white z-20 transition-[clip-path] duration-[100ms] ease-linear pointer-events-none ${
          isOpen
            ? '[clip-path:circle(200%_at_100%_100%)] transition-[clip-path] duration-[1300ms] ease-[cubic-bezier(1,-0.01,0.01,0.99)]'
            : '[clip-path:circle(100px_at_var(--x,_50%)_var(--y,_50%))]'
        }`}
      >
        <section className='relative bg-[#FDF6EC] h-screen flex md:flex-row flex-col-reverse items-center justify-center text-[#0F0F0F] text-center md:text-start overflow-x-hidden'>
          {/* Left Side */}
          <div className='max-w-7xl mx-auto w-full z-10 px-6 lg:px-12'>
            <div>
              <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight z-10 mb-4'>
                Next JS Front End <br /> Web Developer
              </h1>

              <h2 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#FF073A] leading-snug tracking-tight z-10'>
                I create UI/UX rich websites that users love to interact with.
              </h2>
            </div>
          </div>
        </section>
      </div>

      {/* Toggle Button */}
      <span
        onClick={toggleOverlay}
        className='fixed bottom-12 left-1/2 transform -translate-x-1/2 w-16 h-16 z-30 rounded-full bg-black text-white flex items-center justify-center cursor-pointer'
      >
        <svg
          viewBox='0 0 62 24'
          fill='white'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 h-8'
        >
          <path d='M61.0607 13.0607C61.6465 12.4749 61.6465 11.5251 61.0607 10.9393L51.5147 1.3934C50.9289 0.807612 49.9792 0.807612 49.3934 1.3934C48.8076 1.97918 48.8076 2.92893 49.3934 3.51472L57.8787 12L49.3934 20.4853C48.8076 21.0711 48.8076 22.0208 49.3934 22.6066C49.9792 23.1924 50.9289 23.1924 51.5147 22.6066L61.0607 13.0607ZM0 13.5H60V10.5H0V13.5Z' />
        </svg>
      </span>
    </>
  )
}
