import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaChevronRight, FaPlay, FaPause, FaStar } from 'react-icons/fa';
import api from '../services/api';

const DEFAULT_STORIES = [
  {
    id: 1,
    brideName: 'Priya Shimpi',
    groomName: 'Ramesh Shimpi',
    weddingDate: '2026-05-18',
    city: 'Nashik',
    shortStory: 'The compatibility scoring on Shimpi Bandhan matched us based on our exact sub-caste and lifestyle choices.',
    story: 'We met on Shimpi Bandhan in November 2025. Our families connected over a family discussion room call, and after meeting in person at a community gathering in Nashik, we decided to get married in May 2026. The platform\'s verified badges and privacy features gave us complete peace of mind.',
    photoUrl: '/priya-ramesh.jpg',
    galleryImages: ['/priya-ramesh.jpg', '/wedding-couple.jpg', '/shadi-couple.jpg']
  },
  {
    id: 2,
    brideName: 'Sonal Sankpal',
    groomName: 'Shubham Sankpal',
    weddingDate: '2026-02-14',
    city: 'Pune',
    shortStory: 'We met on Shimpi Bandhan in November and got married in February. Verified badges made us feel completely secure.',
    story: 'Finding a partner within the Namdev Shimpi community was very important for both our families. Shimpi Bandhan made it so effortless with precise filters. From our first chat to our engagement, everything felt seamless and trustworthy.',
    photoUrl: '/sonal-shubham-new.jpg',
    galleryImages: ['/sonal-shubham-new.jpg', '/hero-wedding.jpg', '/newest-hero.jpg']
  },
  {
    id: 3,
    brideName: 'Pooja Shimpi',
    groomName: 'Aniket Shimpi',
    weddingDate: '2025-12-10',
    city: 'Mumbai',
    shortStory: 'A traditional match powered by modern AI compatibility scoring. Grateful to Shimpi Bandhan for bringing us together!',
    story: 'Aniket sent me an interest request on Shimpi Bandhan after seeing my verified profile. Our parents spoke the next day and arranged a family meet in Mumbai. Within two months, our wedding was fixed!',
    photoUrl: '/shadi-couple.jpg',
    galleryImages: ['/shadi-couple.jpg', '/priya-ramesh.jpg', '/sonal-shubham-new.jpg']
  },
  {
    id: 4,
    brideName: 'Neha Shimpi',
    groomName: 'Vikram Shimpi',
    weddingDate: '2025-11-25',
    city: 'Aurangabad',
    shortStory: 'Connected during the Pune Melava event! Shimpi Bandhan\'s digital platform made our communication smooth and secure.',
    story: 'We first noticed each other\'s profiles on Shimpi Bandhan before attending the regional Shimpi Melava. Having full family approval and verified details beforehand made the meeting relaxed and memorable.',
    photoUrl: '/wedding-couple.jpg',
    galleryImages: ['/wedding-couple.jpg', '/shadi-couple.jpg', '/hero-wedding.jpg']
  },
  {
    id: 5,
    brideName: 'Smita Shimpi',
    groomName: 'Rajesh Shimpi',
    weddingDate: '2025-09-15',
    city: 'Nagpur',
    shortStory: 'Two Shimpi families united across cities. Shimpi Bandhan made remote profile viewing and video calls super easy.',
    story: 'Living in different cities made traditional matchmaking challenging until we created profiles on Shimpi Bandhan. The instant chat and video verification features helped us build trust quickly.',
    photoUrl: '/hero-wedding.jpg',
    galleryImages: ['/hero-wedding.jpg', '/newest-hero.jpg', '/priya-ramesh.jpg']
  }
];

const CircularSuccessStories3D = () => {
  const [stories, setStories] = useState(DEFAULT_STORIES);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);

  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Fetch stories dynamically from Backend API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get('/success-stories');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setStories(response.data);
        }
      } catch (err) {
        console.log('Using default local success stories fallback:', err.message);
      }
    };
    fetchStories();
  }, []);

  // 360° Infinite Auto-Rotation loop (60 FPS GPU-accelerated)
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      if (isAutoRotating && !isDragging) {
        setRotationAngle(prev => (prev + (0.04 * (delta / 16.6)) * 10) % 360);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAutoRotating, isDragging]);

  // Drag & Swipe Event Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDragStartX(clientX);
    setDragStartAngle(rotationAngle);
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartX;
    setRotationAngle((dragStartAngle - deltaX * 0.45 + 360) % 360);
  }, [isDragging, dragStartX, dragStartAngle]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Wheel Scroll Event Handler to rotate 3D Ring
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      setRotationAngle(prev => (prev + e.deltaX * 0.2 + 360) % 360);
    } else {
      setRotationAngle(prev => (prev + e.deltaY * 0.2 + 360) % 360);
    }
  };

  // Rotate a specific card to front center (angle = 0°)
  const rotateToCard = (index) => {
    const total = stories.length;
    const angleStep = 360 / total;
    const targetAngle = (360 - (index * angleStep)) % 360;
    
    // Animate smoothly to target angle
    let current = rotationAngle;
    let diff = (targetAngle - current + 540) % 360 - 180;
    setRotationAngle(current + diff);
  };

  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 220 : 360;

  return (
    <div className="w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FCFBF9] py-20 px-4 relative overflow-hidden select-none">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E91E63]/10 via-[#C2185B]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10 space-y-3">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 bg-white/80 backdrop-blur-md border border-[#E91E63]/20 text-[#E91E63] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
        >
          ❤️ Happy Marriages & Verified Stories
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight"
        >
          Shimpi Bandhan <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] to-[#C2185B]">Success Stories</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium"
        >
          Explore inspiring journeys of couples who found their soulmate within the Aher & Namdev Shimpi community. Drag, swipe, or click to rotate the 3D showcase.
        </motion.p>
      </div>

      {/* 3D Circular Infinite Carousel Stage */}
      <div 
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onWheel={handleWheel}
        onMouseEnter={() => setIsAutoRotating(false)}
        onMouseLeave={() => setIsAutoRotating(true)}
        className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1000px] touch-pan-y"
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {stories.map((story, index) => {
            const total = stories.length;
            const angleStep = 360 / total;
            const cardAngle = (index * angleStep + rotationAngle) % 360;
            
            // Normalize angle to range [-180, 180]
            const normAngle = ((cardAngle % 360) + 540) % 360 - 180;
            const rad = (normAngle * Math.PI) / 180;

            const translateX = Math.sin(rad) * radius;
            const translateZ = Math.cos(rad) * radius;
            const rotateY = normAngle;

            // Distance from front center (0°)
            const absNorm = Math.abs(normAngle);
            const isFront = absNorm < (angleStep / 2);
            
            // Calculate dynamic scale, opacity, and zIndex for depth rendering
            const scale = isFront ? 1.08 : Math.max(0.68, 1 - absNorm / 240);
            const opacity = Math.max(0.35, 1 - absNorm / 160);
            const zIndex = Math.round(translateZ + 1000);

            const galleryList = story.galleryImages 
              ? (typeof story.galleryImages === 'string' ? story.galleryImages.split(',') : story.galleryImages)
              : [story.photoUrl];

            return (
              <div
                key={story.id || index}
                onClick={() => {
                  if (isFront) {
                    setSelectedStory(story);
                    setActiveGalleryImage(story.photoUrl);
                  } else {
                    rotateToCard(index);
                  }
                }}
                className={`absolute w-[270px] sm:w-[320px] bg-white/95 backdrop-blur-xl border rounded-[28px] p-5 shadow-xl transition-all duration-300 pointer-events-auto select-none ${
                  isFront 
                    ? 'border-[#E91E63]/40 ring-4 ring-[#E91E63]/10 shadow-[0_25px_60px_rgba(233,30,99,0.25)]' 
                    : 'border-white/80 shadow-md hover:border-[#E91E63]/30'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Highlight Badge for Center Card */}
                {isFront && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <FaHeart className="w-2.5 h-2.5 animate-ping" />
                    Featured Story
                  </div>
                )}

                {/* Couple Image with Gradient Overlay */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 group">
                  <img 
                    src={story.photoUrl || '/wedding-couple.jpg'} 
                    alt={`${story.groomName} & ${story.brideName}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white text-xs font-semibold">
                    <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <FaMapMarkerAlt className="text-[#E91E63]" /> {story.city || 'Maharashtra'}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px]">
                      <FaCalendarAlt className="text-amber-400" /> {story.weddingDate}
                    </span>
                  </div>
                </div>

                {/* Couple Name & Short Details */}
                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>{story.groomName}</span>
                    <span className="text-[#E91E63] text-sm">❤️</span>
                    <span>{story.brideName}</span>
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {story.shortStory || story.story}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStory(story);
                        setActiveGalleryImage(story.photoUrl);
                      }}
                      className="w-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
                    >
                      <span>View Full Story</span>
                      <FaChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls & Indicator Bar */}
      <div className="max-w-xs mx-auto mt-6 flex items-center justify-between bg-white/90 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-full shadow-sm">
        <button 
          onClick={() => setRotationAngle(prev => (prev + (360 / stories.length)) % 360)}
          className="text-xs font-bold text-slate-700 hover:text-[#E91E63] transition-colors"
        >
          ‹ Prev
        </button>

        <button 
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-[#E91E63]/10 text-slate-700 hover:text-[#E91E63] rounded-full text-xs font-bold transition-all"
        >
          {isAutoRotating ? (
            <>
              <FaPause className="w-2.5 h-2.5" /> Pause
            </>
          ) : (
            <>
              <FaPlay className="w-2.5 h-2.5" /> Auto-Rotate
            </>
          )}
        </button>

        <button 
          onClick={() => setRotationAngle(prev => (prev - (360 / stories.length) + 360) % 360)}
          className="text-xs font-bold text-slate-700 hover:text-[#E91E63] transition-colors"
        >
          Next ›
        </button>
      </div>

      {/* Full Story Modal / Gallery Popup */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Close Button */}
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Main Banner Photo */}
              <div className="relative w-full h-64 sm:h-80 bg-slate-900 flex-shrink-0">
                <img 
                  src={activeGalleryImage || selectedStory.photoUrl || '/wedding-couple.jpg'} 
                  alt={`${selectedStory.groomName} & ${selectedStory.brideName}`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="px-3 py-1 bg-[#E91E63] text-white text-[10px] font-black uppercase rounded-full inline-block">
                    {selectedStory.city || 'Maharashtra'} Wedding
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black flex items-center gap-2">
                    <span>{selectedStory.groomName}</span>
                    <span className="text-[#E91E63]">❤️</span>
                    <span>{selectedStory.brideName}</span>
                  </h2>
                  <p className="text-xs text-amber-300 font-semibold flex items-center gap-2">
                    <FaCalendarAlt /> Married on {selectedStory.weddingDate}
                  </p>
                </div>
              </div>

              {/* Story Content & Gallery */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#E91E63] mb-2">Our Wedding Journey</h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                    {selectedStory.story || selectedStory.shortStory}
                  </p>
                </div>

                {/* Gallery Thumbnails */}
                {selectedStory.galleryImages && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Wedding Gallery</h4>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {(typeof selectedStory.galleryImages === 'string' 
                        ? selectedStory.galleryImages.split(',') 
                        : selectedStory.galleryImages
                      ).map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveGalleryImage(img.trim())}
                          className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                            (activeGalleryImage || selectedStory.photoUrl) === img.trim()
                              ? 'border-[#E91E63] ring-2 ring-[#E91E63]/30 scale-105'
                              : 'border-transparent opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img src={img.trim()} alt="Gallery thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CircularSuccessStories3D;
