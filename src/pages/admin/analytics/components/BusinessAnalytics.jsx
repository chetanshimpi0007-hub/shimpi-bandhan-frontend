import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import api from '../../services/api';

const COLORS = ['#0088FE', '#10B981', '#FFD700', '#FF8042', '#8884d8'];

const BusinessAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ growth: [], category: [], city: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [growthRes, catRes, cityRes] = await Promise.all([
          api.get('/admin/reports/charts/business-growth', { params: { filter: dateRange.filter } }),
          api.get('/admin/analytics/business/category', { params: { filter: dateRange.filter } }),
          api.get('/admin/analytics/business/city', { params: { filter: dateRange.filter } })
        ]);
        setData({
          growth: growthRes.data || [],
          category: catRes.data || [],
          city: cityRes.data || []
        });
      } catch (err) {
        console.error('Business analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Business Growth (Monthly)"
        data={data.growth}
        loading={loading}
        renderChart={({ data }) => (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#0047AB" strokeWidth={2} />
          </LineChart>
        )}
      />
      <InteractiveChart
        title="Category-wise Distribution"
        data={data.category}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        )}
      />
      <InteractiveChart
        title="City-wise Business Distribution"
        data={data.city}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        )}
      />
    </div>
  );
};

export default BusinessAnalytics;
