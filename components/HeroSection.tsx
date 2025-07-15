'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default function HeroSection() {
  const firstText = useRef<HTMLParagraphElement | null>(null)
  const secondText = useRef<HTMLParagraphElement | null>(null)
  const slider = useRef<HTMLDivElement | null>(null)

  let xPercent = 0
  let direction = -1

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
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

  return (
    <main className='relative flex h-screen mb-[100vh] overflow-hidden'>
      {/* Positioned Text */}
      <div className='absolute top-1/2  -translate-y-1/2 z-10 max-w-[500px] text-left'>
        <h1 className='text-xl md:text-3xl lg:text-6xl leading-snug font-extrabold'>
          Hello, I&apos;m Mahedy Hasan.
        </h1>
        <p className='text-lg md:text-xl font-semibold lg:text-2xl'>I create UI/UX rich websites with Next.js, Tailwind CSS, GSAP & Framer-motion</p>
      </div>

      {/* Background Image */}
      <Image
        src='/images/heroBackground.png'
        alt='background'
        fill
        className='object-contain object-bottom brightness-105 contrast-110'
        priority
      />

      {/* Scrolling Text Animation */}
      <div className='absolute top-[calc(100vh-350px)] w-full overflow-hidden'>
        <div ref={slider} className='relative whitespace-nowrap w-max'>
          <p
            ref={firstText}
            className='inline-block m-0 text-[230px] font-medium pr-[50px]'
          >
            Next JS Developer -
          </p>
          <p
            ref={secondText}
            className='inline-block m-0 text-[230px] font-medium pr-[50px]'
          >
            Next JS Developer -
          </p>
        </div>
      </div>
    </main>
  )
}
