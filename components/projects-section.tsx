"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronUp, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function ProjectsSection() {
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Add new state for paddle visibility
  const [showLeftPaddle, setShowLeftPaddle] = useState(false)
  const [showRightPaddle, setShowRightPaddle] = useState(true)

  const softwareProjects = [
    {
      title: "Uyir – AI-Based Road Accident Detection System",
      description:
        "Real-time road accident detection using surveillance cameras and AI. Sends alerts to 108 services and ambulance drivers using a Flutter app.",
      tech: ["Python", "FastAPI", "OpenCV", "Firebase", "Flutter", "Google Maps API"],
      features: ["Live accident detection", "Firebase notification system", "Location tracking"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Hot Kore – Canteen Food Ordering Website",
      description: "MERN stack-based ordering system with menu, cart, order tracking, and admin interface.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      features: ["Menu management", "Cart system", "Order tracking", "Admin dashboard"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Drone Line-Following System",
      description:
        "Developed a Simulink-based autonomous minidrone for line tracking using Model-Based Design for the MathWorks Minidrone Challenge.",
      tech: ["MATLAB", "Simulink", "Embedded C"],
      features: ["Autonomous navigation", "Line detection", "Real-time control"],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const securityProjects = [
    {
      title: "Website Vulnerability Scanner",
      description:
        "Python-based scanner for detecting XSS, SQLi, and security headers vulnerabilities in web applications.",
      tech: ["Python", "Requests", "BeautifulSoup"],
      features: ["XSS detection", "SQLi detection", "Security header analysis"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "CTF Labs & Writeups",
      description: "Solved beginner-intermediate boxes on Hack The Box and documented the methodologies.",
      tech: ["Kali Linux", "Burp Suite", "Metasploit", "Python"],
      features: ["LFI attacks", "SSRF exploitation", "JWT Forgery", "XSS techniques"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Network Traffic Analyzer",
      description: "Tool for analyzing network traffic and detecting suspicious patterns.",
      tech: ["Python", "Scapy", "Wireshark"],
      features: ["Packet analysis", "Traffic visualization", "Anomaly detection"],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const projects = theme === "cybersecurity" ? securityProjects : softwareProjects

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [projects.length])

  // Scroll to current project only when user clicks navigation buttons
  useEffect(() => {
    if (carouselRef.current && isUserScrolling) {
      // First scroll the section into view
      const section = document.getElementById('projects')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
      
      // Then scroll to the specific project
      const projectElements = carouselRef.current.querySelectorAll(".project-card")
      if (projectElements[currentIndex]) {
        projectElements[currentIndex].scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [currentIndex, isUserScrolling])

  // Handle user scrolling
  const handleUserScroll = () => {
    setIsUserScrolling(true)
    setTimeout(() => {
      setIsUserScrolling(false)
    }, 2000)
  }

  // Handle scroll position and paddle visibility
  const handleScroll = () => {
    if (!carouselRef.current) return

    const menu = carouselRef.current
    const menuPosition = menu.scrollLeft
    const menuWrapperSize = menu.clientWidth
    const menuSize = menu.scrollWidth
    const menuInvisibleSize = menuSize - menuWrapperSize
    const paddleMargin = 20

    const menuEndOffset = menuInvisibleSize - paddleMargin

    if (menuPosition <= paddleMargin) {
      setShowLeftPaddle(false)
      setShowRightPaddle(true)
    } else if (menuPosition < menuEndOffset) {
      setShowLeftPaddle(true)
      setShowRightPaddle(true)
    } else if (menuPosition >= menuEndOffset) {
      setShowLeftPaddle(true)
      setShowRightPaddle(false)
    }
  }

  // Scroll handlers
  const scrollLeft = () => {
    if (carouselRef.current) {
      const menu = carouselRef.current
      const cardWidth = 682 // width of each card
      const gap = 24 // space-x-6 = 1.5rem = 24px
      const totalWidth = cardWidth + gap
      
      if (currentIndex === 0) {
        // If at first project, go to last project
        menu.scrollTo({
          left: totalWidth * (projects.length - 1),
          behavior: 'smooth'
        })
        setCurrentIndex(projects.length - 1)
      } else {
        // Go to previous project
        menu.scrollTo({
          left: totalWidth * (currentIndex - 1),
          behavior: 'smooth'
        })
        setCurrentIndex(prev => prev - 1)
      }
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const menu = carouselRef.current
      const cardWidth = 682 // width of each card
      const gap = 24 // space-x-6 = 1.5rem = 24px
      const totalWidth = cardWidth + gap
      
      if (currentIndex === projects.length - 1) {
        // If at last project, go to first project
        menu.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
        setCurrentIndex(0)
      } else {
        // Go to next project
        menu.scrollTo({
          left: totalWidth * (currentIndex + 1),
          behavior: 'smooth'
        })
        setCurrentIndex(prev => prev + 1)
      }
    }
  }

  // Add scroll event listener
  useEffect(() => {
    const menu = carouselRef.current
    if (menu) {
      menu.addEventListener('scroll', handleScroll)
      return () => menu.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="projects"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={`py-20 min-h-screen flex items-start ${
        theme === "cybersecurity" ? "border-t border-green-500/30" : "border-t border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        {theme === "cybersecurity" ? (
          <GlitchText text="PROJECTS / LABS" className="text-5xl font-mono font-bold mb-8" />
        ) : (
          <h2 className="text-5xl font-bold mb-8">Projects</h2>
        )}

        <div className="flex flex-col items-center">
          <div className="w-full max-w-[calc(100vw-200px)] relative">
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 transform -translate-x-12 -translate-y-1/2 z-10 ${
                theme === "cybersecurity" ? "text-green-500 hover:text-green-400" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <ChevronDown size={48} className="rotate-90" />
            </button>

            <div
              ref={carouselRef}
              className="overflow-x-auto overflow-y-hidden h-[600px] relative"
              onWheel={handleUserScroll}
              onTouchStart={handleUserScroll}
            >
              <div className="flex space-x-6">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className={`project-card flex-shrink-0 w-[682px] ${
                      theme === "cybersecurity"
                        ? "bg-black border-green-500/50 hover:border-green-400 transition-colors"
                        : ""
                    }`}
                  >
                    <CardHeader>
                      {theme === "cybersecurity" ? (
                        <GlitchText text="     " className="text-xl font-mono font-bold" />
                      ) : (
                        <CardTitle>     </CardTitle>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {theme === "cybersecurity" ? (
                          <GlitchText text={project.title} className="text-xl font-mono font-bold mb-4" />
                        ) : (
                          <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                        )}
                        <p
                          className={theme === "cybersecurity" ? "text-green-400 mb-4 font-mono" : "text-gray-600 mb-4"}
                        >
                          {project.description}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4
                          className={theme === "cybersecurity" ? "text-green-500 font-mono mb-2" : "font-semibold mb-2"}
                        >
                          {theme === "cybersecurity" ? "> TECH STACK:" : "Tech Stack:"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <Badge
                              key={i}
                              variant={theme === "cybersecurity" ? "outline" : "default"}
                              className={theme === "cybersecurity" ? "border-green-500 text-green-400" : ""}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4
                          className={theme === "cybersecurity" ? "text-green-500 font-mono mb-2" : "font-semibold mb-2"}
                        >
                          {theme === "cybersecurity" ? "> FEATURES:" : "Features:"}
                        </h4>
                        <ul
                          className={
                            theme === "cybersecurity"
                              ? "list-disc list-inside text-green-400 font-mono"
                              : "list-disc list-inside text-gray-600"
                          }
                        >
                          {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <a
                        href="#"
                        className={
                          theme === "cybersecurity"
                            ? "text-green-500 hover:text-green-400"
                            : "text-gray-600 hover:text-gray-900"
                        }
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="#"
                        className={
                          theme === "cybersecurity"
                            ? "text-green-500 hover:text-green-400"
                            : "text-gray-600 hover:text-gray-900"
                        }
                      >
                        <ExternalLink size={20} />
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 transform translate-x-12 -translate-y-1/2 z-10 ${
                theme === "cybersecurity" ? "text-green-500 hover:text-green-400" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <ChevronUp size={48} className="rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
