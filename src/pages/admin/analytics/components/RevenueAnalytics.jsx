import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';
import api from '../../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RevenueAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ monthly: [], daily: [], sources: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [monthlyRes, dailyRes] = await Promise.all([
          api.get('/admin/reports/charts/revenue-growth', { params: { filter: dateRange.filter } }),
          api.get('/admin/analytics/revenue/daily', { params: { filter: dateRange.filter } })
        ]);
        setData({
          monthly: monthlyRes.data || [],
          daily: dailyRes.data || []
        });
      } catch (err) {
        console.error('Revenue analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Monthly Revenue"
        data={data.monthly}
        loading={loading}
        renderChart={({ data }) => (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v) => `₹${v?.toLocaleString()}`} />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="url(#revenueGrad)" strokeWidth={2} />
          </AreaChart>
        )}
      />
      <InteractiveChart
        title="Daily Revenue (Last 30 Days)"
        data={data.daily}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(v) => `₹${v?.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#6366f1" />
          </BarChart>
        )}
      />
    </div>
  );
};

export default RevenueAnalytics;
