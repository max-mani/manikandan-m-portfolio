"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "cybersecurity" | "software"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("software")
  const [mounted, setMounted] = useState(false)

  // Only run this effect on the client side
  useEffect(() => {
    setMounted(true)

    // Apply theme class to body only on client side
    if (theme === "cybersecurity") {
      document.body.classList.add("bg-black", "text-green-500", "cybersecurity")
      document.body.classList.remove("bg-white", "text-black")
    } else {
      document.body.classList.add("bg-white", "text-black")
      document.body.classList.remove("bg-black", "text-green-500", "cybersecurity")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "software" ? "cybersecurity" : "software"))
  }

  // Avoid rendering with theme-specific classes until mounted on client
  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
