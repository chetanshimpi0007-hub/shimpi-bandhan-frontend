import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const GlobalPreloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onFinish) onFinish();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
        >
          {/* Animated Background Glow Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#800020]/30 via-pink-500/20 to-amber-500/20 rounded-full blur-[140px] animate-pulse" />

          {/* Morphing Heart Logo */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-20 h-20 bg-gradient-to-tr from-[#800020] via-pink-600 to-amber-400 rounded-3xl p-0.5 shadow-[0_0_50px_rgba(233,30,99,0.5)] flex items-center justify-center"
            >
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <FaHeart className="text-3xl text-pink-500 animate-pulse" />
              </div>
            </motion.div>

            {/* Platform Brand Title */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                SHIMPI <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400">BANDHAN</span>
              </h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Aher & Namdev Shimpi Matrimonial
              </p>
            </div>

            {/* Progress Bar & Percentage Indicator */}
            <div className="w-64 space-y-2 pt-4">
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#800020] via-pink-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(233,30,99,0.8)]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-wider">
                <span>Loading Luxury Experience...</span>
                <span className="text-pink-400 font-mono">{Math.min(progress, 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPreloader;
