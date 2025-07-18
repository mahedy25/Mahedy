'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Lobster } from 'next/font/google'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default function HeroSection() {
  const firstText = useRef<HTMLParagraphElement | null>(null)
  const secondText = useRef<HTMLParagraphElement | null>(null)
  const slider = useRef<HTMLDivElement | null>(null)
  const imageContainer = useRef<HTMLDivElement | null>(null)

  // useRef for mutable values to persist without triggering rerenders
  const xPercent = useRef(0)
  const direction = useRef(-1)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Image fade-in animation
    gsap.fromTo(
      imageContainer.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power4.out' }
    )

    // ScrollTrigger to detect scroll direction and update direction ref
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      scrub: 0.25,
      onUpdate: (self) => {
        direction.current = self.direction * 1 // 1 or -1 depending on scroll direction
      },
    })

    // GSAP ticker-based smooth scroll animation for text
    const speed = 0.1
    const tickerCallback = () => {
      xPercent.current += speed * direction.current

      if (xPercent.current < -100) {
        xPercent.current = 0
      } else if (xPercent.current > 0) {
        xPercent.current = -100
      }

      gsap.set(firstText.current, { xPercent: xPercent.current })
      gsap.set(secondText.current, { xPercent: xPercent.current })
    }

    gsap.ticker.add(tickerCallback)

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
  gsap.fromTo(
    '#mainText .line span',
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.25,
    }
  )
}, [])

  return (
    <main className='relative flex h-screen mb-[100vh] overflow-hidden'>
      {/* Positioned Text */}
      <div
        id='mainText'
        className='absolute top-[25%] px-4 sm:top-[35%] -translate-y-1/2 z-10 max-w-[500px] lg:max-w-[700px] text-left'
      >
        <h1
          className={`${lobster.className} w-[300px] md:w-full text-4xl md:text-5xl lg:text-7xl leading-snug font-extrabold`}
        >
          <span className='line block overflow-hidden'>
            <span className='inline-block'>Next.JS</span>
          </span>
          <span className='line block overflow-hidden'>
            <span className='inline-block '>Front-end web developer</span>
          </span>
        </h1>
        <div className='mt-2 w-[60%] md:w-full md:text-xl font-semibold lg:text-2xl text-[#990000]'>
          <span className='line block overflow-hidden '>
            <span className='inline-block'>Create Beautiful, Functional, and Fast websites</span>
          </span>
          <span className='line block overflow-hidden'>
            <span className='inline-block'>— Based In Bangladesh.</span>
          </span>
        </div>
      </div>

      {/* Image with fade-in */}
      <div ref={imageContainer} className='absolute inset-0 z-0 w-full h-full opacity-0'>
        <Image
          src='/images/heroBg.png'
          alt='background'
          fill
          className='object-contain object-bottom ml-26 sm:ml-7 brightness-105 contrast-110'
          priority
        />
      </div>

      {/* Scrolling Text Animation */}
      <div className='absolute top-[calc(100vh-350px)] w-full overflow-hidden'>
        <div
          ref={slider}
          className={`${lobster.className} relative whitespace-nowrap w-max text-[#990000]`}
        >
          <p
            ref={firstText}
            className='inline-block m-0 text-[230px] font-medium pr-[50px]'
          >
            Freelance Developer - Freelance Developer - 
          </p>
          <p
            ref={secondText}
            className='inline-block m-0 text-[230px] font-medium pr-[50px] absolute left-full top-0'
          >
            Freelance Developer - Freelance Developer - 
          </p>
        </div>
      </div>
    </main>
  )
}
