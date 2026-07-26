import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaChevronLeft, FaChevronRight, FaStore, FaBuilding } from 'react-icons/fa';
import api from '../services/api';

const DEFAULT_BUSINESSES = [
  { id: 1, businessName: 'Arnav InfoWeb IT Company', category: 'IT & Software Services', city: 'Nashik', rating: 4.9, reviewsCount: 48, photo: '/arnav-banner.jpg', logo: '/logo.png', badge: 'PLATINUM', phone: '+91 98765 43210' },
  { id: 2, businessName: 'Shimpi Traditional Tailors', category: 'Wedding Clothing & Suits', city: 'Pune', rating: 4.8, reviewsCount: 32, photo: '/hero-wedding.jpg', logo: '/logo.png', badge: 'GOLD', phone: '+91 98220 12345' },
  { id: 3, businessName: 'Namdev Decorators & Events', category: 'Wedding Planners & Catering', city: 'Mumbai', rating: 5.0, reviewsCount: 65, photo: '/shadi-couple.jpg', logo: '/logo.png', badge: 'PLATINUM', phone: '+91 99887 76655' },
  { id: 4, businessName: 'Shimpi Jewellers', category: 'Gold & Diamond Jewellery', city: 'Aurangabad', rating: 4.9, reviewsCount: 54, photo: '/priya-ramesh.jpg', logo: '/logo.png', badge: 'GOLD', phone: '+91 94231 88990' },
];

const BusinessDirectory3DCoverFlow = () => {
  const [businesses, setBusinesses] = useState(DEFAULT_BUSINESSES);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await api.get('/business');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBusinesses(res.data.map(b => ({
            id: b.id,
            businessName: b.businessName || b.title || 'Shimpi Business',
            category: b.category || 'Services',
            city: b.city || 'Maharashtra',
            rating: b.rating || 4.9,
            reviewsCount: b.reviewsCount || 24,
            photo: b.coverImage || b.photoUrl || '/arnav-banner.jpg',
            logo: b.logoUrl || '/logo.png',
            badge: b.planType || 'GOLD',
            phone: b.phone || '+91 98765 43210'
          })));
        }
      } catch (err) {
        console.log('Using default local business listings fallback:', err.message);
      }
    };
    fetchBusinesses();
  }, []);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + businesses.length) % businesses.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % businesses.length);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#FAF6F0] via-[#FCFBF9] to-[#FFFDF9] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-amber-500/10 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10 space-y-3">
        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md border border-blue-500/20 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm">
          <FaStore className="text-blue-600" /> Shimpi Community Businesses
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
          Verified <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Business Directory</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Explore top-rated businesses owned by Aher & Namdev Shimpi entrepreneurs across Maharashtra.
        </p>
      </div>

      {/* 3D Cover Flow Showcase */}
      <div className="relative w-full max-w-5xl mx-auto h-[460px] sm:h-[500px] flex items-center justify-center perspective-[1200px]">
        <div className="relative w-full h-full flex items-center justify-center">
          {businesses.map((biz, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            const rotateY = offset === 0 ? 0 : offset < 0 ? 35 : -35;
            const translateX = offset * 240;
            const translateZ = isCenter ? 100 : -140 * absOffset;
            const scale = isCenter ? 1.12 : Math.max(0.75, 1 - absOffset * 0.15);
            const opacity = isCenter ? 1 : Math.max(0.4, 1 - absOffset * 0.3);
            const zIndex = 100 - absOffset * 10;

            return (
              <motion.div
                key={biz.id || index}
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
                className={`absolute w-[290px] sm:w-[340px] bg-white/95 backdrop-blur-2xl border rounded-[32px] p-6 shadow-2xl transition-all duration-300 cursor-pointer ${
                  isCenter 
                    ? 'border-blue-500/40 shadow-[0_25px_60px_rgba(59,130,246,0.25)] ring-4 ring-blue-500/10' 
                    : 'border-slate-200/80 shadow-md hover:border-blue-400'
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <FaBuilding className="text-xs" /> {biz.badge}
                </div>

                {/* Cover Image & Logo */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-200">
                  <img src={biz.photo} alt={biz.businessName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <FaMapMarkerAlt className="text-amber-400" /> {biz.city}
                    </span>
                    <span className="text-xs font-bold flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full font-black">
                      <FaStar /> {biz.rating} ({biz.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-base font-black text-slate-900 tracking-tight truncate">{biz.businessName}</h3>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{biz.category}</p>
                </div>

                {/* Contact CTA */}
                {isCenter && (
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      to={`/business/${biz.id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <FaPhoneAlt className="text-xs" />
                      <span>Contact Business</span>
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-30 w-11 h-11 bg-white hover:bg-blue-600 hover:text-white text-slate-800 rounded-full border border-slate-200 flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
        >
          <FaChevronLeft className="text-sm" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-30 w-11 h-11 bg-white hover:bg-blue-600 hover:text-white text-slate-800 rounded-full border border-slate-200 flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>

    </div>
  );
};

export default BusinessDirectory3DCoverFlow;
