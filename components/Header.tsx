'use client'

import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const pathName = usePathname()
  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => setOpen((prev) => !prev)
  const burgerRef = React.useRef<HTMLButtonElement>(null)


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/works' },
    { name: 'About', href: '/about' },
  ]

  // GSAP: Show desktop burger button on scroll
  useGSAP(() => {
    if (!burgerRef.current) return

    gsap.set(burgerRef.current, { scale: 0, visibility: 'hidden' })

    ScrollTrigger.create({
      start: 'top -110',
      onEnter: () =>
        gsap.to(burgerRef.current, {
          scale: 1,
          visibility: 'visible',
          duration: 0.3,
          ease: 'back.out(0.7)',
        }),
      onLeaveBack: () =>
        gsap.to(burgerRef.current, {
          scale: 0,
          visibility: 'hidden',
          duration: 0.3,
          ease: 'back.in(2.7)',
        }),
    })
  }, [])

  
  return (
    <main>
      {/* Header Section */}
      <div className='flex justify-between items-center py-4 px-4 md:px-8 '>
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
        >
          <Logo />
        </motion.div>

        {/* Nav Links (Desktop) */}
        <div className='hidden md:flex'>
          {navLinks.map((navLink, i) => {
            const isActive = pathName === navLink.href
            return (
              <motion.a
                key={navLink.name}
                href={navLink.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.7 + i * 0.1,
                }}
                className={`mx-5 relative font-medium transition-colors duration-300 group ${
                  isActive ? 'text-[#00A86B]' : ''
                }`}
              >
                {navLink.name}
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-[#00A86B] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </motion.a>
            )
          })}
        </div>

        {/* Social Icons + Desktop Burger Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            delay: 1.5,
            duration: 2,
          }}
          className='hidden md:flex items-center transition-colors  duration-300'
        >
          <Link href='https://github.com/mahedy25'>
            <Github className='w-6 h-6 mx-2 hover:text-[#00A86B]' />
          </Link>
          <Link href='https://linkedin.com'>
            <Linkedin className='w-6 h-6 mx-2 hover:text-[#00A86B]' />
          </Link>
          <Link href='https://facebook.com'>
            <Facebook className='w-6 h-6 mx-2 hover:text-[#00A86B]' />
          </Link>
          <Link href='https://instagram.com'>
            <Instagram className='w-6 h-6 mx-2 hover:text-[#00A86B]' />
          </Link>

          <motion.button
            ref={burgerRef}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className='fixed md:ml-25 md:mt-10  right-6 bg-[#0F0F0F] hover:bg-[#00A86B] p-6 rounded-full text-[#DFF6F0] transition-colors duration-300 invisible scale-0 z-50 cursor-pointer'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </motion.button>
        </motion.div>

        {/* Mobile Burger Button */}
        <div className='flex md:hidden'>
          <button
            onClick={toggleMenu}
            className='fixed top-4 right-4 z-50 bg-[#0F0F0F] hover:bg-[#00A86B] p-4 rounded-full text-[#DFF6F0]'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='sidebar'
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 right-0 w-full md:w-[40%] h-screen bg-[#0F0F0F]  text-white flex flex-col items-center justify-center gap-10 text-6xl z-40'
          >
            {navLinks.map((navLink) => {
              const isActive = pathName === navLink.href
              return (
               
                
                  <Link
                    key={navLink.name}
                    href={navLink.href}
                    onClick={toggleMenu}
                    className={`relative font-medium transition-colors hover:text-[#00A868] duration-300  group ${
                      isActive ? 'text-[#00A86B]' : ''
                    }`}
                  >
                    {navLink.name}
                  </Link>
               
              )
            })}

            <div className='pt-8 border-t-2 border-white w-50 flex justify-center gap-6'>
              <Link href='https://github.com/mahedy25'>
                <Github className='w-6 h-6 hover:text-[#00A86B]' />
              </Link>
              <Link href='https://linkedin.com'>
                <Linkedin className='w-6 h-6 hover:text-[#00A86B]' />
              </Link>
              <Link href='https://facebook.com'>
                <Facebook className='w-6 h-6 hover:text-[#00A86B]' />
              </Link>
              <Link href='https://instagram.com'>
                <Instagram className='w-6 h-6 hover:text-[#00A86B]' />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
