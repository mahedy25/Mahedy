'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return showPreloader ? (
    <Preloader />
  ) : (
    <div className="h-full w-full">
    
      <Header />
      {children}
      <Footer />


    </div>
  )
}
