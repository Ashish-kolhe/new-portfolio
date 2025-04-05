"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const particles: Particle[] = []
    // Reduce particle count for better performance
    const particleCount = Math.min(50, Math.floor((rect.width * rect.height) / 15000))
    const maxDistance = 120

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number

      constructor() {
        this.x = Math.random() * rect.width
        this.y = Math.random() * rect.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = `hsla(${Math.random() * 60 + 240}, 70%, 60%, ${Math.random() * 0.3 + 0.1})`
      }

      update(mouseX: number, mouseY: number) {
        // Normal movement
        this.x += this.speedX
        this.y += this.speedY

        // Mouse influence - only calculate if mouse is on canvas
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (maxDistance - distance) / maxDistance

            this.x -= forceDirectionX * force * 1.5
            this.y -= forceDirectionY * force * 1.5
          }
        }

        // Boundary check
        if (this.x > rect.width) this.x = 0
        if (this.x < 0) this.x = rect.width
        if (this.y > rect.height) this.y = 0
        if (this.y < 0) this.y = rect.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }

      connect(particles: Particle[]) {
        if (!ctx) return

        // Only connect to nearby particles for better performance
        const connectRadius = 80

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i]
          if (this === particle) continue

          const dx = this.x - particle.x
          const dy = this.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectRadius) {
            const opacity = 0.2 - (distance / connectRadius) * 0.2
            ctx.beginPath()
            ctx.strokeStyle = `hsla(240, 70%, 60%, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(particle.x, particle.y)
            ctx.stroke()
          }
        }
      }
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    let animationFrameId: number
    let lastTime = 0
    const fps = 30
    const fpsInterval = 1000 / fps

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate)

      // Throttle the frame rate for better performance
      const elapsed = timestamp - lastTime
      if (elapsed < fpsInterval) return
      lastTime = timestamp - (elapsed % fpsInterval)

      ctx.clearRect(0, 0, rect.width, rect.height)

      for (const particle of particles) {
        particle.update(mousePosition.x, mousePosition.y)
        particle.draw()
      }

      // Only draw connections for a subset of particles for better performance
      for (let i = 0; i < particles.length; i += 3) {
        particles[i].connect(particles)
      }
    }

    init()
    animationFrameId = requestAnimationFrame(animate)

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      init()
    }

    // Debounce resize handler for better performance
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-br from-background to-background/80 z-0"
        aria-hidden="true"
      />

      <motion.div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ opacity, y, scale }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">Hello, I'm Alex</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Creative developer crafting digital experiences that blend design and technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="gradient-bg hover:opacity-90 text-white"
            onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore My Journey <ArrowDown className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary/20 hover:border-primary/50"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <MousePointer className="h-5 w-5 mb-2" />
            <span className="text-sm">Scroll to explore</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

