// components/Logo.tsx
'use client'
import Link from 'next/link'

import { Lobster } from 'next/font/google'

const lobster = Lobster({
  variable: '--font-lobster',
  subsets: ['latin'],
  weight: ['400'],
})





export default function Logo() {
  return (
    <div>
      <Link href="/">
        <h1 className={`${lobster.className} text-2xl hover:text-[#00A86B] transition-colors duration-300}`}>Mahedy Hasan</h1>
      </Link>
    </div>
  )
}

