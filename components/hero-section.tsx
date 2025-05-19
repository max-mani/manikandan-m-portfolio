"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import Image from "next/image"
import { useEffect, useRef } from "react"

export default function HeroSection() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Matrix rain effect for cybersecurity theme
  useEffect(() => {
    if (theme !== "cybersecurity" || !canvasRef.current) return

    // Only run this on client side
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 20
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const matrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `bold ${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128)
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      // Trigger text glitch effect
      const glitchElements = document.querySelectorAll('.glitch-text')
      glitchElements.forEach(element => {
        if (Math.random() > 0.95) {
          element.classList.add('glitch-active')
          setTimeout(() => {
            element.classList.remove('glitch-active')
          }, 100)
        }
      })
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

  return (
    <section className="min-h-screen pt-20 relative flex items-center">
      {theme === "cybersecurity" && (
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20 z-0" />
      )}

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            {theme === "cybersecurity" ? (
              <>
                <GlitchText text="MANIKANDAN M" className="text-4xl md:text-5xl font-mono font-bold mb-4" />
                <div className="glitch-container mb-6">
                  <GlitchText text="CYBERSECURITY SPECIALIST" className="text-xl md:text-2xl font-mono" />
                </div>
                <div className="space-y-4 font-mono">
                  <p className="text-green-400">
                    <span className="text-green-500">$</span> Ethical Hacking | Penetration Testing | CTF Player
                  </p>
                  <p className="text-green-400">
                    <span className="text-green-500">$</span> Active on TryHackMe & Hack The Box
                  </p>
                  <p className="text-green-400">
                    <span className="text-green-500">$</span> Exploring AI-driven threat detection
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Manikandan M</h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-6">Software Engineer & CS Student</p>
                <p className="text-gray-600 mb-4">
                  Third-year Computer Science and Engineering student at Kumaraguru College of Technology, passionate
                  about solving real-world problems through AI, Cybersecurity, and Full-Stack Development.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Flutter</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">FastAPI</span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Firebase</span>
                </div>
              </>
            )}
          </div>

          <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
            {theme === "cybersecurity" ? (
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-lg border-2 border-green-500 glitch-container eye-glitch-container">
                <div className="absolute inset-0 glitch-image">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tmp_906cc714-df9c-43cd-ae43-ddcb23359be5-f7TXD45HUFxix0pxV1pv1ZPMhewAj7.jpeg"
                    alt="Manikandan M"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full filter brightness-50 contrast-125"
                  />
                  <div className="absolute inset-0 bg-green-500/10"></div>
                  <div className="absolute inset-0 glitch-lines"></div>
                  <div className="eye-glitch"></div>
                </div>
              </div>
            ) : (
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tmp_906cc714-df9c-43cd-ae43-ddcb23359be5-f7TXD45HUFxix0pxV1pv1ZPMhewAj7.jpeg"
                  alt="Manikandan M"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
