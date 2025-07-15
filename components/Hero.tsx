'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { Globe } from 'lucide-react'










gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const locationRef = useRef(null)
  const earthRef = useRef<SVGSVGElement>(null)

  // Main entrance animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from(
        [headingRef.current, subheadingRef.current, locationRef.current],
        {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          delay: 0.3,
          duration: 0.8,
          ease: 'power2.out',
        }
      )

      gsap.from(rightRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'back.out(1.7)',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Earth icon animation
  useEffect(() => {
    if (!earthRef.current) return

    // Infinite rotate
    gsap.to(earthRef.current, {
      rotate: 360,
      repeat: -1,
      duration: 6,
      ease: 'linear',
      transformOrigin: 'center center',
    })
  }, [])

  const handleEnter = () => {
    gsap.to(earthRef.current, {
      scale: 1.3,
      rotation: '+=15',
      duration: 0.3,
      ease: 'power1.out',
    })
  }

  const handleLeave = () => {
    gsap.to(earthRef.current, {
      scale: 1,
      rotation: '+=10',
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    

    <section
    id='/'
      ref={containerRef}
      className='min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-20'
    >
      {/* Left Side */}
      <div ref={leftRef} className=' text-center md:text-left'>
        <h1
          ref={headingRef}
          className='text-3xl md:text-5xl lg:text-7xl font-bold mb-4 text-[#00A86B]'
        >
          Next JS Front end Web Developer
        </h1>
        <p ref={subheadingRef} className="text-lg md:text-xl mb-6">
          Hello, I&apos;m Mahedy Hasan. I create stunning UI/UX rich websites.
        </p>

        {/* Location Section */}
        <div
          ref={locationRef}
          className='md:border-l-2 border-[#00A86B] pl-3 flex flex-col md:flex-row items-center gap-2 mt-4'
        >
          <p className="text-base md:text-lg text-gray-800">
            Based in <strong>Chittagong, Bangladesh</strong>
          </p>

          <div className='relative group ml-3'>
            <Link
              href='https://maps.app.goo.gl/PT1Up1Xn7QDskuDc9'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Globe
                ref={earthRef}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className='w-6 h-6 text-blue-500 cursor-pointer'
              />
            </Link>

            {/* Tooltip */}
            <span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10'>
              View Location
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div  className='relative mt-10 md:mt-0'>
        
      </div>
    </section>
  )
}