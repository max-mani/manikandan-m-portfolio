'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import avatar from '@/app/icon.jpg'

export default function WriteupsNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50 backdrop-blur-sm bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/wirteups" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/60 shadow-lg shadow-primary/30">
              <Image
                src={avatar}
                alt="Maxim"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg text-primary group-hover:text-accent transition-colors">
              Maxim
            </span>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link
              href="/wirteups"
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
            <Link
              href="/wirteups/categories"
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
            <Link
              href="/wirteups/team"
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/wirteups"
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/wirteups/categories"
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/wirteups/team"
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
