'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { GlitchEffect } from '../effects/GlitchEffect';

export function MessageButton() {
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    // Email validation
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
      
      // Reset success message after 3 seconds
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setSubmitStatus('idle');
  };

  return (
    <div className="w-full">
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-3 rounded-lg shadow-lg transition-colors text-sm md:text-base flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {mounted && <MessageSquare size={18} />}
        <GlitchEffect>
          Message
        </GlitchEffect>
      </motion.button>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-400 mb-2">
                <GlitchEffect>
                  Name <span className="text-red-400">*</span>
                </GlitchEffect>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] border-2 border-cyan-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-400 mb-2">
                <GlitchEffect>
                  Email <span className="text-red-400">*</span>
                </GlitchEffect>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] border-2 border-cyan-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-green-400 mb-2">
                <GlitchEffect>
                  Message <span className="text-red-400">*</span>
                </GlitchEffect>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] border-2 border-cyan-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {!formData.name.trim() || !formData.email.trim() || !formData.message.trim()
                  ? 'Please fill in all required fields.'
                  : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                  ? 'Please enter a valid email address.'
                  : 'Failed to send message. Please try again.'}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <GlitchEffect>
                    Sending...
                  </GlitchEffect>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <GlitchEffect>
                    Send Message
                  </GlitchEffect>
                </>
              )}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
