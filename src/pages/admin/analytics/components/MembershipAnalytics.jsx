import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import api from '../../services/api';

const COLORS = ['#6366f1', '#10B981', '#FFD700', '#FF8042', '#0088FE', '#8884d8'];

const MembershipAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ distribution: [], growth: [], expiry: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [distRes, growthRes] = await Promise.all([
          api.get('/admin/analytics/membership/distribution', { params: { filter: dateRange.filter } }),
          api.get('/admin/reports/charts/premium-growth', { params: { filter: dateRange.filter } })
        ]);
        setData({
          distribution: distRes.data || [],
          growth: growthRes.data || []
        });
      } catch (err) {
        console.error('Membership analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Membership Plan Distribution"
        data={data.distribution}
        loading={loading}
        renderChart={({ data }) => (
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="plan" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      />
      <InteractiveChart
        title="Premium Member Growth"
        data={data.growth}
        loading={loading}
        renderChart={({ data }) => (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#FFD700" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        )}
      />
    </div>
  );
};

export default MembershipAnalytics;
