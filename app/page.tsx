"use client"

import { ThemeProvider } from "@/context/theme-context"
import ThemeSwitcher from "@/components/theme-switcher"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ExperienceCtfSection from "@/components/experience-ctf-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/context/theme-context"

function MatrixRain() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (theme !== "cybersecurity" || !canvasRef.current) return

    // Only run this on client side
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const matrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128)
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(matrix, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  if (theme !== "cybersecurity") return null

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20 z-0 pointer-events-none" />
}

function MainContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Scroll to top when the page loads
    window.scrollTo(0, 0)
  }, [])

  if (!mounted) return null

  return (
    <>
      <ThemeSwitcher />
      <Header />
      <MatrixRain />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceCtfSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  )
}
