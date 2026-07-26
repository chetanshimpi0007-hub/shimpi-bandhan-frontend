import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaUsers, FaTasks, FaStore, FaGlassCheers, FaCheckSquare } from 'react-icons/fa';

const WeddingPlannerWidget = () => {
  const [budget, setBudget] = useState(1500000);
  const [spent, setSpent] = useState(850000);

  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaGlassCheers className="text-amber-400" /> Wedding Planning Suite 6.0
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Smart Wedding <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400">Budget & Task Planner</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-xl mx-auto">
            Plan your wedding expenses, guest lists, and vendor checklists with ease.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Budget Tracker */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaCalculator className="text-amber-400" /> Budget Planner
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                On Track
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Total Estimated Budget</span>
              <h3 className="text-2xl font-black text-white font-mono">₹{(budget / 100000).toFixed(1)} Lakhs</h3>
              <p className="text-xs text-slate-400 font-medium">Spent so far: ₹{(spent / 100000).toFixed(1)} Lakhs</p>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" style={{ width: `${(spent / budget) * 100}%` }} />
            </div>
          </div>

          {/* Guest List Tracker */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaUsers className="text-blue-400" /> Guest List Counter
              </span>
              <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                185 Confirmed
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Total Invited Guests</span>
              <h3 className="text-2xl font-black text-white">250 Guests</h3>
              <p className="text-xs text-slate-400 font-medium">Pending RSVP: 65 Guests</p>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '74%' }} />
            </div>
          </div>

          {/* Checklist Tracker */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <FaCheckSquare className="text-pink-400" /> Task Checklist
              </span>
              <span className="text-[10px] font-black uppercase text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                8/12 Done
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <FaCheckSquare className="text-emerald-400" /> Book Venue Hall (Nashik)
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <FaCheckSquare className="text-emerald-400" /> Finalize Catering Menu
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-3.5 h-3.5 border border-slate-700 rounded-sm"></span> Print Digital Invitations
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WeddingPlannerWidget;
