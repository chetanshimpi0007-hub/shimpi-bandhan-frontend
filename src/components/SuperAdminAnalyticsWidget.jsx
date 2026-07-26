import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaCrown, FaMoneyBillWave, FaCity, FaUserCheck, FaExclamationTriangle, FaDownload } from 'react-icons/fa';

const SuperAdminAnalyticsWidget = () => {
  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="text-left space-y-1">
            <span className="px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <FaChartLine /> Enterprise Analytics 5.0
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Platform Growth & Revenue Intelligence
            </h2>
          </div>

          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2 cursor-pointer">
            <FaDownload /> Export Analytics Report
          </button>
        </div>

        {/* Top KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Daily Registrations</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-white">+48 Today</h3>
              <span className="text-xs text-emerald-400 font-bold">+18.4%</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">342 registrations this week</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Premium Revenue</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-amber-400">₹1,84,500</h3>
              <span className="text-xs text-emerald-400 font-bold">+24.2%</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">124 premium upgrades</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Business Revenue</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-purple-400">₹92,000</h3>
              <span className="text-xs text-emerald-400 font-bold">+12.8%</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">32 active business subscriptions</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pending Verifications</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-pink-400">14 Profiles</h3>
              <span className="text-xs text-amber-400 font-bold">Action Req.</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Avg verification speed: 45 mins</p>
          </div>

        </div>

        {/* Demographic & Geographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FaCity className="text-blue-400" /> Top Member Cities Distribution
            </h3>
            <div className="space-y-3">
              {[
                { city: 'Pune', count: '4,200 Members', share: '32%' },
                { city: 'Mumbai', count: '3,800 Members', share: '28%' },
                { city: 'Nashik', count: '3,100 Members', share: '22%' },
                { city: 'Nagpur', count: '2,400 Members', share: '18%' },
              ].map((item) => (
                <div key={item.city} className="flex items-center justify-between text-xs font-semibold text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span>{item.city}</span>
                  <span className="text-slate-400">{item.count}</span>
                  <span className="text-pink-400 font-mono">{item.share}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FaUsers className="text-amber-400" /> Community Distribution
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Aher Shimpi Community</span>
                  <span className="text-amber-400 font-mono">54% (8,316 Members)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[54%]" />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Namdev Shimpi Community</span>
                  <span className="text-pink-400 font-mono">46% (7,084 Members)</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full w-[46%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminAnalyticsWidget;
