'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { client } from '../sanity/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Lobster_Two } from 'next/font/google'
import Link from 'next/link'
import { LucideLink } from 'lucide-react'
import TransitionCurve from '@/components/TransitionCurve'

gsap.registerPlugin(ScrollTrigger)

const lobster = Lobster_Two({
  weight: '400',
  subsets: ['latin'],
})

type Project = {
  _id: string
  title: string
  slug: { current: string }
  Link: string
  mainImage: SanityImageSource
  publishedAt: string
  color?: string
}

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    client
      .fetch<Project[]>(`
        *[_type == "projects"] | order(publishedAt desc){
          _id, title, slug, mainImage, Link, publishedAt,
          "color": projectColor.hex
        }
      `)
      .then(setProjects)
      .catch(console.error)
  }, [])

  useGSAP(
    () => {
      if (projects.length > 0) {
        gsap.to(mainRef.current, {
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
        })

        gsap.utils.toArray('.project-item').forEach((el) => {
          if (el instanceof HTMLElement) {
            gsap.fromTo(
              el,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  once: true,
                },
              }
            )
          }
        })
      }
    },
    { scope: containerRef, dependencies: [projects.length] }
  )

  return (
    <TransitionCurve>
<main
      id='works'
      ref={mainRef}
      className='opacity-0 px-4 md:px-8 lg:px-16 xl:px-24 py-20 md:py-28 lg:py-36 max-w-7xl mx-auto text-gray-900'
    >
      <section className='mb-16 md:mb-24 text-center'>
        <h1
          className={`${lobster.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-800`}
        >
          My Works
        </h1>
        <p className='mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto'>
          A showcase of my best projects, crafted with precision and passion.
        </p>
      </section>

      <div ref={containerRef} className='space-y-24 md:space-y-32'>
        {projects.map((project) => (
          <div
            key={project._id}
            className='project-item flex flex-col items-center gap-8 lg:gap-16'
          >
            <div className='relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg'>
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                fill
                className='object-contain'
              />
            </div>

            <div className='w-full text-center max-w-3xl mx-auto px-4 space-y-4'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight'>
                {project.title}
              </h2>
              <p className='text-sm text-gray-500'>
                Published on{' '}
                <span className='font-medium text-gray-700'>
                  {new Date(project.publishedAt).toLocaleDateString()}
                </span>
              </p>

              <div className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>
                <Link
                  href={`/${project.slug.current}`}
                  className='px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300'
                >
                  Let’s Go Deeper
                </Link>
                <Link
                  href={project.Link}
                  target='_blank'
                  className='flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg bg-[#004D4D] hover:bg-[#800020] transition-colors duration-300'
                >
                  Visit Live Site
                  <LucideLink className='w-4 h-4' />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
    </TransitionCurve>
  )
}
