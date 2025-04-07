"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Code, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

const projects = [
  {
    title: "Coddeit",
    description:
      "Coddeit is a practical coding platform focused on building real-world projects. It’s designed to teach by doing, helping students and entrepreneurs turn their ideas into deployable solutions quickly.",
    image: "./CT.jpg",
    tags: ["Coding", "Education", "Projects"],
    link: "https://www.coddeit.site",
    code: "https://github.com/Ashish-kolhe/Website",
  },
  {
    title: "Krypton",
    description:
      "Krypton is a digital solutions agency specializing in web and mobile development. We offer services like Web Development, App Development, Digital Marketing, and UI/UX Design, empowering businesses with innovative solutions to drive growth.",
    image: "./KN.jpg",
    tags: ["Agency", "Web Development", "Mobile Development"],
    link: "https://kryptonsite.netlify.app",
    code: "https://github.com/Ashish-kolhe/Krypton",
  },
  {
    title: "GameStore",
    description:
      "Game Store is a design exercise created to practice design principles. The project showcases a user-friendly interface featuring popular mobile games, emphasizing clean layout and intuitive navigation.",
    image: "./GS.jpg",
    tags: ["Design", "UI/UX", "Games"],
    link: "https://gamestoreforfun.netlify.app",
    code: "https://github.com/Ashish-kolhe/Gamestore",
  },
  {
    title: "InLance",
    description:
      "InLance is a platform created for the Smart India Hackathon 2024 to connect freelancers with clients. It was developed as a prototype to demonstrate key features like a user-friendly interface, secure payments, and diverse project categories.",
    image: "IL.jpg",
    tags: ["Freelancing", "Marketplace", "Hackathon"],
    link: "https://ashishkolhe.netlify.app",
    code: "https://github.com/Ashish-kolhe/InLance",
  },
  {
    title: "SelfStudy",
    description:
      "SelfStudy is a modern e-learning platform built for the Internal College Hackathon 2025. This frontend-only project focuses on a clean UI/UX and interactive course browsing, designed to provide a seamless self-paced learning experience.",
    image: "./SS.jpg",
    tags: ["E-learning", "Education", "Hackathon"],
    link: "https://selfstudyich.vercel.app",
    code: "https://github.com/Ashish-kolhe/selfstudy",
  },
]


export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="projects" ref={containerRef} className="min-h-screen py-20 bg-muted/30">
      <motion.div className="section-container" style={{ opacity }}>
        <h2 className="section-title">Featured Projects</h2>

        <div className="relative max-w-5xl mx-auto overflow-hidden px-4">
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="w-full"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl group">
                  <img
                    src={projects[currentIndex].image || "/placeholder.svg"}
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-bold">{projects[currentIndex].title}</h4>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white"
                            onClick={() => window.open(projects[currentIndex].link, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white"
                            onClick={() => window.open(projects[currentIndex].code, "_blank")}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">{projects[currentIndex].title}</h3>

                  <p className="text-muted-foreground mb-6">{projects[currentIndex].description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[currentIndex].tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(projects[currentIndex].link, "_blank")}
                    >
                      View Live <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-500/20 text-purple-500 hover:bg-purple-500 hover:text-white"
                      onClick={() => window.open(projects[currentIndex].code, "_blank")}
                    >
                      View Code <Code className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile navigation */}
        {isMobile && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:bg-primary/10"
              onClick={prevProject}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-1">
              {projects.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-2 h-2 p-0 rounded-full ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:bg-primary/10"
              onClick={nextProject}
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Desktop navigation */}
        {!isMobile && (
          <div className="flex justify-center mt-12 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:bg-primary/10"
              onClick={prevProject}
              aria-label="Previous project"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {projects.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`w-10 rounded-full ${
                  index === currentIndex
                    ? "gradient-bg text-white border-transparent"
                    : "border-primary/20 text-muted-foreground hover:bg-primary/10"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                aria-label={`Go to project ${index + 1}`}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:bg-primary/10"
              onClick={nextProject}
              aria-label="Next project"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </motion.div>
    </section>
  )
}

