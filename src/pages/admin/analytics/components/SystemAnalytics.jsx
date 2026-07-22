import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const KpiCard = ({ label, value, unit = '', color = 'blue' }) => {
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50 text-blue-700',
    green: 'border-green-500 bg-green-50 text-green-700',
    red: 'border-red-500 bg-red-50 text-red-700',
    purple: 'border-purple-500 bg-purple-50 text-purple-700',
    yellow: 'border-yellow-500 bg-yellow-50 text-yellow-700',
  };
  return (
    <div className={`border-l-4 rounded-lg p-4 shadow-sm ${colorMap[color]}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-2xl font-bold mt-1">
        {value !== null && value !== undefined ? `${value}${unit}` : '—'}
      </p>
    </div>
  );
};

const SystemAnalytics = ({ dateRange }) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/analytics/system/metrics');
        setMetrics(res.data);
      } catch (err) {
        console.error('System metrics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Auto-refresh system metrics every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [dateRange]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12 text-gray-500">Failed to load system metrics.</div>
    );
  }

  const formatBytes = (bytes) => {
    if (!bytes) return '0 MB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-700">JVM &amp; Application Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <KpiCard label="Heap Used" value={formatBytes(metrics.heapUsed)} color="blue" />
        <KpiCard label="Heap Max" value={formatBytes(metrics.heapMax)} color="green" />
        <KpiCard label="Non-Heap Used" value={formatBytes(metrics.nonHeapUsed)} color="purple" />
        <KpiCard label="Active Threads" value={metrics.activeThreads} color="yellow" />
        <KpiCard label="DB Connections" value={metrics.dbConnections} color="blue" />
        <KpiCard label="Export Queue" value={metrics.exportQueueSize} color="green" />
        <KpiCard label="HTTP Requests/min" value={metrics.httpRequestRate?.toFixed(2)} color="purple" />
        <KpiCard label="Error Rate" value={metrics.errorRate?.toFixed(2)} unit="%" color="red" />
      </div>

      {/* Optional: OS metrics section – only renders if the server provides them */}
      {metrics.cpuUsage !== null && metrics.cpuUsage !== undefined && (
        <>
          <h3 className="text-lg font-semibold text-gray-700 mt-6">Server OS Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <KpiCard label="CPU Usage" value={metrics.cpuUsage?.toFixed(1)} unit="%" color="red" />
            <KpiCard label="RAM Usage" value={metrics.ramUsedMb?.toFixed(0)} unit=" MB" color="yellow" />
            <KpiCard label="Disk Used" value={metrics.diskUsedGb?.toFixed(1)} unit=" GB" color="purple" />
            <KpiCard label="Disk Free" value={metrics.diskFreeGb?.toFixed(1)} unit=" GB" color="green" />
            <KpiCard label="Uptime" value={metrics.uptimeHours?.toFixed(0)} unit=" hrs" color="blue" />
          </div>
        </>
      )}
    </div>
  );
};

export default SystemAnalytics;
