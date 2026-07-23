import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const localTestimonials = [
  {
    id: 1,
    brideName: 'Sonal Sankpal',
    groomName: 'Shubham Sankpal',
    weddingDate: '2026-02-14',
    story: 'We met on ShimpiBandhan in November and got married in February. The chat features and verified badges made us feel completely secure.',
    photoUrl: '/sonal-shubham-new.jpg'
  },
  {
    id: 2,
    brideName: 'Priya Shimpi',
    groomName: 'Ramesh Shimpi',
    weddingDate: '2026-05-18',
    story: 'The compatibility scoring on this platform is amazingly accurate. It matched us based on our exact sub-caste and lifestyle choices.',
    photoUrl: '/priya-ramesh.jpg'
  }
];

const SuccessStories = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16 space-y-3">
          <h1 className="text-4xl font-black text-slate-900">Success Stories</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-semibold">Read inspiring stories from couples who found their perfect match on Shimpi Bandhan.</p>
        </motion.div>
        
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {localTestimonials.map((story, idx) => (
            <motion.div key={story.id || idx} variants={fadeUp} className="bg-white rounded-[32px] border border-slate-200/80 p-8 flex flex-col md:flex-row gap-6 hover:border-pink-500/20 transition-all duration-300 shadow-sm">
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 relative">
                <img src={story.photoUrl} alt={`${story.brideName} & ${story.groomName}`} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <FaQuoteLeft className="text-pink-500 text-2xl opacity-60" />
                <p className="text-slate-600 text-sm italic leading-relaxed font-medium">"{story.story}"</p>
                <div>
                  <h3 className="text-lg font-black text-slate-800">{story.brideName} & {story.groomName}</h3>
                  <p className="text-slate-400 text-xs font-bold mt-1">Married on {new Date(story.weddingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStories;
