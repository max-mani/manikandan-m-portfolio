"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function SkillsSection() {
  const { theme } = useTheme()
  const [skillValues, setSkillValues] = useState<Record<string, number>>({})
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const softwareSkills = [
    { category: "Languages", skills: ["Python", "JavaScript", "Dart", "Bash"] },
    { category: "Frameworks/Libraries", skills: ["React.js", "Flutter", "Node.js", "FastAPI"] },
    { category: "Databases", skills: ["Firebase", "MongoDB"] },
    { category: "Tools", skills: ["Git", "Docker", "Firebase", "VS Code", "Postman"] },
    { category: "Concepts", skills: ["LLMs", "Image Processing", "WebSockets"] },
  ]

  const securitySkills = [
    { category: "Tools", skills: ["Wireshark", "Burp Suite", "Metasploit", "Nmap", "Nikto"] },
    { category: "Domains", skills: ["Penetration Testing", "CTFs", "Vulnerability Scanning"] },
    { category: "Scripting", skills: ["Python", "Bash", "JavaScript"] },
    { category: "Environments", skills: ["DVWA", "OWASP Juice Shop", "Docker-based labs"] },
  ]

  const securitySkillLevels = {
    Wireshark: 75,
    "Burp Suite": 70,
    Metasploit: 65,
    Nmap: 80,
    Nikto: 60,
    "Penetration Testing": 65,
    CTFs: 70,
    "Vulnerability Scanning": 75,
    Python: 85,
    Bash: 70,
    JavaScript: 75,
    DVWA: 80,
    "OWASP Juice Shop": 75,
    "Docker-based labs": 65,
  }

  const softwareSkillLevels = {
    Python: 85,
    JavaScript: 80,
    Dart: 75,
    Bash: 65,
    "React.js": 80,
    Flutter: 85,
    "Node.js": 75,
    FastAPI: 70,
    Firebase: 80,
    MongoDB: 75,
    Git: 85,
    Docker: 70,
    "VS Code": 90,
    Postman: 85,
    LLMs: 65,
    "Image Processing": 70,
    WebSockets: 65,
  }

  // Memoize the getSkillLevel function to prevent unnecessary re-renders
  const getSkillLevel = useCallback(
    (skill: string) => {
      if (theme === "cybersecurity") {
        return securitySkillLevels[skill as keyof typeof securitySkillLevels] || 50
      } else {
        return softwareSkillLevels[skill as keyof typeof softwareSkillLevels] || 50
      }
    },
    [theme],
  )

  // Memoize the skillsData to prevent unnecessary re-renders
  const skillsData = theme === "cybersecurity" ? securitySkills : softwareSkills

  // Reset and animate progress bars when they come into view
  useEffect(() => {
    if (!inView) {
      // Reset values when out of view
      const resetValues: Record<string, number> = {}
      skillsData.forEach((category) => {
        category.skills.forEach((skill) => {
          resetValues[skill] = 0
        })
      })
      setSkillValues(resetValues)
      return
    }

    // Initialize all skill values to 0
    const initialValues: Record<string, number> = {}
    skillsData.forEach((category) => {
      category.skills.forEach((skill) => {
        initialValues[skill] = 0
      })
    })
    setSkillValues(initialValues)

    // Store all the intervals so we can clear them on cleanup
    const intervals: NodeJS.Timeout[] = []

    // Animate each skill value to its target
    const timer = setTimeout(() => {
      skillsData.forEach((category) => {
        category.skills.forEach((skill) => {
          const target = getSkillLevel(skill)
          const duration = 1500 // Animation duration in ms
          const steps = 20 // Number of steps in the animation
          const increment = target / steps

          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(interval)
            }
            setSkillValues((prev) => ({
              ...prev,
              [skill]: current,
            }))
          }, duration / steps)

          intervals.push(interval)
        })
      })
    }, 300)

    // Clean up all intervals and timeouts on unmount or when dependencies change
    return () => {
      clearTimeout(timer)
      intervals.forEach(clearInterval)
    }
  }, [inView]) // Only depend on inView state

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={`py-20 min-h-screen flex items-center ${
        theme === "cybersecurity" ? "border-t border-green-500/30" : "border-t border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        {theme === "cybersecurity" ? (
          <GlitchText text="SKILLS" className="text-5xl font-mono font-bold mb-8" />
        ) : (
          <h2 className="text-5xl font-bold mb-8">Skills & Technologies</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={index}
              className={
                theme === "cybersecurity"
                  ? "border border-green-500/30 p-6 rounded-lg bg-black/50"
                  : "border border-gray-200 p-6 rounded-lg shadow-sm"
              }
            >
              {theme === "cybersecurity" ? (
                <GlitchText
                  text={`> ${category.category.toUpperCase()}`}
                  className="text-xl font-mono font-bold mb-4"
                />
              ) : (
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              )}

              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className={theme === "cybersecurity" ? "text-green-400 font-mono" : "text-gray-700"}>
                        {skill}
                      </span>
                      <span className={theme === "cybersecurity" ? "text-green-500 font-mono" : "text-gray-500"}>
                        {Math.round(skillValues[skill] || 0)}%
                      </span>
                    </div>
                    <Progress
                      value={skillValues[skill] || 0}
                      className={theme === "cybersecurity" ? "h-2 bg-green-900/30" : "h-2"}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
