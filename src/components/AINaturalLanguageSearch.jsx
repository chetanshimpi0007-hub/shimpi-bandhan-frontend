import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaSearch, FaStar, FaHistory, FaCheckCircle } from 'react-icons/fa';

const POPULAR_SEARCHES = [
  'Verified Aher Shimpi girls from Pune',
  'Namdev Shimpi groom working in IT / Software',
  'CA or Doctor bride from Nashik',
  'Engineers from Mumbai aged 25 to 30',
];

const AINaturalLanguageSearch = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([
    'Aher Shimpi Pune 25-28 yrs',
    'Namdev Shimpi IT Engineer Mumbai'
  ]);
  const navigate = useNavigate();

  const handleAISearch = (searchString) => {
    const finalQ = searchString || query;
    if (!finalQ.trim()) return;

    if (!history.includes(finalQ)) {
      setHistory(prev => [finalQ, ...prev.slice(0, 4)]);
    }

    navigate(`/search?aiQuery=${encodeURIComponent(finalQ)}`);
  };

  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-[#800020]/20 border border-[#800020]/40 text-pink-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaRobot className="text-pink-400 animate-bounce" /> AI Natural Language Search
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
            Smart Search in <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400">Plain English or Marathi</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Type naturally like asking a matchmaker. Our AI understands sub-caste, age, profession and city intent.
          </p>
        </div>

        {/* AI Input Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/90 backdrop-blur-2xl border border-pink-500/30 rounded-[32px] p-5 shadow-2xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch(query)}
                placeholder="e.g. Find verified Aher Shimpi girls from Pune..."
                className="w-full pl-5 pr-10 py-4 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm font-semibold focus:outline-none focus:border-pink-500 transition-all"
              />
              <FaStar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5C842] text-sm" />
            </div>

            <button
              onClick={() => handleAISearch(query)}
              className="w-full sm:w-auto bg-gradient-to-r from-[#800020] via-pink-600 to-rose-600 hover:brightness-110 text-white px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              <FaSearch />
              <span>AI Search</span>
            </button>
          </div>

          {/* Popular Suggestions */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Popular AI Suggestions:
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item);
                    handleAISearch(item);
                  }}
                  className="px-3.5 py-1.5 bg-slate-950 hover:bg-[#800020]/20 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-white rounded-full text-xs font-semibold transition-all text-left"
                >
                  ✨ "{item}"
                </button>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default AINaturalLanguageSearch;
