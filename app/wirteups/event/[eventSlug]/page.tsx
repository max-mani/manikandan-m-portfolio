import WriteupsNavbar from '@/components/writeups/Navbar'
import WriteupsCategoryCard from '@/components/writeups/CategoryCard'
import { getEventBySlug, getAllEvents } from '@/lib/writeups/events'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ eventSlug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params
  const event = getEventBySlug(eventSlug)
  return {
    title: event ? `${event.name} – CTF writeups` : 'CTF event – writeups',
    description:
      event?.description ??
      'Browse CTF challenges, categories and writeups for this event.',
  }
}

export function generateStaticParams() {
  const events = getAllEvents()
  return events.map(e => ({ eventSlug: e.slug }))
}

export default async function EventPage({ params }: PageProps) {
  const { eventSlug } = await params
  const event = getEventBySlug(eventSlug)

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <WriteupsNavbar />
        <div className="pt-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Event not found</h1>
            <Link href="/wirteups" className="text-primary hover:text-accent transition-colors">
              ← Back to events
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
            href="/wirteups"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to events
          </Link>

          <h1 className="text-5xl font-bold text-primary mb-4">{event.name}</h1>
          {event.description && (
            <p className="text-muted-foreground text-lg mb-4">{event.description}</p>
          )}
          <p className="text-sm font-mono text-muted-foreground">
            {event.totalChallenges} challenges • {event.totalPoints} points
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Categories</h2>
            <p className="text-muted-foreground">
              Select a category to see all challenges from this event.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.categories.map(category => (
              <WriteupsCategoryCard
                key={category.slug}
                category={category}
                href={`/wirteups/event/${event.slug}/category/${category.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

