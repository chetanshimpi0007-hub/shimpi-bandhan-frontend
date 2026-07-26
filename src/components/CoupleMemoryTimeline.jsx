import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaComments, FaUsers, FaRing, FaHeart, FaGift } from 'react-icons/fa';

const MEMORY_STEPS = [
  { stage: '1. Interest Sent', date: 'Nov 12, 2025', desc: 'Ramesh sent express interest request on Shimpi Bandhan', icon: <FaPaperPlane className="text-pink-500" /> },
  { stage: '2. Interest Accepted', date: 'Nov 14, 2025', desc: 'Priya accepted mutual interest request', icon: <FaCheckCircle className="text-emerald-500" /> },
  { stage: '3. First Chat', date: 'Nov 15, 2025', desc: 'Connected on secure platform messaging', icon: <FaComments className="text-blue-500" /> },
  { stage: '4. Family Meeting', date: 'Dec 20, 2025', desc: 'Families met in person at Nashik gathering', icon: <FaUsers className="text-purple-500" /> },
  { stage: '5. Ring Ceremony', date: 'Feb 14, 2026', desc: 'Engagement celebrated with close relatives', icon: <FaRing className="text-amber-400" /> },
  { stage: '6. Wedding Day ❤️', date: 'May 18, 2026', desc: 'Married in traditional Shimpi ceremony', icon: <FaHeart className="text-rose-500" /> },
];

const CoupleMemoryTimeline = () => {
  return (
    <div className="w-full bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaHeart className="text-rose-400" /> Shimpi Couple Memory Timeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Priya & Ramesh <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">Journey Story</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            From first interest request on Shimpi Bandhan to their grand wedding day.
          </p>
        </div>

        {/* Horizontal / Vertical Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {MEMORY_STEPS.map((item, idx) => (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2.5 shadow-xl hover:border-pink-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400">{item.date}</span>
              </div>

              <h4 className="text-sm font-bold text-white pt-1">{item.stage}</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CoupleMemoryTimeline;
