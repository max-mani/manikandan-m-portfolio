'use client';

import React, { useState, useCallback } from 'react';
import { useChaosFreezeStore } from '@/lib/chaosFreezeStore';
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
  type GithubActivityPreview,
} from './BlogWriteupsPreview';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { BodyMode } from './BodyMode';
import { Preloader } from '@/components/Preloader';
import { TerminalCommandBackdrop } from '@/components/shared/TerminalCommandBackdrop';
import {
  FloatingTerminal,
  FloatingTerminalLauncher,
} from '@/components/floating-terminal/FloatingTerminal';

interface HomeClientProps {
  posts: BlogPostPreview[];
  events: EventPreview[];
  activity: GithubActivityPreview[];
}

export function HomeClient({ posts, events, activity }: HomeClientProps) {
  const [bootDone, setBootDone] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const chaosActive = useChaosFreezeStore((s) => s.chaosActive);

  const onBootDone = useCallback(() => setBootDone(true), []);
  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  return (
    <>
      <BodyMode />
      {!bootDone && <Preloader onDone={onBootDone} />}
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
        <BlogWriteupsPreview posts={posts} events={events} activity={activity} />
        <ContactSection />
      </main>

      <Footer />

      {!terminalOpen && !chaosActive && <FloatingTerminalLauncher onOpen={openTerminal} />}
      <FloatingTerminal open={terminalOpen} onClose={closeTerminal} />
    </>
  );
}
