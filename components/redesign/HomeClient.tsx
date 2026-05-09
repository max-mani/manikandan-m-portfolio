'use client';

import React, { useState, useCallback } from 'react';
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
import { BodyMode } from './BodyMode';
import { BootOverlay } from '@/components/home/BootOverlay';
import { TerminalCommandBackdrop } from '@/components/shared/TerminalCommandBackdrop';
import {
  FloatingTerminal,
  FloatingTerminalLauncher,
} from '@/components/floating-terminal/FloatingTerminal';

interface HomeClientProps {
  posts: BlogPostPreview[];
  events: EventPreview[];
}

export function HomeClient({ posts, events }: HomeClientProps) {
  const [bootDone, setBootDone] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const onBootDone = useCallback(() => setBootDone(true), []);
  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  return (
    <>
      <BodyMode />
      {!bootDone && <BootOverlay onDone={onBootDone} />}
      <TerminalCommandBackdrop />
      <Navbar onOpenTerminal={openTerminal} />

      <main className="relative z-[1]">
        <HeroSection onOpenTerminal={openTerminal} />
        <AboutSection />
        <SkillsBento />
        <ProjectsGrid />
        <ExperienceTimeline />
        <CTFShowcase />
        <CertificationsGrid />
        <BlogWriteupsPreview posts={posts} events={events} />
        <ContactSection />
      </main>

      <Footer />

      {!terminalOpen && <FloatingTerminalLauncher onOpen={openTerminal} />}
      <FloatingTerminal open={terminalOpen} onClose={closeTerminal} />
    </>
  );
}
