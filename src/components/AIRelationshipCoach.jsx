import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComments, FaUsers, FaHandsHelping, FaLightbulb, FaCheckCircle } from 'react-icons/fa';

const COACH_TIPS = [
  {
    title: 'First Family Meeting Guidance',
    category: 'Family Advice',
    tip: 'Focus on mutual respect, family background, and lifestyle expectations during the first meetup. Keep conversations open and relaxed.',
    icon: <FaUsers className="text-blue-400" />
  },
  {
    title: 'Effective Chat Communication',
    category: 'Conversation Tip',
    tip: 'Ask open-ended questions about career ambitions, hobbies, and family values rather than standard single-word queries.',
    icon: <FaComments className="text-pink-400" />
  },
  {
    title: 'Sub-Caste & Cultural Harmony',
    category: 'Community Harmony',
    tip: 'Understanding family traditions between Aher Shimpi and Namdev Shimpi sub-castes fosters long-term harmony.',
    icon: <FaHeart className="text-[#800020]" />
  }
];

const AIRelationshipCoach = () => {
  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-[#800020]/20 border border-[#800020]/40 text-pink-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaHandsHelping className="text-pink-400" /> AI Relationship & Family Coach
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Expert Matrimonial & <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400">Family Guidance</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Practical advice and communication tips curated for Shimpi candidates and parents.
          </p>
        </div>

        {/* Coach Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {COACH_TIPS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 hover:border-pink-500/40 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-white pt-1">{item.title}</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                "{item.tip}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AIRelationshipCoach;
