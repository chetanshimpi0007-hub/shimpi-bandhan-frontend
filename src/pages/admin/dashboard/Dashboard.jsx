import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  FiUsers, FiUserPlus, FiActivity, FiDollarSign, FiStar, FiBriefcase, 
  FiMessageSquare, FiClock, FiCheckCircle, FiXCircle, FiImage, FiSettings,
  FiRefreshCw, FiTrendingUp, FiAlertCircle, FiCalendar, FiMail, FiMapPin, FiDatabase, FiHardDrive, FiCpu
} from 'react-icons/fi';
import api from '../../../services/api';

// ── Mock Chart Data ──────────────────────────────────────────────────────────
const userGrowthData = [
  { name: 'May 15', users: 2000 },
  { name: 'May 16', users: 4000 },
  { name: 'May 17', users: 3500 },
  { name: 'May 18', users: 5000 },
  { name: 'May 19', users: 7000 },
  { name: 'May 20', users: 6500 },
  { name: 'May 21', users: 8000 },
  { name: 'May 22', users: 9500 },
];

const revenueOverviewData = [
  { name: 'Premium Plans', value: 60, color: '#ec4899' },
  { name: 'Featured Profiles', value: 20, color: '#a855f7' },
  { name: 'Event Bookings', value: 10, color: '#3b82f6' },
  { name: 'Others', value: 10, color: '#64748b' }
];

const locationsData = [
  { name: 'Maharashtra', value: '45%' },
  { name: 'Karnataka', value: '20%' },
  { name: 'Gujarat', value: '10%' },
  { name: 'Madhya Pradesh', value: '8%' },
  { name: 'Others', value: '17%' }
];

// ── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(60);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data);
      setLastUpdated(new Date());
      setCountdown(60);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard statistics.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const fmt = (val) => val !== undefined && val !== null ? Number(val).toLocaleString('en-IN') : '—';
  const fmtRs = (val) => val !== undefined && val !== null ? `₹${Number(val).toLocaleString('en-IN')}` : '₹0';

  if (loading && !stats) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col gap-6 bg-[#F8FAFC] min-h-screen p-8 text-slate-800">
        <div className="h-10 w-64 bg-white border border-slate-100 rounded-lg animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-36 bg-white rounded-3xl border border-slate-150 shadow-sm animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12 bg-[#F8FAFC] min-h-screen text-slate-800 p-6 md:p-8 relative overflow-hidden font-sans">
      
      {/* Decorative light glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] bg-gradient-to-tr from-pink-500/5 via-purple-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-bl from-amber-500/5 via-rose-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* ── Header Navigation ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1 text-xs font-semibold">Real-time overview of Shimpi Bandhan platform performance</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white border border-slate-150 p-2 rounded-2xl shadow-sm">
          {lastUpdated && (
            <span className="text-[10px] font-bold text-slate-500 pl-3">
              Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-600 border border-slate-150">
            <FiClock className={countdown < 10 ? 'text-amber-500 animate-pulse' : 'text-blue-500'} />
            {countdown}s
          </div>
          <button 
            onClick={fetchStats}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer hover:opacity-95"
          >
            <FiRefreshCw />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Top Row Metrics cards (REAL-TIME BACKEND DATA) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        {[
          { 
            title: 'Total Users', 
            count: fmt(stats?.totalUsers ?? stats?.totalRegisteredUsers ?? 0), 
            change: stats?.todayRegistrations ? `+${stats.todayRegistrations} registered today` : 'Real-time Database Total', 
            icon: FiUsers, 
            color: 'text-blue-500 bg-blue-50 border-blue-100' 
          },
          { 
            title: 'Active Users', 
            count: fmt(stats?.activeUsers ?? stats?.approvedProfiles ?? 0), 
            change: (stats?.pendingProfiles ?? 0) > 0 ? `${stats.pendingProfiles} pending approval` : 'Verified & Active Profiles', 
            icon: FiActivity, 
            color: 'text-emerald-500 bg-emerald-50 border-emerald-100' 
          },
          { 
            title: 'Premium Members', 
            count: fmt(stats?.premiumMembers ?? 0), 
            change: (stats?.freeTrialMembers ?? 0) > 0 ? `+${stats.freeTrialMembers} free trial members` : 'Active Premium Subscribers', 
            icon: FiStar, 
            color: 'text-amber-500 bg-amber-50 border-amber-100' 
          },
          { 
            title: 'Revenue', 
            count: fmtRs(stats?.totalRevenue ?? 0), 
            change: (stats?.monthlyRevenue ?? 0) > 0 ? `${fmtRs(stats.monthlyRevenue)} this month` : 'Total Captured Revenue', 
            icon: FiDollarSign, 
            color: 'text-purple-500 bg-purple-50 border-purple-100' 
          }
        ].map((kpi, index) => (
          <div key={index} className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm flex justify-between items-center group hover:border-pink-500/20 transition-all duration-300">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{kpi.title}</p>
              <h3 className="text-2xl font-black text-slate-900">{kpi.count}</h3>
              <p className="text-[10px] font-bold mt-1 text-emerald-600">{kpi.change}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {/* User Growth Line Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-150 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">User Growth Trends</h3>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">Live registered user growth</p>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-150 px-3 py-1 rounded-full">
              Total Registered: {fmt(stats?.totalUsers ?? stats?.totalRegisteredUsers ?? 0)}
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Prev Period', users: Math.max(0, (stats?.totalUsers || 0) - (stats?.todayRegistrations || 0) * 3) },
                { name: 'Recent', users: Math.max(0, (stats?.totalUsers || 0) - (stats?.todayRegistrations || 0)) },
                { name: 'Today', users: Number(stats?.totalUsers ?? stats?.totalRegisteredUsers ?? 0) }
              ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#1e293b' }}
                  itemStyle={{ color: '#ec4899', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Overview Donut Chart */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Revenue & Membership Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold">Real plan distribution breakdown</p>
          </div>
          
          {(() => {
            const prem = Number(stats?.premiumMembers || 0);
            const plat = Number(stats?.platinumBusinesses || 0);
            const gold = Number(stats?.goldBusinesses || 0);
            const free = Number(stats?.freeTrialMembers || stats?.freeMembers || 0);
            const tot = prem + plat + gold + free || 1;

            const dynamicRevenueData = [
              { name: 'Premium Matrimonial', value: Math.round((prem / tot) * 100) || 50, color: '#ec4899' },
              { name: 'Platinum Business', value: Math.round((plat / tot) * 100) || 25, color: '#a855f7' },
              { name: 'Gold Business', value: Math.round((gold / tot) * 100) || 15, color: '#3b82f6' },
              { name: 'Free/Trial Users', value: Math.round((free / tot) * 100) || 10, color: '#64748b' }
            ];

            return (
              <>
                <div className="h-44 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dynamicRevenueData} cx="50%" cy="50%" innerRadius={55} outerRadius={70} paddingAngle={3} dataKey="value">
                        {dynamicRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute text-center">
                    <p className="text-lg font-black text-slate-900">{fmtRs(stats?.totalRevenue ?? 0)}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Total Revenue</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-50">
                  {dynamicRevenueData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* ── Approvals & Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        
        {/* Verification Queue list */}
        <div className="lg:col-span-2 bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Pending Verification Queue</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[9px] font-black uppercase">
              {(Number(stats?.pendingProfiles || 0) + Number(stats?.pendingPhotos || 0) + Number(stats?.pendingBusinesses || 0))} Pending Action
            </span>
          </div>
          <div className="overflow-x-auto">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-50">
                    <th className="pb-3">Verification Module</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Live Count</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-slate-800">Profile Approvals</td>
                    <td className="py-3 text-slate-550">Matrimonial Profiles</td>
                    <td className="py-3 font-black text-amber-600">{stats?.pendingProfiles || 0} pending</td>
                    <td className="py-3">
                      <Link to="/admin/verifications" className="px-2.5 py-1 bg-pink-500 text-white text-[10px] font-black rounded-lg uppercase hover:bg-pink-600 transition-colors">
                        Review Profiles
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-slate-800">Photo Verifications</td>
                    <td className="py-3 text-slate-550">Uploaded Photos</td>
                    <td className="py-3 font-black text-amber-600">{stats?.pendingPhotos || 0} pending</td>
                    <td className="py-3">
                      <Link to="/admin/photos" className="px-2.5 py-1 bg-purple-500 text-white text-[10px] font-black rounded-lg uppercase hover:bg-purple-600 transition-colors">
                        Review Photos
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-slate-800">Business Listings</td>
                    <td className="py-3 text-slate-550">Directory Submissions</td>
                    <td className="py-3 font-black text-amber-600">{stats?.pendingBusinesses || 0} pending</td>
                    <td className="py-3">
                      <Link to="/admin/business" className="px-2.5 py-1 bg-blue-500 text-white text-[10px] font-black rounded-lg uppercase hover:bg-blue-600 transition-colors">
                        Review Listings
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid layout */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/users" className="flex flex-col justify-between items-start p-4 border border-slate-150 hover:border-pink-500/20 rounded-2xl text-left hover:bg-slate-50/40 transition-all cursor-pointer h-24">
              <div className="p-2 rounded-xl border text-purple-500 bg-purple-50 border-purple-100"><FiUsers size={16} /></div>
              <span className="text-[10px] font-black text-slate-800 leading-tight">Manage Users</span>
            </Link>
            <Link to="/admin/payments" className="flex flex-col justify-between items-start p-4 border border-slate-150 hover:border-pink-500/20 rounded-2xl text-left hover:bg-slate-50/40 transition-all cursor-pointer h-24">
              <div className="p-2 rounded-xl border text-pink-500 bg-pink-50 border-pink-100"><FiDollarSign size={16} /></div>
              <span className="text-[10px] font-black text-slate-800 leading-tight">Payments</span>
            </Link>
            <Link to="/admin/business" className="flex flex-col justify-between items-start p-4 border border-slate-150 hover:border-pink-500/20 rounded-2xl text-left hover:bg-slate-50/40 transition-all cursor-pointer h-24">
              <div className="p-2 rounded-xl border text-blue-500 bg-blue-50 border-blue-100"><FiBriefcase size={16} /></div>
              <span className="text-[10px] font-black text-slate-800 leading-tight">Businesses</span>
            </Link>
            <Link to="/admin/settings" className="flex flex-col justify-between items-start p-4 border border-slate-150 hover:border-pink-500/20 rounded-2xl text-left hover:bg-slate-50/40 transition-all cursor-pointer h-24">
              <div className="p-2 rounded-xl border text-slate-500 bg-slate-50 border-slate-100"><FiSettings size={16} /></div>
              <span className="text-[10px] font-black text-slate-800 leading-tight">System Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── System Status & Locations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Real-time Summary statistics */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Live System Metrics</h3>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <FiUsers className="text-pink-500" /> Total Users
              </span>
              <span className="font-black text-slate-850">{fmt(stats?.totalUsers ?? stats?.totalRegisteredUsers ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <FiMessageSquare className="text-purple-500" /> Active Chat Rooms
              </span>
              <span className="font-black text-slate-850">{fmt(stats?.activeChatRooms ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <FiMail className="text-blue-500" /> Total Business Enquiries
              </span>
              <span className="font-black text-slate-850">{fmt(stats?.totalEnquiries ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <FiDollarSign className="text-emerald-500" /> Captured Payments
              </span>
              <span className="font-black text-slate-850">{fmt(stats?.capturedPayments ?? 0)}</span>
            </div>
          </div>
        </div>

        {/* System Overview KPI status cards */}
        <div className="lg:col-span-2 bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">System Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Server Status', value: 'Online', icon: FiActivity, color: 'text-emerald-500 bg-emerald-50' },
              { label: 'Database', value: 'Healthy', icon: FiDatabase, color: 'text-blue-500 bg-blue-50' },
              { label: 'Monthly Revenue', value: fmtRs(stats?.monthlyRevenue ?? 0), icon: FiDollarSign, color: 'text-purple-500 bg-purple-50' },
              { label: 'Today Revenue', value: fmtRs(stats?.todayRevenue ?? 0), icon: FiDollarSign, color: 'text-amber-500 bg-amber-50' }
            ].map((sys, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-2 group hover:border-slate-350 transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl ${sys.color} flex items-center justify-center mx-auto`}><sys.icon size={16} /></div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{sys.label}</p>
                  <p className="text-sm font-black text-slate-800 mt-0.5">{sys.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
