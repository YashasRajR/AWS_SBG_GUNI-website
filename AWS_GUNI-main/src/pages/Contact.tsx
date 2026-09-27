/*
=========================================================================
SECTION: Contact (Information, Campus Node Map, Reach Out Form)
/*
=========================================================================
SECTION: Contact (Information, Campus Node Map, Reach Out Form)
Edit the text/images below. Do not change the tags/classes.
=========================================================================
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, CheckCircle, Mail, Copy, Check 
} from 'lucide-react';
import { FaqSection } from '../components/ui/FaqSection';
import { FloatInText } from '../components/ui/FloatInText';


export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    department: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.branch || !formData.department || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);

    const subject = `[AWS SBG GUNI] Query from ${formData.name} (${formData.branch} - ${formData.department})`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nBranch: ${formData.branch}\nDepartment: ${formData.department}\n\nQuery:\n${formData.message}`;

    // 1. Send via background form endpoint to aws.sbg@ganpatuniversity.ac.in
    try {
      await fetch('https://formsubmit.co/ajax/aws.sbg@ganpatuniversity.ac.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          branch: formData.branch,
          department: formData.department,
          query: formData.message,
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch {
      // Fallback silently if offline or blocked
    }

    // 2. Also construct and invoke mailto as a direct client fallback
    try {
      const mailtoUrl = `mailto:aws.sbg@ganpatuniversity.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUrl;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
    } catch {
      // Fallback
    }

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="relative pt-24 pb-16 font-sans">
      {/* Background stardust glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffaa00]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins uppercase text-left w-full block whitespace-pre-wrap break-words">
          <span className="bg-gradient-to-b from-[#190a2b] to-[#d6aeff] bg-clip-text text-transparent inline-block pb-1">
            <FloatInText text="CONNECT WITH SBG" />
          </span>
        </h1>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base text-left">
          
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* FAQ (Left Column) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <FaqSection />
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="glass rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative space-y-6 h-full flex flex-col justify-center"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-white font-heading">
                        Sender Details
                      </h3>
                      <span className="text-[11px] font-mono text-[#c084fc] bg-[#a855f7]/15 border border-[#a855f7]/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                        Direct to aws.sbg@ganpatuniversity.ac.in
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      All queries submitted here are sent directly to{' '}
                      <a
                        href="mailto:aws.sbg@ganpatuniversity.ac.in"
                        className="text-[#c084fc] font-semibold hover:underline"
                      >
                        aws.sbg@ganpatuniversity.ac.in
                      </a>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Your Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Aryan Dave"
                          className="w-full px-4 py-3 rounded-lg bg-[#190a2b]/30 border border-[#a855f7]/20 text-white placeholder-slate-500 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] focus:bg-[#190a2b]/50 transition-all font-sans backdrop-blur-sm"
                          required
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. student@gnu.ac.in"
                          className="w-full px-4 py-3 rounded-lg bg-[#190a2b]/30 border border-[#a855f7]/20 text-white placeholder-slate-500 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] focus:bg-[#190a2b]/50 transition-all font-sans backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Branch</label>
                        <input
                          type="text"
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          placeholder="e.g. B.Tech"
                          className="w-full px-4 py-3 rounded-lg bg-[#190a2b]/30 border border-[#a855f7]/20 text-white placeholder-slate-500 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] focus:bg-[#190a2b]/50 transition-all font-sans backdrop-blur-sm"
                          required
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Department</label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          placeholder="e.g. CSE"
                          className="w-full px-4 py-3 rounded-lg bg-[#190a2b]/30 border border-[#a855f7]/20 text-white placeholder-slate-500 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] focus:bg-[#190a2b]/50 transition-all font-sans backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Your Query</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write details of your query or membership applications here..."
                        className="w-full px-4 py-3 rounded-lg bg-[#190a2b]/30 border border-[#a855f7]/20 text-white placeholder-slate-500 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] focus:bg-[#190a2b]/50 transition-all font-sans resize-none backdrop-blur-sm"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-[#a855f7] to-[#d946ef] hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all gap-2 active:scale-95 border-none cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Query...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Query</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-6 sm:p-8 border border-[#a855f7]/30 shadow-2xl text-center space-y-5 h-full flex flex-col justify-center items-center"
                >
                  <CheckCircle className="w-14 h-14 text-[#a855f7] text-glow-purple" />
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-heading">Query Sent Successfully</h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-md">
                      Thank you <span className="font-semibold text-white">{formData.name}</span>. Your query has been directed to{' '}
                      <span className="text-[#c084fc] font-mono font-semibold">aws.sbg@ganpatuniversity.ac.in</span>.
                    </p>
                    <p className="text-xs text-slate-400">
                      We will review and reply to <span className="text-[#e9d5ff] font-medium">{formData.email}</span> shortly.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#d8b4fe] rounded-xl text-xs font-mono">
                    Recipient: <span className="text-white font-semibold">aws.sbg@ganpatuniversity.ac.in</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-1">
                    <a
                      href={`mailto:aws.sbg@ganpatuniversity.ac.in?subject=${encodeURIComponent(`[AWS SBG GUNI] Query from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nBranch: ${formData.branch}\nDepartment: ${formData.department}\n\nQuery:\n${formData.message}`)}`}
                      className="flex-1 px-4 py-2.5 rounded-full bg-[#a855f7] hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#a855f7]/30 transition-all cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Mail App</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('aws.sbg@ganpatuniversity.ac.in');
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                      }}
                      className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a855f7] text-slate-200 text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', branch: '', department: '', message: '' });
                    }}
                    className="text-xs text-slate-400 hover:text-white underline transition-colors pt-1 cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
};
