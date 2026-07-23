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
import api from '../services/api';

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

      {/* ── Top Row Metrics cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        {[
          { title: 'Total Users', count: '12,458', change: '+18.2%', up: true, icon: FiUsers, color: 'text-blue-500 bg-blue-50 border-blue-100' },
          { title: 'Active Users', count: '5,894', change: '+12.4%', up: true, icon: FiActivity, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
          { title: 'Premium Members', count: '1,248', change: '+8.7%', up: true, icon: FiStar, color: 'text-amber-500 bg-amber-50 border-amber-100' },
          { title: 'Revenue', count: '₹12,45,890', change: '+15.3%', up: true, icon: FiDollarSign, color: 'text-purple-500 bg-purple-50 border-purple-100' }
        ].map((kpi, index) => (
          <div key={index} className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm flex justify-between items-center group hover:border-pink-500/20 transition-all duration-300">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{kpi.title}</p>
              <h3 className="text-2xl font-black text-slate-900">{kpi.count}</h3>
              <p className="text-[10px] font-bold mt-1 text-emerald-600">{kpi.change} from last week</p>
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
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">User Growth</h3>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">Real-time signup counts</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Revenue Overview</h3>
            <p className="text-[10px] text-slate-400 font-bold">Income distribution percentages</p>
          </div>
          
          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueOverviewData} cx="50%" cy="50%" innerRadius={55} outerRadius={70} paddingAngle={3} dataKey="value">
                  {revenueOverviewData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <p className="text-lg font-black text-slate-900">₹12,45,890</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase">Total Revenue</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-50">
            {revenueOverviewData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Approvals & Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        
        {/* Verification Queue list */}
        <div className="lg:col-span-2 bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Verifications</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[9px] font-black uppercase">12 Pending</span>
          </div>
          <div className="overflow-x-auto">
            <div className="w-full overflow-x-auto">
<table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-50">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Submitted</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Priyanka Jadhav', type: 'Profile', time: '2 min ago' },
                  { name: 'Rohan Patil', type: 'Documents', time: '15 min ago' },
                  { name: 'Sneha More', type: 'Profile', time: '1 hour ago' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-slate-800">{row.name}</td>
                    <td className="py-3 text-slate-550">{row.type}</td>
                    <td className="py-3 text-slate-450 text-[10px]">{row.time}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 text-[9px] font-black rounded-full uppercase">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Grid layout */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Announcement', icon: FiActivity, color: 'text-blue-500 bg-blue-50 border-blue-100' },
              { label: 'Create Event', icon: FiCalendar, color: 'text-pink-500 bg-pink-50 border-pink-100' },
              { label: 'Manage Users', icon: FiUsers, color: 'text-purple-500 bg-purple-50 border-purple-100' },
              { label: 'System Settings', icon: FiSettings, color: 'text-slate-500 bg-slate-50 border-slate-100' }
            ].map((btn, idx) => (
              <button key={idx} className="flex flex-col justify-between items-start p-4 border border-slate-150 hover:border-pink-500/20 rounded-2xl text-left hover:bg-slate-50/40 transition-all cursor-pointer h-24">
                <div className={`p-2 rounded-xl border ${btn.color}`}><btn.icon size={16} /></div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── System Status & Locations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Geographic Distribution Map statistics */}
        <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Users by Location</h3>
          <div className="space-y-3.5">
            {locationsData.map((loc, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                  <FiMapPin className="text-pink-500" /> {loc.name}
                </span>
                <span className="font-black text-slate-850">{loc.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview KPI status cards */}
        <div className="lg:col-span-2 bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">System Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Server Status', value: 'Online', icon: FiActivity, color: 'text-emerald-500 bg-emerald-50' },
              { label: 'Database', value: 'Healthy', icon: FiDatabase, color: 'text-blue-500 bg-blue-50' },
              { label: 'Storage', value: '75% Used', icon: FiHardDrive, color: 'text-purple-500 bg-purple-50' },
              { label: 'Bandwidth', value: '60% Used', icon: FiCpu, color: 'text-amber-500 bg-amber-50' }
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
