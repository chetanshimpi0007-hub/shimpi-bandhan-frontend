import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHeart, FaShieldAlt, FaCheckCircle, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaStar, FaUserCheck, FaGlassCheers } from 'react-icons/fa';

const VisionProProfileViewer = ({ profile = null, onClose }) => {
  const [activeTab, setActiveTab] = useState('about');

  const defaultProfile = {
    fullName: 'Priya Ramesh Shimpi',
    age: 25,
    city: 'Nashik',
    education: 'MBA Finance',
    occupation: 'Senior HR Specialist',
    company: 'TCS Innovation Hub',
    subCaste: 'Namdev Shimpi',
    height: "5'5\"",
    verified: true,
    photo: '/priya-ramesh.jpg',
    bio: 'Family-oriented professional with a passion for traditional Shimpi values, classical music, and traveling.'
  };

  const p = profile || defaultProfile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-2xl select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-[40px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col max-h-[90vh] text-slate-100 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-10 h-10 bg-slate-950/60 hover:bg-slate-950 text-white rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all cursor-pointer"
        >
          <FaTimes />
        </button>

        {/* Vision Pro Fullscreen Hero Banner */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-950 flex-shrink-0">
          <img src={p.photo} alt={p.fullName} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 bg-[#800020] text-white text-[10px] font-black uppercase rounded-full border border-white/20">
                  {p.subCaste}
                </span>
                <span className="px-3 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase rounded-full flex items-center gap-1">
                  <FaCheckCircle /> Verified Profile
                </span>
              </div>
              <h2 className="text-3xl font-serif font-black text-white flex items-center gap-2">
                {p.fullName}, {p.age}
              </h2>
              <p className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-400" /> {p.city}, Maharashtra · {p.height}
              </p>
            </div>

            <button className="bg-gradient-to-r from-[#800020] via-pink-600 to-rose-600 text-white px-8 py-3 rounded-2xl text-xs font-black transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-white/20">
              <FaHeart className="text-pink-300" /> Send Express Interest
            </button>
          </div>
        </div>

        {/* Vision Pro Tabs Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto text-xs font-bold text-slate-400">
          {['about', 'education', 'family', 'lifestyle'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-slate-800 text-white font-black shadow-md border border-slate-700' 
                  : 'hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Body Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-left flex-1">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">About Candidate</h4>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">{p.bio}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Occupation</span>
                  <span className="text-xs font-bold text-white">{p.occupation}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Education</span>
                  <span className="text-xs font-bold text-white">{p.education}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Location</span>
                  <span className="text-xs font-bold text-white">{p.city}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">Education & Profession</h4>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <h5 className="text-sm font-bold text-white flex items-center gap-2"><FaGraduationCap className="text-blue-400" /> {p.education}</h5>
                <p className="text-xs text-slate-400">Pune University · First Class Distinction</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <h5 className="text-sm font-bold text-white flex items-center gap-2"><FaBriefcase className="text-purple-400" /> {p.occupation}</h5>
                <p className="text-xs text-slate-400">{p.company} · Full Time Professional</p>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default VisionProProfileViewer;
