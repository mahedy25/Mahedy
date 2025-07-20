'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const fullPhrase =
  'Empowering visionary brands with impactful digital experiences. Let’s shape the future with bold design, seamless code, and relentless creativity.'

const shortPhrase = 'Empowering brands with bold design and seamless code.'

const fullDescription =
  'Blending design, development, and motion, I craft immersive digital experiences that not only look exceptional but truly connect with people. Innovation is my default, precision is my process.'

const shortDescription =
  'Design. Development. Motion. Crafted to connect with people.'

export default function Description() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const animatedWrapperRef = useRef<HTMLDivElement | null>(null)

  // Scroll animation for text
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.reveal-text')
      gsap.set(items, { y: 40, opacity: 0 })
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Magnetic effect without scaling
  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const animatedDiv = animatedWrapperRef.current
      if (!wrapper || !animatedDiv) return

      let anim: gsap.core.Tween | null = null

      const handleMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        const strength = 0.25
        const maxOffset = 15

        const clampedX = Math.max(-maxOffset, Math.min(x * strength, maxOffset))
        const clampedY = Math.max(-maxOffset, Math.min(y * strength, maxOffset))

        anim?.kill()
        anim = gsap.to(animatedDiv, {
          x: clampedX,
          y: clampedY,
          duration: 0.3,
          ease: 'power3.out',
        })
      }

      const resetPosition = () => {
        anim?.kill()
        anim = gsap.to(animatedDiv, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        })
      }

      wrapper.addEventListener('mousemove', handleMouseMove)
      wrapper.addEventListener('mouseleave', resetPosition)

      return () => {
        wrapper.removeEventListener('mousemove', handleMouseMove)
        wrapper.removeEventListener('mouseleave', resetPosition)
        anim?.kill()
      }
    },
    { dependencies: [], scope: wrapperRef }
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

        {/* Magnetic Button */}
        <div className='reveal-text hidden md:flex justify-center md:justify-end'>
          <div
            ref={wrapperRef}
            className='relative w-[150px] h-[150px] flex items-center justify-center overflow-hidden rounded-full'
          >
            <div
              ref={animatedWrapperRef}
              className='w-full h-full rounded-full flex items-center justify-center will-change-transform'
            >
              <button className='w-full h-full text-xl font-semibold text-white bg-[#004D4D] rounded-full flex items-center justify-center cursor-pointer'>
                About Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
