"use client"

import { useTheme } from "@/context/theme-context"
import { Monitor, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const [showPulse, setShowPulse] = useState(true)

  useEffect(() => {
    // Hide the pulse animation after 8 seconds
    const timer = setTimeout(() => {
      setShowPulse(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip defaultOpen={showPulse}>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleTheme}
            variant="default"
            className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
              theme === "cybersecurity"
                ? "bg-red-500 text-white hover:bg-red-600 border-2 border-red-400"
                : "bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-400"
            } ${showPulse ? "animate-pulse-ring animate-bounce-subtle" : ""}`}
          >
            {showPulse && <Sparkles className="mr-2 h-4 w-4 animate-spin-slow text-yellow-400" />}
            {theme === "cybersecurity" ? <Monitor className="mr-2 h-4 w-4" /> : <Shield className="mr-2 h-4 w-4" />}
            {theme === "cybersecurity" ? "Switch to Dev Mode" : "Switch to Security Mode"}
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="left" 
          className={`${showPulse ? "animate-fade-in" : ""} ${
            theme === "cybersecurity" 
              ? "bg-red-500 text-white border-2 border-red-400" 
              : "bg-blue-500 text-white border-2 border-blue-400"
          }`}
        >
          <p className="font-medium text-lg">Try switching themes! 🔄</p>
          <p className="text-sm opacity-90">Experience both developer and security modes</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
