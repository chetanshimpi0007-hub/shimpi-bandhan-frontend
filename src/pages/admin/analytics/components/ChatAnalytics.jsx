import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import api from '../../services/api';

const ChatAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ daily: [], moderation: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [chatRes] = await Promise.all([
          api.get('/admin/analytics/chat/summary', { params: { filter: dateRange.filter } })
        ]);
        setData({ daily: chatRes.data?.daily || [], moderation: chatRes.data?.moderation || [] });
      } catch (err) {
        console.error('Chat analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Daily Messages"
        data={data.daily}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="messages" fill="#0088FE" />
          </BarChart>
        )}
      />
      <InteractiveChart
        title="Moderation Actions"
        data={data.moderation}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="action" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#FF4444" />
          </BarChart>
        )}
      />
    </div>
  );
};

export default ChatAnalytics;
