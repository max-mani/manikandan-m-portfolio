"use client"

import { useTheme } from "@/context/theme-context"
import { Monitor, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant={theme === "cybersecurity" ? "outline" : "default"}
      className={`fixed bottom-4 right-4 z-50 ${
        theme === "cybersecurity"
          ? "bg-green-900/20 text-green-500 border-green-500 hover:bg-green-900/30 hover:text-green-400"
          : ""
      }`}
    >
      {theme === "cybersecurity" ? <Monitor className="mr-2 h-4 w-4" /> : <Shield className="mr-2 h-4 w-4" />}
      {theme === "cybersecurity" ? "Switch to Dev Mode" : "Switch to Security Mode"}
    </Button>
  )
}
