import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaSearch, FaUserPlus, FaChevronDown, FaCheckCircle, FaStar, FaShieldAlt } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';

const SAMPLE_PROFILE_PHOTOS = [
  { id: 1, name: 'Priya S.', city: 'Nashik', age: 25, photo: '/priya-ramesh.jpg', top: '12%', left: '8%', depth: 1.2, speed: 4 },
  { id: 2, name: 'Shubham S.', city: 'Pune', age: 28, photo: '/sonal-shubham-new.jpg', top: '18%', left: '78%', depth: 1.5, speed: 5 },
  { id: 3, name: 'Pooja S.', city: 'Mumbai', age: 26, photo: '/shadi-couple.jpg', top: '65%', left: '10%', depth: 0.8, speed: 3.5 },
  { id: 4, name: 'Vikram S.', city: 'Aurangabad', age: 29, photo: '/wedding-couple.jpg', top: '72%', left: '82%', depth: 1.4, speed: 4.5 },
  { id: 5, name: 'Smita S.', city: 'Nagpur', age: 24, photo: '/hero-wedding.jpg', top: '35%', left: '88%', depth: 1.1, speed: 3.8 },
  { id: 6, name: 'Ganesh S.', city: 'Thane', age: 27, photo: '/newest-hero.jpg', top: '48%', left: '5%', depth: 1.3, speed: 4.2 },
  { id: 7, name: 'Neha S.', city: 'Jalgaon', age: 25, photo: '/indian-girl-1.jpg', top: '8%', left: '62%', depth: 0.9, speed: 3.2 },
  { id: 8, name: 'Ananya S.', city: 'Solapur', age: 26, photo: '/indian-girl-2.jpg', top: '80%', left: '60%', depth: 1.2, speed: 4.8 },
];

const FloatingPhotoCloudHero = () => {
  const containerRef = useRef(null);
  
  // Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FCFBF9] py-20 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* 1. Ambient Background Particles & Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#800020]/10 via-pink-500/10 to-amber-400/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-400/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px]" />
        
        {/* Floating Heart Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0.2, 0.7, 0.2],
              y: [-20, -120, -220],
              x: Math.sin(i) * 40
            }}
            transition={{
              duration: 8 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7
            }}
            className="absolute text-pink-400/40 text-xl pointer-events-none"
            style={{
              left: `${(i * 8.5) + 5}%`,
              top: `${60 + (i % 3) * 10}%`
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* 2. 3D FLOATING PHOTO CLOUD LAYERS (Parallax Effect) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {SAMPLE_PROFILE_PHOTOS.map((item) => {
          const moveX = useTransform(smoothMouseX, [-1, 1], [-30 * item.depth, 30 * item.depth]);
          const moveY = useTransform(smoothMouseY, [-1, 1], [-30 * item.depth, 30 * item.depth]);

          return (
            <motion.div
              key={item.id}
              style={{
                top: item.top,
                left: item.left,
                x: moveX,
                y: moveY,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, item.id % 2 === 0 ? 4 : -4, 0],
              }}
              transition={{
                duration: item.speed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white/80 p-2.5 pr-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] pointer-events-auto hover:scale-110 hover:shadow-[0_20px_45px_rgba(128,0,32,0.2)] transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                <img src={item.photo} alt={item.name} className="w-full h-full object-cover object-top" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-[#800020] transition-colors">{item.name}</h4>
                  <FaCheckCircle className="text-[#800020] text-[10px]" />
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">{item.age} yrs · {item.city}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. HERO CENTER CONTENT PANEL */}
      <div className="max-w-4xl mx-auto text-center relative z-20 space-y-8 py-10">
        
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex"
        >
          <span className="px-5 py-2 bg-white/90 backdrop-blur-xl border border-[#800020]/20 text-[#800020] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-[#800020]/5">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            Connecting Aher & Namdev Shimpi Hearts
          </span>
        </motion.div>

        {/* Animated Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-slate-900 leading-[1.12] tracking-tight"
        >
          Find Your Perfect <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#800020] via-[#b3002d] to-pink-600">
            Life Partner
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          The trusted, secure, and verified matrimonial platform dedicated to bringing Shimpi families together with modern AI matching & privacy.
        </motion.p>

        {/* Glassmorphism Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link 
            to="/register" 
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#800020] to-[#b3002d] text-white px-9 py-4 rounded-2xl text-base font-black transition-all shadow-xl shadow-[#800020]/30 hover:shadow-[#800020]/50 hover:-translate-y-1 border border-white/20"
          >
            <FaUserPlus className="text-lg" />
            <span>Register Free</span>
          </Link>

          <Link 
            to="/search" 
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/90 backdrop-blur-xl border border-[#800020]/20 text-slate-900 hover:bg-white hover:text-[#800020] px-9 py-4 rounded-2xl text-base font-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <FaSearch className="text-sm text-[#800020]" />
            <span>Find Your Match</span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs font-bold"
        >
          <span className="flex items-center gap-1.5"><FaShieldAlt className="text-[#800020]" /> 100% Verified Profiles</span>
          <span className="flex items-center gap-1.5"><FaStar className="text-amber-500" /> 4.9/5 Rating</span>
          <span className="flex items-center gap-1.5"><FaHeart className="text-pink-500" /> 5,000+ Happy Matches</span>
        </motion.div>

      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-1 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-[#800020]">Explore Matches</span>
        <FaChevronDown className="w-3.5 h-3.5 text-[#800020]" />
      </motion.div>
    </div>
  );
};

export default FloatingPhotoCloudHero;
