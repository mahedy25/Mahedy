'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { motion } from 'framer-motion'
import { Lobster_Two } from 'next/font/google'
import Logo from './Logo'


const lobster = Lobster_Two({
  weight: '400',
  subsets: ['latin'],
})

export default function HeroSection() {
  const firstText = useRef<HTMLParagraphElement | null>(null)
  const secondText = useRef<HTMLParagraphElement | null>(null)
  const slider = useRef<HTMLDivElement | null>(null)
  const imageContainer = useRef<HTMLDivElement | null>(null)

  // Plain variables like raw code:
  let xPercent = 0
  let direction = -1

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      imageContainer.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power4.out' }
    )

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          direction = e.direction * -1 // direct assignment to let variable, just like raw code
        },
      },
      x: '-500px',
    })

    // Animate loop like raw code
    function animate() {
      if (xPercent < -100) {
        xPercent = 0
      } else if (xPercent > 0) {
        xPercent = -100
      }

      gsap.set(firstText.current, { xPercent: xPercent })
      gsap.set(secondText.current, { xPercent: xPercent })

      // eslint-disable-next-line react-hooks/exhaustive-deps
      xPercent += 0.1 * direction // speed same as raw code

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
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
    <main className='relative flex h-screen overflow-hidden bg-[#ECECEC]'>
      <Logo />
      {/* Main Text */}
      <div
        id='mainText'
        className='absolute top-[30%] px-4 md:px-8 lg:px-16 sm:top-[35%] -translate-y-1/2 z-10 max-w-[500px] lg:max-w-[900px] text-left'
      >
        <h1
          className={`${lobster.className} w-[250px] sm:w-full text-4xl md:text-5xl lg:text-7xl leading-snug font-bold`}
        >
          <span className='line block overflow-hidden'>
            <span className='inline-block'>Front End</span>
          </span>
          <span className='line block overflow-hidden'>
            <span className='inline-block'>Web Developer & Designer</span>
          </span>
        </h1>
        

        <div className='mt-6 md:w-full md:text-xl text-[#004D4D] font-semibold lg:text-2xl leading-snug'>
          <span className='line block overflow-hidden'>
            <span className='w-0 h-1 border-2 mx-1 md:mx-2 lg:mx-4 border-[#004D4D]'></span>
            <span className='inline-block'>Based In Bangladesh.</span>
          </span>
        </div>
      </div>

      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        ref={imageContainer}
        className='absolute ml-29 md:ml-50 lg:ml-80 inset-0 z-0 w-full h-full opacity-0'
      >
        <Image
          src='/images/heroBg.png'
          alt='background'
          fill
          className='object-contain object-bottom brightness-105'
          priority
        />
      </motion.div>

      {/* Scrolling Text Animation */}
      <div className='absolute top-[calc(100vh-250px)] w-full overflow-hidden'>
        <div
          ref={slider}
          className='relative whitespace-nowrap w-max text-[#FFFFFF]'
        >
          <p
            ref={firstText}
            className='inline-block m-0 text-[230px] font-bold tracking-tight pr-[50px]'
          >
            Freelance Developer -
          </p>
          <p
            ref={secondText}
            className='inline-block m-0 text-[230px] font-bold tracking-tight pr-[50px] absolute left-full top-0'
          >
            Freelance Developer -
          </p>
        </div>
      </div>
    </main>
  )
}
