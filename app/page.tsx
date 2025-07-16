

import Header from '../components/Header'
import HeroSection from '@/components/HeroSection'
import LiveTime from '@/components/LiveTime'





export default function Home() {
  return (
    <main className=' sm:px-8 lg:px-12 bg-[#DFF6F0] text-[#333333]'>
      <Header />
      <HeroSection />
    {/* <Projects /> */}
    <LiveTime />
    </main>
  )
}
