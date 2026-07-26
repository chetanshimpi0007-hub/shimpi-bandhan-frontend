import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaQrcode, FaTimes, FaCheckCircle, FaClock, FaStar } from 'react-icons/fa';

const MelavaEventExperience = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="w-full bg-[#111827] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaCalendarAlt /> Community Gathering Event
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Grand <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400">Shimpi Vadhu-Var Melava</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Connect in person with hundreds of verified candidate families in Pune.
          </p>
        </div>

        {/* Melava Card Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-[36px] p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase border border-emerald-500/20">
              <FaCheckCircle /> Registration Open
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Pune Regional Shimpi Melava 2026
            </h3>

            <div className="space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-amber-400" />
                <span>Sunday, 15th March 2026 · 9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-400" />
                <span>Yashwantrao Chavan Auditorium, Kothrud, Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-purple-400" />
                <span>Over 450+ Candidates Registered</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowQR(true)}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-8 py-3.5 rounded-2xl text-xs font-black transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <FaQrcode />
                <span>Get Digital QR Entry Ticket</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-700 shadow-xl">
            <img src="/hero-wedding.jpg" alt="Shimpi Melava" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>
        </motion.div>

      </div>

      {/* Digital QR Ticket Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 max-w-sm w-full text-center space-y-6 relative shadow-2xl"
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Entry Pass</span>
                <h3 className="text-xl font-bold text-white">Pune Melava 2026</h3>
              </div>

              {/* QR Placeholder */}
              <div className="w-48 h-48 bg-white p-4 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                <div className="w-full h-full border-4 border-slate-900 flex items-center justify-center font-mono font-black text-slate-900 text-xs">
                  [ QR CODE PASS ]
                </div>
              </div>

              <p className="text-xs text-slate-400 font-semibold">
                Show this QR code at the registration desk for instant entry.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MelavaEventExperience;
