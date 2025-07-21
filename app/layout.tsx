// app/layout.tsx
import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import Footer from '@/components/Footer'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Mahedy Hasan',
  description: 'Mahedy Hasan Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased bg-[#FFFFFF] text-[#333333] scroll-smooth `}
      >
        <div className='h-full w-full '>
          <Header />
          
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
