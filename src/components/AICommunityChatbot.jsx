import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaSmile, FaLightbulb, FaHeart, FaQuestionCircle, FaCrown } from 'react-icons/fa';

const BOT_SUGGESTIONS = [
  'How do I verify my profile?',
  'What are the benefits of Premium Membership?',
  'How does AI Compatibility score work?',
  'Tell me about upcoming Shimpi Vadhu-Var Melava.',
];

const AICommunityChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaskar! I am your Shimpi Bandhan AI Community Assistant 24x7. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Generate intelligent AI response
    setTimeout(() => {
      let reply = 'Thank you for asking! Profile verification is done manually within 24 hours by our admin team to ensure 100% authenticity.';
      if (query.toLowerCase().includes('premium')) {
        reply = 'Premium members get access to direct phone numbers, unlimited instant chats, and priority listing in search results.';
      } else if (query.toLowerCase().includes('melava')) {
        reply = 'Our upcoming Pune Regional Vadhu-Var Melava is on March 15, 2026. You can get your Digital QR Entry Ticket directly on the platform!';
      } else if (query.toLowerCase().includes('compatibility') || query.toLowerCase().includes('score')) {
        reply = 'AI Match Compatibility calculates compatibility across sub-caste, education, profession, family background, and city preferences.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating AI Chatbot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-tr from-[#800020] via-[#a00028] to-amber-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_35px_rgba(128,0,32,0.4)] hover:scale-110 transition-all cursor-pointer border border-white/30"
      >
        <FaRobot className="text-2xl animate-bounce" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      </button>

      {/* Glass Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm bg-slate-900/95 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[520px] text-slate-100 relative"
            >
              {/* Top Bar */}
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#800020] to-pink-600 flex items-center justify-center text-white text-lg">
                    <FaRobot />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1">
                      <span>Shimpi AI Assistant</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">24x7 Matrimonial Help</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-left">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed font-medium ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-[#800020] to-pink-600 text-white rounded-br-none shadow-md'
                          : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick AI Suggestions */}
              <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px]">
                {BOT_SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="px-3 py-1 bg-slate-800 hover:bg-[#800020]/30 text-slate-300 hover:text-white rounded-full flex-shrink-0 transition-colors"
                  >
                    💡 {sug}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask Shimpi AI assistant..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-pink-500"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#800020] to-pink-600 text-white flex items-center justify-center text-xs shadow-md cursor-pointer flex-shrink-0"
                >
                  <FaPaperPlane />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICommunityChatbot;
