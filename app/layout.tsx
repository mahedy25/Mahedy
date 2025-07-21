import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from './ClientLayout'

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
      <body className='bg-[#FFFFFF] text-[#333333]'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
