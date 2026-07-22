import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHeart, FaEye, FaUserEdit, FaCrown, FaCheckCircle, FaBriefcase, FaCalendarAlt, FaComments, 
  FaSearch, FaBell, FaAngleLeft, FaAngleRight, FaGift, FaCheck, FaTimes, FaUserAlt, FaStar
} from 'react-icons/fa';
import api from '../services/api';
import ProfileCard from '../components/ProfileCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.auth?.user);
  const [myProfile, setMyProfile] = useState(null);
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'ai-recommendations') {
      setActiveTab('ai-recommendations');
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profileRes = await api.get('/profiles/me');
        if (profileRes && profileRes.data) {
          setMyProfile(profileRes.data);
        }
        
        const matchesRes = await api.get('/profiles/search?size=4');
        if (matchesRes && matchesRes.data) {
          const matchesData = matchesRes.data;
          const matchesList = Array.isArray(matchesData) 
            ? matchesData 
            : (matchesData?.content || []);
          setSuggestedMatches(matchesList);
        }

        try {
          const viewsRes = await api.get('/views/visitors?size=1');
          if (viewsRes && viewsRes.data) {
            setVisitorCount(viewsRes.data.totalElements || 0);
          }
        } catch (e) {
          console.log("Could not fetch visitors count");
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleSendInterest = async (receiverId) => {
    try {
      await api.post(`/interests/send/${receiverId}`);
      alert("Interest sent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send interest");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const completionPercent = myProfile?.profileCompletionPercentage || 85;
  const matchesList = Array.isArray(suggestedMatches) ? suggestedMatches : [];

  const mockRecommended = [
    { id: 1, name: 'Ankita Joshi',  match: 92, role: 'Software Engineer',  location: 'Pune, Maharashtra',         age: 24, photo: '/indian-girl-1.jpg' },
    { id: 2, name: 'Shreya Patil',  match: 88, role: 'Doctor',             location: 'Mumbai, Maharashtra',       age: 26, photo: '/indian-girl-2.jpg' },
    { id: 3, name: 'Pooja Kadam',   match: 85, role: 'UX Designer',        location: 'Nashik, Maharashtra',       age: 25, photo: '/indian-girl-3.jpg' },
    { id: 4, name: 'Sneha Mohite',  match: 80, role: 'Business Analyst',   location: 'Aurangabad, Maharashtra',   age: 26, photo: '/indian-girl-4.jpg' }
  ];

  const recentVisitors = [
    { name: 'Rohit Sharma', time: '2 min ago' },
    { name: 'Sagar Patil', time: '1 hour ago' },
    { name: 'Akshay More', time: '3 hours ago' }
  ];

  const myEnquiries = [
    {
      id: 1,
      businessName: 'Shree Cloth Emporium',
      date: '2026-07-08',
      status: 'In Progress',
      meeting: { date: '2026-07-12', time: '14:00', status: 'Scheduled', type: 'Video Call' },
      timeline: [
        { status: 'Submitted', date: '2026-07-08 10:00 AM' },
        { status: 'Viewed', date: '2026-07-08 11:30 AM' },
        { status: 'Meeting Scheduled', date: '2026-07-09 09:15 AM' }
      ]
    },
    {
      id: 2,
      businessName: 'Royal Event Planners',
      date: '2026-07-05',
      status: 'Completed',
      meeting: { date: '2026-07-06', time: '11:00', status: 'Completed', type: 'In-person' },
      timeline: [
        { status: 'Submitted', date: '2026-07-05 02:00 PM' },
        { status: 'Viewed', date: '2026-07-05 03:00 PM' },
        { status: 'Meeting Completed', date: '2026-07-06 12:00 PM' },
        { status: 'Completed', date: '2026-07-06 01:00 PM' }
      ]
    }
  ];

  const aiMatchDetails = [
    {
      id: 501,
      name: 'Snehal Patil',
      age: 24,
      role: 'UI/UX Designer',
      location: 'Nashik, Maharashtra',
      score: '96%',
      highlights: ['Both are Vegetarian', 'Reside in Nashik', 'IT/Software profession alignment'],
      bio: 'Looking for a progressive partner who respects career goals and family values.',
      compatibilities: { culture: 98, lifestyle: 95, interests: 92 }
    },
    {
      id: 502,
      name: 'Aakanksha Shimpi',
      age: 25,
      role: 'HR Manager',
      location: 'Pune, Maharashtra',
      score: '92%',
      highlights: ['Shared interest in Travel', 'Namdev Shimpi community', 'Education: MBA'],
      bio: 'A career-oriented individual who loves exploring nature and reading books.',
      compatibilities: { culture: 90, lifestyle: 94, interests: 88 }
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans antialiased selection:bg-pink-500/20">
      
      {/* ── Left Sidebar Navigation (Light Mode Custom layout) ── */}
      <aside className="w-72 bg-white border-r border-slate-100 p-6 flex flex-col justify-between hidden lg:flex shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Shimpi Bandhan Logo" className="w-9 h-9 rounded-xl shadow-md object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='block'; }} />
            <div>
              <h2 className="font-black text-slate-900 text-sm leading-none">Shimpi Bandhan</h2>
              <span className="text-[10px] text-slate-400 font-bold">Find your perfect partner</span>
            </div>
          </div>

          {/* Nav list */}
          <nav className="space-y-1">
            {[
              { label: 'Dashboard', icon: FaHeart, path: '/dashboard', active: activeTab === 'overview' },
              { label: 'Discover Matches', icon: FaSearch, path: '/search' },
              { label: 'AI Recommendations', icon: FaStar, path: '/dashboard?tab=ai-recommendations', active: activeTab === 'ai-recommendations' },
              { label: 'Who Viewed You', icon: FaEye, path: '/visitors' }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-all ${
                  item.active 
                    ? 'bg-pink-50 text-pink-600 border border-pink-100/50' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-850'
                }`}
              >
                <item.icon size={14} className={item.active ? 'text-pink-500' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Premium banner widget */}
          <div className="bg-gradient-to-tr from-pink-500 to-purple-600 rounded-3xl p-5 text-white space-y-4 relative overflow-hidden shadow-lg shadow-pink-500/10">
            <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <FaCrown className="text-amber-300 text-2xl fill-amber-300" />
            <div className="space-y-1">
              <h3 className="font-black text-sm">Upgrade to Premium</h3>
              <p className="text-[10px] text-pink-100 font-bold leading-relaxed">Unlock unlimited chats, advanced filters & more.</p>
            </div>
            <Link 
              to="/premium"
              className="w-full block text-center bg-white text-pink-600 py-3 rounded-xl text-xs font-black shadow-sm cursor-pointer hover:bg-pink-50 transition-colors"
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* User profile footer */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-black">
            {myProfile?.fullName?.charAt(0) || 'P'}
          </div>
          <div>
            <p className="text-xs font-black text-slate-850 truncate">{myProfile?.fullName || 'User'}</p>
            <p className="text-[9px] text-slate-400 font-bold">
              {myProfile?.isPremiumMember ? 'Premium Member' : 'Free Account'}
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main Content Deck ── */}
      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Floating Top Navbar */}
        <header className="flex justify-between items-center bg-white border border-slate-100 p-4 rounded-3xl shadow-sm">
          <div className="relative w-64 hidden sm:block">
            <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 size-3.5" />
            <input 
              type="text" 
              placeholder="Search profiles, members..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20" 
            />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button 
              onClick={() => navigate('/visitors')}
              className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 relative cursor-pointer border border-slate-150"
            >
              <FaBell size={14} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-black border border-pink-500/20">
              {myProfile?.fullName?.charAt(0) || 'P'}
            </div>
          </div>
        </header>

        {/* Welcome Back Card Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-[32px] p-8 md:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <FaCrown size={10} className="fill-amber-300" /> {myProfile?.isPremiumMember ? 'Premium Member' : 'Free Member'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300">{myProfile?.fullName || 'Priyanka'}!</span>
            </h1>
            <p className="text-slate-350 text-xs font-semibold max-w-lg leading-relaxed">
              Find your perfect match today. We detected 4 highly compatible candidate updates for you.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative z-10">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-white/10" strokeWidth="2.5" fill="transparent" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" className="text-pink-500" strokeWidth="3.5" fill="transparent" strokeDasharray={175} strokeDashoffset={175 - (175 * completionPercent) / 100} />
              </svg>
              <span className="absolute text-xs font-black text-white">{completionPercent}%</span>
            </div>
            <div>
              <p className="text-xs font-black text-white">Profile Strength</p>
              <p className="text-[10px] text-slate-300 font-bold mt-1">Complete your bio details</p>
            </div>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {/* AI Recommended Matches Carousel section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">AI Recommended Matches</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 hover:bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer shadow-sm"><FaAngleLeft /></button>
                  <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 hover:bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer shadow-sm"><FaAngleRight /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRecommended.map((match) => (
                  <div key={match.id} className="bg-white border border-slate-150 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="h-64 w-full bg-slate-100 overflow-hidden relative">
                      <img src={match.photo} alt={match.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display='none'; e.currentTarget.parentElement.style.background='linear-gradient(135deg,#f9a8d4,#c4b5fd)'; }} />
                      <div className="absolute top-4 left-4 px-2.5 py-0.5 bg-emerald-500 text-white text-[9px] font-black rounded-full shadow-sm">
                        {match.match}% Match
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-pink-600 transition-colors">{match.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{match.role} • {match.age} yrs</p>
                        <p className="text-[9px] text-slate-400 font-semibold truncate mt-1">{match.location}</p>
                      </div>
                      <button onClick={() => handleSendInterest(match.id)} className="w-full py-2.5 bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white rounded-xl text-xs font-black transition-all cursor-pointer text-center">
                        Connect Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Matches Section */}
            <div className="space-y-4">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">Suggested Matches</h3>
              {matchesList.length === 0 ? (
                <div className="bg-white border border-slate-150 rounded-[32px] p-12 text-center shadow-sm">
                  <p className="text-slate-400 text-xs font-semibold">No new matches found at the moment. Try updating your preferences.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {matchesList.map(profile => (
                    <ProfileCard 
                      key={profile.id} 
                      profile={profile} 
                      onSendInterest={handleSendInterest} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bento Grid Analytics and Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Visitors */}
              <div className="bg-white border border-slate-150 rounded-[32px] p-6 space-y-4 shadow-sm">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-400">Recent Visitors</h4>
                <div className="space-y-4">
                  {recentVisitors.map((visitor, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs"><FaUserAlt /></div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{visitor.name}</p>
                          <p className="text-[9px] text-slate-450 font-semibold">{visitor.time}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate('/visitors')}
                        className="text-[10px] font-black text-pink-600 hover:underline"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Matches Donut circular chart */}
              <div className="bg-white border border-slate-150 rounded-[32px] p-6 flex flex-col justify-between items-center text-center shadow-sm min-h-[220px]">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 w-full text-left">Today&apos;s Matches</h4>
                <div className="relative w-24 h-24 flex items-center justify-center my-3">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-slate-50" strokeWidth="6" fill="transparent" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-purple-500" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={60} />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-2xl font-black text-slate-800">12</p>
                    <p className="text-[8px] text-slate-400 font-bold">New Matches</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-455 font-semibold">Your matching filters are highly synchronized</p>
              </div>

              {/* Profile Completion checkmarks list */}
              <div className="bg-white border border-slate-150 rounded-[32px] p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-xs uppercase tracking-wider text-slate-400">Profile Checklist</h4>
                  <span className="text-xs font-black text-pink-600">{completionPercent}%</span>
                </div>
                <div className="space-y-3.5">
                  {[
                    { title: 'Basic Info', checked: true },
                    { title: 'Photos Uploaded', checked: true },
                    { title: 'About You Details', checked: true },
                    { title: 'Lifestyle Preferences', checked: false }
                  ].map((check, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700">{check.title}</span>
                      {check.checked ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><FaCheck size={9} /></span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-slate-50 text-slate-350 flex items-center justify-center"><FaTimes size={9} /></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : activeTab === 'ai-recommendations' ? (
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">AI Smart Recommendations</h3>
              <p className="text-xs text-slate-400 font-semibold">Our artificial intelligence algorithms computed these high-compatibility partner candidates exclusively for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiMatchDetails.map(profile => (
                <div key={profile.id} className="bg-white border border-slate-150 rounded-[32px] p-6 space-y-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-pink-500/10 text-pink-500 flex items-center justify-center rounded-2xl text-2xl font-black">👩</div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{profile.name}, {profile.age}</h4>
                        <p className="text-[10px] text-pink-600 font-bold">{profile.role} • {profile.location}</p>
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-full border-2 border-pink-500 flex flex-col items-center justify-center">
                      <span className="text-xs font-black text-slate-800">{profile.score}</span>
                      <span className="text-[7px] text-pink-650 font-extrabold tracking-wider uppercase">Match</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-medium italic">"{profile.bio}"</p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Why You Match:</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.highlights.map((h, i) => (
                        <span key={i} className="px-3 py-1 bg-pink-50 border border-pink-100 text-pink-600 text-[10px] font-black rounded-full">
                          ✨ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Values & Culture Compatibility', val: profile.compatibilities.culture, color: 'bg-pink-500' },
                      { label: 'Lifestyle Alignment Percentage', val: profile.compatibilities.lifestyle, color: 'bg-purple-500' },
                      { label: 'Hobbies & Interests Match', val: profile.compatibilities.interests, color: 'bg-amber-500' }
                    ].map((meter, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                          <span>{meter.label}</span>
                          <span>{meter.val}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className={`h-full ${meter.color} rounded-full`} style={{ width: `${meter.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => handleSendInterest(profile.id)} 
                      className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black shadow-md transition-colors"
                    >
                      Send Instant Interest
                    </button>
                    <button 
                      onClick={() => navigate('/chat')} 
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-650 rounded-xl text-xs font-black transition-colors"
                    >
                      Chat Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900">My Business Enquiries</h2>
            <div className="grid grid-cols-1 gap-6">
              {myEnquiries.map(enq => (
                <div key={enq.id} className="bg-white border border-slate-150 p-6 rounded-[28px] shadow-sm flex flex-col md:flex-row gap-6 hover:border-pink-500/20 transition-all">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                          <FaBriefcase className="text-slate-500" /> {enq.businessName}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">Submitted on {enq.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        enq.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-450 border border-blue-500/20'
                      }`}>
                        {enq.status}
                      </span>
                    </div>

                    {enq.meeting && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2"><FaCalendarAlt /> Meeting Details</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                          <p><strong>Date:</strong> {enq.meeting.date}</p>
                          <p><strong>Time:</strong> {enq.meeting.time}</p>
                          <p><strong>Type:</strong> {enq.meeting.type}</p>
                          <p>
                            <strong>Status:</strong> 
                            <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              enq.meeting.status === 'Scheduled' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-emerald-500/10 text-emerald-600'
                            }`}>
                              {enq.meeting.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <button className="text-pink-600 text-xs font-black hover:underline flex items-center gap-1.5 mt-2">
                      <FaComments /> Send Message
                    </button>
                  </div>

                  {/* Timeline Panel */}
                  <div className="md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Timeline</h4>
                    <div className="space-y-4">
                      {enq.timeline.map((step, idx) => (
                        <div key={idx} className="flex gap-3 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5" />
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{step.status}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Refer & Earn bottom card */}
        <div className="bg-[#FAF9F6] border border-slate-150 rounded-[32px] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center text-xl shrink-0"><FaGift /></div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Refer & Earn Premium Days</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Invite your friends and earn 10 days of Platinum access for every signup.</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-md cursor-pointer hover:opacity-95 transition-all">
            Refer Now
          </button>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
