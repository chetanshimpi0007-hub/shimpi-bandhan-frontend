import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaCrown, FaSearch, FaHeart, FaRing } from 'react-icons/fa';

const ParallaxCTASection = () => {
  return (
    <div className="relative w-full bg-gradient-to-tr from-[#800020] via-[#590016] to-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none text-white">
      
      {/* Floating Flowers & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-[140px]" />
        
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-1/4 text-pink-300/30 text-5xl"
        >
          🌸
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-1/4 text-amber-300/30 text-5xl"
        >
          🌺
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 bg-white/10 backdrop-blur-2xl border border-white/20 p-10 sm:p-14 rounded-[40px] shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
          <FaRing /> Start Your Journey Today
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
          Ready to Find Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-200 to-white">
            Shimpi Soulmate?
          </span>
        </h2>

        <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Join thousands of verified candidates from Aher Shimpi & Namdev Shimpi families. Create your profile for free in less than 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-8 py-4 rounded-2xl text-base font-black transition-all shadow-xl shadow-amber-500/25 hover:scale-105"
          >
            <FaUserPlus />
            <span>Register Free</span>
          </Link>

          <Link
            to="/premium"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/20 hover:bg-white text-white hover:text-slate-950 px-8 py-4 rounded-2xl text-base font-black transition-all border border-white/30 backdrop-blur-md hover:scale-105"
          >
            <FaCrown className="text-amber-400" />
            <span>Become Premium</span>
          </Link>

          <Link
            to="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-black/30 hover:bg-black/50 text-white px-8 py-4 rounded-2xl text-base font-black transition-all border border-white/20 backdrop-blur-md hover:scale-105"
          >
            <FaSearch />
            <span>Browse Profiles</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ParallaxCTASection;
