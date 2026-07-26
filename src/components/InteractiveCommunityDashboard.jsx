import React from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaUsers, FaHeart, FaStore, FaChartLine } from 'react-icons/fa';

const InteractiveCommunityDashboard = () => {
  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaChartBar /> Community Intelligence Dashboard 8.0
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Real-Time Community <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Growth & Heatmaps</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Live telemetry tracking active candidates, successful marriages, and community business listings.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaUsers className="text-blue-400" /> Active Candidate Pool
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                +14% MoM
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white font-mono">15,400</h3>
              <p className="text-xs text-slate-400 font-medium">Verified Shimpi candidates actively seeking matches.</p>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-blue-500 rounded-full w-[82%]" />
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaHeart className="text-pink-500" /> Marriages Facilitated
              </span>
              <span className="text-[10px] font-black uppercase text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                5,200+ Couples
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white font-mono">5,200</h3>
              <p className="text-xs text-slate-400 font-medium">Successful marriages celebrated across Maharashtra.</p>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-pink-500 rounded-full w-[90%]" />
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaStore className="text-purple-400" /> Shimpi Business Directory
              </span>
              <span className="text-[10px] font-black uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                1,200 Listings
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white font-mono">1,200</h3>
              <p className="text-xs text-slate-400 font-medium">Verified Shimpi businesses and wedding vendors.</p>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-purple-500 rounded-full w-[75%]" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InteractiveCommunityDashboard;
