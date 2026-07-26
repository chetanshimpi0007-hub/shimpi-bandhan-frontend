import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaTimes, FaHeart, FaCommentAlt, FaEye, FaCrown, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const NOTIFICATIONS = [
  { id: 1, title: 'Interest Received', desc: 'Priya Shimpi sent you a mutual interest request.', time: '10 mins ago', icon: <FaHeart className="text-pink-500" /> },
  { id: 2, title: 'New Message', desc: 'Sonal Sankpal replied to your conversation.', time: '1 hour ago', icon: <FaCommentAlt className="text-blue-500" /> },
  { id: 3, title: 'Profile Visitor', desc: 'Aniket Shimpi viewed your profile.', time: '3 hours ago', icon: <FaEye className="text-emerald-500" /> },
  { id: 4, title: 'Community Melava', desc: 'Pune Shimpi Melava registration is now open.', time: '1 day ago', icon: <FaCalendarAlt className="text-amber-500" /> },
];

const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);

  return (
    <>
      {/* Floating Bell Trigger */}
      <button
        onClick={() => {
          setIsOpen(true);
          setUnreadCount(0);
        }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-tr from-[#800020] via-pink-600 to-rose-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(233,30,99,0.4)] hover:scale-110 transition-all cursor-pointer border border-white/30"
      >
        <FaBell className="text-xl animate-wiggle" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Slide-out Glass Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm bg-slate-900/95 border-l border-slate-800 h-full p-6 space-y-6 shadow-2xl flex flex-col text-slate-100 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <FaBell className="text-pink-500" /> Notifications
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {NOTIFICATIONS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1.5 hover:border-pink-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        {item.icon} {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed group-hover:text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationDrawer;
