'use client'

import Link from 'next/link'
import Logo from './Logo'
import { motion } from 'framer-motion'
import { Facebook, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import React from 'react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => setOpen(!open)

  return (
    <header className='w-full fixed top-0 left-0 z-50 shadow-md px-6 py-4'>
      {' '}
      {/* ✅ fixed z-50 and added bg */}
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Logo />

        <ul className='hidden md:flex space-x-8'>
          {navLinks.map((link) => (
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                mass: 0.5,
                damping: 20,
                delay: 0.7 + navLinks.indexOf(link) * 0.2,
              }}
              key={link.name}
              className='relative group'
            >
              <Link
                href={link.href}
                className='text-[#F8FAFC] font-medium transition-colors duration-300 hover:text-[#00FFFF]'
              >
                {link.name}
                {/* ✅ Underline Animation */}
                <span className='absolute left-0 -bottom-2 w-0 h-[4px] bg-[#FF073A]  transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* social icons */}

        <div className='md:flex hidden items-center space-x-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <Link
              className='text-[#00FFFF] hover:text-[#FF073A] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Github className='h-6 w-6' />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <Link
              className='text-[#00FFFF] hover:text-[#FF073A] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Facebook className='h-6 w-6' />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <Link
              className='text-[#00FFFF] hover:text-[#FF073A] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Instagram className='h-6 w-6' />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <Link
              className='text-[#00FFFF] hover:text-[#FF073A] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Linkedin className='h-6 w-6' />
            </Link>
          </motion.div>
        </div>

        {/* contact me button 

          <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 2, 
            duration: 0.8,
            type: 'spring',
            stiffness: 200,
            mass: 0.5,
            damping: 20, 
          }}
          >
            <Button>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </motion.div>
          */}

        {/* mobile menu */}
        <div className='md:hidden flex items-center'>
          <motion.button whileTap={{ scale: 0.9 }} onClick={toggleMenu}>
            {open ? <X className='w-8 h-8' /> : <Menu className='w-8 h-8' />}
          </motion.button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: open ? 1 : 0,
          height: open ? 'auto' : 0,
        }}
        transition={{ duration: 0.5 }}
        className='md:hidden overflow-hidden bg-[#00FFFF] shadow-lg px-4 py-5 space-y-5 mt-5 text-center'
      >
        <nav className='flex flex-col space-y-3 '>
          {navLinks.map((link) => (
            <Link
              onClick={toggleMenu}
              key={link.name}
              href={link.href}
              className='text-[#0F0F0F] text-xl font-medium hover:text-[#FF073A] py-2 transition-colors duration-300'
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className='pt-4 border-t border-[#0F0F0F]'>
          <div className='flex justify-center space-x-5 '>
            <Link
              className='text-[#0F0F0F] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Github className='h-6 w-6' />
            </Link>

            <Link
              className='text-[#0F0F0F] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Facebook className='h-6 w-6' />
            </Link>

            <Link
              className='text-[#0F0F0F] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Instagram className='h-6 w-6' />
            </Link>

            <Link
              className='text-[#0F0F0F] transition-colors duration-300'
              href={'https://github.com/mahedy25'}
            >
              <Linkedin className='h-6 w-6' />
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
