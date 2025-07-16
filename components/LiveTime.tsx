'use client'

import { useEffect, useState } from 'react'
import { Lobster } from 'next/font/google'

const lobster = Lobster({ 
  weight: '400', 
  subsets: ['latin'] 
})

export default function LiveTime() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      // Convert to Bangladesh Standard Time (UTC+6)
      const bangladeshTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))
      const formatted = bangladeshTime.toLocaleTimeString()
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    
    <div className={` hidden fixed md:block bottom-4 right-7 bg-white text-black font-semibold ${lobster.className} px-3 py-1 rounded shadow  z-99`}>
      Bangladesh - {time}
    </div>

  )
}
