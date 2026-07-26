import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaComments, FaHeart, FaUser } from 'react-icons/fa';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/search', label: 'Search', icon: <FaSearch /> },
  { path: '/chat', label: 'Chat', icon: <FaComments /> },
  { path: '/interests', label: 'Interests', icon: <FaHeart /> },
  { path: '/profile', label: 'Profile', icon: <FaUser /> },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2 flex items-center justify-around select-none">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
              isActive 
                ? 'text-pink-400 font-bold scale-105' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
