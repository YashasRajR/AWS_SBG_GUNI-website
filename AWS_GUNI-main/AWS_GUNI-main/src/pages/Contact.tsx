import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, CheckCircle 
} from 'lucide-react';


export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Engineering',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    const subject = encodeURIComponent(`Contact Form: Query from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nDepartment: ${formData.department}\n\nMessage:\n${formData.message}`
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Connect With SBG
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
          
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="glass p-8 rounded-2xl border border-white/5 space-y-8 flex-1">
              <h3 className="text-xl font-bold text-white font-heading border-l-3 border-[#00f5ff] pl-3 leading-none text-glow-blue">
                Reach Out Channels
              </h3>
              
              <ul className="space-y-6 text-sm font-sans">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#ffaa00]/10 border border-[#ffaa00]/20 flex items-center justify-center text-[#ffaa00] shrink-0 mt-0.5 animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-heading mb-1">Campus Address</h4>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      AWS Student Builder Group, IT Building, UV Patel College of Engineering, Ganpat University Campus, Mehsana-Gandinagar Highway, Kherva, Gujarat, India - 384315.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-heading mb-1">Mailbox</h4>
                    <a href="mailto:aws.sbg@ganpatuniversity.ac.in" className="text-slate-400 hover:text-white transition-colors">
                      aws.sbg@ganpatuniversity.ac.in
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-heading mb-1">Contact Number</h4>
                    <a href="tel:+912762286080" className="text-slate-400 hover:text-white transition-colors">
                      +91 79849 61282
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Styled Campus Interactive Node Map */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-2xl h-[220px] relative group transition-all duration-300 hover:border-[#a855f7]/30">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.4540%2C23.5234%2C72.4640%2C23.5334&layer=mapnik&marker=23.5284%2C72.4590"
                className="w-full h-full border-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
                }}
                loading="lazy"
                title="Ganpat University Map Location"
              />
              
              {/* Bottom Interactive Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-2 border border-white/10 rounded-xl flex justify-between items-center z-10 pointer-events-none">
                <div className="flex flex-col">
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">GNU CAMPUS NODE</span>
                  <span className="text-xs text-white font-semibold">IT Building, UVPCE</span>
                </div>
                <div className="flex gap-2 pointer-events-auto">
                  <a
                    href="https://www.google.com/search?q=AWS+Student+Builder+Group+IT+Building+UV+Patel+College+of+Engineering+Ganpat+University+Campus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-[#a855f7] hover:bg-purple-600 text-[10px] font-bold text-white rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-[#a855f7]/20 cursor-pointer animate-pulse"
                    title="Open on Google Search (Workspace-safe, won't show permission blocked error)"
                  >
                    <span>Google Maps Search</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=23.5284,72.4590+(AWS+Student+Builder+Group,+IT+Building,+UV+Patel+College+of+Engineering)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-slate-900 border border-white/10 hover:border-[#a855f7] hover:bg-[#a855f7]/10 text-[10px] font-bold text-slate-300 hover:text-white rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Direct Link</span>
                  </a>
                </div>
              </div>
            </div>
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
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-600 focus:border-[#a855f7]/60 transition-all font-sans"
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
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-600 focus:border-[#a855f7]/60 transition-all font-sans"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Department / Stream</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white focus:border-[#a855f7]/60 transition-all select-none font-sans"
                      >
                        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Other Technology Branch">Other Technology Branch</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-sans font-semibold text-slate-300 uppercase tracking-wide">Your Query</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write details of your query or membership applications here..."
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-600 focus:border-[#a855f7]/60 transition-all font-sans resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full font-bold uppercase tracking-wider text-xs text-white bg-[#a855f7] hover:bg-purple-600 shadow-md shadow-[#a855f7]/25 hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
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
                      setFormData({ name: '', email: '', department: 'Computer Science & Engineering', message: '' });
                    }}
                    className="px-6 py-2.5 border border-white/10 hover:border-[#a855f7] text-slate-300 hover:text-white rounded-full font-bold uppercase tracking-wider text-xs transition-all cursor-pointer hover:bg-[#a855f7]/10"
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
