import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCrown, FaCheckCircle, FaHeart, FaMapMarkerAlt, FaUserGraduate, FaBriefcase, FaStar, FaBuilding } from 'react-icons/fa';

const FEATURED_PROFILES = [
  {
    id: 101,
    name: 'Sonal Shimpi',
    age: 25,
    height: "5'4\"",
    community: 'Aher Shimpi',
    city: 'Pune',
    education: 'M.Tech Computer Science',
    occupation: 'Senior Software Engineer (MNC)',
    completion: 100,
    compatibilityScore: 98,
    lastActive: 'Online Now',
    bio: 'Passionate software professional from a close-knit Shimpi family in Pune. Enjoys classical music, traveling, and traditional family values.',
    photoUrl: '/indian-girl-1.jpg',
    isVerified: true,
    isPremium: true
  },
  {
    id: 102,
    name: 'Rohan Shimpi',
    age: 28,
    height: "5'10\"",
    community: 'Namdev Shimpi',
    city: 'Mumbai',
    education: 'MBA Marketing & Finance',
    occupation: 'Assistant Vice President (Bank)',
    completion: 95,
    compatibilityScore: 94,
    lastActive: '2h ago',
    bio: 'Finance executive living in Mumbai. Believes in modern lifestyle while keeping deep respect for community culture and traditions.',
    photoUrl: '/priya-ramesh.jpg',
    isVerified: true,
    isPremium: true
  },
  {
    id: 103,
    name: 'Pooja Sankpal',
    age: 24,
    height: "5'3\"",
    community: 'Aher Shimpi',
    city: 'Nashik',
    education: 'MBBS, MD Pediatrics',
    occupation: 'Consultant Pediatrician',
    completion: 98,
    compatibilityScore: 96,
    lastActive: 'Active Today',
    bio: 'Pediatrician based in Nashik. Looking for an educated, understanding partner with strong family values from the Shimpi community.',
    photoUrl: '/indian-girl-2.jpg',
    isVerified: true,
    isPremium: true
  },
  {
    id: 104,
    name: 'Aniket Shimpi',
    age: 29,
    height: "6'0\"",
    community: 'Namdev Shimpi',
    city: 'Aurangabad',
    education: 'B.E. Mechanical',
    occupation: 'Business Owner (Manufacturing)',
    completion: 92,
    compatibilityScore: 92,
    lastActive: 'Online Now',
    bio: 'Entrepreneur managing a family manufacturing business. Enjoys sports, reading, and spending quality time with family.',
    photoUrl: '/sonal-shubham-new.jpg',
    isVerified: true,
    isPremium: true
  }
];

const FeaturedPremiumMembersShowcase = () => {
  const [interestSent, setInterestSent] = useState({});

  const handleSendInterest = (id) => {
    setInterestSent(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-slate-200/80">
      
      {/* Background Soft Glow Blobs */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
            <FaCrown className="text-amber-500" /> Featured Premium VIP Members
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Handpicked Verified Profiles
          </h2>
          <p className="text-slate-600 text-sm font-semibold leading-relaxed">
            Exclusive verified profiles from Aher Shimpi & Namdev Shimpi families with highest AI compatibility scores.
          </p>
        </div>

        {/* Apple-Style Glass Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_PROFILES.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white/95 backdrop-blur-2xl border border-amber-500/20 rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-pink-500/40 hover:shadow-[0_25px_60px_rgba(128,0,32,0.12)] transition-all duration-300 flex flex-col sm:flex-row gap-6 relative overflow-hidden group"
            >
              {/* VIP Gold Accent Ribbon Top-Right */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-sm flex items-center gap-1">
                <FaCrown className="text-xs" /> VIP Profile
              </div>

              {/* Profile Photo */}
              <div className="w-full sm:w-44 h-64 sm:h-52 rounded-2xl overflow-hidden flex-shrink-0 relative border-2 border-amber-500/20 shadow-md">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {profile.lastActive}
                </div>
              </div>

              {/* Profile Content */}
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-serif font-black text-slate-900">{profile.name}</h3>
                    {profile.isVerified && (
                      <span className="text-sky-500" title="Verified Badge">
                        <FaCheckCircle className="text-base" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-extrabold text-[#800020] uppercase tracking-wider">
                    {profile.age} yrs • {profile.height} • {profile.community}
                  </p>
                </div>

                {/* Info Pills */}
                <div className="space-y-1.5 text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-rose-500 flex-shrink-0" />
                    <span>{profile.city}, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserGraduate className="text-indigo-500 flex-shrink-0" />
                    <span className="truncate">{profile.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-amber-500 flex-shrink-0" />
                    <span className="truncate">{profile.occupation}</span>
                  </div>
                </div>

                {/* AI Score Pill */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-700 rounded-full text-[11px] font-bold flex items-center gap-1">
                    <FaStar className="text-pink-500" /> {profile.compatibilityScore}% AI Match
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600">
                    {profile.completion}% Profile Complete
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 italic font-medium pt-1">
                  "{profile.bio}"
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleSendInterest(profile.id)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      interestSent[profile.id]
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gradient-to-r from-[#800020] to-pink-600 text-white shadow-md hover:brightness-110'
                    }`}
                  >
                    <FaHeart className="text-xs" />
                    {interestSent[profile.id] ? 'Interest Expressed!' : 'Express Interest'}
                  </button>

                  <Link
                    to={`/profile/${profile.id}`}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold transition-all border border-slate-300/80"
                  >
                    View Full
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturedPremiumMembersShowcase;
