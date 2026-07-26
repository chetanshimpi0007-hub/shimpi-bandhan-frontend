import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaSearch, FaShieldAlt, FaUserCheck, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import api, { getBackendUrl } from '../services/api';
import CircularSuccessStories3D from '../components/CircularSuccessStories3D';
import SmartSearchHero from '../components/SmartSearchHero';

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

  return (
    <div className="w-full bg-[#FAF9F6] overflow-hidden font-sans text-slate-800 min-h-screen relative select-none">
      <Helmet>
        <title>Shimpi Bandhan - The Trusted Matrimonial Platform</title>
        <meta name="description" content="Join Shimpi Bandhan today to find your perfect life partner within the Aher and Namdev Shimpi communities. Thousands of verified profiles." />
      </Helmet>

      {/* Global Background Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-tr from-[#800020]/10 via-amber-400/10 to-pink-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[750px] h-[750px] bg-gradient-to-br from-rose-400/10 via-amber-300/10 to-purple-400/10 rounded-full blur-[160px] animate-pulse" />
      </div>

      {/* 1. Full-Width Background Hero Section */}
      <section className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center z-10 overflow-hidden bg-slate-900">
        
        {/* Full Width Wedding Couple Image */}
        <img 
          src="/wedding-couple.jpg" 
          alt="Shimpi Bandhan Wedding Hero" 
          className="absolute inset-0 w-full h-full object-cover object-top md:object-center z-0 pointer-events-none" 
        />
        
        {/* Soft Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10"></div>

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

      {/* 2. SMART SEARCH HERO SECTION */}
      <SmartSearchHero />

      {/* Layered Ribbon Wave Divider 1 */}
      <div className="w-full overflow-hidden leading-none z-10 relative text-[#FFFDF2]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-14 fill-current">
          <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* 4. Why Choose Us – Rich Ivory, Champagne Gold & Faded Mandala Watermark */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#FFFDF2] via-[#FFFBF0] to-[#FAF6EA]">
        
        {/* Subtle Gold Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-8"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        ></div>

        {/* Large Faded Mandala SVG Watermark - 12% Opacity (Highly Noticeable) */}
        <div className="absolute -top-10 right-0 z-0 opacity-12 pointer-events-none text-[#800020]">
          <svg width="450" height="450" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="0.8" />
            <path d="M50 20 Q65 35 50 50 Q35 35 50 20 Z" fill="currentColor" opacity="0.3" />
            <path d="M50 50 Q65 65 50 80 Q35 65 50 50 Z" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Left Floral Watermark */}
        <div className="absolute bottom-0 left-0 z-0 opacity-10 pointer-events-none text-amber-600">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M50 10 C30 30 30 70 50 90 C70 70 70 30 50 10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M10 50 C30 30 70 30 90 50 C70 70 30 70 10 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src="/hero-wedding.jpg" alt="Why Choose Us" className="w-full h-full object-cover" />
        </div>
        
        {/* Soft Gold Overlay */}
        <div className="absolute inset-0 z-0 bg-[#FFFDF2]/75 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-black text-slate-900">Why Choose Shimpi Bandhan</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm font-semibold">We combine tradition with technology to bring you a secure, trusted, and highly successful matchmaking experience.</p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "100% Secure Profiles", desc: "Every profile is manually verified by our team, ensuring complete authenticity and trust." },
              { icon: <FaHeart />, title: "Exclusive Community", desc: "Dedicated specifically to the Aher and Namdev Shimpi communities, preserving our rich heritage." },
              { icon: <FaUserCheck />, title: "Privacy Guaranteed", desc: "Your contact details and photos remain strictly confidential and visible only to premium members." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white/95 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 hover:border-pink-500/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-md">
                <div className="w-14 h-14 bg-pink-500/10 border border-pink-500/20 text-pink-500 rounded-2xl flex items-center justify-center text-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-xs font-semibold">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Organic Curved Wave Divider 2 */}
      <div className="w-full overflow-hidden leading-none z-10 relative text-[#FFF0F4]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* 5. PREMIUM 360° CIRCULAR SUCCESS STORIES SHOWCASE */}
      <CircularSuccessStories3D />

      {/* Layered Ribbon Divider 3 */}
      <div className="w-full overflow-hidden leading-none z-10 relative text-[#FFFDF0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-14 fill-current">
          <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* 6. Premium Membership Banner – VIP Champagne Gold & Royal Glass Shimmer */}
      <section className="py-24 bg-gradient-to-br from-[#FFFDF0] via-[#FFF8EB] to-[#FFF0F5] text-center relative border-t-2 border-amber-500/30 overflow-hidden shadow-inner">
        
        {/* VIP Gold Shimmer Glowing Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-300/20 via-pink-400/20 to-purple-400/20 rounded-full blur-[110px] pointer-events-none animate-pulse" />

        {/* Floating Star & Diamond Watermarks */}
        <div className="absolute top-8 left-16 opacity-20 text-amber-500 pointer-events-none">
          <FaStar className="text-5xl animate-bounce" />
        </div>
        <div className="absolute bottom-10 right-16 opacity-20 text-amber-500 pointer-events-none">
          <FaStar className="text-6xl animate-pulse" />
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-500/40 text-amber-500 flex items-center justify-center mx-auto shadow-lg">
            <FaStar className="text-3xl fill-amber-500 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Become a Premium Member</h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
            Upgrade your membership to access contact details, initiate unlimited chats, and get priority support from our relationship managers.
          </p>
          <Link to="/premium" className="inline-block bg-gradient-to-r from-[#800020] via-pink-600 to-rose-600 text-white px-10 py-4 rounded-2xl font-black text-sm hover:brightness-110 transition-all shadow-xl shadow-[#800020]/30 border border-white/40 cursor-pointer">
            View Membership Plans
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
