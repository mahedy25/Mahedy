'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { client } from '../sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Lobster_Two } from 'next/font/google'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

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

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const elements = gsap.utils.toArray('.project-item')

    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })
  }, [projects])

  return (
    <main
      id='works'
      className='px-4 md:px-8 lg:px-16 py-10 md:py-14 lg:py-20 bg-[#f9f9f9]'
    >
      <h1
        className={`mb-16 ${lobster.className} text-4xl font-bold text-center sm:text-5xl md:text-6xl lg:text-7xl`}
      >
        My Works
      </h1>

      <div ref={containerRef} className='space-y-20'>
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            className={`project-item flex flex-col lg:flex-row items-center gap-8 ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className='relative w-full lg:w-1/2 h-64 sm:h-96 rounded-xl overflow-hidden shadow-lg'>
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                fill
                className='object-cover'
              />
            </div>

            <div className='w-full lg:w-1/2 space-y-4'>
              <h2 className='text-3xl font-bold text-gray-800'>
                {project.title}
              </h2>
              <p className='text-gray-600'>
                Published: {new Date(project.publishedAt).toLocaleDateString()}
              </p>
              <Link
                href={`/${project.slug.current}`}
                className='inline-block px-4 py-2 text-white  rounded-md bg-[#004D4D] hover:bg-[#800020] transition-colors duration-300'
              >
                Peoject Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
