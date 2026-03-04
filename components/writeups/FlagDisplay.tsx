'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface FlagDisplayProps {
  flag: string
}

export default function WriteupsFlagDisplay({ flag }: FlagDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(flag)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group relative w-full"
    >
      <div className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg font-mono text-sm text-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
        <div className="flex items-center justify-between">
          <span className="truncate">{flag}</span>
          {copied ? (
            <Check className="flex-shrink-0 ml-2 text-accent" size={18} />
          ) : (
            <Copy className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
          )}
        </div>
      </div>
    </button>
  )
}
