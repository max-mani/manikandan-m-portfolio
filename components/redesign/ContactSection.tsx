'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Github,
  Linkedin,
  Code2,
  ShieldCheck,
  Trophy,
  Smartphone,
  Send,
  MapPin,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';
import { contact } from '@/data/portfolio';
import { SectionHeading } from './SectionHeading';
import { GlowCard } from './GlowCard';

const socialLinks: Array<{
  key: keyof typeof contact.social | string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: 'cyan' | 'violet' | 'green' | 'magenta';
}> = [
  { key: 'github', label: 'GitHub', Icon: Github, accent: 'cyan' },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin, accent: 'cyan' },
  { key: 'leetcode', label: 'LeetCode', Icon: Code2, accent: 'violet' },
  { key: 'hackthebox', label: 'HackTheBox', Icon: ShieldCheck, accent: 'green' },
  { key: 'tryhackme', label: 'TryHackMe', Icon: Trophy, accent: 'magenta' },
  { key: 'playstore', label: 'Play Store', Icon: Smartphone, accent: 'violet' },
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'sending') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('All fields are required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setErrorMsg(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_8kgavdi';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_4v43kj4';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'OgllbSbTWCBD5wrFd';

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: contact.email,
        },
        publicKey
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('Transmission failed. Try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">
        <SectionHeading
          eyebrow="> ./contact --secure"
          title="Let's Build Something"
          description="Open to internships, freelance work, security research, hackathons, and Friday-night project pings. Drop a line — I read everything."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <GlowCard accent="cyan" className="h-full">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                Send a transmission
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Encrypted via EmailJS. Replies usually within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.25em] uppercase text-cyan-300/85 mb-1.5"
                  >
                    &gt; Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="agent_07"
                    autoComplete="name"
                    className="w-full px-4 py-2.5 rounded-md bg-[#0a0c1a] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_18px_rgba(0,229,255,0.25)] transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.25em] uppercase text-cyan-300/85 mb-1.5"
                  >
                    &gt; Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.tld"
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-md bg-[#0a0c1a] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_18px_rgba(0,229,255,0.25)] transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.25em] uppercase text-cyan-300/85 mb-1.5"
                  >
                    &gt; Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, role, or idea..."
                    className="w-full px-4 py-2.5 rounded-md bg-[#0a0c1a] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-fuchsia-400/60 focus:shadow-[0_0_18px_rgba(168,85,247,0.25)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 rounded-md border border-cyan-400/60 bg-cyan-400/10 text-cyan-200 text-sm font-[family-name:var(--font-share-tech-mono)] tracking-wide hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(0,229,255,0.45)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Transmitting…
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send transmission
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-sm text-emerald-300 font-[family-name:var(--font-share-tech-mono)]">
                    <CheckCircle2 size={14} /> Transmission successful — I&apos;ll get back to you soon.
                  </div>
                )}
                {status === 'error' && errorMsg && (
                  <div className="flex items-center gap-2 text-sm text-red-300 font-[family-name:var(--font-share-tech-mono)]">
                    <XCircle size={14} /> {errorMsg}
                  </div>
                )}
              </form>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="space-y-5"
          >
            <GlowCard accent="violet">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-fuchsia-400/45 bg-fuchsia-400/10 text-fuchsia-300 flex-shrink-0">
                  <Mail size={16} />
                </span>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.3em] uppercase text-fuchsia-300/85">
                    Email
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block mt-1 text-base font-medium text-white hover:text-cyan-300 transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </GlowCard>

            <GlowCard accent="cyan">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cyan-400/50 bg-cyan-400/10 text-cyan-300 flex-shrink-0">
                  <MapPin size={16} />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.3em] uppercase text-cyan-300/85">
                    Location
                  </p>
                  <p className="mt-1 text-base text-white">Madurai · Coimbatore · Chennai, India</p>
                  <p className="text-xs text-white/45 mt-0.5 font-[family-name:var(--font-share-tech-mono)]">
                    Open to relocation · Remote-friendly
                  </p>
                </div>
              </div>
            </GlowCard>

            <GlowCard accent="mixed">
              <p className="font-[family-name:var(--font-share-tech-mono)] text-[0.7rem] tracking-[0.3em] uppercase text-cyan-300/85 mb-3">
                Find me elsewhere
              </p>
              <ul className="grid grid-cols-2 gap-2.5">
                {socialLinks.map(({ key, label, Icon, accent }) => {
                  const href = (contact.social as Record<string, string | undefined>)[key as string];
                  if (!href) return null;
                  return (
                    <li key={String(key)}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                          'flex items-center gap-2 px-3 py-2 rounded-md border bg-white/[0.02] text-sm transition-all',
                          accent === 'cyan' &&
                            'border-cyan-400/25 text-white/85 hover:border-cyan-400/55 hover:text-cyan-200 hover:bg-cyan-400/10',
                          accent === 'violet' &&
                            'border-fuchsia-400/25 text-white/85 hover:border-fuchsia-400/55 hover:text-fuchsia-200 hover:bg-fuchsia-400/10',
                          accent === 'green' &&
                            'border-emerald-400/25 text-white/85 hover:border-emerald-400/55 hover:text-emerald-200 hover:bg-emerald-400/10',
                          accent === 'magenta' &&
                            'border-pink-400/25 text-white/85 hover:border-pink-400/55 hover:text-pink-200 hover:bg-pink-400/10',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <Icon size={14} />
                        <span>{label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
