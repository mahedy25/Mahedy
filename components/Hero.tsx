'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'



gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const locationRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from([headingRef.current, subheadingRef.current, locationRef.current], {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
        duration: 0.8,
        ease: 'power2.out',
      })

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

  return (
    <section
      ref={containerRef}
      className='min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-20'
    >
      {/* Left Side */}
      <div ref={leftRef} className='md:w-1/2 text-center md:text-left'>
        <h1
          ref={headingRef}
          className='text-4xl md:text-6xl font-bold mb-4 text-[#00A86B]'
        >
          Next JS Front-end Web Developer
        </h1>
        <p ref={subheadingRef} className='text-lg md:text-xl mb-6 '>
          Hello, I&apos;m Mahedy Hasan. I create stunning UI/UX rich websites.
        </p>
       <div
      ref={locationRef}
      className='md:border-l-2 border-[#00A86B] pl-3 flex items-center gap-2 mt-4'
    >
      <p className='text-base md:text-lg text-gray-800'>
        Based in <strong>Chittagong, Bangladesh</strong>
      </p>

    </div>
      </div>

      {/* Right Side */}
      <div ref={rightRef} className='md:w-1/2 mt-10 md:mt-0'>
        <Image
          src='/hero-image.png' // <-- Replace with your actual image path
          alt='Hero Illustration'
          width={600}
          height={600}
          className='w-full max-w-md mx-auto'
        />
      </div>
    </section>
  )
}