'use client'

import HeroSection from '@/components/HeroSection'
import Works from '@/components/works'
import Description from '@/components/Description'
import LiveTime from '@/components/LiveTime'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Works />
      <Description />
      <LiveTime />
    </main>
  )
}
