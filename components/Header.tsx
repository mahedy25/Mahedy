'use client'

import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import * as React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const pathName = usePathname()
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/works' },
    { name: 'About', href: '/about' },
  ]

  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => setOpen(!open)

  const burgerRef = React.useRef<HTMLButtonElement>(null)

  // Animate burger menu button on scroll
  React.useEffect(() => {
    if (!burgerRef.current) return

    gsap.set(burgerRef.current, { scale: 0 })

    ScrollTrigger.create({
      start: 'top -110',
      onEnter: () =>
        gsap.to(burgerRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'back.out(0.7)',
        }),
      onLeaveBack: () =>
        gsap.to(burgerRef.current, {
          scale: 0,
          duration: 0.3,
          ease: 'back.in(2.7)',
        }),
    })
  }, [])

  return (
    <main>
      {/* Header Section */}
      <div className='flex justify-between items-center py-4'>
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

        {/* Nav Links */}
        <div className='hidden md:flex'>
          {navLinks.map((navLink, i) => {
            const isActive = pathName === navLink.href
            return (
              <motion.a
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.7 + i * 0.1,
                }}
                key={navLink.name}
                href={navLink.href}
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

        {/* Social Media Icons + Burger Menu Button */}
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
          className='hidden md:flex items-center transition-colors duration-300'
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

          {/* Burger Menu Toggle Button */}
          <motion.button
            ref={burgerRef}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className='md:ml-25 ml-[-4] md:mt-10 fixed bg-[#0F0F0F] p-6 rounded-full text-[#DFF6F0] scale-0 z-50 cursor-pointer'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </motion.button>
        </motion.div>

        {/* Mobile Burger Menu Button */}
        <div className='flex md:hidden'>
          <button
            onClick={toggleMenu}
            className='fixed top-4 right-4 z-50 bg-[#0F0F0F] p-4 rounded-full text-[#DFF6F0]'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Burger Menu Overlay */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 100% 0%)' }}
        animate={{
          clipPath: open ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='fixed top-0 right-0 w-full h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center gap-10 text-3xl z-40'
      >
        {/* Burger Menu Links */}
        {navLinks.map((navLink) => {
          const isActive = pathName === navLink.href
          return (
            <Link
              key={navLink.name}
              href={navLink.href}
              onClick={toggleMenu}
              className={`relative font-medium transition-colors duration-300 group ${
                isActive ? 'text-[#00A86B]' : ''
              }`}
            >
              {navLink.name}
              <span
                className={`absolute bottom-0 left-0 h-1 bg-[#00A86B] transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          )
        })}

        {/* Burger Menu Social Icons */}
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
    </main>
  )
}
