"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export default function AboutSection() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="about"
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
          <>
            <GlitchText text="ABOUT ME" className="text-5xl font-mono font-bold mb-8" />
            <div className="font-mono space-y-4 max-w-full">
              <p className="text-green-400 text-xl">
                <span className="text-green-500">$</span> Cybersecurity enthusiast interested in ethical hacking,
                AI-driven threat detection, and network security.
              </p>
              <p className="text-green-400 text-xl">
                <span className="text-green-500">$</span> Currently exploring CTFs, vulnerability scanners, and pursuing
                certifications like CEH and CompTIA Security+.
              </p>
              <p className="text-green-400 text-xl">
                <span className="text-green-500">$</span> Active on platforms like TryHackMe and Hack The Box (HTB
                Username: maxim2115 #2176184).
              </p>
              <p className="text-green-400 text-xl">
                <span className="text-green-500">$</span> Developing skills in penetration testing, vulnerability
                assessment, and security research.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-5xl font-bold mb-8">About Me</h2>
            <div className="max-w-full space-y-4">
              <p className="text-xl">
                Hi, I'm Manikandan M, a Third-year Computer Science and Engineering student at Kumaraguru College of
                Technology. I'm passionate about solving real-world problems through AI, Cybersecurity, and Full-Stack
                Web & Mobile Development.
              </p>
              <p className="text-xl">
                As an executive member of the Aeromodelling Club, I also innovate in drone technology and contribute to
                various technical projects.
              </p>
              <div className="mt-6">
                <h3 className="text-3xl font-semibold mb-3">Tech Stack Highlights:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xl">
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Frontend:</span> Flutter, React
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Backend:</span> Node.js, FastAPI
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Database:</span> Firebase, MongoDB
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 font-medium">Others:</span> Git, Docker, Google Cloud, LLMs
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.section>
  )
}
