import Hero from '@/components/Hero'
import Header from '../components/Header'
import CustomCursor from '@/components/customCursor'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main className='px-4 sm:px-8 lg:px-12  '>
      <Header />
      <Hero />
      <CustomCursor />
      <Projects />
    </main>
  )
}
