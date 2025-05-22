"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function ProjectsSection() {
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const softwareProjects = [
    {
      title: "Uyir – AI-Based Road Accident Detection System",
      description:
        "Real-time road accident detection using surveillance cameras and AI. Sends alerts to 108 services and ambulance drivers using a Flutter app.",
      tech: ["Python", "FastAPI", "OpenCV", "Firebase", "Flutter", "Google Maps API"],
      features: ["Live accident detection", "Firebase notification system", "Location tracking"],
      image: "/uyir-project (1).jpg",
    },
    {
      title: "Hot Kore – Canteen Food Ordering Website",
      description: "MERN stack-based ordering system with menu, cart, order tracking, and admin interface.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      features: ["Menu management", "Cart system", "Order tracking", "Admin dashboard"],
      image: "/kore (1).png",
    },
    {
      title: "Drone Line-Following System",
      description:
        "Developed a Simulink-based autonomous minidrone for line tracking using Model-Based Design for the MathWorks Minidrone Challenge.",
      tech: ["MATLAB", "Simulink", "Embedded C"],
      features: ["Autonomous navigation", "Line detection", "Real-time control"],
      image: "/parrot (1).jpg",
    },
  ]

  const securityProjects = [
    {
      title: "Website Vulnerability Scanner",
      description:
        "Python-based scanner for detecting XSS, SQLi, and security headers vulnerabilities in web applications.",
      tech: ["Python", "Requests", "BeautifulSoup"],
      features: ["XSS detection", "SQLi detection", "Security header analysis"],
      image: "/network.jpg",
    },
    {
      title: "CTF Labs & Writeups",
      description: "Solved beginner-intermediate boxes on Hack The Box and documented the methodologies.",
      tech: ["Kali Linux", "Burp Suite", "Metasploit", "Python"],
      features: ["LFI attacks", "SSRF exploitation", "JWT Forgery", "XSS techniques"],
      image: "/hackathon.jpeg",
    },
    {
      title: "Network Traffic Analyzer",
      description: "Tool for analyzing network traffic and detecting suspicious patterns.",
      tech: ["Python", "Scapy", "Wireshark"],
      features: ["Packet analysis", "Traffic visualization", "Anomaly detection"],
      image: "/firewall.png",
    },
  ]

  const projects = theme === "cybersecurity" ? securityProjects : softwareProjects

  // Auto-scroll functionality
  useEffect(() => {
    if (!mounted || isUserScrolling) return

    const interval = setInterval(() => {
      if (!isUserScrolling) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isUserScrolling, projects.length, mounted])

  // Handle user scrolling
  const handleUserScroll = () => {
    setIsUserScrolling(true)
    setTimeout(() => {
      setIsUserScrolling(false)
    }, 5000)
  }

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  if (!mounted) {
    return (
      <section
        id="projects"
        className={`py-20 min-h-screen flex items-center ${
          theme === "cybersecurity" ? "border-t border-green-500/30" : "border-t border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4">
          {theme === "cybersecurity" ? (
            <div className="text-5xl font-mono font-bold mb-8">PROJECTS / LABS</div>
          ) : (
            <h2 className="text-5xl font-bold mb-8">Projects</h2>
          )}
          <div className="h-[600px]"></div>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      id="projects"
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
          <GlitchText text="PROJECTS / LABS" className="text-5xl font-mono font-bold mb-8" />
        ) : (
          <h2 className="text-5xl font-bold mb-8">Projects</h2>
        )}

        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl relative">
            {/* Project display with navigation arrows */}
            <div className="relative">
              {/* Left arrow */}
              <button
                onClick={() => {
                  setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
                  handleUserScroll()
                }}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full ${
                  theme === "cybersecurity"
                    ? "bg-black border border-green-500 text-green-500 hover:text-green-400 hover:border-green-400"
                    : "bg-white border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 shadow-sm"
                }`}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Project cards */}
              <div className="relative h-[600px]">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                      index === currentIndex ? "opacity-100 z-10" : "opacity-0 -z-10"
                    }`}
                  >
                    <Card
                      className={
                        theme === "cybersecurity"
                          ? "bg-black border-green-500/50 hover:border-green-400 transition-colors"
                          : ""
                      }
                    >
                      <CardHeader>
                        {theme === "cybersecurity" ? (
                          <GlitchText 
                            text={project.title} 
                            className="text-xl font-mono font-bold text-green-500" 
                          />
                        ) : (
                          <CardTitle>{project.title}</CardTitle>
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
                          <p
                            className={
                              theme === "cybersecurity" ? "text-green-400 mb-4 font-mono" : "text-gray-600 mb-4"
                            }
                          >
                            {project.description}
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4
                            className={
                              theme === "cybersecurity" ? "text-green-500 font-mono mb-2" : "font-semibold mb-2"
                            }
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
                            className={
                              theme === "cybersecurity" ? "text-green-500 font-mono mb-2" : "font-semibold mb-2"
                            }
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
                  </div>
                ))}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => {
                  setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
                  handleUserScroll()
                }}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full ${
                  theme === "cybersecurity"
                    ? "bg-black border border-green-500 text-green-500 hover:text-green-400 hover:border-green-400"
                    : "bg-white border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 shadow-sm"
                }`}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Project indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    handleUserScroll()
                  }}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index
                      ? theme === "cybersecurity"
                        ? "bg-green-500"
                        : "bg-gray-800"
                      : theme === "cybersecurity"
                        ? "bg-green-900"
                        : "bg-gray-300"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
