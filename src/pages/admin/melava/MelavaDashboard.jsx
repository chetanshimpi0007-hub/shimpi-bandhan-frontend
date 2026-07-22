import { useState, useEffect } from 'react';
import api from '../services/api';

const MelavaDashboard = () => {
  const [stats, setStats] = useState({
    totalMelavas: 0,
    activeMelavas: 0,
    totalRegistrations: 0,
    checkedIn: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/melava/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch melava stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading stats...</div>;
  }

  const statCards = [
    { title: 'Total Melavas', value: stats.totalMelavas, icon: '📅', color: 'bg-blue-100 text-blue-800' },
    { title: 'Active Melavas', value: stats.activeMelavas, icon: '🔥', color: 'bg-green-100 text-green-800' },
    { title: 'Total Registrations', value: stats.totalRegistrations, icon: '👥', color: 'bg-purple-100 text-purple-800' },
    { title: 'Total Checked-in', value: stats.checkedIn, icon: '✅', color: 'bg-yellow-100 text-yellow-800' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Melava Overview Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for charts */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 h-80 flex flex-col items-center justify-center text-gray-400">
          <span className="text-4xl mb-2">📊</span>
          <p>Registration Trends Chart</p>
          <p className="text-xs mt-2">(Coming soon)</p>
        </div>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 h-80 flex flex-col items-center justify-center text-gray-400">
          <span className="text-4xl mb-2">🥧</span>
          <p>Check-in Status Breakdown</p>
          <p className="text-xs mt-2">(Coming soon)</p>
        </div>
      </div>
    </div>
  );
};

export default MelavaDashboard;
