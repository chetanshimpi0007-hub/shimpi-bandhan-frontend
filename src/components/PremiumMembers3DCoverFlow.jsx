import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCrown, FaStar, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

const DEFAULT_MEMBERS = [
  { id: 101, fullName: 'Priyanka Shimpi', age: 25, height: "5'4\"", education: 'MBA Finance', occupation: 'Senior HR Specialist', city: 'Pune', state: 'Maharashtra', isVerified: true, photo: '/indian-girl-1.jpg', badge: 'PLATINUM' },
  { id: 102, fullName: 'Rohan Shimpi', age: 28, height: "5'10\"", education: 'B.Tech IT', occupation: 'Software Architect', city: 'Mumbai', state: 'Maharashtra', isVerified: true, photo: '/wedding-couple.jpg', badge: 'GOLD' },
  { id: 103, fullName: 'Sneha Shimpi', age: 26, height: "5'5\"", education: 'M.Sc Biotechnology', occupation: 'Research Scientist', city: 'Nashik', state: 'Maharashtra', isVerified: true, photo: '/indian-girl-2.jpg', badge: 'PLATINUM' },
  { id: 104, fullName: 'Aniket Shimpi', age: 29, height: "5'11\"", education: 'CA & CS', occupation: 'Financial Consultant', city: 'Aurangabad', state: 'Maharashtra', isVerified: true, photo: '/shadi-couple.jpg', badge: 'GOLD' },
  { id: 105, fullName: 'Pooja Shimpi', age: 24, height: "5'3\"", education: 'B.Arch', occupation: 'Interior Designer', city: 'Nagpur', state: 'Maharashtra', isVerified: true, photo: '/indian-girl-3.jpg', badge: 'PLATINUM' },
];

const PremiumMembers3DCoverFlow = () => {
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Fetch real premium profiles from backend API
  useEffect(() => {
    const fetchPremiumProfiles = async () => {
      try {
        const res = await api.get('/public/profiles/latest');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setMembers(res.data.map(p => ({
            id: p.id,
            fullName: p.fullName || 'Shimpi Member',
            age: p.age || 26,
            height: p.height || "5'6\"",
            education: p.education || 'Graduate',
            occupation: p.occupation || 'Professional',
            city: p.city || 'Maharashtra',
            state: p.state || 'India',
            isVerified: true,
            photo: p.photoUrl || p.profileImage || '/indian-girl-1.jpg',
            badge: 'PLATINUM'
          })));
          setActiveIndex(Math.floor(res.data.length / 2));
        }
      } catch (err) {
        console.log('Using default local premium members:', err.message);
      }
    };
    fetchPremiumProfiles();
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % members.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoplay, members.length]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + members.length) % members.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % members.length);
  };

  return (
    <div className="w-full bg-[#111827] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10 space-y-3">
        <span className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
          <FaCrown className="text-amber-400" /> Exclusive Verified Profiles
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400">Premium Members</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Apple-style 3D Cover Flow. Drag, swipe or click to view verified premium bride and groom profiles.
        </p>
      </div>

      {/* 3D Cover Flow Container */}
      <div 
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        className="relative w-full max-w-6xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center perspective-[1200px]"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {members.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            // 3D Cover Flow Transform Parameters
            const rotateY = offset === 0 ? 0 : offset < 0 ? 40 : -40;
            const translateX = offset * 220;
            const translateZ = isCenter ? 100 : -150 * absOffset;
            const scale = isCenter ? 1.15 : Math.max(0.75, 1 - absOffset * 0.15);
            const opacity = isCenter ? 1 : Math.max(0.4, 1 - absOffset * 0.3);
            const zIndex = 100 - absOffset * 10;

            return (
              <motion.div
                key={item.id || index}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex, transformStyle: 'preserve-3d' }}
                className={`absolute w-[280px] sm:w-[320px] bg-slate-900/90 backdrop-blur-2xl border rounded-[32px] p-6 shadow-2xl transition-all duration-300 cursor-pointer ${
                  isCenter 
                    ? 'border-amber-400/50 shadow-[0_20px_50px_rgba(245,200,66,0.25)] ring-2 ring-amber-400/20' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Premium Crown Badge */}
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <FaCrown /> {item.badge || 'PLATINUM'}
                </div>

                {/* Profile Photo with Mirror Reflection */}
                <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-4 bg-slate-800 border border-slate-700/50">
                  <img src={item.photo} alt={item.fullName} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                      <span>{item.fullName}</span>
                      <FaCheckCircle className="text-amber-400 text-xs" />
                    </h3>
                    <p className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                      <FaMapMarkerAlt className="text-pink-400" /> {item.city}, {item.state}
                    </p>
                  </div>
                </div>

                {/* Profile Key Attributes */}
                <div className="space-y-2 text-left text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-amber-400 text-xs flex-shrink-0" />
                    <span className="truncate">{item.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-purple-400 text-xs flex-shrink-0" />
                    <span className="truncate">{item.education}</span>
                  </div>
                </div>

                {/* View Profile Action */}
                {isCenter && (
                  <div className="pt-4 mt-4 border-t border-slate-800">
                    <Link
                      to={`/profile/${item.id}`}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 py-2.5 px-4 rounded-xl text-xs font-black transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>View Full Profile</span>
                      <FaChevronRight className="text-xs" />
                    </Link>
                  </div>
                )}

                {/* Card Reflection Overlay Effect */}
                <div className="absolute -bottom-16 left-0 right-0 h-16 bg-gradient-to-b from-white/10 to-transparent opacity-20 transform scale-y-[-1] pointer-events-none rounded-b-[32px] overflow-hidden blur-[2px]" />
              </motion.div>
            );
          })}
        </div>

        {/* Left / Right Arrow Navigators */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-30 w-12 h-12 bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full border border-slate-700 flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
        >
          <FaChevronLeft className="text-base" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-30 w-12 h-12 bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full border border-slate-700 flex items-center justify-center transition-all shadow-xl backdrop-blur-md"
        >
          <FaChevronRight className="text-base" />
        </button>
      </div>

    </div>
  );
};

export default PremiumMembers3DCoverFlow;
