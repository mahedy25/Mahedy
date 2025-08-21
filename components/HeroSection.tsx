'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Lobster_Two } from 'next/font/google'
import Logo from './Logo'

const lobster = Lobster_Two({
  weight: '400',
  subsets: ['latin'],
})

export default function HeroSection() {
  const mainText = useRef<HTMLDivElement | null>(null)
  const slider = useRef<HTMLDivElement | null>(null)
  const imageContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Background image fade-in
    gsap.fromTo(
      imageContainer.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power4.out' }
    )

    // Animate main text lines
    const lines = gsap.utils.toArray('#mainText .line span')
    gsap.fromTo(
      lines,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.25,
      }
    )

    // Infinite scrolling text
    if (slider.current) {
      const textWidth = slider.current.scrollWidth / 2
      gsap.set(slider.current, { x: 0 })
      gsap.to(slider.current, {
        x: `-=${textWidth}`,
        duration: 30,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % textWidth}px`,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="relative flex h-screen overflow-hidden bg-[#ECECEC]">
      <Logo />

      {/* Main Text */}
      <div
        id="mainText"
        ref={mainText}
        className="absolute top-[30%] px-4 md:px-8 lg:px-16 sm:top-[35%] -translate-y-1/2 z-10 max-w-[500px] lg:max-w-[900px] text-left"
      >
        <h1
          className={`${lobster.className} w-[250px] sm:w-full text-4xl md:text-5xl lg:text-7xl leading-snug font-bold`}
        >
          <span className="line block overflow-hidden">
            <span className="inline-block">Front End</span>
          </span>
          <span className="line block overflow-hidden">
            <span className="inline-block">Web Developer & Designer</span>
          </span>
        </h1>

        <div className="mt-6 md:w-full md:text-xl text-[#004D4D] font-semibold lg:text-2xl leading-snug">
          <span className="line block overflow-hidden">
            <span className="w-0 h-1 border-2 mx-1 md:mx-2 lg:mx-4 border-[#004D4D]"></span>
            <span className="inline-block">Based In Bangladesh.</span>
          </span>
        </div>
      </div>

      {/* Background Image */}
      <div
        ref={imageContainer}
        className="absolute ml-29 md:ml-50 lg:ml-80 inset-0 z-0 w-full h-full"
      >
        <Image
          src="/images/heroBg.png"
          alt="background"
          fill
          className="object-contain object-bottom brightness-105"
          priority
        />
      </div>

      {/* Scrolling Text */}
      <div className="absolute top-[calc(100vh-250px)] w-full overflow-hidden">
        <div
          ref={slider}
          className="relative whitespace-nowrap w-max text-[#FFFFFF]"
        >
          <p className="inline-block m-0 text-[230px] font-bold tracking-tight pr-[50px]">
            Freelance Developer -
          </p>
          <p className="inline-block m-0 text-[230px] font-bold tracking-tight pr-[50px] absolute left-full top-0">
            Freelance Developer -
          </p>
        </div>
      </div>
    </main>
  )
}
