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
          <>
            <GlitchText text={`© ${year} MAXIM`} className="font-mono mb-2 md:mb-0" />
            <div className="text-green-500 font-mono text-sm">
              <span className="mr-2">[</span>
              <span className="text-green-400">SECURITY</span>
              <span className="mx-2">|</span>
              <span className="text-green-400">PRIVACY</span>
              <span className="mx-2">|</span>
              <span className="text-green-400">FREEDOM</span>
              <span className="ml-2">]</span>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-2 md:mb-0">© {year} Manikandan M. All rights reserved.</p>
            <p className="text-gray-500 text-sm">Made with Next.js and Tailwind CSS</p>
          </>
        )}
      </div>
    </footer>
  )
}
