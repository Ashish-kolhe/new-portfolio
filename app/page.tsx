import Hero from "@/components/hero"
import Journey from "@/components/journey"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"
import FloatingNav from "@/components/floating-nav"
import { ScrollIndicator } from "@/components/scroll-indicator"

export default function Home() {
  return (
    <main className="relative">
      <ScrollIndicator />
      <FloatingNav />
      <Hero />
      <Journey />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}

