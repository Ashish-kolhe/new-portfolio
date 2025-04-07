"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, GraduationCap, Lightbulb, Award } from "lucide-react"

const journeyItems = [
  {
    year: "2023",
    title: "Started Learning Web Development",
    description: "Began exploring HTML, CSS, and JavaScript, laying the foundation for web development skills.",
    icon: Lightbulb,
    color: "from-purple-500 to-pink-400",
  },
  {
    year: "2024",
    title: "Exercise Projects & Practice",
    description: "Worked on several frontend projects to strengthen understanding of modern web technologies and UI/UX.",
    icon: Briefcase,
    color: "from-primary to-purple-400",
  },
  {
    year: "2027",
    title: "Graduation Year",
    description: "Set to graduate with a degree in Engineering, ready to pursue professional opportunities in tech.",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-400",
  },
]


export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="journey" ref={containerRef} className="min-h-screen py-20 bg-background">
      <motion.div className="section-container" style={{ opacity }}>
        <h2 className="section-title">My Journey</h2>

        <div className="relative max-w-4xl mx-auto px-4">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary to-purple-400" />

          {journeyItems.map((item, index) => (
            <motion.div
              key={index}
              className={`relative mb-16 flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Content */}
              <div
                className={`md:w-1/2 w-full pl-12 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right text-left" : "md:pl-12 md:text-left text-left"
                } mb-6 md:mb-0`}
              >
                <span className="inline-block text-sm font-semibold text-primary mb-2">{item.year}</span>
                <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              {/* Icon */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-background border-4 border-background z-10">
                <div
                  className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color}`}
                >
                  <item.icon className="h-3 w-3 md:h-5 md:w-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

