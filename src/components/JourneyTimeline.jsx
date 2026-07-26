import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaShieldAlt, FaUserCheck, FaSearch, FaPaperPlane, FaComments, FaHandshake, FaGlassCheers, FaHeart, FaRing } from 'react-icons/fa';

const STEPS = [
  { step: 1, title: 'Register Free', desc: 'Create your account in seconds', icon: <FaUserPlus className="text-pink-500" /> },
  { step: 2, title: 'Verification', desc: 'Admin approves ID & Community', icon: <FaShieldAlt className="text-blue-500" /> },
  { step: 3, title: 'Complete Profile', desc: 'Add photos & family details', icon: <FaUserCheck className="text-emerald-500" /> },
  { step: 4, title: 'Find Matches', desc: 'Filter by sub-caste & location', icon: <FaSearch className="text-amber-500" /> },
  { step: 5, title: 'Send Interest', desc: 'Express mutual interest', icon: <FaPaperPlane className="text-indigo-500" /> },
  { step: 6, title: 'Secure Chat', desc: 'Connect & talk safely', icon: <FaComments className="text-purple-500" /> },
  { step: 7, title: 'Family Meeting', desc: 'Arrange in-person meet', icon: <FaHandshake className="text-[#800020]" /> },
  { step: 8, title: 'Engagement', desc: 'Celebrate with families', icon: <FaRing className="text-amber-400" /> },
  { step: 9, title: 'Happy Marriage ❤️', desc: 'Begin a lifelong journey', icon: <FaHeart className="text-rose-500 animate-bounce" /> },
];

const JourneyTimeline = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FCFBF9] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-3">
        <span className="px-4 py-1.5 bg-white border border-[#800020]/20 text-[#800020] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm">
          <FaGlassCheers className="text-amber-500" /> Your Journey To Marriage
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
          How <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#800020] to-pink-600">Shimpi Bandhan Works</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          A seamless 9-step path from registration to your dream wedding.
        </p>
      </div>

      {/* Horizontal / Grid Timeline Container */}
      <div className="max-w-6xl mx-auto relative">
        
        {/* Animated Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-10 right-10 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-[#800020] rounded-full opacity-30 pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 relative z-10">
          {STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:border-[#800020]/30 transition-all duration-300 relative group flex items-start gap-4"
            >
              {/* Step Number Circle */}
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] font-black uppercase text-[#800020] tracking-widest">
                  Step 0{item.step}
                </span>
                <h3 className="text-base font-black text-slate-900 group-hover:text-[#800020] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default JourneyTimeline;
