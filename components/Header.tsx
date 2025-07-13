'use client'

import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathName = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/works' },
    { name: 'About', href: '/about' },
  ]

  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => setOpen(!open)

  useEffect(() => {
    const html = document.documentElement

    if (open) {
      html.classList.add('overflow-hidden')
    } else {
      html.classList.remove('overflow-hidden')
    }

    return () => {
      html.classList.remove('overflow-hidden')
    }
  }, [open])

  return (
    <main className='z-50'>
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

        {/* Nav Links - Desktop */}
        <div className='hidden md:flex'>
          {navLinks.map((navLink) => {
            const isActive = pathName === navLink.href
            return (
              <motion.a
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.7 + navLinks.indexOf(navLink) * 0.1,
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

        {/* Social Media Icons - Desktop */}
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
        className='hidden md:flex transition-colors duration-300'>
          <Link href='https://github.com/mahedy25'>
            <Github className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>
          <Link href='https://linkedin.com'>
            <Linkedin className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>
          <Link href='https://facebook.com'>
            <Facebook className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>
          <Link href='https://instagram.com'>
            <Instagram className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle Button */}
        <div className='md:hidden fixed top-4 right-4 items-center justify-center z-50'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className='bg-[#0F0F0F] p-3 rounded-full text-[#DFF6F0]'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: open ? 1 : 0, x: open ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='md:hidden fixed top-0 right-0 w-full h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center gap-10 text-3xl z-40'
      >
        {/* Nav Links - Mobile */}
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

        {/* Social Media Icons - Mobile */}
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
