"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"

export default function Footer() {
  const { theme } = useTheme()
  const year = new Date().getFullYear()

  return (
    <footer
      className={
        theme === "cybersecurity"
          ? "py-6 border-t border-green-500/30 bg-black"
          : "py-6 border-t border-gray-200 bg-white"
      }
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {theme === "cybersecurity" ? (
          <GlitchText text={`© ${year} MAXIM`} className="font-mono" />
        ) : (
          <p className="text-gray-600">© {year} Manikandan M. All rights reserved.</p>
        )}
      </div>
    </footer>
  )
}
