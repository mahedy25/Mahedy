'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const fullPhrase =
  'Currently focused on building responsive, animated front-end experiences, while expanding skills in backend development to become a full-stack developer.'

const shortPhrase = 'Empowering brands with bold design and seamless code.'

const fullDescription =
  'Blending design, development, and motion, I craft immersive digital experiences that not only look exceptional but truly connect with people. Innovation is my default, precision is my process.'

const shortDescription =
  'Design. Development. Motion. Crafted to connect with people.'

export default function Description() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.reveal-text')
      gsap.set(items, { y: 50, opacity: 0 })

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true, // only animate once for smoother UX
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className='py-20 sm:py-24 md:py-32 lg:py-40 px-5 md:px-[100px] flex justify-center'
    >
      <div className='max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
        {/* Left Text */}
        <div className='col-span-2 flex flex-col gap-6'>
          <p className='reveal-text text-[24px] md:text-[32px] font-medium leading-[1.4] hidden md:block'>
            {fullPhrase}
          </p>
          <p className='reveal-text text-[16px] md:text-[18px] font-light hidden md:block'>
            {fullDescription}
          </p>
          <p className='reveal-text text-[20px] font-medium leading-[1.4] md:hidden'>
            {shortPhrase}
          </p>
          <p className='reveal-text text-[14px] font-light md:hidden'>
            {shortDescription}
          </p>
        </div>

        {/* About Me Button */}
        <div className='reveal-text hidden md:flex justify-center md:justify-end'>
          <Link href='/about'>
            <button className='text-xl cursor-pointer font-semibold text-white bg-[#004D4D] rounded-full w-[150px] h-[150px] flex items-center justify-center transition-transform duration-300 hover:scale-105'>
              About Me
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
