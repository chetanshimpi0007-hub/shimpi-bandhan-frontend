import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaIdCard, FaCheckCircle, FaUserCheck, FaCamera, FaFileUpload, FaSpinner } from 'react-icons/fa';

const SmartDocumentVerification = () => {
  const [docType, setDocType] = useState('AADHAAR');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(true);

  return (
    <div className="w-full bg-[#111827] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaShieldAlt className="text-blue-400" /> Smart AI Verification 5.0
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Instant Government ID <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">& Face Match</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-xl mx-auto">
            OCR scan + Face match verification guarantees 100% genuine matrimonial candidates.
          </p>
        </div>

        {/* Verification Card Showcase */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-left">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDocType('AADHAAR')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  docType === 'AADHAAR' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Aadhaar Card
              </button>
              <button
                onClick={() => setDocType('PAN')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  docType === 'PAN' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                PAN Card
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/40 rounded-2xl p-8 text-center space-y-3 bg-slate-950/60 cursor-pointer transition-all">
              <FaFileUpload className="text-3xl text-blue-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">Upload Front & Back Image</h4>
                <p className="text-[10px] text-slate-500 font-medium">PNG, JPG or PDF up to 10MB</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsVerifying(true);
                setTimeout(() => {
                  setIsVerifying(false);
                  setVerified(true);
                }, 1500);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isVerifying ? <FaSpinner className="animate-spin text-sm" /> : <><FaUserCheck /> Start AI OCR Scan</>}
            </button>
          </div>

          {/* AI Scan Results Preview */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FaIdCard className="text-blue-400" /> OCR Data Scan
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <FaCheckCircle /> VERIFIED
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Full Name:</span>
                <span className="text-white">Priya Ramesh Shimpi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="text-white">18/05/2000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Face Match Score:</span>
                <span className="text-emerald-400 font-mono font-bold">98.4% Match</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SmartDocumentVerification;
