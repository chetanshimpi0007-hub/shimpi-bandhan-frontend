import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUserCheck, FaHeart, FaCrown, FaStore, FaChartLine } from 'react-icons/fa';
import api from '../services/api';

const DEFAULT_STATS = [
  { label: 'Total Members', count: 15400, suffix: '+', icon: <FaUsers className="text-blue-500" /> },
  { label: 'Verified Profiles', count: 100, suffix: '%', icon: <FaUserCheck className="text-emerald-500" /> },
  { label: 'Successful Marriages', count: 5200, suffix: '+', icon: <FaHeart className="text-[#800020]" /> },
  { label: 'Premium Members', count: 4800, suffix: '+', icon: <FaCrown className="text-amber-500" /> },
  { label: 'Business Listings', count: 1200, suffix: '+', icon: <FaStore className="text-purple-500" /> },
  { label: 'Daily Visitors', count: 25000, suffix: '+', icon: <FaChartLine className="text-pink-500" /> },
];

const PremiumStatsCounters = () => {
  const [statsData, setStatsData] = useState(DEFAULT_STATS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/v1/public/stats');
        if (res.data) {
          setStatsData([
            { label: 'Total Members', count: res.data.totalUsers || 15400, suffix: '+', icon: <FaUsers className="text-blue-500" /> },
            { label: 'Verified Profiles', count: 100, suffix: '%', icon: <FaUserCheck className="text-emerald-500" /> },
            { label: 'Successful Marriages', count: res.data.successfulMarriages || 5200, suffix: '+', icon: <FaHeart className="text-[#800020]" /> },
            { label: 'Premium Members', count: res.data.premiumMembers || 4800, suffix: '+', icon: <FaCrown className="text-amber-500" /> },
            { label: 'Business Listings', count: res.data.businessListings || 1200, suffix: '+', icon: <FaStore className="text-purple-500" /> },
            { label: 'Daily Visitors', count: 25000, suffix: '+', icon: <FaChartLine className="text-pink-500" /> },
          ]);
        }
      } catch (err) {
        console.log('Using default local stats counters:', err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
        {statsData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 text-center space-y-3 shadow-xl hover:border-[#800020]/50 hover:shadow-[#800020]/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl mx-auto group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            <div className="space-y-0.5">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {item.count.toLocaleString('en-IN')}{item.suffix}
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default PremiumStatsCounters;
