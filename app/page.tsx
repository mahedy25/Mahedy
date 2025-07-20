'use client' // This is required if you use any client-side hooks in your other components

import HeroSection from '@/components/HeroSection'
import LiveTime from '@/components/LiveTime'
import Works from '@/components/works'
import Description from '@/components/Description'


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
