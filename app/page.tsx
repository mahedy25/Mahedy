import Hero from '@/components/Hero'
import Header from '../components/Header'





export default function Home() {
  return (
    <main className='px-4 md:px-8 lg:px-12 bg-[#DFF6F0] text-[#333333]'>
      <Header />
      <Hero />
    {/* <Projects /> */}
    </main>
  )
}
