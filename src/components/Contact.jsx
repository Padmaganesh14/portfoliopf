import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Copy, Check, Terminal, ArrowUp, Mail, MapPin } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { profileData } from '../data';

export default function Contact() {
  const formRef = useRef(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status when user edits to retry
    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { from_name, from_email, subject, message } = formData;

    // 1. Validation for required fields
    if (!from_name.trim() || !from_email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error');
      setFeedbackMessage('Please fill in all required fields.');
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setFeedbackMessage('');

    // Environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_dgdrjys';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      const templateParams = {
        from_name: from_name.trim(),
        from_email: from_email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        reply_to: from_email.trim(),
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });

      setStatus('success');
      setFeedbackMessage("Message sent successfully. I'll get back to you soon.");
      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error('EmailJS Submission Error:', err);
      setStatus('error');
      setFeedbackMessage('Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center scroll-mt-20">
      <div className="container mx-auto px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="section-tag">
            <Terminal size={13} />
            <span>./contact.sh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display uppercase">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Open for cloud engineering roles, internships, hackathon collaborations, and innovative full-stack development projects.
          </p>
        </div>

        {/* 2-Column Minimal Contact Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Identity Card */}
            <div className="rounded-2xl p-6 bg-[#0D0D0D]/90 border border-white/[0.08]">
              <h3 className="text-xl font-bold text-white font-display mb-1">
                Padma Ganesh P
              </h3>
              <p className="text-xs font-mono text-[#8B5CF6] mb-4">
                Full Stack Developer • Cloud &amp; AWS • AI &amp; Automation
              </p>
              
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2 mb-2">
                <MapPin size={13} className="text-slate-500" />
                <span>{profileData.location} (Open to Remote / On-Site)</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="rounded-2xl p-6 bg-[#0D0D0D]/90 border border-white/[0.08]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-slate-500">DIRECT EMAIL</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-[#39FF88] bg-[#39FF88]/10 hover:bg-[#39FF88]/20 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${profileData.email}`}
                className="text-sm sm:text-base font-mono text-white hover:text-purple-300 transition-colors break-all"
              >
                {profileData.email}
              </a>
            </div>

            {/* Profiles */}
            <div className="rounded-2xl p-6 bg-[#0D0D0D]/90 border border-white/[0.08]">
              <div className="text-xs font-mono text-slate-500 mb-3">DEV PROFILES</div>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-3 py-2 border-white/[0.1] text-slate-200"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-3 py-2 border-white/[0.1] text-slate-200"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Form with EmailJS Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[#0D0D0D]/90 border border-white/[0.08]"
          >
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-6">
              I usually reply within 24 hours.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="from_name" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="from_name"
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Alex Smith"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050505] border border-white/[0.08] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="from_email" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    id="from_email"
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050505] border border-white/[0.08] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-400 mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Opportunity / Collaboration"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050505] border border-white/[0.08] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  placeholder="Hello Padma Ganesh, I saw your work on GrievancePilot and would love to connect..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050505] border border-white/[0.08] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none disabled:opacity-50"
                />
              </div>

              {/* Status Feedback Banners */}
              {status === 'success' && (
                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[#39FF88] text-xs font-mono flex items-center gap-2">
                  <Check size={14} className="shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <span className="font-bold shrink-0">✕</span>
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-xs sm:text-sm bg-white text-black hover:bg-slate-200 border-transparent font-bold font-mono transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

        {/* Minimal Footer */}
        <div className="mt-24 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Padma Ganesh P. Built with React &amp; Tailwind CSS.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </section>
  );
}
