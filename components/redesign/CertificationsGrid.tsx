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
                transition={{ duration: 0.15, delay: idx * 0.04, ease: [1, 0, 0, 1] }}
              >
                <GlowCard accent={idx === 0 ? 'cyan' : idx === 1 ? 'violet' : 'magenta'} className="h-full">
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        'inline-flex h-9 w-9 items-center justify-center border-2 flex-shrink-0',
                        inProgress
                          ? 'border-[#ffb300] bg-[#0a140a] text-[#ffb300] shadow-[2px_2px_0_0_#ffb300]'
                          : 'border-[#4caf50] bg-[#0a140a] text-[#4caf50] shadow-[2px_2px_0_0_#4caf50]',
                      ].join(' ')}
                    >
                      {inProgress ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <BadgeCheck size={14} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[12px] font-bold text-[#00ff41] leading-tight">{cert.name}</h3>
                      <p className="text-[10px] text-[#4caf50] mt-0.5">
                        {cert.issuer} · {cert.date}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cert.level && (
                          <span className="px-1.5 py-0.5 text-[8px] text-[#00e5ff] bg-[#050a05] border border-[#1a2e1a]">
                            {cert.level}
                          </span>
                        )}
                        {cert.status && (
                          <span
                            className={[
                              'px-1.5 py-0.5 text-[8px] border',
                              inProgress
                                ? 'text-[#ffb300] border-[#ffb300] bg-[#0a140a]'
                                : 'text-[#4caf50] border-[#4caf50] bg-[#0a140a]',
                            ].join(' ')}
                          >
                            {cert.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {cert.description && (
                    <p className="mt-3 text-[10px] text-[#e8f5e9]/70 leading-[2em] line-clamp-4">
                      {cert.description}
                    </p>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-[10px] text-[#00e5ff] hover:text-[#00ff41] transition-none"
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
