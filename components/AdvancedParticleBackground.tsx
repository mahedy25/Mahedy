'use client'

import { useEffect, useRef } from 'react'

export default function AdvancedParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      baseX: number
      baseY: number
    }[] = []

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        baseX: x,
        baseY: y,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        // Parallax pull towards mouse
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const force = Math.min(50 / (dist || 1), 5)

        if (dist < 150) {
          p.x += dx * 0.01 * force
          p.y += dy * 0.01 * force
        } else {
          // restore to base
          p.x += (p.baseX - p.x) * 0.01
          p.y += (p.baseY - p.y) * 0.01
        }

        // Bounce walls
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#00A86B'
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

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className='fixed top-0 left-0 w-full h-full z-[-10] pointer-events-none'
      />
      {/* Gradient Overlay */}
      <div className='fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#000000]/20 via-[#00A86B]/10 to-[#000000]/10 z-[-9] pointer-events-none' />
    </>
  )
}
