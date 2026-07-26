import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaShare, FaCheckCircle, FaBullhorn, FaImages } from 'react-icons/fa';

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Shimpi Bandhan Team',
    time: '2 hours ago',
    category: 'ANNOUNCEMENT',
    title: 'Grand Pune Vadhu-Var Melava 2026 Registration Open!',
    content: 'We are excited to announce our upcoming regional Shimpi Melava in Pune. Registration is now live for all verified Aher and Namdev Shimpi candidates.',
    photo: '/hero-wedding.jpg',
    likes: 142,
    comments: 28,
    isLiked: false
  },
  {
    id: 2,
    author: 'Priya & Ramesh Shimpi',
    time: '1 day ago',
    category: 'WEDDING STORY',
    title: 'Our Wedding Fixed for May 2026! ❤️',
    content: 'Grateful to Shimpi Bandhan platform for bringing our two families together. Thank you everyone for your blessings!',
    photo: '/priya-ramesh.jpg',
    likes: 289,
    comments: 45,
    isLiked: true
  }
];

const CommunitySocialFeed = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="w-full bg-[#111827] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none text-slate-100">
      
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-4 py-1.5 bg-[#800020]/20 border border-[#800020]/40 text-pink-400 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
            <FaBullhorn className="text-pink-400" /> Shimpi Community Feed
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Community Updates & Announcements
          </h2>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/90 border border-slate-800 rounded-[32px] p-6 space-y-4 shadow-xl hover:border-pink-500/30 transition-all text-left"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#800020] to-pink-600 flex items-center justify-center font-bold text-white text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{post.author}</span>
                      <FaCheckCircle className="text-pink-400 text-xs" />
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{post.time}</span>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-slate-800 text-amber-400 rounded-full border border-slate-700">
                  {post.category}
                </span>
              </div>

              {/* Title & Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{post.title}</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Optional Photo */}
              {post.photo && (
                <div className="h-64 rounded-2xl overflow-hidden border border-slate-800">
                  <img src={post.photo} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Interaction Bar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    post.isLiked ? 'bg-pink-500/10 text-pink-400' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <FaHeart className={post.isLiked ? 'text-pink-500' : ''} />
                  <span>{post.likes} Likes</span>
                </button>

                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-all cursor-pointer">
                  <FaComment />
                  <span>{post.comments} Comments</span>
                </button>

                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-all cursor-pointer">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CommunitySocialFeed;
