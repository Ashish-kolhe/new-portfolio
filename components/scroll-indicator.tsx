"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const totalHeight = document.body.scrollHeight - window.innerHeight
    const progress = (window.scrollY / totalHeight) * 100
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-background/20">
      <motion.div
        className="h-full gradient-bg"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  )
}

