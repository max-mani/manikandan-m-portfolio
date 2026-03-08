'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { contact } from '@/data/portfolio';

interface MessageModalProps {
  onClose: () => void;
}

export function MessageModal({ onClose }: MessageModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_8kgavdi';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_4v43kj4';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'OgllbSbTWCBD5wrFd';

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: contact.email,
      }, publicKey);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[4000] flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-[400px] max-w-[90vw] relative"
        style={{
          background: '#050505',
          border: '1px solid rgba(0,229,255,0.4)',
          boxShadow: '0 0 40px rgba(0,255,65,0.15)',
          padding: '26px 30px',
          fontFamily: 'var(--font-share-tech-mono)',
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-[var(--gdim)] hover:text-[var(--r)] transition-colors text-[0.7rem]"
          aria-label="Close message form"
        >
          [ X ]
        </button>

        <h2
          className="text-[var(--m)] text-[1.45rem] mb-4 font-[var(--font-vt323)]"
        >
          &gt;&gt; SEND MESSAGE
        </h2>

        {submitStatus === 'success' ? (
          <div className="space-y-2">
            <p className="text-[#00ff88] text-[0.85rem]">&gt;&gt; TRANSMISSION SUCCESSFUL</p>
            <p className="text-[var(--gdim)] text-[0.73rem]">
              Expect a response within 24 hours.
            </p>
          </div>
        ) : submitStatus === 'error' ? (
          <p className="text-[var(--r)] text-[0.73rem]">&gt;&gt; TRANSMISSION FAILED</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="msg-name"
                className="block text-[var(--gdim)] text-[0.67rem] mb-1"
              >
                &gt; YOUR NAME
              </label>
              <input
                id="msg-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-[#010f03] border border-[var(--border)] text-[var(--g)] text-[0.73rem] focus:outline-none focus:border-[var(--g)] focus:shadow-[0_0_6px_var(--gglow)]"
                placeholder="Your handle"
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="msg-email"
                className="block text-[var(--gdim)] text-[0.67rem] mb-1"
              >
                &gt; EMAIL
              </label>
              <input
                id="msg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-[#010f03] border border-[var(--border)] text-[var(--g)] text-[0.73rem] focus:outline-none focus:border-[var(--g)] focus:shadow-[0_0_6px_var(--gglow)]"
                placeholder="you@domain.tld"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="msg-message"
                className="block text-[var(--gdim)] text-[0.67rem] mb-1"
              >
                &gt; MESSAGE
              </label>
              <textarea
                id="msg-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-[#010f03] border border-[var(--border)] text-[var(--g)] text-[0.73rem] focus:outline-none focus:border-[var(--g)] focus:shadow-[0_0_6px_var(--gglow)] resize-none"
                placeholder="Drop your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 border border-[var(--m)] text-[var(--m)] text-[0.73rem] hover:bg-[rgba(255,0,255,0.07)] disabled:opacity-60 transition-colors"
            >
              [ TRANSMIT ]
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
