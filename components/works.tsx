'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/app/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Variants, motion } from 'framer-motion'
import gsap from 'gsap'
import { Lobster_Two } from 'next/font/google'
import { ArrowUpRight } from 'lucide-react'



const lobster = Lobster_Two({
  weight: '400',
  subsets: ['latin'],
})

type Project = {
  _id: string
  title: string
  slug: { current: string }
  mainImage: SanityImageSource
  publishedAt: string
  color?: string
}

const scaleAnimation: Variants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}

const getBgColorClass = (index: number, projectColor?: string): string => {
  if (projectColor && !projectColor.startsWith('#')) {
    return `bg-${projectColor}`
  }

  switch (index % 4) {
    case 0:
      return 'bg-black'
    case 1:
      return 'bg-gray-700'
    case 2:
      return 'bg-orange-50'
    case 3:
      return 'bg-neutral-600'
    default:
      return 'bg-neutral-800'
  }
}

gsap.registerPlugin(gsap.quickTo)

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const hoveredIndexRef = useRef<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)

  const xMoveModal = useRef<gsap.QuickToFunc | null>(null)
  const yMoveModal = useRef<gsap.QuickToFunc | null>(null)
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null)
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex
  }, [hoveredIndex])

  useEffect(() => {
    if (modalRef.current && cursorLabelRef.current) {
      xMoveModal.current = gsap.quickTo(modalRef.current, 'left', {
        duration: 0.8,
        ease: 'power3',
      })
      yMoveModal.current = gsap.quickTo(modalRef.current, 'top', {
        duration: 0.8,
        ease: 'power3',
      })
      xMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current, 'left', {
        duration: 0.45,
        ease: 'power3',
      })
      yMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current, 'top', {
        duration: 0.45,
        ease: 'power3',
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return // ⛔ disable all hover animation on mobile

      const label = cursorLabelRef.current
      if (label && hoveredIndexRef.current !== null) {
        const rect = label.getBoundingClientRect()
        const isOverLabel =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom

        if (isOverLabel) {
          xMoveModal.current?.(e.pageX)
          yMoveModal.current?.(e.pageY)
          xMoveCursorLabel.current?.(e.pageX - rect.width / 2)
          yMoveCursorLabel.current?.(e.pageY - rect.height / 2)
          return
        }
      }

      xMoveModal.current?.(e.pageX)
      yMoveModal.current?.(e.pageY)

      const labelRect = cursorLabelRef.current?.getBoundingClientRect()
      if (labelRect) {
        xMoveCursorLabel.current?.(e.pageX - labelRect.width / 2)
        yMoveCursorLabel.current?.(e.pageY - labelRect.height / 2)
      }

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el?.hasAttribute('data-project-index')) {
        const index = Number(el.getAttribute('data-project-index'))
        if (!isNaN(index)) {
          setHoveredIndex(index)
          return
        }
      }
      setHoveredIndex(null)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isMobile])

  useEffect(() => {
    client
      .fetch<Project[]>(
        `*[_type == "projects"] | order(publishedAt desc){
          _id, title, slug, mainImage, publishedAt,
          "color": projectColor.hex
        }`
      )
      .then(setProjects)
      .catch(console.error)
  }, [])

  return (
    <>
    <main
      id='works'
      className='relative flex mt-20 sm:mt-24 md:mt-32 lg:mt-40  items-center justify-center overflow-hidden px-4 sm:px-8 '
    >
      <div className='z-10 max-w-4xl w-full flex flex-col items-center justify-center'>
        <h1
          className={`mb-10 ${lobster.className} text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl`}
        >
          My Works
        </h1>

        {projects.map((project, index) => (
          <div
            key={project._id}
            data-project-index={index}
            className='group w-full flex cursor-pointer items-center justify-between gap-6 border-t border-[#004D4D] py-5 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6 transition-all duration-200 last:border-b last:border-[#004D4D] hover:opacity-70'
          >
            <h2
              data-project-index={index}
              className={`m-0 text-normal sm:text-3xl md:text-4xl lg:text-5xl font-normal duration-400 group-hover:-translate-x-3 transition-transform ${
                hoveredIndex === index ? 'text-[#004D4D]' : ''
              }`}
            >
              {project.title}
            </h2>

            {isMobile ? (
              <Link href={`/${project.slug.current}`}>
                <span className="text-[#004D4D] text-base sm:text-lg font-medium flex items-center gap-1">
                  View
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            ) : (
              <p
                data-project-index={index}
                className={`text-lg font-light duration-400 group-hover:translate-x-3 transition-transform ${
                  hoveredIndex === index ? 'text-[#004D4D]' : ''
                }`}
              >
                Design + Development
              </p>
            )}
          </div>
        ))}
      </div>

      {/* MODAL IMAGE PREVIEW (DISABLED ON MOBILE) */}
      {!isMobile && (
        <>
          <motion.div
            ref={modalRef}
            variants={scaleAnimation}
            initial='initial'
            animate={hoveredIndex !== null ? 'enter' : 'closed'}
            className='fixed z-[100] h-[350px] w-[400px] overflow-hidden pointer-events-none flex items-center justify-center rounded-md shadow-lg'
          >
            <div
              className='h-full w-full absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]'
              style={{
                transform: `translateY(-${(hoveredIndex ?? 0) * 350}px)`,
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={project._id}
                  className={`flex h-full w-full items-center justify-center p-12 ${getBgColorClass(
                    i,
                    project.color
                  )}`}
                >
                  <Image
                    src={urlFor(project.mainImage)?.url() || ''}
                    alt={project.title}
                    width={300}
                    height={0}
                    draggable={false}
                    className='object-contain h-full w-full rounded-md'
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* FOLLOWING "VIEW" BUTTON CURSOR */}
          <div
            ref={cursorLabelRef}
            className={`fixed z-[101] transition-opacity duration-200 pointer-events-none select-none ${
              hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {hoveredIndex !== null && projects[hoveredIndex] && (
              <Link
                href={`/${projects[hoveredIndex].slug.current}`}
                className='pointer-events-auto'
              >
                <span className='inline-block px-5 py-7 bg-[#004D4D] rounded-full shadow-lg text-white text-sm font-semibold transition-transform duration-200 hover:scale-105'>
                  view
                </span>
              </Link>
            )}
          </div>
        </>
      )}
    </main>
    <div className='py-15 w-full flex items-center justify-center'>
      <button className='bg-[#004D4D] hover:bg-[#800020] cursor-pointer text-white px-5 py-4 rounded-full font-semibold'>
        See More Work
      </button>
    </div>
    </>
  )
}
