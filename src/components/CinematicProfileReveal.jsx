import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaTimes, FaGlassCheers } from 'react-icons/fa';

const CinematicProfileReveal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#111827] py-12 px-4 sm:px-6 lg:px-8 text-center text-slate-100 select-none">
      
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-pink-500 via-rose-600 to-amber-500 hover:brightness-110 text-white px-8 py-3.5 rounded-2xl text-xs font-black transition-all shadow-xl flex items-center gap-2 mx-auto cursor-pointer border border-white/20"
      >
        <FaHeart className="text-pink-200 animate-pulse" />
        <span>Experience Cinematic Profile Reveal</span>
      </button>

      {/* Cinematic Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-slate-900 border border-pink-500/30 rounded-[40px] p-8 max-w-md w-full text-center space-y-6 relative shadow-[0_0_80px_rgba(233,30,99,0.3)]"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Cinematic Reveal</span>
                <h3 className="text-2xl font-serif font-black text-white">96% Perfect Match Found</h3>
              </div>

              <div className="relative w-44 h-44 rounded-full overflow-hidden mx-auto border-4 border-pink-500 shadow-2xl ring-8 ring-pink-500/20">
                <img src="/priya-ramesh.jpg" alt="Reveal Match" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">Priya Shimpi</h4>
                <p className="text-xs text-slate-400 font-semibold">Nashik · MBA Finance · Namdev Shimpi</p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 rounded-2xl text-xs font-black shadow-lg"
              >
                View Full Compatibility Report
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CinematicProfileReveal;
