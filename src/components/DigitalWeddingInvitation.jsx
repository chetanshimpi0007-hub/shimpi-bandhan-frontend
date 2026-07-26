import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaGlassCheers, FaRing, FaCheckCircle } from 'react-icons/fa';

const DigitalWeddingInvitation = () => {
  const [guestCount, setGuestCount] = useState(148);
  const [rsvpDone, setRsvpDone] = useState(false);

  return (
    <div className="w-full bg-gradient-to-b from-[#111827] via-slate-900 to-[#111827] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      {/* Floating Flowers & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaRing className="text-amber-400" /> Digital Wedding Invitation Card
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Priya <span className="text-pink-400">❤️</span> Ramesh
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium">
            Together with their families, invite you to celebrate their wedding ceremony.
          </p>
        </div>

        {/* VisionOS Glass Invitation Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/90 backdrop-blur-2xl border border-amber-400/30 rounded-[40px] p-8 sm:p-12 shadow-[0_30px_70px_rgba(245,200,66,0.15)] relative overflow-hidden space-y-8"
        >
          {/* Couple Image Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="relative h-64 rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl">
              <img src="/priya-ramesh.jpg" alt="Priya & Ramesh" className="w-full h-full object-cover" />
            </div>
            <div className="text-left space-y-4">
              <h3 className="text-2xl font-serif font-black text-white">Save The Date</h3>
              <p className="text-xs text-amber-300 font-bold uppercase tracking-widest flex items-center gap-2">
                <FaCalendarAlt /> Sunday, 18th May 2026
              </p>
              <p className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-rose-400" /> Royal Lawn & Palace, Nashik, Maharashtra
              </p>
              <div className="pt-2 text-slate-400 text-xs leading-relaxed font-medium">
                "Two lives, two hearts, joined together in friendship, united forever in love."
              </div>
            </div>
          </div>

          {/* RSVP & Guest Counter */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <FaUsers className="text-amber-400 text-base" />
              <span>{guestCount} Guests Confirmed Attendance</span>
            </div>

            <button
              onClick={() => {
                if (!rsvpDone) {
                  setGuestCount(prev => prev + 1);
                  setRsvpDone(true);
                }
              }}
              className={`px-8 py-3 rounded-2xl text-xs font-black transition-all shadow-lg flex items-center gap-2 ${
                rsvpDone 
                  ? 'bg-emerald-500 text-white cursor-default' 
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/20'
              }`}
            >
              {rsvpDone ? <><FaCheckCircle /> RSVP Confirmed</> : <><FaGlassCheers /> Send RSVP Confirmation</>}
            </button>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default DigitalWeddingInvitation;
