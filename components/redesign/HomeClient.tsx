'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { SkillsBento } from './SkillsBento';
import { ProjectsGrid } from './ProjectsGrid';
import { ExperienceTimeline } from './ExperienceTimeline';
import { CTFShowcase } from './CTFShowcase';
import { CertificationsGrid } from './CertificationsGrid';
import {
  BlogWriteupsPreview,
  type BlogPostPreview,
  type EventPreview,
} from './BlogWriteupsPreview';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import {
  FloatingTerminal,
  FloatingTerminalLauncher,
} from './FloatingTerminal';
import { BodyMode } from './BodyMode';
import { MessageModal } from '@/components/home/MessageModal';

interface HomeClientProps {
  posts: BlogPostPreview[];
  events: EventPreview[];
}

export function HomeClient({ posts, events }: HomeClientProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  return (
    <>
      <BodyMode mode="cyber" />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      <main className="relative">
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />
        <AboutSection />
        <SkillsBento />
        <ProjectsGrid />
        <ExperienceTimeline />
        <CTFShowcase />
        <CertificationsGrid />
        <BlogWriteupsPreview posts={posts} events={events} />
        <ContactSection />
      </main>

      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {!terminalOpen && (
        <FloatingTerminalLauncher onOpen={() => setTerminalOpen(true)} />
      )}
      <FloatingTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenMessage={() => setMessageOpen(true)}
      />

      {messageOpen && <MessageModal onClose={() => setMessageOpen(false)} />}
    </>
  );
}
