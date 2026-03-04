import WriteupsNavbar from '@/components/writeups/Navbar'
import { getAllCategories } from '@/lib/writeups/events'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = getAllCategories()
  const category = categories.find(c => c.slug === slug)
  return {
    title: category ? `${category.name} – CTF category` : 'CTF category – challenges',
    description:
      category != null
        ? `All CTF challenges in the ${category.name} category across your events.`
        : 'CTF challenges for this category.',
  }
}

export function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(c => ({ slug: c.slug }))
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const categories = getAllCategories()
  const category = categories.find(c => c.slug === slug)

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <WriteupsNavbar />
        <div className="pt-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Category not found</h1>
            <Link href="/wirteups/categories" className="text-primary hover:text-accent transition-colors">
              ← Back to categories
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <WriteupsNavbar />

      <div className="relative pt-32 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/wirteups/categories"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to categories
          </Link>
          <h1 className="text-5xl font-bold text-primary mb-4">{category.name}</h1>
          <p className="text-muted-foreground text-lg">
            {category.challenges.length} challenge
            {category.challenges.length !== 1 ? 's' : ''} • {category.totalPoints} points
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {category.challenges.map(challenge => (
              <Link
                key={challenge.slug}
                href={`/wirteups/challenge/${challenge.slug}`}
              >
                <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:bg-card/80">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-accent/5 transition-all pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        {challenge.points} pts • {challenge.eventName}
                      </div>
                      <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {challenge.excerpt}
                      </p>
                    </div>
                    <ChevronRight
                      className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all mt-2 flex-shrink-0 ml-4"
                      size={24}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

