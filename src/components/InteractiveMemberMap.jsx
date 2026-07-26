import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaMapMarkerAlt, FaUsers, FaStore, FaCalendarAlt } from 'react-icons/fa';

const CITIES = [
  { name: 'Pune', members: 4200, businesses: 320, event: 'Vadhu-Var Melava 2026', top: '55%', left: '42%' },
  { name: 'Nashik', members: 3100, businesses: 240, event: 'Community Meet', top: '35%', left: '38%' },
  { name: 'Mumbai', members: 3800, businesses: 290, event: 'Family Discussion Hub', top: '58%', left: '30%' },
  { name: 'Aurangabad', members: 1900, businesses: 150, event: 'Youth Matrimonial Meet', top: '42%', left: '52%' },
  { name: 'Nagpur', members: 2400, businesses: 180, event: 'Regional Shimpi Gathering', top: '38%', left: '72%' },
];

const InteractiveMemberMap = () => {
  const [activeCity, setActiveCity] = useState(CITIES[0]);

  return (
    <div className="w-full bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-[#800020]/20 border border-[#800020]/40 text-pink-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaMapMarkedAlt className="text-pink-400" /> Shimpi Community Member Map
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Members Across <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400">Maharashtra</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Click any city node to view candidate density, verified business counts, and upcoming events.
          </p>
        </div>

        {/* Map Canvas Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-[36px] p-6 sm:p-8 shadow-2xl">
          
          {/* Map Graphic Container */}
          <div className="lg:col-span-7 relative h-80 sm:h-96 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            <img src="/auth-bg.png" alt="Maharashtra Map" className="w-full h-full object-cover opacity-20 pointer-events-none" />

            {/* City Nodes */}
            {CITIES.map((c) => (
              <motion.button
                key={c.name}
                onClick={() => setActiveCity(c)}
                whileHover={{ scale: 1.2 }}
                style={{ top: c.top, left: c.left }}
                className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border shadow-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  activeCity.name === c.name
                    ? 'bg-gradient-to-r from-[#800020] to-pink-600 border-pink-400 text-white shadow-pink-500/40 ring-4 ring-pink-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <FaMapMarkerAlt className={activeCity.name === c.name ? 'text-amber-300' : 'text-pink-500'} />
                <span>{c.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Active City Details Panel */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">City Insights</span>
              <h3 className="text-2xl font-serif font-black text-white flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" /> {activeCity.name}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                <FaUsers className="text-xl text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-black text-white">{activeCity.members.toLocaleString()}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">Active Matrimonial Members</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                <FaStore className="text-xl text-purple-400 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-black text-white">{activeCity.businesses}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">Verified Community Businesses</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                <FaCalendarAlt className="text-xl text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">{activeCity.event}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">Upcoming Community Gathering</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default InteractiveMemberMap;
