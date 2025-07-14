'use client'

import { useEffect, useRef } from 'react'

export default function ColorBlobBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const colors = ['#ff6ec4', '#7873f5', '#00d4ff', '#7cffcb', '#ffcb57']
    const blobs = Array.from({ length: 15 }).map(() => {
      const radius = Math.random() * 200 + 100
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = 0.5
      ctx.globalCompositeOperation = 'lighter'

      blobs.forEach((blob) => {
        blob.x += blob.vx
        blob.y += blob.vy

        // bounce
        if (blob.x < -blob.radius || blob.x > width + blob.radius) blob.vx *= -1
        if (blob.y < -blob.radius || blob.y > height + blob.radius) blob.vy *= -1

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        )
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className='fixed top-0 left-0 w-full h-full z-[-10] pointer-events-none'
      />
      <div className='fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f172a]/40 via-[#334155]/20 to-[#0f172a]/30 z-[-9] pointer-events-none' />
    </>
  )
}
