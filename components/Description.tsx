'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

const fullPhrase =
  'Empowering visionary brands with impactful digital experiences. Let’s shape the future with bold design, seamless code, and relentless creativity.'

const shortPhrase =
  'Empowering brands with bold design and seamless code.'

const fullDescription =
  'Blending design, development, and motion, I craft immersive digital experiences that not only look exceptional but truly connect with people. Innovation is my default, precision is my process.'

const shortDescription =
  'I Create Websites Users Love.'

const slideUpContainer: Variants = {
  initial: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
}

const slideUpText: Variants = {
  initial: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Description() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const button = buttonRef.current
    const wrapper = wrapperRef.current
    if (!button || !wrapper) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = wrapper.getBoundingClientRect()
      const x = e.clientX - left - width / 2
      const y = e.clientY - top - height / 2
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    }

    const resetPosition = () => {
      button.style.transform = `translate(0px, 0px)`
    }

    wrapper.addEventListener('mousemove', handleMouseMove)
    wrapper.addEventListener('mouseleave', resetPosition)

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove)
      wrapper.removeEventListener('mouseleave', resetPosition)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      variants={slideUpContainer}
      initial='initial'
      animate={isInView ? 'visible' : 'initial'}
      className='md:pt-30 pt-20 px-5 md:px-[100px] flex justify-center'
    >
      <div className='max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
        {/* Left Text Section */}
        <div className='col-span-2 flex flex-col gap-6'>
          {/* Desktop Text */}
          <motion.p
            variants={slideUpText}
            className='text-[24px] md:text-[32px] font-medium leading-[1.4] hidden md:block'
          >
            {fullPhrase}
          </motion.p>
          <motion.p
            variants={slideUpText}
            className='text-[16px] md:text-[18px] font-light hidden md:block'
          >
            {fullDescription}
          </motion.p>

          {/* Mobile Short Text */}
          <motion.p
            variants={slideUpText}
            className='text-[20px] font-medium leading-[1.4] md:hidden'
          >
            {shortPhrase}
          </motion.p>
          <motion.p
            variants={slideUpText}
            className='text-[14px] font-light md:hidden'
          >
            {shortDescription}
          </motion.p>
        </div>

        {/* Right Magnetic Button */}
        <motion.div
          variants={slideUpText}
          className='hidden md:flex justify-center md:justify-end'
        >
          <div
            ref={wrapperRef}
            className='relative w-[80px] h-[80px] flex items-center justify-center'
          >
            <button
              ref={buttonRef}
              className='absolute w-[200px] h-[200px] text-sm text-white bg-black hover:bg-[#990000] transition-all duration-300 ease-out rounded-full flex items-center justify-center cursor-pointer'
            >
              About Me
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
