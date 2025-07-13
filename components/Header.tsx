'use client'

import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathName = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Works', href: '/works' },
  ]

  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => setOpen(!open)

  return (
    <main>
      <div className='flex justify-between items-center  py-4'>
        <div>
          <Logo />
        </div>

        {/* navlinks - dekstop */}
        <div className='hidden md:flex'>
          {navLinks.map((navLink) => {
            // ✅ Define isActive inside the map function
            const isActive = pathName === navLink.href

            return (
              <Link
                key={navLink.name}
                href={navLink.href}
                className={`mx-5 relative font-medium transition-colors duration-300 group ${
                  isActive ? 'text-[#00A86B]' : ''
                }`}
              >
                {navLink.name}
                <span
                  className={`absolute  bottom-0 left-0 h-1 bg-[#00A86B] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            )
          })}
        </div>

        {/* Socail Media Icons */}
        <div className=' hidden md:flex transition-colors duration-300'>
          <Link href={'https://github.com/mahedy25'}>
            <Github className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>

          <Link href={'https://github.com/mahedy25'}>
            <Linkedin className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>

          <Link href={'https://github.com/mahedy25'}>
            <Facebook className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>

          <Link href={'https://github.com/mahedy25'}>
            <Instagram className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>
        </div>

        <div className='md:hidden flex items-center justify-center z-99'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className='bg-[#0F0F0F] p-3 rounded-full text-[#DFF6F0] '
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6 ' />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: open ? 1 : 0, x: open ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='md:hidden fixed top-0 right-0 w-full h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center gap-15 text-3xl z-50'
      >
        {navLinks.map((navLink) => {
          const isActive = pathName === navLink.href

          return (
            <Link
              onClick={toggleMenu}
              key={navLink.name}
              href={navLink.href}
              className={`mx-5 relative font-medium transition-colors duration-300 group ${
                isActive ? 'text-[#00A86B]' : ''
              }`}
            >
              {navLink.name}
              <span
                className={`absolute top-[40] bottom-0 left-0 h-1 bg-[#00A86B] transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          )
        })}
        
        <div className=' border-t-2 '>
          <div className='flex flex-row pt-4'>
            
            <Link href={'https://github.com/mahedy25'}>
            <Github className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>

          <Link href={'https://github.com/mahedy25'}>
            <Linkedin className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>

          <Link href={'https://github.com/mahedy25'}>
            <Facebook className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>

          <Link href={'https://github.com/mahedy25'}>
            <Instagram className='w-6 h-6 mx-4 hover:text-[#00A86B]' />
          </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
