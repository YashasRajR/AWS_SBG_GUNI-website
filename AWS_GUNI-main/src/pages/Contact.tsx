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
  Send, CheckCircle 
} from 'lucide-react';
import { FaqSection } from '../components/ui/FaqSection';


export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    department: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.branch || !formData.department || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    const subject = encodeURIComponent(`Contact Form: Query from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nBranch: ${formData.branch}\nDepartment: ${formData.department}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:aws.sbg@ganpatuniversity.ac.in?subject=${subject}&body=${body}`;
    
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
            Connect With SBG
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
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-heading">
                      Sender Details
                    </h3>
                    <p className="text-xs text-slate-400">
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
                      className="w-full mt-4 px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-[#a855f7] to-[#d946ef] hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all gap-2 active:scale-95 border-none"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-8 border border-[#a855f7]/25 shadow-2xl text-center space-y-6 h-full flex flex-col justify-center items-center"
                >
                  <CheckCircle className="w-14 h-14 text-[#a855f7] animate-bounce text-glow-purple" />
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-heading">Message Sent</h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-md">
                      Thank you {formData.name}. Your message has been received. We will reply to <span className="text-[#d946ef]">{formData.email}</span> shortly.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-[#a855f7]/10 border border-[#a855f7]/25 text-[#a855f7] rounded-xl text-xs font-sans font-bold uppercase tracking-widest">
                    TRANSMISSION SUCCESSFUL
                  </div>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', branch: '', department: '', message: '' });
                    }}
                    className="px-8 min-h-[48px] flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-sm text-white bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-[#a855f7] hover:bg-white/10 transition-all gap-2 active:scale-95"
                  >
                    Open New Connection
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
