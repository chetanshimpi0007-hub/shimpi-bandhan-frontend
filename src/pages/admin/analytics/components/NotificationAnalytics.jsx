import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import api from '../../services/api';

const COLORS = ['#10B981', '#FF4444', '#FFD700', '#6366f1'];

const NotificationAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ delivery: [], queue: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/analytics/notifications/summary', { params: { filter: dateRange.filter } });
        setData({
          delivery: res.data?.delivery || [],
          queue: res.data?.queue || []
        });
      } catch (err) {
        console.error('Notification analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Email Delivery Status"
        data={data.delivery}
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
        title="Notification Queue Metrics"
        data={data.queue}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        )}
      />
    </div>
  );
};

export default NotificationAnalytics;
