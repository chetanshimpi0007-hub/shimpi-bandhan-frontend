import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaUser, FaSearch, FaHeart, FaBell, FaSignOutAlt, FaCrown, FaComments } from 'react-icons/fa';
import Logo from '../components/Logo';
import { logout } from '../redux/authSlice';
import api, { getBackendUrl } from '../services/api';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(state => state.auth?.user);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const res = await api.get('/profiles/me');
        if (res.data?.profilePhotoUrl) {
          setProfilePhotoUrl(res.data.profilePhotoUrl);
        }
      } catch (err) {
        console.error("Failed to load header profile photo", err);
      }
    };
    fetchProfilePhoto();
  }, [location.pathname]); // Refetch on route changes to ensure update sync

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'My Profile', path: '/profile', icon: <FaUser /> },
    { name: 'Search', path: '/search', icon: <FaSearch /> },
    { name: 'Interests', path: '/interests', icon: <FaHeart /> },
    { name: 'Chat', path: '/chat', icon: <FaComments /> },
    { name: 'Premium', path: '/premium', icon: <FaCrown className="text-[var(--color-secondary)]" /> },
  ];

  const hasPhoto = profilePhotoUrl && typeof profilePhotoUrl === 'string';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-center">
          <Logo className="h-20" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-[var(--color-primary)]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
          <div className="md:hidden">
            <Logo className="h-12" />
          </div>
          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-[var(--color-primary)] relative">
              <FaBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            {hasPhoto ? (
              <img 
                src={profilePhotoUrl.startsWith('http') || profilePhotoUrl.startsWith('blob:') ? profilePhotoUrl : `${getBackendUrl()}${profilePhotoUrl}`} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 cursor-pointer hover:border-[var(--color-secondary)] transition-colors"
                onClick={() => navigate('/profile')}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            ) : (
              <div 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[var(--color-primary)] font-bold border-2 border-blue-200 cursor-pointer hover:border-[var(--color-secondary)] transition-colors"
              >
                {String(currentUser?.fullName || 'U').charAt(0)}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 z-50 safe-area-bottom">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-[var(--color-primary)]' : 'text-gray-500'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardLayout;
