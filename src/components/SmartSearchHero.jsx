import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaShieldAlt, FaHeart, FaUserCheck, FaCrown, FaBuilding, FaUserGraduate, FaStethoscope, FaBriefcase, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const QUICK_CHIPS = [
  'All Profiles', 'Trending Profiles', 'Recently Joined', 'Verified Only', 'Premium Members',
  'Doctors', 'Engineers', 'Government Job', 'Business', 'Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Nagpur'
];

const SmartSearchHero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState('All Profiles');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filters state
  const [gender, setGender] = useState('Bride');
  const [ageRange, setAgeRange] = useState('21 to 25');
  const [community, setCommunity] = useState('Aher Shimpi');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&gender=${gender}&community=${community}&city=${city}`);
  };

  return (
    <div className="relative w-full bg-[#0F172A] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-100 select-none">
      
      {/* Aurora Ambient Mesh Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#800020]/25 via-pink-500/20 to-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      
      {/* Fine Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10 text-center">
        
        {/* Header Badges & Titles */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-gradient-to-r from-pink-500/20 via-amber-400/20 to-rose-500/20 border border-pink-500/30 text-pink-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
          >
            <FaCrown className="text-amber-400" /> Premium Shimpi Matrimonial Search 9.0
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-[1.15]"
          >
            Find Your Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400">Life Partner</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Search verified <strong className="text-white">Aher Shimpi & Namdev Shimpi</strong> profiles with powerful smart filters & instant AI compatibility.
          </motion.p>
        </div>

        {/* Smart Search Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/90 border border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-left space-y-6"
        >
          <form onSubmit={handleSearchSubmit} className="space-y-6">
            
            {/* Top Full-Width Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Name, Education, Occupation, City, Profession..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-12 pr-32 py-4 text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-inner"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />

              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#800020] via-pink-600 to-rose-600 hover:brightness-110 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <FaSearch className="text-xs" /> Search
              </button>
            </div>

            {/* Core Primary Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Looking For</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-pink-500"
                >
                  <option>Bride</option>
                  <option>Groom</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Age Group</label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-pink-500"
                >
                  <option>18 to 25</option>
                  <option>26 to 30</option>
                  <option>31 to 35</option>
                  <option>36 to 45</option>
                  <option>46 and above</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Community</label>
                <select
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-pink-500"
                >
                  <option>Aher Shimpi</option>
                  <option>Namdev Shimpi</option>
                  <option>All Shimpi Sub-Castes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">City / State</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Pune, Mumbai, Nashik"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Toggle Advanced Filters */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FaFilter /> {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters (Occupation, Education, Verification)'}
              </button>

              <div className="flex items-center gap-3">
                <Link
                  to="/register"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700"
                >
                  Register Free
                </Link>
                <Link
                  to="/premium"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <FaCrown /> Premium VIP
                </Link>
              </div>
            </div>

            {/* Advanced Filters Expandable Drawer */}
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800/60"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Occupation</label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Software Engineer, Doctor"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Education</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. B.Tech, MBA, MBBS"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Verification Status</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white">
                    <option>All Profiles</option>
                    <option>Verified Only (ID & Photo)</option>
                    <option>Premium Members Only</option>
                  </select>
                </div>
              </motion.div>
            )}

          </form>

          {/* Quick Filter Chips */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Quick Filters</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setActiveChip(chip)}
                  className={`px-3.5 py-1.5 rounded-xl border flex-shrink-0 transition-all cursor-pointer ${
                    activeChip === chip
                      ? 'bg-gradient-to-r from-[#800020] to-pink-600 border-pink-400 text-white shadow-md'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <h4 className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">25,000+</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Verified Members</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <h4 className="text-2xl sm:text-3xl font-black text-pink-400 font-mono">4,000+</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Happy Marriages</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <h4 className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">99%</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">ID Verified</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
            <h4 className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">500+</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Added Monthly</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SmartSearchHero;
