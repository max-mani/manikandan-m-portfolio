import Link from 'next/link'
import type { CategoryData } from '@/lib/writeups/events'
import { ChevronRight } from 'lucide-react'

interface CategoryCardProps {
  category: CategoryData
  href?: string
}

export default function WriteupsCategoryCard({ category, href }: CategoryCardProps) {
  const categoryIcon: Record<string, string> = {
    'misc': '🔧',
    'forensics': '🔬',
    'crypto': '🔐',
    'ai / machine learning': '🤖',
    'osint': '🕵️',
    'web': '🌐',
    'pwn': '⚔️',
    'reverse engineering': '🔍',
  }

  const icon = categoryIcon[category.name.toLowerCase()] || '⚙️'

  const linkHref = href ?? `/wirteups/event/${category.challenges[0]?.eventSlug}/category/${category.slug}`

  return (
    <Link href={linkHref}>
      <div className="group relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">{icon}</div>
            <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {category.name}
          </h3>
          <p className="text-muted-foreground mb-4 flex-grow text-sm">
            {category.challenges.length} challenge{category.challenges.length !== 1 ? 's' : ''}
          </p>
          <div className="inline-block">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono">
              {category.totalPoints} pts
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
