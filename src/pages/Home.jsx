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
      photoUrl: '/wedding-couple.jpg'
    }
  ];

  return (
    <div className="w-full bg-[#FCFBF9] overflow-hidden font-sans text-slate-800 min-h-screen relative">
      <Helmet>
        <title>Shimpi Bandhan - The Trusted Matrimonial Platform</title>
        <meta name="description" content="Join Shimpi Bandhan today to find your perfect life partner within the Aher and Namdev Shimpi communities. Thousands of verified profiles." />
      </Helmet>

      {/* Premium Full-Width Cream Overlay Hero Section */}
      <section className="relative w-full h-[75vh] md:h-[95vh] lg:h-[100vh] flex items-center z-10 overflow-hidden">
        
        {/* HERO IMAGE (Real IMG tag) */}
        <img 
          src="/wedding-couple.jpg" 
          alt="Premium Wedding Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[90%_center] lg:object-[88%_center] xl:object-[85%_center] z-0 pointer-events-none" 
        />
        
        {/* LEFT SIDE OVERLAY: Premium cream/white gradient */}
        <div 
          className="absolute inset-0 w-full lg:w-[55%] z-10"
          style={{ background: 'linear-gradient(90deg, rgba(255,250,245,0.98) 0%, rgba(255,250,245,0.90) 35%, rgba(255,250,245,0.55) 55%, rgba(255,250,245,0.00) 75%)' }}
        ></div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 h-full flex flex-col justify-center pt-24 pb-32 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 h-full">
            
            {/* Left Side Text Area */}
            <div className="w-full lg:max-w-[500px] space-y-6 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                <span className="px-4 py-1.5 bg-white/60 backdrop-blur-md border border-[#800020]/20 text-[#800020] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm">
                  ❤️ Connecting Hearts, Building Relationships
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-4xl sm:text-5xl lg:text-[64px] font-[900] text-gray-900 leading-[1.1] tracking-tight">
                Find Your Perfect <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#800020] to-[#b3002d]">Life Partner</span>
              </motion.h1>

              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="text-xl lg:text-2xl font-bold text-gray-800 leading-snug max-w-xl">
                Connecting Aher Shimpi & Namdev Shimpi Families through a secure, verified and trusted matrimonial platform where meaningful relationships begin.
              </motion.h2>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register" className="group bg-gradient-to-r from-[#800020] to-[#a00028] text-white px-8 py-4 rounded-full text-base font-black transition-all shadow-lg shadow-[#800020]/30 hover:shadow-[#800020]/50 hover:-translate-y-1 w-full sm:w-auto text-center border border-[#800020]/30">
                  Register Now
                </Link>
                <Link to="/search" className="group bg-white border border-[#800020]/20 text-[#800020] hover:bg-gray-50 px-8 py-4 rounded-full text-base font-black transition-all shadow-sm hover:shadow-md w-full sm:w-auto text-center">
                  Browse Profiles
                </Link>
              </motion.div>
              
              {/* Statistics below buttons */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-[#800020]/10 flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-[#800020]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <p className="text-xl font-black text-[#800020]">{stats?.totalMembers || '10k+'}</p>
                  <p className="text-[10px] text-gray-700 font-bold uppercase tracking-wider mt-1">Registered Members</p>
                </div>
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <p className="text-xl font-black text-emerald-600">{stats?.successStories || '5k+'}</p>
                  <p className="text-[10px] text-gray-700 font-bold uppercase tracking-wider mt-1">Successful Matches</p>
                </div>
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-xl font-black text-blue-600">{stats?.verifiedProfiles || '8k+'}</p>
                  <p className="text-[10px] text-gray-700 font-bold uppercase tracking-wider mt-1">Verified Profiles</p>
                </div>
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                  <p className="text-xl font-black text-yellow-600">2+</p>
                  <p className="text-[10px] text-gray-700 font-bold uppercase tracking-wider mt-1">Trusted Communities</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Removed redundant absolute search card that was causing mobile overlap */}
      </section>

      {/* Floating Premium Search Card */}
      <section className="relative z-30 px-4 sm:px-6 -mt-16 sm:-mt-24 lg:-mt-20 mb-24 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 sm:p-6 lg:p-8 overflow-hidden h-auto"
        >
          <form onSubmit={handleQuickSearch} className="flex flex-col md:grid md:grid-cols-5 gap-5 lg:gap-6 items-start md:items-end">
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
