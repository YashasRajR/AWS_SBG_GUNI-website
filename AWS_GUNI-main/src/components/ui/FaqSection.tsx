import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "Who can join the AWS Student Builder Group?",
    answer: "Any student from Ganpat University with an interest in cloud computing, AWS, or technology in general can join! Whether you're a beginner or have some experience, you are welcome."
  },
  {
    question: "Do I need prior AWS or cloud experience?",
    answer: "Not at all! Our events range from beginner-friendly '101' workshops to advanced technical deep dives. We are here to learn together."
  },
  {
    question: "Are the events and workshops free?",
    answer: "Yes, all our events, workshops, and study sessions are completely free for students."
  },
  {
    question: "How can I become a core team member?",
    answer: "We typically open applications for core team positions at the start of the academic year. Keep an eye on our social media and Meetup page for recruitment announcements!"
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col h-full justify-center">
      <div className="text-left mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Frequently Asked Questions</h2>
        <p className="text-slate-400 mt-2 text-sm">Got questions? We've got answers.</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className="border border-white/10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
            >
              <span className="font-semibold text-white/90 text-sm sm:text-base">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 sm:p-5 pt-0 text-slate-300 text-sm leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
