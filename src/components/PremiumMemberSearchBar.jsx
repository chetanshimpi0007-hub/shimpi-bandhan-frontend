import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaSlidersH, FaFilter, FaMapMarkerAlt, FaUsers, FaUserCheck, FaChevronRight } from 'react-icons/fa';

const FILTER_CHIPS = [
  { id: 'all', label: 'All Profiles' },
  { id: 'aher', label: 'Aher Shimpi' },
  { id: 'namdev', label: 'Namdev Shimpi' },
  { id: 'verified', label: 'Verified Only' },
  { id: 'pune', label: 'Pune' },
  { id: 'nashik', label: 'Nashik' },
  { id: 'mumbai', label: 'Mumbai' },
];

const PremiumMemberSearchBar = () => {
  const [activeChip, setActiveChip] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&filter=${activeChip}`);
  };

  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      {/* Background Aurora Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        
        {/* Floating VisionOS Blur Search Bar Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-[32px] p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Input Field with Icon */}
            <div className="relative w-full flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FaSearch className="text-amber-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, education, occupation or city..."
                className="w-full pl-11 pr-4 py-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
            </div>

            {/* Quick Dropdown Selects */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-bold rounded-2xl py-4 px-4 outline-none focus:border-amber-400">
                <option value="SELF">Self Managed</option>
                <option value="FAMILY">Family Managed</option>
              </select>

              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Find Matches</span>
                <FaChevronRight className="text-xs" />
              </button>
            </div>

          </form>

          {/* Filter Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-800/80 mt-5">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2">
              <FaFilter className="text-pink-400 text-xs" /> Quick Filters:
            </span>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setActiveChip(chip.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeChip === chip.id
                    ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default PremiumMemberSearchBar;
