'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Lobster } from 'next/font/google'
import { useGSAP } from '@gsap/react'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
})

export default function HeroSection() {
  const firstText = useRef<HTMLParagraphElement | null>(null)
  const secondText = useRef<HTMLParagraphElement | null>(null)
  const slider = useRef<HTMLDivElement | null>(null)
  const imageContainer = useRef<HTMLDivElement | null>(null) // ✅ ref for image wrapper

  let xPercent = 0
  let direction = -1

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ✅ Simple image fade-in
    gsap.fromTo(
      imageContainer.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power4.out' }
    )

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          direction = e.direction * -1
        },
      },
      x: '-500px',
    })

    requestAnimationFrame(animate)
  }, [])

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0
    } else if (xPercent > 0) {
      xPercent = -100
    }

    gsap.set(firstText.current, { xPercent })
    gsap.set(secondText.current, { xPercent })
    requestAnimationFrame(animate)
    xPercent += 0.1 * direction
  }

  useGSAP(() => {
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
    <main className='relative flex h-screen mb-100 overflow-hidden'>
      {/* Positioned Text */}
      <div
        id='mainText'
        className='absolute top-[25%] px-4 sm:top-[35%] -translate-y-1/2 z-10 max-w-[500px] lg:max-w-[700px] text-left'
      >
        <h1
          className={`${lobster.className} w-[300px] md:w-full  text-4xl md:text-5xl lg:text-7xl leading-snug font-extrabold`}
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
            <span className='inline-block'>
              — Based In Bangladesh.
            </span>
          </span>
        </div>
      </div>

      {/* ✅ Wrapped Image with fade-in animation */}
      <div ref={imageContainer} className='absolute inset-0 z-0 w-full h-full opacity-0 '>
        <Image
          src='/images/heroBg.png'
          alt='background'
          fill
          className='object-contain  object-bottom  ml-26 sm:ml-7  brightness-105 contrast-110 '
          priority
        />
      </div>

      {/* Scrolling Text Animation */}
      <div className='absolute top-[calc(100vh-350px)] w-full overflow-hidden'>
        <div ref={slider} className={`relative ${lobster.className}  whitespace-nowrap w-max text-[#990000]`}>
          <p
            ref={firstText}
            className='inline-block m-0  text-[230px] font-medium pr-[50px]'
          >
            Freelance Developer - Freelance Developer - 
          </p>
          <p
            ref={secondText}
            className='inline-block m-0 text-[230px] font-medium pr-[50px]'
          >
            Freelance Developer - Freelance Developer - 
          </p>
        </div>
      </div>
    </main>
  )
}
