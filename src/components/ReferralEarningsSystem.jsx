import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift, FaWallet, FaCopy, FaCheck, FaTrophy, FaShareAlt, FaCoins } from 'react-icons/fa';

const LEADERBOARD = [
  { rank: 1, name: 'Rajesh Shimpi', city: 'Pune', referrals: 24, earnings: '₹4,800' },
  { rank: 2, name: 'Pooja Shimpi', city: 'Nashik', referrals: 18, earnings: '₹3,600' },
  { rank: 3, name: 'Aniket Shimpi', city: 'Mumbai', referrals: 15, earnings: '₹3,000' },
];

const ReferralEarningsSystem = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "SHIMPI2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://www.shimpibandhan.in/register?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaGift className="text-emerald-400" /> Shimpi Community Rewards Program
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Refer & Earn <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Wallet Cashback</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Invite friends & family from Shimpi community and earn ₹200 wallet cashback per verified registration.
          </p>
        </div>

        {/* Referral Card + Wallet Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-[32px] p-8 space-y-6 shadow-2xl text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Your Unique Referral Link</span>
              <h3 className="text-xl font-bold text-white">Share & Invite Members</h3>
            </div>

            {/* Code Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-black text-amber-400 pl-2">
                https://shimpibandhan.in/register?ref={referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer flex-shrink-0"
              >
                {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy Link</>}
              </button>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-400">
              <span>🎁 ₹200 Per Signup</span>
              <span>⚡ Instant Wallet Credit</span>
            </div>
          </div>

          {/* Wallet & Leaderboard Box */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
                  <FaWallet />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Available Wallet Balance</span>
                  <h3 className="text-2xl font-black text-white">₹1,200</h3>
                </div>
              </div>

              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer">
                Redeem Cash
              </button>
            </div>

            {/* Leaderboard preview */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FaTrophy /> Monthly Referral Leaderboard
              </h4>
              <div className="space-y-2">
                {LEADERBOARD.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between text-xs font-bold text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px]">#{user.rank}</span>
                      <span>{user.name} ({user.city})</span>
                    </span>
                    <span className="text-emerald-400 font-mono">{user.earnings} ({user.referrals} ref)</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ReferralEarningsSystem;
