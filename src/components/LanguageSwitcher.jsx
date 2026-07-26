import React, { useState } from 'react';
import { FaGlobe, FaCheck } from 'react-icons/fa';

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'MR', name: 'मराठी (Marathi)' },
  { code: 'HI', name: 'हिंदी (Hindi)' }
];

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('EN');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
      >
        <FaGlobe className="text-amber-400" />
        <span>{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-xs font-bold text-slate-300 space-y-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-slate-800 flex items-center justify-between transition-colors ${
                currentLang === lang.code ? 'text-amber-400 font-extrabold' : ''
              }`}
            >
              <span>{lang.name}</span>
              {currentLang === lang.code && <FaCheck className="text-xs text-amber-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
