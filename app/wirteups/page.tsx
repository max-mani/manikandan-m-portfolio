import WriteupsNavbar from '@/components/writeups/Navbar'
import { getAllEvents } from '@/lib/writeups/events'
import { ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'

export default function WriteupsHomePage() {
  const events = getAllEvents()
  const totalChallenges = events.reduce((sum, e) => sum + e.totalChallenges, 0)
  const totalPoints = events.reduce((sum, e) => sum + e.totalPoints, 0)

  return (
    <div className="min-h-screen bg-background">
      <WriteupsNavbar />

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8">
            <Shield className="text-primary" size={20} />
            <span className="text-primary font-mono text-sm">CTF Team ZERO</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">ZERO</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
              KICTF 2026
            </span>
            <br />
            <span className="text-foreground">Writeups</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Explore detailed writeups from CTF events. Start by picking an event, then dive into its
            categories and challenges across Cryptography, Forensics, OSINT, AI/ML, and more.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-12 max-w-md">
            <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
              <div className="text-3xl font-bold text-primary">{totalChallenges}</div>
              <div className="text-sm text-muted-foreground">Challenges</div>
            </div>
            <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
              <div className="text-3xl font-bold text-primary">{events.length}</div>
              <div className="text-sm text-muted-foreground">Events</div>
            </div>
            <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
              <div className="text-3xl font-bold text-primary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
          </div>

          <Link href="#events" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all group">
            Browse Events
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>

      <section id="events" className="relative py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">CTF Events</h2>
            <p className="text-muted-foreground">
              Pick an event to see its challenge categories and detailed writeups.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/wirteups/event/${event.slug}`}
                className="group relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-accent/10 transition-all pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-xs font-mono text-muted-foreground mb-2">
                    ctf://event/{event.slug}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {event.name}
                  </h3>
                  {event.description && (
                    <p className="text-muted-foreground mb-4 flex-grow text-sm">
                      {event.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-auto text-xs font-mono text-muted-foreground">
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                      {event.totalChallenges} challenges
                    </span>
                    <span className="px-2 py-1 rounded bg-accent/10 text-accent">
                      {event.totalPoints} pts
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 bg-background/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-primary" size={24} />
                <span className="font-bold text-lg text-primary">Team ZERO</span>
              </div>
              <p className="text-muted-foreground text-sm">Hacker crew behind these CTF writeups.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/wirteups" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/wirteups/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Event</h4>
              <p className="text-sm text-muted-foreground">Select an event above to begin.</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Team ZERO. All writeups and solutions are for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
