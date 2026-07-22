import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const UserAnalytics = ({ dateRange }) => {
  const [data, setData] = useState({ daily: [], community: [], age: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use Promise.all to fetch all User Analytics charts in parallel
        const [dailyRes, commRes, ageRes] = await Promise.all([
          api.get('/admin/analytics/users/daily', { params: { filter: dateRange.filter } }),
          api.get('/admin/analytics/users/community', { params: { filter: dateRange.filter } }),
          api.get('/admin/analytics/users/age', { params: { filter: dateRange.filter } })
        ]);
        setData({
          daily: dailyRes.data,
          community: commRes.data,
          age: ageRes.data
        });
      } catch (err) {
        console.error("Failed to load user analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="User Registrations"
        data={data.daily}
        loading={loading}
        renderChart={({ data }) => (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#0047AB" strokeWidth={2} />
          </LineChart>
        )}
      />
      <InteractiveChart
        title="Community Distribution"
        data={data.community}
        loading={loading}
        renderChart={({ data }) => (
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="community" cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      />
      <InteractiveChart
        title="Age Group Distribution"
        data={data.age}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        )}
      />
    </div>
  );
};

export default UserAnalytics;
