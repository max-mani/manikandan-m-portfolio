"use client"

import { useTheme } from "@/context/theme-context"
import GlitchText from "./glitch-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Terminal, Code } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import emailjs from '@emailjs/browser'

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactSection() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: '19manikandan2005@gmail.com',
      }

      await emailjs.send(
        'service_8kgavdi',
        'template_4v43kj4',
        templateParams,
        'OgllbSbTWCBD5wrFd'
      )
      
      toast.success("Message sent successfully!")
      reset()
    } catch (error) {
      console.error('Error sending email:', error)
      toast.error("Failed to send message. Please try again.")
    }
  }

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      id="contact"
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
          <GlitchText text="CONTACT" className="text-5xl font-mono font-bold mb-8" />
        ) : (
          <h2 className="text-5xl font-bold mb-8">Contact</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {theme === "cybersecurity" ? (
              <div className="space-y-6 font-mono">
                <p className="text-green-400 text-xl">
                  <span className="text-green-500">$</span> Want to collaborate on a security project or need help with
                  a CTF challenge? Reach out to me through any of these channels.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:19manikandan2005@gmail.com"
                    className="flex items-center text-green-400 hover:text-green-300 transition-colors text-xl"
                  >
                    <Mail className="h-5 w-5 mr-3 text-green-500" />
                    19manikandan2005@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/19manikandan-m"
                    className="flex items-center text-green-400 hover:text-green-300 transition-colors text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5 mr-3 text-green-500" />
                    linkedin.com/in/19manikandan-m
                  </a>
                  <a
                    href="https://github.com/max-mani"
                    className="flex items-center text-green-400 hover:text-green-300 transition-colors text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5 mr-3 text-green-500" />
                    github.com/max-mani
                  </a>
                  <a
                    href="https://app.hackthebox.com/users/2176184"
                    className="flex items-center text-green-400 hover:text-green-300 transition-colors text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Terminal className="h-5 w-5 mr-3 text-green-500" />
                    HTB: manimarees (#2176184)
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-600 text-xl">
                  I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out
                  to me through any of these channels.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:19manikandan2005@gmail.com"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-xl"
                  >
                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                    19manikandan2005@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/19manikandan-m"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5 mr-3 text-gray-500" />
                    linkedin.com/in/19manikandan-m
                  </a>
                  <a
                    href="https://github.com/max-mani"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5 mr-3 text-gray-500" />
                    github.com/max-mani
                  </a>
                  <a
                    href="https://leetcode.com/u/marees_2115/"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code className="h-5 w-5 mr-3 text-gray-500" />
                    leetcode.com/u/marees_2115/
                  </a>
                </div>
              </div>
            )}
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className={
                    theme === "cybersecurity" ? "block mb-2 text-green-500 font-mono" : "block mb-2 text-gray-700"
                  }
                >
                  {theme === "cybersecurity" ? "> NAME:" : "Name"}
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className={
                    theme === "cybersecurity"
                      ? "bg-black border-green-500/50 text-green-400 font-mono placeholder:text-green-700"
                      : ""
                  }
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={
                    theme === "cybersecurity" ? "block mb-2 text-green-500 font-mono" : "block mb-2 text-gray-700"
                  }
                >
                  {theme === "cybersecurity" ? "> EMAIL:" : "Email"}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className={
                    theme === "cybersecurity"
                      ? "bg-black border-green-500/50 text-green-400 font-mono placeholder:text-green-700"
                      : ""
                  }
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={
                    theme === "cybersecurity" ? "block mb-2 text-green-500 font-mono" : "block mb-2 text-gray-700"
                  }
                >
                  {theme === "cybersecurity" ? "> MESSAGE:" : "Message"}
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  className={
                    theme === "cybersecurity"
                      ? "bg-black border-green-500/50 text-green-400 font-mono placeholder:text-green-700"
                      : ""
                  }
                  {...register("message", { required: "Message is required" })}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={
                  theme === "cybersecurity"
                    ? "bg-green-900/30 text-green-400 border border-green-500 hover:bg-green-900/50"
                    : ""
                }
              >
                {isSubmitting 
                  ? (theme === "cybersecurity" ? "SENDING..." : "Sending...")
                  : (theme === "cybersecurity" ? "SEND MESSAGE" : "Send Message")
                }
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
