import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar
} from 'recharts';
import api from '../../services/api';

const COLORS = ['#10B981', '#FFD700', '#FF4444', '#0088FE', '#8884d8'];

const MatrimonialAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ profileStatus: [], interestTrend: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statusRes, interestRes] = await Promise.all([
          api.get('/admin/analytics/matrimonial/profile-status', { params: { filter: dateRange.filter } }),
          api.get('/admin/analytics/matrimonial/interests', { params: { filter: dateRange.filter } })
        ]);
        setData({
          profileStatus: statusRes.data || [],
          interestTrend: interestRes.data || []
        });
      } catch (err) {
        console.error('Matrimonial analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Profile Status Distribution"
        data={data.profileStatus}
        loading={loading}
        renderChart={({ data }) => (
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={90} label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      />
      <InteractiveChart
        title="Interests Sent vs Accepted"
        data={data.interestTrend}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sent" fill="#0088FE" />
            <Bar dataKey="accepted" fill="#10B981" />
          </BarChart>
        )}
      />
    </div>
  );
};

export default MatrimonialAnalytics;
