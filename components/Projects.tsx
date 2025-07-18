'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/app/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Variants, motion } from 'framer-motion'
import gsap from 'gsap'

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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const hoveredIndexRef = useRef<number | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)

  const xMoveModal = useRef<gsap.QuickToFunc | null>(null)
  const yMoveModal = useRef<gsap.QuickToFunc | null>(null)
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null)
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null)

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
  }, [])

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-8">
      <div className="z-10 max-w-4xl w-full flex flex-col items-center justify-center">
        <h1 className="headline">
          Projects
        </h1>
        {projects.map((project, index) => (
          <div
            key={project._id}
            data-project-index={index}
            className="group w-full flex cursor-pointer items-center justify-between gap-6 border-t border-[#8B0000] py-10 px-6 transition-all duration-200 last:border-b last:border-[#8B0000] hover:opacity-70"
          >
            <h2
              data-project-index={index}
              className={`m-0 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal duration-400 group-hover:-translate-x-3 transition-transform ${
                hoveredIndex === index ? 'text-[#8B0000]' : ''
              }`}
            >
              {project.title}
            </h2>
            <p
              data-project-index={index}
              className={`text-lg font-light duration-400 group-hover:translate-x-3 transition-transform ${
                hoveredIndex === index ? 'text-[#8B0000]' : ''
              }`}
            >
              Design & Development
            </p>
          </div>
        ))}
      </div>

      {/* MODAL IMAGE CONTAINER */}
      <motion.div
        ref={modalRef}
        variants={scaleAnimation}
        initial="initial"
        animate={hoveredIndex !== null ? 'enter' : 'closed'}
        className="fixed z-[100] h-[350px] w-[400px] overflow-hidden pointer-events-none flex items-center justify-center rounded-md shadow-lg"
      >
        <div
          className="h-full w-full absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(-${(hoveredIndex ?? 0) * 350}px)` }}
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
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* FOLLOWING VIEW BUTTON */}
      <div
        ref={cursorLabelRef}
        className={`fixed z-[101] transition-opacity duration-200 pointer-events-none select-none ${
          hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hoveredIndex !== null && projects[hoveredIndex] && (
          <Link href={`/${projects[hoveredIndex].slug.current}`} className="pointer-events-auto">
            <span className="inline-block px-5 py-7 bg-[#8B0000] rounded-full shadow-lg text-white text-sm font-semibold transition-transform duration-200 hover:scale-105">
              View
            </span>
          </Link>
        )}
      </div>
    </main>
  )
}
