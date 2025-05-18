"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy } from "lucide-react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function ExperienceCtfSection() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "Executive Member – Aeromodelling KCT",
      period: "Oct 2024 – Feb 2025",
      description: "Contributed to drone innovation, organized workshops and events for students.",
      achievements: [],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Hackathons & Competitions",
      period: "",
      description: "Participated in various hackathons and coding competitions:",
      achievements: [
        "Sustainathon'25 Participant",
        "MathWorks Minidrone Competition 2024",
        "Winner – Python Coding Contest 2024",
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Certifications & Courses",
      period: "",
      description: "Continuous learning through various platforms:",
      achievements: [
        "Python Programming Certificate",
        "GATE preparation for Cybersecurity at IIT",
        "Learning from Coursera, TryHackMe, Hack The Box",
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const ctfChallenges = [
    {
      title: "Web Application Exploitation",
      platform: "Hack The Box",
      description: "Completed challenges involving SQL injection, XSS, and CSRF vulnerabilities.",
      techniques: ["SQL Injection", "XSS", "CSRF", "Authentication Bypass"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Network Security",
      platform: "TryHackMe",
      description: "Solved rooms focused on network scanning, enumeration, and exploitation.",
      techniques: ["Port Scanning", "Service Enumeration", "Network Pivoting", "Traffic Analysis"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Binary Exploitation",
      platform: "Hack The Box",
      description: "Tackled challenges involving buffer overflows and memory corruption.",
      techniques: ["Buffer Overflow", "Return-Oriented Programming", "Format String Vulnerabilities"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Cryptography",
      platform: "TryHackMe & CTF Competitions",
      description: "Solved various cryptographic challenges and implemented secure systems.",
      techniques: ["Hash Cracking", "Encryption/Decryption", "Key Exchange", "Digital Signatures"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id={theme === "cybersecurity" ? "ctfs" : "experience"}
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
          <GlitchText text="CTF CHALLENGES" className="text-5xl font-mono font-bold mb-8" />
        ) : (
          <h2 className="text-5xl font-bold mb-8">Experience</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {theme === "cybersecurity"
            ? // CTF Challenges for Cybersecurity theme
              ctfChallenges.map((challenge, index) => (
                <Card key={index} className="bg-black border-green-500/50 hover:border-green-400 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <GlitchText text={challenge.title} className="text-xl font-mono font-bold" />
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {challenge.platform}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Image
                        src={challenge.image || "/placeholder.svg"}
                        alt={challenge.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <p className="text-green-400 mb-4 font-mono">{challenge.description}</p>
                    </div>
                    <div>
                      <h4 className="text-green-500 font-mono mb-2">{"> TECHNIQUES:"}</h4>
                      <div className="flex flex-wrap gap-2">
                        {challenge.techniques.map((technique, i) => (
                          <Badge key={i} variant="outline" className="border-green-500 text-green-400">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : // Experience items for Software theme
              experiences.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{exp.title}</CardTitle>
                    {exp.period && (
                      <CardDescription className="flex items-center mt-1">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {exp.period}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={exp.image || "/placeholder.svg"}
                      alt={exp.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          Achievements:
                        </h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </motion.section>
  )
}
