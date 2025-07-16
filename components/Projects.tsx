'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import gsap from 'gsap'
import Image from 'next/image'
import { client } from '@/app/sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

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
      return `bg-${projectColor}`;
    }

    switch (index % 4) {
      case 0: return 'bg-black';
      case 1: return 'bg-gray-700';
      case 2: return 'bg-orange-50';
      case 3: return 'bg-neutral-600';
      default: return 'bg-neutral-800';
    }
  };


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [modal, setModal] = useState({ active: false, index: 0 })

  const modalRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorLabelRef = useRef<HTMLDivElement>(null)

  const xMoveModal = useRef<gsap.QuickToFunc | null>(null);
  const yMoveModal = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);


  useEffect(() => {
    if (modalRef.current && cursorRef.current && cursorLabelRef.current) {
      xMoveModal.current = gsap.quickTo(modalRef.current, 'left', { duration: 0.8, ease: 'power3' });
      yMoveModal.current = gsap.quickTo(modalRef.current, 'top', { duration: 0.8, ease: 'power3' });
      xMoveCursor.current = gsap.quickTo(cursorRef.current, 'left', { duration: 0.5, ease: 'power3' });
      yMoveCursor.current = gsap.quickTo(cursorRef.current, 'top', { duration: 0.5, ease: 'power3' });
      xMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current, 'left', { duration: 0.45, ease: 'power3' });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabelRef.current, 'top', { duration: 0.45, ease: 'power3' });
    }

    const onMouseMove = (e: MouseEvent) => {
      xMoveModal.current?.(e.pageX);
      yMoveModal.current?.(e.pageY);
      xMoveCursor.current?.(e.pageX);
      yMoveCursor.current?.(e.pageY);
      xMoveCursorLabel.current?.(e.pageX);
      yMoveCursorLabel.current?.(e.pageY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    client
      .fetch<Project[]>(`*[_type == "projects"] | order(publishedAt desc){
        _id, title, slug, mainImage, publishedAt,
        "color": projectColor.hex
      }`)
      .then(setProjects)
      .catch(console.error)
  }, [])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="z-10 w-300 flex flex-col items-center justify-center">
        {projects.map((project, index) => (
          <div
            key={project._id}
            onMouseEnter={() => setModal({ active: true, index })}
            onMouseLeave={() => setModal({ active: false, index })}
            className="group w-full flex cursor-pointer items-center justify-between gap-4 border-t border-[#990000] py-10 px-10 transition-all duration-200 last:border-b last:border-[#990000] hover:opacity-50"
          >
            <h2 className="m-0 text-xl sm:text-3xl md:text-4xl lg:text-6xl font-normal transition-transform duration-400 group-hover:-translate-x-3">
              {project.title}
            </h2>
            <p className="font-light transition-transform duration-400 group-hover:translate-x-3">
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
        // THIS IS THE CRITICAL CHANGE: Remove && sectionActive
        animate={modal.active ? 'enter' : 'closed'}
        className="fixed z-[100] h-[350px] w-[400px] overflow-hidden pointer-events-none flex items-center justify-center rounded-md"
        style={{ top: 0, left: 0 }}
      >
        <div
          className="h-full w-full absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(-${modal.index * 350}px)` }}
        >
          {projects.map((project, i) => (
            <div
              key={project._id}
              className={`flex h-full w-full items-center justify-center ${getBgColorClass(i, project.color)}`}
            >
              <Image
                src={urlFor(project.mainImage)?.url() || ''}
                alt={project.title}
                width={300}
                height={0}
                draggable={false}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* CURSOR CIRCLE */}
      <motion.div
        ref={cursorRef}
        variants={scaleAnimation}
        initial="initial"
        // THIS IS THE CRITICAL CHANGE: Remove && sectionActive
        animate={modal.active ? 'enter' : 'closed'}
        className="fixed z-[9999] flex h-20 w-20 items-center justify-center rounded-full bg-[#455CE9] pointer-events-none"
        style={{ top: 0, left: 0 }}
      ></motion.div>

      {/* CURSOR LABEL ("View") */}
      <motion.div
        ref={cursorLabelRef}
        variants={scaleAnimation}
        initial="initial"
        // THIS IS THE CRITICAL CHANGE: Remove && sectionActive
        animate={modal.active ? 'enter' : 'closed'}
        className="fixed z-[9999] flex h-20 w-20 items-center justify-center rounded-full bg-transparent text-sm font-light text-white pointer-events-none"
        style={{ top: 0, left: 0 }}
      >
        View
      </motion.div>
    </main>
  )
}