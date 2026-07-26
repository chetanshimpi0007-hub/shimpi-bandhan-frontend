import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronRight, FaHeart, FaVideo } from 'react-icons/fa';

const TESTIMONIALS = [
  {
    id: 1,
    couple: 'Priya & Ramesh Shimpi',
    location: 'Nashik',
    weddingDate: 'May 18, 2026',
    photo: '/priya-ramesh.jpg',
    quote: 'The sub-caste and lifestyle filters on Shimpi Bandhan brought us together seamlessly. Our families connected instantly on a video discussion room call!',
    rating: 5,
    hasVideo: true
  },
  {
    id: 2,
    couple: 'Sonal & Shubham Sankpal',
    location: 'Pune',
    weddingDate: 'February 14, 2026',
    photo: '/sonal-shubham-new.jpg',
    quote: 'We created profiles in November and were married by February. Verified badges and community authenticity made us feel completely secure.',
    rating: 5,
    hasVideo: false
  },
  {
    id: 3,
    couple: 'Pooja & Aniket Shimpi',
    location: 'Mumbai',
    weddingDate: 'December 10, 2025',
    photo: '/shadi-couple.jpg',
    quote: 'Finding a partner within the Namdev Shimpi community was top priority for our parents. Shimpi Bandhan made the entire process effortless.',
    rating: 5,
    hasVideo: true
  }
];

const TestimonialsStackCards = () => {
  const [cards, setCards] = useState(TESTIMONIALS);

  const handleNext = () => {
    setCards(prev => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  return (
    <div className="w-full bg-[#FAF6F0] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-3">
        <span className="px-4 py-1.5 bg-white border border-pink-500/20 text-[#800020] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm">
          <FaHeart className="text-pink-500" /> Matrimonial Testimonials
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
          Stacked <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#800020] to-pink-600">Couple Reviews</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          Swipe or click cards to read genuine feedback from newlywed Shimpi couples.
        </p>
      </div>

      {/* Stack Cards Container */}
      <div className="relative w-full max-w-md mx-auto h-[420px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((item, index) => {
            const isFront = index === 0;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ scale: 0.9, y: index * 15, opacity: 1 - index * 0.2 }}
                animate={{ 
                  scale: isFront ? 1 : 1 - index * 0.05, 
                  y: index * 18, 
                  opacity: 1 - index * 0.25,
                  zIndex: 30 - index
                }}
                transition={{ duration: 0.4 }}
                onClick={isFront ? handleNext : undefined}
                className={`absolute w-full bg-white/95 backdrop-blur-2xl border rounded-[32px] p-7 shadow-2xl transition-all cursor-pointer ${
                  isFront ? 'border-[#800020]/30 shadow-[0_20px_50px_rgba(128,0,32,0.15)] ring-4 ring-[#800020]/5' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  {item.hasVideo && (
                    <span className="px-3 py-1 bg-pink-500/10 text-pink-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                      <FaVideo /> Video Story
                    </span>
                  )}
                </div>

                <FaQuoteLeft className="text-[#800020]/20 text-3xl mb-3" />
                <p className="text-slate-700 text-sm italic font-medium leading-relaxed mb-6">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <img src={item.photo} alt={item.couple} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md" />
                  <div className="text-left">
                    <h4 className="text-base font-black text-slate-900">{item.couple}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{item.location} · Married {item.weddingDate}</p>
                  </div>
                </div>

                {isFront && (
                  <div className="mt-4 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#800020] flex items-center justify-center gap-1">
                      Click to Next Story <FaChevronRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default TestimonialsStackCards;
