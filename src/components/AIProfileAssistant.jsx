import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCheckCircle, FaStar, FaLightbulb, FaHeart, FaChartLine, FaMagic } from 'react-icons/fa';

const AIProfileAssistant = ({ profileStrength = 88 }) => {
  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="text-left space-y-1">
            <span className="px-3.5 py-1 bg-pink-500/10 border border-pink-500/30 text-pink-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <FaRobot className="text-pink-400" /> AI Profile Assistant 4.0
            </span>
            <h2 className="text-2xl font-serif font-black text-white">
              Profile Strength & Readiness Analysis
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-2xl">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Overall Score</span>
              <span className="text-xl font-black text-amber-400 font-mono">{profileStrength}%</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-lg font-black">
              <FaStar />
            </div>
          </div>
        </div>

        {/* AI Recommendations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-pink-500/40 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-base">
              <FaMagic />
            </div>
            <h3 className="text-sm font-bold text-white">Bio Suggestion</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              "Family-oriented IT Professional in Pune, seeking a life partner from Namdev Shimpi community who values culture and personal growth."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-base">
              <FaLightbulb />
            </div>
            <h3 className="text-sm font-bold text-white">Hobby Match Boost</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Add "Classical Music" or "Trekking" to your profile to increase compatibility matches by 24%.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-emerald-500/40 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-base">
              <FaChartLine />
            </div>
            <h3 className="text-sm font-bold text-white">Marriage Readiness</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Score: 92/100. Family details and sub-caste verification completed successfully.
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default AIProfileAssistant;
