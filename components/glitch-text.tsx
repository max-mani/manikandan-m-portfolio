"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/context/theme-context"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const { theme } = useTheme()
  const textRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (theme !== "cybersecurity" || !textRef.current) return

    const interval = setInterval(() => {
      if (Math.random() > 0.98) {
        textRef.current!.classList.add("glitch-active")
        setTimeout(() => {
          textRef.current?.classList.remove("glitch-active")
        }, 50)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [theme])

  // Don't apply glitch effects during SSR
  if (!mounted) {
    return <div className={className}>{text}</div>
  }

  if (theme !== "cybersecurity") {
    return <div className={className}>{text}</div>
  }

  return (
    <div ref={textRef} className={`glitch-text ${className}`} data-text={text}>
      {text}
    </div>
  )
}
