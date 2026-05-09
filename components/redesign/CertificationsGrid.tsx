'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, Loader2 } from 'lucide-react';
import { certifications } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

export function CertificationsGrid() {
  return (
    <section id="certs" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./certifications --list"
          title="Certifications"
          description="Industry credentials I've earned (and one I'm actively earning right now)."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {certifications.map((cert, idx) => {
            const inProgress = (cert.status || '').toLowerCase().includes('progress');
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <GlowCard accent={idx === 0 ? 'cyan' : idx === 1 ? 'violet' : 'magenta'} className="h-full">
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        'inline-flex h-10 w-10 items-center justify-center rounded-md border flex-shrink-0',
                        inProgress
                          ? 'border-amber-400/45 bg-amber-400/10 text-amber-300'
                          : 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
                      ].join(' ')}
                    >
                      {inProgress ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <BadgeCheck size={16} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] text-base md:text-lg font-bold text-white leading-tight">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-cyan-300/85 font-[family-name:var(--font-share-tech-mono)] mt-0.5">
                        {cert.issuer} · {cert.date}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {cert.level && (
                          <span className="px-2 py-0.5 rounded text-[0.65rem] font-[family-name:var(--font-share-tech-mono)] text-fuchsia-200 bg-fuchsia-500/10 border border-fuchsia-400/25">
                            {cert.level}
                          </span>
                        )}
                        {cert.status && (
                          <span
                            className={[
                              'px-2 py-0.5 rounded text-[0.65rem] font-[family-name:var(--font-share-tech-mono)]',
                              inProgress
                                ? 'text-amber-200 bg-amber-400/10 border border-amber-400/30'
                                : 'text-emerald-200 bg-emerald-400/10 border border-emerald-400/30',
                            ].join(' ')}
                          >
                            {cert.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {cert.description && (
                    <p className="mt-4 text-sm text-white/70 leading-relaxed line-clamp-4">
                      {cert.description}
                    </p>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-[family-name:var(--font-share-tech-mono)] text-cyan-300 hover:text-cyan-200"
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
