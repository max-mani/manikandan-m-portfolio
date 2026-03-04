import { getChallengeBySlug, getAllChallenges } from '@/lib/writeups/events'
import WriteupsNavbar from '@/components/writeups/Navbar'
import WriteupsMarkdownContent from '@/components/writeups/MarkdownContent'
import WriteupsFlagDisplay from '@/components/writeups/FlagDisplay'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const challenge = getChallengeBySlug(slug)
  return {
    title: `${challenge?.title ?? 'Challenge'} - ZERO KICTF 2026`,
    description: challenge?.excerpt ?? 'CTF challenge writeup',
  }
}

export function generateStaticParams() {
  const challenges = getAllChallenges()
  return challenges.map(c => ({ slug: c.slug }))
}

export default async function WriteupsChallengePage({ params }: PageProps) {
  const { slug } = await params
  const challenge = getChallengeBySlug(slug)

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background">
        <WriteupsNavbar />
        <div className="pt-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Challenge not found</h1>
            <Link href="/wirteups" className="text-primary hover:text-accent transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const categorySlug = challenge.category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return (
    <div className="min-h-screen bg-background">
      <WriteupsNavbar />

      <div className="relative pt-32 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/wirteups" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link
              href={`/wirteups/event/${challenge.eventSlug}`}
              className="hover:text-primary transition-colors"
            >
              {challenge.eventName}
            </Link>
            <span>/</span>
            <Link
              href={`/wirteups/event/${challenge.eventSlug}/category/${categorySlug}`}
              className="hover:text-primary transition-colors"
            >
              {challenge.category}
            </Link>
            <span>/</span>
            <span className="text-primary">{challenge.title}</span>
          </div>

          <h1 className="text-5xl font-bold text-primary mb-6">{challenge.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              {challenge.category}
            </span>
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-mono font-semibold">
              {challenge.points} points
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-mono text-muted-foreground mb-2">Flag</h3>
            <WriteupsFlagDisplay flag={challenge.flag} />
          </div>
        </div>
      </div>

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <WriteupsMarkdownContent content={challenge.content} />
        </div>
      </article>

      <section className="py-12 px-4 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href={`/wirteups/event/${challenge.eventSlug}/category/${categorySlug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            Back to {challenge.category}
          </Link>
          <Link
            href="/wirteups"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group"
          >
            All Challenges
            <ArrowLeft className="group-hover:translate-x-1 transition-transform rotate-180" size={20} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 bg-background/50">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Team ZERO. All writeups and solutions are for educational purposes.</p>
        </div>
      </footer>
    </div>
  )
}
