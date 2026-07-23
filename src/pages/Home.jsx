import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaSearch, FaShieldAlt, FaUserCheck, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import api, { getBackendUrl } from '../services/api';

// Professional, slow fade animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const Home = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [latestProfiles, setLatestProfiles] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/success-stories')
      .then(res => setSuccessStories(res.data))
      .catch(console.error);

    api.get('/public/profiles/latest')
      .then(res => setLatestProfiles(res.data))
      .catch(console.error);

    api.get('/v1/public/stats')
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigate('/search');
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

  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - The Trusted Matrimonial Platform</title>
        <meta name="description" content="Join Shimpi Bandhan today to find your perfect life partner within the Aher and Namdev Shimpi communities. Thousands of verified profiles." />
      </Helmet>

      {/* Full-Width Background Hero Section */}
      <section className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center z-10 overflow-hidden bg-slate-900">
        
        {/* Full Width Wedding Couple Image */}
        <img 
          src="/wedding-couple.jpg" 
          alt="Shimpi Bandhan Wedding Hero" 
          className="absolute inset-0 w-full h-full object-cover object-top md:object-center z-0 pointer-events-none" 
        />
        
        {/* Soft Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl space-y-6 text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm">
                ❤️ Connecting Hearts, Building Relationships
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] tracking-tight drop-shadow-md">
              Find Your Perfect <br />
              <span className="text-amber-400">Life Partner</span>
            </motion.h1>

            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="text-lg sm:text-xl font-medium text-gray-100 leading-relaxed drop-shadow">
              Connecting Aher Shimpi & Namdev Shimpi Families through a secure, verified and trusted matrimonial platform where meaningful relationships begin.
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register" className="group bg-gradient-to-r from-[#800020] to-[#a00028] text-white px-8 py-4 rounded-full text-base font-black transition-all shadow-lg shadow-[#800020]/40 hover:shadow-[#800020]/60 hover:-translate-y-1 w-full sm:w-auto text-center border border-white/20">
                Register Now
              </Link>
              <Link to="/search" className="group bg-white/95 backdrop-blur-md border border-white/40 text-gray-900 hover:bg-white px-8 py-4 rounded-full text-base font-black transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-center">
                Browse Profiles
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Search Card positioned normally below hero section */}
      <section className="relative z-30 px-4 sm:px-6 my-10 md:my-14 mb-20 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-xl border border-white/60 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 sm:p-6 lg:p-8 h-auto"
        >
          <form onSubmit={handleQuickSearch} className="flex flex-col gap-6 md:grid md:grid-cols-5 md:gap-5 lg:gap-6 items-start md:items-end w-full">
            <div className="w-full">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Looking For</label>
              <select className="w-full bg-white/70 border border-gray-300 rounded-xl text-gray-800 py-3.5 px-4 focus:ring-2 focus:ring-[#800020] focus:bg-white outline-none transition-all text-sm font-semibold shadow-sm">
                <option>Bride</option>
                <option>Groom</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Age</label>
              <select className="w-full bg-white/70 border border-gray-300 rounded-xl text-gray-800 py-3.5 px-4 focus:ring-2 focus:ring-[#800020] focus:bg-white outline-none transition-all text-sm font-semibold shadow-sm">
                <option>21 to 25</option>
                <option>26 to 30</option>
                <option>31 to 35</option>
                <option>36 and above</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Community</label>
              <select className="w-full bg-white/70 border border-gray-300 rounded-xl text-gray-800 py-3.5 px-4 focus:ring-2 focus:ring-[#800020] focus:bg-white outline-none transition-all text-sm font-semibold shadow-sm">
                <option>Aher Shimpi</option>
                <option>Namdev Shimpi</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
              <input type="text" placeholder="e.g. Pune, Mumbai" className="w-full bg-white/70 border border-gray-300 rounded-xl text-gray-800 py-3.5 px-4 focus:ring-2 focus:ring-[#800020] focus:bg-white outline-none transition-all text-sm font-semibold shadow-sm" />
            </div>
            <div className="w-full pt-2 md:pt-0">
              <button type="submit" className="w-full bg-gradient-to-r from-[#800020] to-[#b3002d] text-white rounded-xl py-3.5 px-6 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-sm cursor-pointer border border-[#800020]/20 flex items-center justify-center gap-2">
                <FaSearch className="w-4 h-4" />
                Search Matches
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 border-t-2 border-[#800020]/10 relative overflow-hidden bg-[#faf9f6]">
        
        {/* Structural Pattern - Very Visible Grid */}
        <div 
          className="absolute inset-0 z-0"
          style={{ backgroundImage: 'linear-gradient(rgba(128,0,32,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,0,32,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        {/* Background Image - Highly Visible */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src="/hero-wedding.jpg" alt="Why Choose Us" className="w-full h-full object-cover" />
        </div>
        
        {/* Soft overlay to ensure text is readable */}
        <div className="absolute inset-0 z-0 bg-[#faf9f6]/70 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-black text-slate-900">Why Choose Shimpi Bandhan</h2>
            <p className="text-slate-555 max-w-2xl mx-auto text-sm font-semibold">We combine tradition with technology to bring you a secure, trusted, and highly successful matchmaking experience.</p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "100% Secure Profiles", desc: "Every profile is manually verified by our team, ensuring complete authenticity and trust." },
              { icon: <FaHeart />, title: "Exclusive Community", desc: "Dedicated specifically to the Aher and Namdev Shimpi communities, preserving our rich heritage." },
              { icon: <FaUserCheck />, title: "Privacy Guaranteed", desc: "Your contact details and photos remain strictly confidential and visible only to premium members." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 hover:border-pink-500/20 transition-all duration-300 shadow-sm">
                <div className="w-14 h-14 bg-pink-500/10 border border-pink-500/20 text-pink-500 rounded-2xl flex items-center justify-center text-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-555 leading-relaxed text-xs font-semibold">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories & Testimonials with Image */}
      <section className="py-24 border-t border-slate-100 bg-[#FAF9F6] relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-black text-slate-900">Success Stories</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm font-semibold">Read inspiring stories from couples who found their perfect match on Shimpi Bandhan.</p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localTestimonials.map((story, idx) => (
              <motion.div key={story.id || idx} variants={fadeUp} className="bg-white rounded-[32px] border border-slate-200/80 p-8 flex flex-col md:flex-row gap-6 hover:border-pink-500/20 transition-all duration-300 shadow-sm">
                <div className="w-full md:w-40 h-64 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <img src={story.photoUrl} alt={`${story.brideName} & ${story.groomName}`} className="w-full h-full object-cover object-top md:object-center" />
                </div>
                <div className="space-y-4 flex-1">
                  <FaQuoteLeft className="text-pink-500 text-2xl opacity-60" />
                  <p className="text-slate-600 text-xs italic leading-relaxed font-semibold">"{story.story}"</p>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">{story.brideName} & {story.groomName}</h3>
                    <p className="text-slate-400 text-[10px] font-bold mt-0.5">Married on {new Date(story.weddingDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium Membership Banner */}
      <section className="py-24 bg-gradient-to-tr from-pink-50 to-purple-50 text-center relative border-t border-slate-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <FaStar className="text-4xl text-amber-505 mx-auto mb-2 fill-amber-500" />
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Become a Premium Member</h2>
          <p className="text-base text-slate-505 max-w-xl mx-auto font-medium leading-relaxed">
            Upgrade your membership to access contact details, initiate unlimited chats, and get priority support from our relationship managers.
          </p>
          <Link to="/premium" className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-black text-sm hover:opacity-95 transition-all shadow-lg shadow-pink-600/25">
            View Membership Plans
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
