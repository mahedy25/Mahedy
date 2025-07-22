'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Lobster_Two } from 'next/font/google'
import {
  MailIcon,
  PhoneIcon,
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from 'lucide-react'
import Link from 'next/link'

const lobster = Lobster_Two({ weight: '400', subsets: ['latin'] })

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-slide',
        { y: 40, autoAlpha: 0, ease: 'power3.out' },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main
      id='contact'
      ref={containerRef}
      className='relative min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24 py-20 overflow-hidden'
    >
      {/* Background Huge Circle */}
      <svg
        className='absolute rotate-45 -top-20 -left-20 w-72 h-72 opacity-10 text-[#800020]'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 100 100'
        aria-hidden='true'
      >
        <circle cx='50' cy='50' r='50' />
      </svg>

      <section className='relative z-10 max-w-3xl w-full bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-12 shadow-lg text-gray-800'>
        {/* Heading */}
        <h1
          className={`fade-slide ${lobster.className} text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight text-center sm:text-left mb-6 text-[#800020]`}
        >
          Get in Touch
        </h1>

        {/* Underline accent */}
        <div className='fade-slide w-24 h-1 bg-[#800020] rounded-full mb-12 mx-auto sm:mx-0 shadow-sm' />

        {/* Description */}
        <p className='fade-slide text-lg sm:text-xl max-w-xl mb-16 leading-relaxed text-center sm:text-left font-light tracking-wide'>
          Whether you want to say hello, discuss a project, or collaborate, I’m
          just an email or phone call away. I’m here to help bring your ideas to
          life with clean, beautiful design and code.
        </p>

        {/* Contact Info */}
        <div className='fade-slide flex flex-col gap-6 justify-center sm:justify-start mb-12 border-t border-gray-300 pt-8'>
          {/* Email */}
          <div className='flex items-center gap-5 border-b border-gray-300 pb-6 sm:border-b-0 sm:pb-0'>
            <MailIcon className='w-8 h-8 text-[#800020]' />
            <Link
              href='mailto:mahedy200213@gmail.com'
              className='text-sm sm:text-lg md:text-xl font-semibold hover:text-[#b22222] transition-all duration-300 tracking-wide'
            >
              mahedy200213@gmail.com
            </Link>
          </div>

          {/* Phone */}
          <div className='flex items-center gap-5'>
            <PhoneIcon className='w-8 h-8 text-[#800020]' />
            <a
              href='tel:+8801602450413'
              className='text-sm sm:text-lg md:text-xl font-semibold hover:text-[#b22222] transition-all duration-300 tracking-wide'
            >
              (+880) 01602450413
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className='fade-slide flex justify-center sm:justify-start gap-8 text-gray-600'>
          {[
            { Icon: GithubIcon, href: 'https://github.com/mahedy25' },
            {
              Icon: LinkedinIcon,
              href: 'https://www.linkedin.com/in/mahedy-hasan-890591365/',
            },
            {
              Icon: FacebookIcon,
              href: 'https://www.facebook.com/mahedyhasan253',
            },
            {
              Icon: InstagramIcon,
              href: 'https://www.instagram.com/mahedy_25/',
            },
          ].map(({ Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              target='_blank'
              className='group inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-[#800020] hover:text-[#004D4D] transition-transform duration-300 transform'
              aria-label={`Visit my ${Icon.displayName || 'social'} page`}
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backfaceVisibility: 'hidden',
              }}
            >
              <Icon
                className='w-9 h-7'
                style={{ shapeRendering: 'geometricPrecision' }}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
