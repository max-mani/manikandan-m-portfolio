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

const inputClass =
  'w-full px-3 py-2 bg-[#050a05] border-2 border-[#1a2e1a] text-[10px] text-[#e8f5e9] placeholder:text-[#4caf50]/40 focus:outline-none focus:border-[#00e5ff] shadow-[2px_2px_0_0_#1a2e1a] focus:shadow-[2px_2px_0_0_#00e5ff] transition-none';

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

const linkAccent: Record<
  'cyan' | 'violet' | 'green' | 'magenta',
  string
> = {
  cyan: 'border-[#1a2e1a] hover:border-[#00e5ff] hover:text-[#00e5ff] hover:shadow-[2px_2px_0_0_#00e5ff]',
  violet: 'border-[#1a2e1a] hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41]',
  green: 'border-[#1a2e1a] hover:border-[#4caf50] hover:text-[#4caf50] hover:shadow-[2px_2px_0_0_#4caf50]',
  magenta: 'border-[#1a2e1a] hover:border-[#ff00ff] hover:text-[#ff00ff] hover:shadow-[2px_2px_0_0_#ff00ff]',
};

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            transition={{ duration: 0.2, ease: [1, 0, 0, 1] }}
          >
            <GlowCard accent="cyan" className="h-full">
              <h3 className="text-[12px] font-bold text-[#00ff41]">Send a transmission</h3>
              <p className="mt-1 text-[10px] text-[#e8f5e9]/60">
                Encrypted via EmailJS. Replies usually within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <div>
                  <label htmlFor="name" className="term-label uppercase tracking-[0.15em]">
                    &gt; Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="agent_07"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="term-label uppercase tracking-[0.15em]">
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
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="term-label uppercase tracking-[0.15em]">
                    &gt; Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, role, or idea..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2 border-2 border-[#00e5ff] bg-[#0a140a] text-[#00e5ff] text-[10px] shadow-[2px_2px_0_0_#00e5ff] hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[2px_2px_0_0_#00ff41] disabled:opacity-50 disabled:cursor-not-allowed transition-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Transmitting…
                    </>
                  ) : (
                    <>
                      <Send size={12} /> Send transmission
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-[10px] text-[#4caf50]">
                    <CheckCircle2 size={12} /> Transmission successful — I&apos;ll get back to you soon.
                  </div>
                )}
                {status === 'error' && errorMsg && (
                  <div className="flex items-center gap-2 text-[10px] text-[#ff3d00]">
                    <XCircle size={12} /> {errorMsg}
                  </div>
                )}
              </form>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.2, delay: 0.05, ease: [1, 0, 0, 1] }}
            className="space-y-4"
          >
            <GlowCard accent="violet">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-[#00ff41] bg-[#0a140a] text-[#00ff41] shadow-[2px_2px_0_0_#00ff41] flex-shrink-0">
                  <Mail size={14} />
                </span>
                <div className="min-w-0">
                  <p className="text-[8px] tracking-[0.2em] uppercase text-[#4caf50]">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block mt-1 text-[10px] font-bold text-[#e8f5e9] hover:text-[#00e5ff] break-all transition-none"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </GlowCard>

            <GlowCard accent="cyan">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-[#00e5ff] bg-[#0a140a] text-[#00e5ff] shadow-[2px_2px_0_0_#00e5ff] flex-shrink-0">
                  <MapPin size={14} />
                </span>
                <div>
                  <p className="text-[8px] tracking-[0.2em] uppercase text-[#4caf50]">Location</p>
                  <p className="mt-1 text-[10px] text-[#e8f5e9]">
                    Madurai · Coimbatore · Chennai, India
                  </p>
                  <p className="text-[8px] text-[#4caf50] mt-0.5">
                    Open to relocation · Remote-friendly
                  </p>
                </div>
              </div>
            </GlowCard>

            <GlowCard accent="mixed">
              <p className="text-[8px] tracking-[0.2em] uppercase text-[#4caf50] mb-2">
                Find me elsewhere
              </p>
              <ul className="grid grid-cols-2 gap-2">
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
                          'flex items-center gap-2 px-2 py-2 border-2 bg-[#050a05] text-[10px] text-[#e8f5e9]/85 shadow-[2px_2px_0_0_#1a2e1a] transition-none',
                          linkAccent[accent],
                        ].join(' ')}
                      >
                        <Icon size={12} className="shrink-0" />
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
