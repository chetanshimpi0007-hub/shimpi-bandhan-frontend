import { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessDashboard = () => {
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    activeBusinesses: 0,
    pendingApprovals: 0,
    rejectedBusinesses: 0,
    suspendedBusinesses: 0,
    monthlyViews: [],
    leadConversion: [],
    revenueByPlan: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/admin/business/analytics');
      if (response.data && response.data.data) {
        setStats(response.data.data);
      } else {
        setStats(response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching business analytics:', err);
      // Mock data in case backend is down
      setStats({
        totalBusinesses: 120,
        activeBusinesses: 85,
        pendingApprovals: 20,
        rejectedBusinesses: 10,
        suspendedBusinesses: 5,
        monthlyViews: [
          { month: 'Jan', views: 4000 },
          { month: 'Feb', views: 5000 },
          { month: 'Mar', views: 7000 },
          { month: 'Apr', views: 6000 },
          { month: 'May', views: 9000 },
          { month: 'Jun', views: 12000 }
        ],
        leadConversion: [
          { month: 'Jan', rate: 12 },
          { month: 'Feb', rate: 15 },
          { month: 'Mar', rate: 14 },
          { month: 'Apr', rate: 18 },
          { month: 'May', rate: 22 },
          { month: 'Jun', rate: 25 }
        ],
        revenueByPlan: [
          { plan: 'Basic', amount: 15000, color: 'bg-blue-400' },
          { plan: 'Premium', amount: 45000, color: 'bg-yellow-400' },
          { plan: 'Enterprise', amount: 30000, color: 'bg-purple-500' }
        ]
      });
      setError('Backend is unreachable. Displaying mock data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  const statCards = [
    { label: 'Total Businesses', value: stats.totalBusinesses, color: 'bg-blue-100 text-blue-800' },
    { label: 'Active', value: stats.activeBusinesses, color: 'bg-green-100 text-green-800' },
    { label: 'Pending Approvals', value: stats.pendingApprovals, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Suspended', value: stats.suspendedBusinesses, color: 'bg-orange-100 text-orange-800' },
    { label: 'Rejected', value: stats.rejectedBusinesses, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Business Analytics Dashboard</h2>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-royal-blue text-white rounded hover:bg-blue-700 transition"
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200">
          ⚠️ {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className={`p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center ${card.color}`}>
            <span className="text-sm font-medium uppercase tracking-wide mb-2 opacity-80">{card.label}</span>
            <span className="text-3xl font-bold">{card.value}</span>
          </div>
        ))}
      </div>
      
      {/* Visual Charts (Tailwind-based) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Monthly Views Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Monthly Views</h3>
          <div className="flex-1 flex items-end space-x-2 h-48">
            {stats.monthlyViews?.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end group">
                <div 
                  className="w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors relative"
                  style={{ height: `${(item.views / 12000) * 100}%`, minHeight: '10%' }}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.views}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Trends */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Lead Conversion Rate (%)</h3>
          <div className="flex-1 flex items-end space-x-2 h-48">
            {stats.leadConversion?.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end group">
                <div 
                  className="w-full bg-green-500 rounded-t-sm group-hover:bg-green-600 transition-colors relative"
                  style={{ height: `${(item.rate / 30) * 100}%`, minHeight: '10%' }}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.rate}%
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Plan */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Revenue by Plan</h3>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {stats.revenueByPlan?.map((item, idx) => {
              const maxRevenue = 50000;
              return (
                <div key={idx} className="w-full">
                  <div className="flex justify-between text-sm mb-1 text-gray-700">
                    <span>{item.plan}</span>
                    <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${item.color}`}
                      style={{ width: `${(item.amount / maxRevenue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default BusinessDashboard;
