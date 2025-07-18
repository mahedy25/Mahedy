


import HeroSection from '@/components/HeroSection'
import Header from '../components/Header'

import LiveTime from '@/components/LiveTime'
import Projects from '@/components/Projects'





export default function Home() {
  return (
    <main className=' sm:px-8 lg:px-12  text-[#333333]'>
      <Header />
      <HeroSection />
     <Projects />
    <LiveTime />
    
    </main>
  )
}
