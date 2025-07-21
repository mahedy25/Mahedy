'use client'

import { Separator } from '@radix-ui/react-separator'
import { LinkedinIcon } from '@sanity/icons'
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
} from 'lucide-react'
import Link from 'next/link'

export default function FooterClient() {
  return (
    <main className="mt-24 md:mt-32 border-t border-gray-200 bg-white/70 backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
        <Separator className="my-6 sm:my-8 bg-gray-300 opacity-40" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between text-gray-700 py-10">
          <div className="text-center lg:text-left text-sm sm:text-base font-medium tracking-tight">
            &copy; 2025{' '}
            <Link
              href="/"
              className="hover:text-[#800020] transition-colors duration-200"
            >
              Mahedy Hasan
            </Link>{' '}
            · All rights reserved.
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="https://github.com/mahedy25"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mahedy-hasan-890591365/"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="https://www.facebook.com/mahedyhasan253"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-200"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/mahedy_25/"
              target="_blank"
              className="hover:text-[#800020] transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
