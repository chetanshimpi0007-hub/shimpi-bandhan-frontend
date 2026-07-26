import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImages, FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

const GALLERY_IMAGES = [
  { id: 1, category: 'Wedding', title: 'Priya & Ramesh Royal Reception', location: 'Nashik', photo: '/priya-ramesh.jpg', heightClass: 'h-80' },
  { id: 2, category: 'Pre-Wedding', title: 'Sonal & Shubham Sunset Shoot', location: 'Pune', photo: '/sonal-shubham-new.jpg', heightClass: 'h-64' },
  { id: 3, category: 'Engagement', title: 'Pooja & Aniket Ring Ceremony', location: 'Mumbai', photo: '/shadi-couple.jpg', heightClass: 'h-72' },
  { id: 4, category: 'Melava', title: 'Pune Regional Shimpi Melava', location: 'Pune', photo: '/wedding-couple.jpg', heightClass: 'h-96' },
  { id: 5, category: 'Wedding', title: 'Smita & Rajesh Mandap Ceremony', location: 'Nagpur', photo: '/hero-wedding.jpg', heightClass: 'h-64' },
  { id: 6, category: 'Pre-Wedding', title: 'Traditional Maharashtrian Attire Shoot', location: 'Aurangabad', photo: '/newest-hero.jpg', heightClass: 'h-80' },
];

const CATEGORIES = ['All', 'Wedding', 'Pre-Wedding', 'Engagement', 'Melava'];

const WeddingGalleryMasonry = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = activeCategory === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const currentLightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div className="w-full bg-[#FAF6F0] py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-6xl mx-auto text-center mb-12 space-y-3">
        <span className="px-4 py-1.5 bg-white border border-pink-500/20 text-[#800020] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm">
          <FaImages className="text-pink-500" /> Community Photo Gallery
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
          Shimpi <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#800020] to-pink-600">Wedding Memories</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Explore magical wedding moments, melava gatherings, and engagement ceremonies.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#800020] to-[#b3002d] text-white shadow-[#800020]/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-style Masonry Grid */}
      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img, idx) => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            onClick={() => setLightboxIndex(idx)}
            className="relative break-inside-avoid rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-white/80 bg-white"
          >
            <img 
              src={img.photo} 
              alt={img.title} 
              className="w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#800020] px-2.5 py-1 rounded-full w-max mb-1">
                {img.category}
              </span>
              <h3 className="text-base font-black flex items-center gap-1.5">{img.title}</h3>
              <p className="text-xs text-slate-300 font-semibold">{img.location}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-amber-400 font-bold">
                <FaSearchPlus /> Click to view full image
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center transition-all"
            >
              <FaTimes className="text-xl" />
            </button>

            <button 
              onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)}
              className="absolute left-6 z-50 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center transition-all"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            <button 
              onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
              className="absolute right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center transition-all"
            >
              <FaChevronRight className="text-xl" />
            </button>

            <motion.div 
              key={currentLightboxImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative bg-slate-950 flex flex-col"
            >
              <img 
                src={currentLightboxImage.photo} 
                alt={currentLightboxImage.title} 
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-6 text-white space-y-1 bg-slate-900 border-t border-slate-800">
                <span className="text-xs font-bold text-[#800020] uppercase">{currentLightboxImage.category}</span>
                <h3 className="text-xl font-serif font-black">{currentLightboxImage.title}</h3>
                <p className="text-xs text-slate-400 font-semibold">{currentLightboxImage.location}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingGalleryMasonry;
