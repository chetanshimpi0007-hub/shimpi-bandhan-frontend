import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCircleNotch } from 'react-icons/fa';

const GlobalPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // 1.2s total splash screen duration (1200ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 250);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1250);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/60 to-purple-50/80 text-slate-900 select-none overflow-hidden font-sans"
        >
          {/* Animated Ambient Gradient Blobs */}
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-blue-300/30 via-purple-300/30 to-pink-300/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#800020]/15 via-rose-300/20 to-indigo-300/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />

          {/* Floating Subtle Particles / Bokeh */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Glassmorphism Product Launch Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[36px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex flex-col items-center max-w-sm w-full mx-4 text-center space-y-6"
          >
            {/* Animated Logo with Pulsing Heart Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#800020] via-pink-600 to-amber-400 p-0.5 shadow-xl shadow-[#800020]/20 flex items-center justify-center"
            >
              <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                <FaHeart className="text-3xl text-[#800020]" />
              </div>
            </motion.div>

            {/* Typography */}
            <div className="space-y-1.5">
              <h1 className="text-2xl font-serif font-black tracking-tight text-slate-900">
                Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#800020] via-pink-600 to-purple-600">Shimpi Bandhan</span>
              </h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Connecting Families...
              </p>
            </div>

            {/* Modern Circular Loader & Progress Ring */}
            <div className="flex items-center gap-3 pt-2">
              <FaCircleNotch className="text-xl text-[#800020] animate-spin" />
              <span className="text-xs font-semibold text-slate-400">Please Wait... {progress}%</span>
            </div>

            {/* Subtle Pill Progress Indicator */}
            <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden p-0.5 border border-slate-300/40">
              <motion.div
                className="h-full bg-gradient-to-r from-[#800020] via-pink-600 to-purple-600 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPreloader;
