"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Palette, Code, Lightbulb, Users, Coffee, Heart } from "lucide-react"

const skills = [
  { name: "Design", icon: Palette, color: "bg-pink-500" },
  { name: "Development", icon: Code, color: "bg-primary" },
  { name: "Innovation", icon: Lightbulb, color: "bg-yellow-500" },
  { name: "Collaboration", icon: Users, color: "bg-green-500" },
  { name: "Dedication", icon: Coffee, color: "bg-amber-500" },
  { name: "Passion", icon: Heart, color: "bg-red-500" },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  return (
    <section id="about" ref={containerRef} className="min-h-screen py-20 bg-background">
      <motion.div className="section-container" style={{ opacity, y }}>
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto px-4">
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-primary p-2 mx-auto max-w-[280px]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg md:text-xl">
              10+ Years
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">My Story</h3>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a creative developer with a passion for building immersive digital experiences that blend artistry
                with technical innovation. My journey began with a fascination for both design and code.
              </p>

              <p>
                Over the years, I've collaborated with startups, agencies, and established brands to create memorable
                digital products that not only look beautiful but solve real problems.
              </p>

              <p>
                When I'm not coding, you'll find me exploring new design trends, experimenting with emerging
                technologies, or hiking in nature for inspiration.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Core Skills</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 ${skill.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                  <skill.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-foreground font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

