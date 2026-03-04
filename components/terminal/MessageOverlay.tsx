'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { GlitchEffect } from '@/components/effects/GlitchEffect';

interface MessageOverlayProps {
  onClose: () => void;
}

export function MessageOverlay({ onClose }: MessageOverlayProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_8kgavdi',
        'template_4v43kj4',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: '19manikandan2005@gmail.com',
        },
        'OgllbSbTWCBD5wrFd'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg mx-4 bg-[#050505] border border-cyan-500/40 rounded-xl shadow-[0_0_30px_rgba(0,255,65,0.3)] p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-cyan-400 hover:text-red-400 transition-colors"
          aria-label="Close message form"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="text-cyan-400" size={20} />
          <h2 className="text-xl font-bold text-cyan-400 glitch-text">
            <GlitchEffect>Send a secure message</GlitchEffect>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-green-400 mb-1">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-md text-green-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="Your handle"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono text-green-400 mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-md text-green-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="you@domain.tld"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono text-green-400 mb-1">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-cyan-500/40 rounded-md text-green-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none"
              placeholder="Drop your message or collaboration idea..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-black font-semibold text-xs md:text-sm hover:bg-green-400 disabled:opacity-60 transition-colors"
          >
            <Send size={16} />
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-xs text-green-400 mt-2">Message sent successfully. I will get back to you soon.</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-xs text-red-400 mt-2">
              Something went wrong. Make sure all fields are valid and try again.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

