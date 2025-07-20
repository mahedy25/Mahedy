'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Separator } from '@radix-ui/react-separator'
import { LinkedinIcon } from '@sanity/icons'
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
} from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!footerRef.current) return

    gsap.fromTo(
      footerRef.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <footer
      ref={footerRef}
      className="mt-24 md:mt-32 border-t border-gray-200 bg-white/70 backdrop-blur-lg transition-opacity duration-500 opacity-0"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <Separator className="my-6 sm:my-8 bg-gray-300 opacity-40" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between text-gray-700 py-10">
          {/* Left: Copyright */}
          <div className="text-center lg:text-left text-sm sm:text-base font-medium tracking-tight">
            &copy; 2025{' '}
            <Link
              href="/"
              className="hover:text-[#800020] transition-colors duration-300"
            >
              Mahedy Hasan
            </Link>{' '}
            · All rights reserved.
          </div>

          {/* Right: Social Icons */}
          <div className="flex justify-center gap-4">
            <Link
              href="https://github.com/mahedy25"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-300"
              aria-label="Visit my GitHub profile"
            >
              <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/mahedy-hasan-890591365/"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-300"
              aria-label="Visit my LinkedIn profile"
            >
              <LinkedinIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            <Link
              href="https://www.facebook.com/mahedyhasan253"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-300"
              aria-label="Visit my Facebook profile"
            >
              <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            <Link
              href="https://www.instagram.com/mahedy_25/"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-300"
              aria-label="Visit my Instagram profile"
            >
              <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
