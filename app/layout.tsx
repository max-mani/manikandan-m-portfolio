import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Manikandan M - Portfolio",
  description: "Software Engineer & Cybersecurity Specialist",
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tmp_906cc714-df9c-43cd-ae43-ddcb23359be5-f7TXD45HUFxix0pxV1pv1ZPMhewAj7.jpeg",
        type: "image/jpeg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
