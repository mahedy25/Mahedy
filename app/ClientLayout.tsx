'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import TransitionCurve from '@/components/TransitionCurve'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showPreloader, setShowPreloader] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showPreloader) return <Preloader />

  return (
    <div className='min-h-screen w-full bg-[#FFFFFF] text-[#333333] overflow-x-hidden'>
      <Header />

      <AnimatePresence mode='wait'>
        <TransitionCurve key={pathname}>{children}</TransitionCurve>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
