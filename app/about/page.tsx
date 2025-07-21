'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { client } from '../sanity/client'

gsap.registerPlugin(ScrollTrigger)

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
  const aboutRef = useRef(null)
  const approachRef = useRef(null)
  const eduRef = useRef(null)
  const toolsRef = useRef(null)
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    const sections = [aboutRef, approachRef, eduRef, toolsRef]

    sections.forEach((ref, i) => {
      if (!ref.current) return
      const direction = i % 2 === 0 ? 100 : -100

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: direction },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reset',
          },
        }
      )
    })

    const fetchTools = async () => {
      const query = `*[_type == "tools"]{ _id, title, image { asset->{url} } }`
      const data: Tool[] = await client.fetch(query)
      setTools(data)
    }

    fetchTools()
  }, [])

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans py-24 px-4 md:px-12">
      <div className="max-w-screen-xl mx-auto space-y-32">
        {/* About Me Section */}
        <section
          ref={aboutRef}
          className="flex flex-col md:flex-row items-center justify-between gap-16"
        >
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
              I’m <strong>Md Mahedy Hasan</strong>, a passionate full-stack web developer
              from Chattogram, Bangladesh. I craft high-performance, accessible digital
              experiences using <strong>Next.js</strong>, <strong>GSAP</strong>, and{' '}
              <strong>Tailwind CSS</strong>. My goal is to build web interfaces that are
              not only fast—but delightful.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/heroBG.png"
              alt="Md Mahedy Hasan"
              width={350}
              height={350}
              className="rounded-2xl shadow-2xl object-conitain "
            />
          </div>
        </section>

        {/* My Approach */}
        <section ref={approachRef} className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-bold tracking-tight">My Approach</h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto md:mx-0">
            I believe in <strong>clarity</strong>, <strong>simplicity</strong>, and{' '}
            <strong>impact</strong>. I write clean, maintainable code and follow a
            mobile-first, performance-oriented mindset. Every animation, layout, and
            transition is crafted to offer a smooth and meaningful user experience.
          </p>
        </section>

        {/* Education & Location */}
        <section ref={eduRef} className="space-y-10 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Education</h2>
            <p className="text-lg md:text-xl text-neutral-700">
              Studying BSS in Economics at Uttar Kattali Al-Haj Mostafa Hakim College.
              Completed HSC in 2022 and SSC in 2020 (Science).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Current Location</h2>
            <p className="text-lg md:text-xl text-neutral-700">
              Living in Saraipara, Pahartali, Chattogram, Bangladesh.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section ref={toolsRef} className="space-y-10">
          <h2 className="text-4xl font-bold tracking-tight text-center md:text-left">
            Tools I Use
          </h2>

          {tools.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {tools.map((tool) => (
                <div
                  key={tool._id}
                  className="flex flex-col items-center justify-center rounded-xl p-4 shadow-md bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Image
                    src={tool.image.asset.url}
                    alt={tool.title}
                    width={48}
                    height={48}
                    className="mb-3"
                  />
                  <span className="text-base font-medium capitalize text-neutral-800">
                    {tool.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-600">No tools found.</p>
          )}
        </section>
      </div>
    </div>
  )
}
