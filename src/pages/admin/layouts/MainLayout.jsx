import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/authSlice';
import {
  FiGrid, FiUsers, FiCheckSquare, FiCamera, FiStar, FiBriefcase,
  FiClipboard, FiCreditCard, FiTrendingUp, FiMessageSquare, FiBell,
  FiFileText, FiShield, FiSettings, FiUser, FiLogOut, FiMenu, FiX,
  FiChevronRight, FiSearch
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const navGroups = [
  {
    group: 'Overview',
    items: [{ name: 'Dashboard', path: '/admin/dashboard', icon: FiGrid }]
  },
  {
    group: 'People',
    items: [
      { name: 'Users', path: '/admin/users', icon: FiUsers },
      { name: 'Pending Profiles', path: '/admin/profile-verifications', icon: FiCheckSquare, badge: 'pending' },
      { name: 'Photo Approvals', path: '/admin/photo-verifications', icon: FiCamera, badge: 'photos' },
      { name: 'Premium Members', path: '/admin/premium-approvals', icon: FiStar },
    ]
  },
  {
    group: 'Business',
    items: [
      { name: 'Businesses', path: '/admin/business/dashboard', icon: FiBriefcase },
      { name: 'Biz Approvals', path: '/admin/business/manage', icon: FiClipboard },
    ]
  },
  {
    group: 'Finance',
    items: [
      { name: 'Payments', path: '/admin/payments', icon: FiCreditCard },
      { name: 'Enquiries', path: '/admin/analytics/enquiries', icon: FiTrendingUp },
    ]
  },
  {
    group: 'Communication',
    items: [
      { name: 'Chat Moderation', path: '/admin/chat-moderation', icon: FiMessageSquare },
      { name: 'Notifications', path: '/admin/notifications', icon: FiBell },
    ]
  },
  {
    group: 'System',
    items: [
      { name: 'Reports', path: '/admin/reports', icon: FiFileText },
      { name: 'Audit Logs', path: '/admin/audit-logs', icon: FiShield },
      { name: 'Settings', path: '/admin/settings', icon: FiSettings },
      { name: 'My Profile', path: '/admin/profile', icon: FiUser },
    ]
  }
];

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-50 shadow-sm w-64 md:w-auto md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-20'}`}>
        
        {/* Brand */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
          <div className="flex items-center gap-3 w-full overflow-hidden">
            <div className="w-10 h-10 shrink-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              <HiOutlineSparkles className="text-white w-6 h-6" />
            </div>
            {/* Always show brand name on mobile when sidebar is open, or on desktop when open */}
            <div className={`flex flex-col ${!sidebarOpen ? 'md:hidden' : ''}`}>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">Shimpi Bandhan</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Admin Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className={`px-3 mb-2 text-xs font-bold uppercase tracking-widest text-gray-400 ${!sidebarOpen ? 'md:hidden' : ''}`}>
                {group.group}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => { if (window.innerWidth < 768) setSidebarOpen(false); }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } ${!sidebarOpen ? 'md:justify-center' : ''}`}
                        title={!sidebarOpen ? item.name : undefined}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-md"></div>
                        )}
                        <item.icon className={`shrink-0 w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        <span className={`text-sm ${!sidebarOpen ? 'md:hidden' : ''}`}>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center gap-3 mb-3 ${!sidebarOpen ? 'md:justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
              <span className="text-blue-700 font-bold text-sm">SA</span>
            </div>
            <div className={`overflow-hidden ${!sidebarOpen ? 'md:hidden' : ''}`}>
              <p className="text-sm font-bold text-gray-900 truncate">Super Admin</p>
              <p className="text-xs text-gray-500 truncate">{user?.phone}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors ${!sidebarOpen ? 'md:justify-center' : ''}`}
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <FiLogOut className="w-5 h-5 shrink-0" />
            <span className={`text-sm font-medium ${!sidebarOpen ? 'md:hidden' : ''}`}>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden md:ml-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <FiChevronRight className="w-4 h-4" />
              <span className="font-semibold text-gray-900 capitalize">
                {location.pathname.split('/').pop().replace('-', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
