import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeart, FaGraduationCap, FaBriefcase, FaHome, FaSmile, FaMapMarkerAlt, FaComments, FaStar, FaChartLine } from 'react-icons/fa';

const MATCH_CATEGORIES = [
  { label: 'Sub-Caste & Community', score: 98, icon: <FaHeart className="text-pink-500" /> },
  { label: 'Education & Academics', score: 92, icon: <FaGraduationCap className="text-blue-500" /> },
  { label: 'Profession & Career', score: 88, icon: <FaBriefcase className="text-purple-500" /> },
  { label: 'Family Values & Background', score: 95, icon: <FaHome className="text-emerald-500" /> },
  { label: 'Lifestyle & Hobbies', score: 85, icon: <FaSmile className="text-amber-500" /> },
  { label: 'City & Location Preference', score: 90, icon: <FaMapMarkerAlt className="text-rose-500" /> },
];

const AIMatchCompatibility = ({ matchPercentage = 94, partnerName = "Priya Shimpi" }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="w-full bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      {/* Ambient Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#800020]/20 via-pink-500/15 to-amber-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 bg-[#800020]/20 border border-[#800020]/40 text-pink-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaBrain className="text-pink-400 animate-pulse" /> AI Compatibility Engine 3.0
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Match Analysis for <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400">{partnerName}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Deep multi-dimensional compatibility scoring calculated across 12 lifestyle and family attributes.
          </p>
        </div>

        {/* Main Grid: Circular Progress Ring + Category Score Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Overall Match Circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-[36px] p-8 text-center space-y-6 shadow-2xl relative overflow-hidden flex flex-col items-center"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Animated SVG Circular Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" fill="transparent" />
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  stroke="url(#gradientScore)" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="264" 
                  initial={{ strokeDashoffset: 264 }}
                  whileInView={{ strokeDashoffset: 264 - (264 * matchPercentage) / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E91E63" />
                    <stop offset="100%" stopColor="#F5C842" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-4xl font-black font-serif tracking-tight">{matchPercentage}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Match Score</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <FaStar className="text-amber-400 text-sm" /> Exceptional Match
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                High compatibility in Sub-Caste, Education, and Family expectations.
              </p>
            </div>
          </motion.div>

          {/* Detailed Category Progress Bars */}
          <div className="lg:col-span-7 space-y-4">
            {MATCH_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-pink-500/40 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-white">
                    {cat.icon} {cat.label}
                  </span>
                  <span className="text-pink-400 font-mono">{cat.score}%</span>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-pink-500 to-amber-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AIMatchCompatibility;
