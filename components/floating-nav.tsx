"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Clock, Mail, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", icon: Home, href: "#" },
  { name: "Journey", icon: Clock, href: "#journey" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
  { name: "About", icon: User, href: "#about" },
  { name: "Contact", icon: Mail, href: "#contact" },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for background change
      setIsScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navItems.map((item) => item.href.replace("#", "")).filter(Boolean)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <ThemeToggle />
          <motion.button
            className={`p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </motion.button>
        </div>
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center text-xl text-foreground hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-6 w-6 mr-2" />
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop floating nav */}
      {!isMobile && (
        <motion.div
          className={`fixed  z-50 rounded-full px-2 py-1 transition-all duration-300 ${
            isScrolled ? "top-4 bg-background/50 backdrop-blur-sm shadow-lg border border-border" : "top-8"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          style={{ maxWidth: "95vw" }}
        >
          <nav className="flex items-center space-x-1 overflow-x-auto hide-scrollbar px-1">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={`relative px-3 py-2 rounded-full flex items-center transition-colors whitespace-nowrap ${
                  activeSection === item.href.replace("#", "") || (item.href === "#" && activeSection === "")
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item.href.replace("#", "") || (item.href === "#" && activeSection === "") ? (
                  <motion.span
                    className="absolute inset-0 rounded-full gradient-bg -z-10"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  />
                ) : null}
                <item.icon className="h-4 w-4 mr-1" />
                <span>{item.name}</span>
              </motion.a>
            ))}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </nav>
        </motion.div>
      )}
    </>
  )
}

