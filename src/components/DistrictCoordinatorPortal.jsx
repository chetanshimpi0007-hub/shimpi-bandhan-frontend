import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaCity, FaMapMarkerAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';

const COORDINATORS = [
  { name: 'Sanjay Shimpi', role: 'State Coordinator', region: 'Maharashtra', status: 'ACTIVE' },
  { name: 'Payal Shimpi', role: 'District Coordinator', region: 'Nashik District', status: 'ACTIVE' },
  { name: 'Sonal Sankpal', role: 'City Coordinator', region: 'Pune City', status: 'ACTIVE' },
  { name: 'Aniket Shimpi', role: 'Event Manager', region: 'Mumbai Division', status: 'ACTIVE' },
];

const DistrictCoordinatorPortal = () => {
  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaUserShield className="text-blue-400" /> District & Regional Coordinator Portal
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Community Leadership & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Coordinators Network</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Authorized regional coordinators ensuring local verification and event coordination across Maharashtra.
          </p>
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {COORDINATORS.map((item) => (
            <div key={item.name} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
                  <FaCheckCircle /> {item.status}
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <p className="text-xs text-blue-400 font-bold">{item.role}</p>
                <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <FaMapMarkerAlt className="text-pink-400" /> {item.region}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DistrictCoordinatorPortal;
