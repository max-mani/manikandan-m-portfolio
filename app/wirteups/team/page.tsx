import WriteupsNavbar from '@/components/writeups/Navbar'
import { Shield } from 'lucide-react'

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <WriteupsNavbar />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-primary" size={24} />
            <span className="text-sm font-mono text-primary/80">ctf://team/zero</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Team ZERO</h1>
          <p className="text-muted-foreground max-w-2xl mb-10">
            The squad behind these writeups. We break challenges apart, document everything, and leave
            a trail of neon-green flags behind.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-mono">
            <div className="rounded-lg border border-primary/40 bg-card/60 p-4 hover:border-primary transition-colors">
              <div className="text-terminal-green mb-1">Ragul Rabbit</div>
              <div className="text-muted-foreground">exploits / recon</div>
            </div>
            <div className="rounded-lg border border-primary/40 bg-card/60 p-4 hover:border-primary transition-colors">
              <div className="text-terminal-green mb-1">Peter</div>
              <div className="text-muted-foreground">crypto / forensics</div>
            </div>
            <div className="rounded-lg border border-primary/40 bg-card/60 p-4 hover:border-primary transition-colors">
              <div className="text-terminal-green mb-1">Maxim</div>
              <div className="text-muted-foreground">web / infra</div>
            </div>
            <div className="rounded-lg border border-primary/40 bg-card/60 p-4 hover:border-primary transition-colors">
              <div className="text-terminal-green mb-1">TheDumbGuy</div>
              <div className="text-muted-foreground">AI/ML / weird stuff</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

