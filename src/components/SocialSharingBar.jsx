import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLink, FaShareAlt, FaCheck } from 'react-icons/fa';

const SocialSharingBar = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://www.shimpibandhan.in";
  const shareText = "Find your verified life partner within Aher Shimpi & Namdev Shimpi communities on Shimpi Bandhan!";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#111827] py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-slate-100 select-none">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="text-left space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <FaShareAlt className="text-pink-400" /> Share Shimpi Bandhan with Community
          </h4>
          <p className="text-xs text-slate-400 font-medium">
            Help relatives and friends find their perfect match.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <FaWhatsapp className="text-sm" /> WhatsApp
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <FaFacebook className="text-sm" /> Facebook
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            {copied ? <><FaCheck className="text-emerald-400" /> Copied</> : <><FaLink /> Copy Link</>}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SocialSharingBar;
