'use client'

import { useGSAP } from '@gsap/react'
import Spline from '@splinetool/react-spline'

import gsap from 'gsap'

import { useRef } from 'react'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const firstLineRef = useRef(null)
  const secondLineRef = useRef(null)

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
    ) // overlaps slightly with first line ending
  })

  return (
    <main className='h-screen flex md:flex-row flex-col-reverse items-center justify-center text-center md:text-start'>
      <div className='max-w-7xl mx-auto w-full'>
        {/* left side */}

        <div>
          <h1
            ref={firstLineRef}
            className='text-3xl md:text-5xl lg:text-6xl font-bold z-10 mb-3 leading-tight'
          >
            Hi, I&apos;m <br />{' '}
            <span className='text-[#00FFFF]'>MAHEDY HASAN</span>
          </h1>

          <h2
            ref={secondLineRef}
            className='text-2xl md:text-3xl lg:text-4xl font-medium z-10 leading-snug text-slate-300'
          >
            Crafting Code That Speaks Design.
          </h2>
        </div>
      </div>

      <div className='w-full h-[400px] lg:h-[600px] ml-4 md:block hidden'>
        <Spline scene='https://prod.spline.design/EehE9S4DiNckWvlX/scene.splinecode' />
      </div>
    </main>
  )
}
