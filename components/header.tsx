"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems =
    theme === "cybersecurity"
      ? ["About", "Skills", "Projects", "CTFs", "Contact"]
      : ["About", "Projects", "Skills", "Experience", "Contact"]

  return (
    <header
      className={`fixed w-full z-40 ${
        theme === "cybersecurity"
          ? "bg-black/80 border-b border-green-500/30 backdrop-blur-sm"
          : "bg-white/80 border-b border-gray-200 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {theme === "cybersecurity" ? (
            <GlitchText text="MAXIM" className="text-xl font-mono font-bold tracking-wider" />
          ) : (
            <h1 className="text-xl font-bold">Manikandan M</h1>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <X className={theme === "cybersecurity" ? "text-green-500" : "text-black"} />
          ) : (
            <Menu className={theme === "cybersecurity" ? "text-green-500" : "text-black"} />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item}>
                {theme === "cybersecurity" ? (
                  <a href={`#${item.toLowerCase()}`} className="hover:text-green-400 transition-colors">
                    <GlitchText text={item} />
                  </a>
                ) : (
                  <a href={`#${item.toLowerCase()}`} className="hover:text-gray-600 transition-colors">
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          className={`md:hidden ${
            theme === "cybersecurity" ? "bg-black border-b border-green-500/30" : "bg-white border-b border-gray-200"
          }`}
        >
          <ul className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item}>
                {theme === "cybersecurity" ? (
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-green-400 transition-colors block"
                    onClick={toggleMenu}
                  >
                    <GlitchText text={item} />
                  </a>
                ) : (
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-gray-600 transition-colors block"
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
