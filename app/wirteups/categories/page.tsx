import WriteupsNavbar from '@/components/writeups/Navbar'
import { getAllCategories } from '@/lib/writeups/events'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CTF categories – wirteups',
  description: 'Browse all CTF challenge categories across events and drill into specific writeups.',
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-background">
      <WriteupsNavbar />

      <div className="relative pt-32 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-primary mb-4">Categories</h1>
          <p className="text-muted-foreground text-lg">
            All CTF challenges you&apos;ve written up, grouped by category across events.
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/wirteups/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {category.name}
                </h2>
                <p className="text-muted-foreground mb-4 flex-grow text-sm">
                  {category.challenges.length} challenge
                  {category.challenges.length !== 1 ? 's' : ''} • {category.totalPoints} points
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>ctf://category/{category.slug}</span>
                  <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

