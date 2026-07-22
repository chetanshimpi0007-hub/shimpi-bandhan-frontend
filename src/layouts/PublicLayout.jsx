import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Success Stories', path: '/success-stories' },
  { name: 'Vivah Melava', path: '/melava' },
  { name: 'Business Directory', path: '/business' }
];

const PublicLayout = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-[var(--color-primary)] selection:text-white">
      {/* Top utility bar */}
      <div className="bg-[var(--color-primary)] text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-4">
            <span>Customer Support: 7350330271</span>
            <span>|</span>
            <span>support@shimpibandhan.com</span>
          </div>
          <div className="flex gap-4">
            <Link to="/help" className="hover:text-yellow-200 transition-colors">Help & Support</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-yellow-200 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white shadow-[0_2px_15px_rgba(0,0,0,0.08)] border-b border-gray-100' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[90px] py-2">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className="text-gray-700 hover:text-[var(--color-primary)] font-semibold text-[15px] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              ))}
              <Link 
                to="/premium" 
                className="text-[var(--color-secondary)] hover:text-yellow-700 font-bold text-[15px] transition-colors relative group flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                Premium
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[var(--color-secondary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </nav>

            <div className="flex items-center gap-5">
              <Link 
                to="/login" 
                className="hidden sm:flex items-center gap-2 text-gray-700 font-bold hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-[var(--color-primary)] text-white px-8 py-2.5 rounded text-[15px] font-bold hover:bg-[#72112e] transition-colors shadow-[0_4px_14px_0_rgba(138,21,56,0.39)]"
              >
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-[4px] border-[var(--color-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-serif text-white mb-4">Shimpi<span className="text-[var(--color-secondary)]">Bandhan</span></h3>
            <p className="text-gray-400 text-sm leading-loose">The most trusted premium matrimonial platform exclusively for the Aher and Namdev Shimpi communities. Find your perfect life partner with confidence and tradition.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-[var(--color-secondary)] transition-colors inline-block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-secondary)] transition-colors inline-block">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-[var(--color-secondary)] transition-colors inline-block">FAQ</Link></li>
              <li><Link to="/success-stories" className="hover:text-[var(--color-secondary)] transition-colors inline-block">Success Stories</Link></li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Legal & Privacy</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-[var(--color-secondary)] transition-colors inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--color-secondary)] transition-colors inline-block">Terms & Conditions</Link></li>
              <li><Link to="/refund" className="hover:text-[var(--color-secondary)] transition-colors inline-block">Refund Policy</Link></li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">Contact Support</h4>
            <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              support@shimpibandhan.com
            </p>
            <p className="text-gray-300 text-sm mb-2 font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Miss Payal: 7350330271
            </p>
            <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Miss Sonal: 755 931 9587
            </p>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} ShimpiBandhan. All Rights Reserved.</p>
          <p className="text-gray-500">Designed & Developed by <span className="text-gray-400 font-semibold">Arnav InfoWeb</span></p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
