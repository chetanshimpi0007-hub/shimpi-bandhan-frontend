import React, { useState, useEffect } from 'react';
import InteractiveChart from './InteractiveChart';
import {
  BarChart, Bar, FunnelChart, Funnel, LabelList,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import api from '../../services/api';

const CrmAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ pipeline: [], trend: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pipelineRes, trendRes] = await Promise.all([
          api.get('/admin/analytics/crm/pipeline', { params: { filter: dateRange.filter } }),
          api.get('/admin/reports/charts/enquiry-trends', { params: { filter: dateRange.filter } })
        ]);
        setData({
          pipeline: pipelineRes.data || [],
          trend: trendRes.data || []
        });
      } catch (err) {
        console.error('CRM analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InteractiveChart
        title="Enquiry Pipeline (CRM Stages)"
        data={data.pipeline}
        loading={loading}
        renderChart={({ data }) => (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        )}
      />
      <InteractiveChart
        title="Monthly Enquiry Trend"
        data={data.trend}
        loading={loading}
        renderChart={({ data }) => (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#FF8042" strokeWidth={2} />
          </LineChart>
        )}
      />
    </div>
  );
};

export default CrmAnalytics;
