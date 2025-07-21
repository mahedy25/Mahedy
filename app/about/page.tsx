'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { client } from '../sanity/client'
import { Lobster_Two } from 'next/font/google'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lobster = Lobster_Two({ weight: '400', subsets: ['latin'] })

type Tool = {
  _id: string
  title: string
  image: {
    asset: {
      url: string
    }
  }
}

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const eduLocRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const bgTriangleRef = useRef<SVGSVGElement>(null)
  const [tools, setTools] = useState<Tool[]>([])

  // Fetch tools once
  useEffect(() => {
    const fetchTools = async () => {
      const query = `*[_type == "tools"]{ _id, title, image { asset->{url} } }`
      const data: Tool[] = await client.fetch(query)
      setTools(data)
    }
    fetchTools()
  }, [])

  // Animate main sections (About, Approach, EduLoc, Tools container)
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Initial state to avoid flicker
      gsap.set(
        [
          aboutRef.current,
          approachRef.current,
          eduLocRef.current,
          toolsRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      )

      // About section - fade & slide in immediately
      gsap.to(aboutRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0,
      })

      // Scroll-triggered fade & slide in for other sections
      ;[
        { el: approachRef.current },
        { el: eduLocRef.current },
        { el: toolsRef.current },
      ].forEach(({ el }) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0,
        })
      })

      // Floating background triangle animation
      gsap.to(bgTriangleRef.current, {
        y: 15,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Animate tools after tools data is loaded & rendered
  useEffect(() => {
    if (!toolsRef.current || tools.length === 0) return

    const ctx = gsap.context(() => {
      const toolEls = toolsRef.current!.querySelectorAll('.tool-item')

      // Set initial state
      gsap.set(toolEls, { opacity: 0, y: 20, scale: 0.95 })

      // Animate in with faster, smoother transition
      gsap.to(toolEls, {
        scrollTrigger: {
          trigger: toolsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.04, // Faster stagger
      })
    }, toolsRef)

    return () => ctx.revert()
  }, [tools])

  return (
    <>
      <main
        id='about'
        ref={containerRef}
        className='relative min-h-screen flex items-center justify-center px-4 sm:px-12 lg:px-24 py-20 bg-white'
      >
        {/* Background Triangle */}
        <svg
          ref={bgTriangleRef}
          className='absolute top-20 left-20 w-72 h-72 opacity-10 text-[#800020] z-0'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          fill='currentColor'
          aria-hidden='true'
        >
          <polygon points='0,100 50,0 100,100' />
        </svg>

        {/* Main Content */}
        <section className='relative z-10 max-w-5xl w-full space-y-20'>
          {/* About Section */}
          <div
            ref={aboutRef}
            className='grid md:grid-cols-2 gap-10 items-center'
          >
            <div>
              <h1
                className={`${lobster.className} text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-[#800020]`}
              >
                About Me
              </h1>
              <p className='text-lg sm:text-xl leading-relaxed font-light text-gray-700 mb-4'>
                I’m Mahedy Hasan, a creative full-stack developer based in
                Chattogram, Bangladesh.
              </p>
              <p className='text-lg sm:text-xl leading-relaxed font-light text-gray-700'>
                I specialize in crafting delightful web experiences using
                Next.js, GSAP, Tailwind CSS & More.
              </p>
            </div>

            <div className='flex justify-center'>
              <div className='relative w-[280px] h-[380px] rounded-2xl overflow-hidden shadow-2xl'>
                <Image
                  src='/images/myimage.jpg'
                  alt='Md Mahedy Hasan'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>

          {/* My Approach */}
          <div ref={approachRef}>
            <h2
              className={`${lobster.className} text-4xl sm:text-5xl font-extrabold mb-6 text-[#800020]`}
            >
              My Approach
            </h2>
            <p className='text-lg sm:text-xl leading-relaxed font-light text-gray-700 max-w-3xl'>
              Clean. Performant. Purposeful. I blend structure with creativity,
              ensuring every UI and animation feels intentional and smooth.
            </p>
          </div>

          {/* Education & Location */}
          <div ref={eduLocRef} className='grid md:grid-cols-2 gap-14'>
            <div>
              <h2
                className={`${lobster.className} text-4xl font-extrabold mb-4 text-[#800020]`}
              >
                Education
              </h2>
              <p className='text-lg font-light text-gray-700'>
                BSS in Economics at Uttar Kattali Al-Haj Mostafa Hakim College.
                <br />
                Completed HSC (2022) and SSC (2020).
              </p>
            </div>
            <div>
              <h2
                className={`${lobster.className} text-4xl font-extrabold mb-4 text-[#800020]`}
              >
                Location
              </h2>
              <p className='text-lg font-light text-gray-700'>
                Saraipara, Pahartali, Chattogram, Bangladesh.
              </p>
            </div>
          </div>

          {/* Tools Section */}
          <div ref={toolsRef}>
            <h2
              className={`${lobster.className} text-4xl sm:text-5xl font-extrabold mb-10 text-[#800020]`}
            >
              Tools I Use
            </h2>
            {tools.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center'>
                {tools.map((tool) => (
                  <div
                    key={tool._id}
                    className='tool-item flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg w-full max-w-[140px] aspect-square cursor-default'
                  >
                    <div className='flex flex-col items-center justify-center p-4 text-center'>
                      <Image
                        src={tool.image.asset.url}
                        alt={tool.title}
                        width={48}
                        height={48}
                        className='mb-2'
                      />
                      <span className='text-sm font-medium capitalize text-gray-900'>
                        {tool.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-700'>No tools found.</p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
