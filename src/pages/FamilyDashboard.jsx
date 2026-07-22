import React, { useState, useEffect } from 'react';
import { FaUserShield, FaHistory, FaCog, FaComments, FaCalendarAlt, FaTasks, FaProjectDiagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

const FamilyDashboard = () => {
  const [permissions, setPermissions] = useState({ canEditProfile: true, canChat: false });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mocking the API fetch
    const fetchFamilyData = async () => {
      setLoading(true);
      try {
        // Mock data
        setLogs([
          { id: 1, action: 'Updated profile picture', date: '2023-10-01T10:00:00Z' },
          { id: 2, action: 'Accepted interest from User A', date: '2023-10-02T14:30:00Z' },
        ]);
      } catch (error) {
        console.error('Failed to fetch family data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFamilyData();
  }, []);

  const handlePermissionChange = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const featureCards = [
    { title: 'Discussion Room', description: 'Chat & Video Call with Family', icon: FaComments, path: '/family-discussion', color: 'bg-blue-100 text-blue-600' },
    { title: 'Meeting Calendar', description: 'Schedule Family Meetings', icon: FaCalendarAlt, path: '/meeting-calendar', color: 'bg-purple-100 text-purple-600' },
    { title: 'Match Timeline', description: 'Track Match Progression', icon: FaProjectDiagram, path: '/family-timeline', color: 'bg-green-100 text-green-600' },
    { title: 'Approval Status', description: 'Manage Family Consents', icon: FaTasks, path: '/family-approval', color: 'bg-[var(--color-secondary)] text-[var(--color-primary)]' },
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Family Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-blue-800 rounded-3xl p-8 text-white shadow-lg flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-2">Family Dashboard</h1>
          <p className="text-blue-100 text-lg">Manage permissions, track activities, and collaborate with your family.</p>
        </div>
        <div className="relative z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 hidden md:flex items-center gap-4">
          <FaUserShield className="text-4xl text-[var(--color-secondary)]" />
          <div>
            <p className="text-sm text-blue-100 font-medium">Family Hub Active</p>
            <p className="text-lg font-bold">4 Features Available</p>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              onClick={() => navigate(card.path)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--color-primary)] cursor-pointer transition-all transform hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.color} group-hover:scale-110 transition-transform`}>
                <Icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-[var(--color-primary)] rounded-xl">
              <FaCog className="text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Permission Settings</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <span className="block font-semibold text-gray-900">Allow Candidate to Edit Profile</span>
                <span className="text-xs text-gray-500">Candidate can modify their own details</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={permissions.canEditProfile} onChange={() => handlePermissionChange('canEditProfile')} />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <span className="block font-semibold text-gray-900">Allow Candidate to Chat</span>
                <span className="text-xs text-gray-500">Candidate can initiate chats with matches</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={permissions.canChat} onChange={() => handlePermissionChange('canChat')} />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-50 text-[var(--color-secondary)] rounded-xl">
              <FaHistory className="text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Activity Logs</h2>
          </div>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">No recent activity.</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">{log.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(log.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;

