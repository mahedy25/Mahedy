'use client'

import TransitionCurve from '@/components/TransitionCurve'
import HeroSection from '@/components/HeroSection'
import Works from '@/components/works'
import Description from '@/components/Description'
import LiveTime from '@/components/LiveTime'

export default function Home() {
  return (
    <TransitionCurve backgroundColor="#004D4D">
      <main>
        <HeroSection />
        <Works />
        <Description />
        <LiveTime />
      </main>
    </TransitionCurve>
  )
}
