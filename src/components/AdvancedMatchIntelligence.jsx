import React from 'react';
import { motion } from 'framer-motion';
import { FaChartPie, FaStar, FaFire, FaPercentage, FaCheckCircle } from 'react-icons/fa';

const AdvancedMatchIntelligence = () => {
  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaChartPie /> Match Intelligence Engine 7.0
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Predictive Match <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">Success Analytics</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            AI-driven popularity ranking, interest acceptance likelihood, and match forecasting.
          </p>
        </div>

        {/* Intelligence Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaFire className="text-amber-400" /> Profile Popularity
              </span>
              <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                Top 5%
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white font-mono">96 / 100</h3>
              <p className="text-xs text-slate-400 font-medium">Higher view & response rate than 95% of candidates.</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaPercentage className="text-pink-400" /> Interest Acceptance
              </span>
              <span className="text-[10px] font-black uppercase text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                High Probability
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white font-mono">89% Likely</h3>
              <p className="text-xs text-slate-400 font-medium">High probability of mutual interest acceptance.</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaStar className="text-emerald-400" /> Match Success Index
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Optimal Match
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white font-mono">94% Match</h3>
              <p className="text-xs text-slate-400 font-medium">Strong alignment in family values & career goals.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdvancedMatchIntelligence;
