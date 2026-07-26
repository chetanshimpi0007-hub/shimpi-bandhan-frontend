import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaMicrophone, FaVideo, FaVolumeUp, FaTimes } from 'react-icons/fa';

const VoiceVideoIntroPlayer = ({ name = "Priya Shimpi" }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 text-slate-100">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FaMicrophone className="text-pink-400" /> Voice & Video Intro
        </h3>
        <span className="text-[10px] font-black uppercase tracking-wider bg-pink-500/10 text-pink-400 px-2.5 py-0.5 rounded-full">
          Verified Media
        </span>
      </div>

      {/* Audio Waveform Player */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
        <button
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:brightness-110 text-white flex items-center justify-center text-sm shadow-md cursor-pointer flex-shrink-0"
        >
          {isPlayingAudio ? <FaPause /> : <FaPlay className="ml-0.5" />}
        </button>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">30s Voice Intro</span>
            <span className="text-pink-400 font-mono">00:18 / 00:30</span>
          </div>

          {/* Animated Waveform Bars */}
          <div className="flex items-center gap-1 h-6 pt-1">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlayingAudio ? [6, 20, 10, 24, 8][i % 5] : 6,
                }}
                transition={{
                  duration: 0.4,
                  repeat: isPlayingAudio ? Infinity : 0,
                  repeatType: "reverse",
                  delay: i * 0.03,
                }}
                className={`flex-1 rounded-full ${
                  isPlayingAudio ? 'bg-pink-500' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Intro Button */}
      <button
        onClick={() => setShowVideoModal(true)}
        className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <FaVideo className="text-purple-400" />
        <span>Watch 1-Minute Video Intro</span>
      </button>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden max-w-lg w-full relative shadow-2xl space-y-4 p-6 text-center"
            >
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>

              <h3 className="text-lg font-bold text-white">Video Introduction: {name}</h3>
              
              <div className="w-full h-64 bg-slate-950 rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-800">
                <img src="/priya-ramesh.jpg" alt="Video thumbnail" className="w-full h-full object-cover opacity-60" />
                <div className="absolute w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl shadow-2xl cursor-pointer">
                  <FaPlay className="ml-1" />
                </div>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Verified 1-minute video introduction uploaded by candidate.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default VoiceVideoIntroPlayer;
