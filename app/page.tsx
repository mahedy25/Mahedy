import HeroSection from '@/components/HeroSection'
import Header from '../components/Header'

import LiveTime from '@/components/LiveTime'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main className=''>
      <Header />
      <HeroSection />
     <Projects />
    <LiveTime />
    
    </main>
  )
}
