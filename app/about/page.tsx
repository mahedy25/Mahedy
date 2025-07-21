'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { client } from '../sanity/client'
import { Lobster_Two } from 'next/font/google'

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
  const [tools, setTools] = useState<Tool[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchTools = async () => {
      const query = `*[_type == "tools"]{ _id, title, image { asset->{url} } }`
      const data: Tool[] = await client.fetch(query)
      setTools(data)
      setIsLoaded(true)
    }
    fetchTools()
  }, [])

  useGSAP(
    () => {
      if (!containerRef.current) return
      const ctx = gsap.context(() => {
        const fadeSlides = gsap.utils.toArray('.fade-slide')
        fadeSlides.forEach((el) => {
          gsap.fromTo(
            el as HTMLElement,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                once: true,
              },
            }
          )
        })
      }, containerRef)

      return () => ctx.revert()
    },
    { dependencies: [isLoaded], scope: containerRef }
  )

  return (
    <main
      id='about'
      ref={containerRef}
      className='relative min-h-screen flex items-center justify-center px-4 sm:px-12 lg:px-24 py-20 overflow-hidden bg-opacity-80 backdrop-blur-md rounded-3xl'
    >
      {/* Background Huge Triangle */}
      <svg
        className='absolute top-20 left-20 w-72 h-72 opacity-10 text-[#800020] z-0 pointer-events-none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        fill='currentColor'
        aria-hidden='true'
      >
        <polygon points='0,100 50,0 100,100' />
      </svg>

      {/* Main Content */}
      <section className='relative z-10 max-w-4xl w-full space-y-20'>
        {/* About Me Section */}
        <div className='grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <h1
              className={`fade-slide ${lobster.className} text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 text-[#800020]`}
            >
              About Me
            </h1>
            <p className='fade-slide text-lg sm:text-xl leading-relaxed font-light text-gray-700 mb-4'>
              I’m Mahedy Hasan, a creative full-stack developer based in
              Chattogram, Bangladesh.
            </p>
            <p className='fade-slide text-lg sm:text-xl leading-relaxed font-light text-gray-700'>
              I specialize in crafting delightful web experiences using Next.js,
              GSAP, Tailwind CSS & More.
            </p>
          </div>

          <div className='flex justify-center'>
            <div className='relative w-[280px] h-[380px] rounded-2xl overflow-hidden shadow-2xl fade-slide'>
              <Image
                src='/images/myimage.jpg'
                alt='Md Mahedy Hasan'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>

        {/* My Approach Section */}
        <div>
          <h2
            className={`fade-slide ${lobster.className} text-4xl sm:text-5xl font-extrabold mb-6 text-[#800020]`}
          >
            My Approach
          </h2>
          <p className='fade-slide text-lg sm:text-xl leading-relaxed font-light text-gray-700 max-w-3xl'>
            Clean. Performant. Purposeful. I blend structure with creativity,
            ensuring every UI and animation feels intentional and smooth.
          </p>
        </div>

        {/* Education & Location */}
        <div className='grid md:grid-cols-2 gap-14'>
          <div>
            <h2
              className={`fade-slide ${lobster.className} text-4xl font-extrabold mb-4 text-[#800020]`}
            >
              Education
            </h2>
            <p className='fade-slide text-lg font-light text-gray-700'>
              BSS in Economics at Uttar Kattali Al-Haj Mostafa Hakim College.
              <br />
              Completed HSC (2022) and SSC (2020).
            </p>
          </div>
          <div>
            <h2
              className={`fade-slide ${lobster.className} text-4xl font-extrabold mb-4 text-[#800020]`}
            >
              Location
            </h2>
            <p className='fade-slide text-lg font-light text-gray-700'>
              Saraipara, Pahartali, Chattogram, Bangladesh.
            </p>
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h2
            className={`fade-slide ${lobster.className} text-4xl sm:text-5xl font-extrabold mb-10 text-[#800020]`}
          >
            Tools I Use
          </h2>

          {tools.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
              {tools.map((tool) => (
                <div
                  key={tool._id}
                  className='fade-slide relative flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg w-[140px] h-[140px]'
                >
                  {/* Gradient border */}
                  <div className='absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),#ff0080,#7928ca,#2afadf,#00f0ff,#ff0080)] p-[2px] animate-spin-slower z-0' />
                  <div className='relative z-10 bg-white w-full h-full flex flex-col items-center justify-center rounded-[inherit]'>
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
            <p className='fade-slide text-gray-700'>No tools found.</p>
          )}
        </div>
      </section>
    </main>
  )
}
