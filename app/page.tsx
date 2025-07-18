'use client' // This is required if you use any client-side hooks in your other components

import HeroSection from '@/components/HeroSection'
import Header from '../components/Header'
import LiveTime from '@/components/LiveTime'
import Works from '@/components/works'
import ServiceSummary from '@/components/ServiceSummary'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServiceSummary />
      <Works />
      <LiveTime />
    </main>
  )
}
