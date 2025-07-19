'use client'

import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function Header() {
  const pathName = usePathname()
  const [open, setOpen] = React.useState(false)
  const toggleMenu = () => setOpen((prev) => !prev)

  const linkRefs = React.useRef<(HTMLAnchorElement | null)[]>([])
  const sidebarRef = React.useRef(null)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'My Work', href: '#works' },
    { name: 'About Me', href: '/about' },
  ]

  React.useEffect(() => {
    if (!open || typeof window === 'undefined' || window.innerWidth < 768) return

    if (linkRefs.current.length > 0) {
      gsap.from(linkRefs.current, {
        x: 50,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out',
        duration: 0.5,
      })
    }
  }, [open])

  return (
    <main className='bg-[#9CA3AF] '>
      {/* Header Section */}
      <div className='flex justify-between items-center py-4 px-4 md:px-8 lg:px-16'>
        {/* Logo */}
        <Logo />

        {/* Desktop Nav Links Removed */}
        <div className='hidden md:flex'></div>

        {/* Burger Button (Desktop) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className='ml-4 fixed top-4 right-8 bg-[#004D4D] hover:bg-[#800020] p-6 rounded-full text-[#DFF6F0] transition-colors duration-300 z-50 cursor-pointer hidden md:flex'
        >
          {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </motion.button>

        {/* Mobile Burger Button */}
        <div className='flex md:hidden'>
          <button
            onClick={toggleMenu}
            className='fixed top-4 right-4 z-50 bg-[#0F0F0F] hover:bg-[#004D4D] p-4 rounded-full text-[#DFF6F0]'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='sidebar'
            ref={sidebarRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 right-0 w-full md:w-[40%] h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center gap-10 md:text-5xl text-2xl font-semibold z-40 tracking-widest'
          >
            {navLinks.map((navLink, index) => {
              const isActive = pathName === navLink.href
              return (
                <Link
                  key={navLink.name}
                  href={navLink.href}
                  onClick={toggleMenu}
                  ref={((el) => {
                    linkRefs.current[index] = el
                  }) as React.RefCallback<HTMLAnchorElement>}
                  className={`uppercase transition-colors duration-300 hover:text-[#004D4D] ${
                    isActive ? 'text-[#004D4D]' : ''
                  }`}
                >
                  {navLink.name}
                </Link>
              )
            })}

            {/* Sidebar Social Icons */}
            <div className='pt-8 border-t-2 border-white w-50 flex justify-center gap-6'>
              {[
                {
                  href: 'https://github.com/mahedy25',
                  icon: <Github className='w-6 h-6 hover:text-[#004D4D]' />,
                  delay: 0.7,
                  label: 'GitHub',
                },
                {
                  href: 'https://linkedin.com',
                  icon: <Linkedin className='w-6 h-6 hover:text-[#004D4D]' />,
                  delay: 0.8,
                  label: 'LinkedIn',
                },
                {
                  href: 'https://facebook.com',
                  icon: <Facebook className='w-6 h-6 hover:text-[#004D4D]' />,
                  delay: 0.9,
                  label: 'Facebook',
                },
                {
                  href: 'https://instagram.com',
                  icon: <Instagram className='w-6 h-6 hover:text-[#004D4D]' />,
                  delay: 1,
                  label: 'Instagram',
                },
              ].map(({ href, icon, delay, label }, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    delay,
                    duration: 1.2,
                  }}
                >
                  <Link href={href} aria-label={`Follow on ${label}`}>
                    {icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
