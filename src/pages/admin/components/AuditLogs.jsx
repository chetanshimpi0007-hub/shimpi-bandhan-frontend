import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaSpinner, FaFilter, FaDownload, FaShieldAlt } from 'react-icons/fa';
import api from '../services/api';

const MODULES = [
  '', 'USER_MANAGEMENT', 'CHAT_MODERATION', 'PAYMENT_MANAGEMENT',
  'PHOTO_MODERATION', 'BUSINESS_MANAGEMENT', 'PROFILE_VERIFICATION',
  'PLATFORM_SETTINGS', 'AUDIT'
];

const MODULE_COLORS = {
  USER_MANAGEMENT: 'bg-blue-100 text-blue-800',
  CHAT_MODERATION: 'bg-purple-100 text-purple-800',
  PAYMENT_MANAGEMENT: 'bg-green-100 text-green-800',
  PHOTO_MODERATION: 'bg-pink-100 text-pink-800',
  BUSINESS_MANAGEMENT: 'bg-orange-100 text-orange-800',
  PROFILE_VERIFICATION: 'bg-teal-100 text-teal-800',
  PLATFORM_SETTINGS: 'bg-gray-100 text-gray-800',
  AUDIT: 'bg-yellow-100 text-yellow-800',
};

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [filterModule, setFilterModule] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterUserId, setFilterUserId] = useState('');
  const [notification, setNotification] = useState(null);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: 25 };
      if (filterModule) params.module = filterModule;
      if (filterAction) params.action = filterAction;
      if (filterUserId) params.userId = filterUserId;
      const res = await api.get('/admin/audit-logs', { params });
      setLogs(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalElements(res.data.totalElements || 0);
    } catch {
      notify('Failed to load audit logs', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, filterModule, filterAction, filterUserId]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const handleExportExcel = () => {
    window.open('http://localhost:8080/api/v1/admin/export/audit-logs/excel', '_blank');
  };

  return (
    <div className="space-y-5">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-medium text-sm ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <FaShieldAlt className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
            <p className="text-sm text-gray-500">{totalElements.toLocaleString()} total entries</p>
          </div>
        </div>
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
        >
          <FaDownload /> Export Excel
        </button>
      </div>

      {/* Filters */}
      <form
        onSubmit={(e) => { e.preventDefault(); setPage(0); fetchLogs(); }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3"
      >
        <div className="relative flex-1 min-w-[160px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            placeholder="Filter by action..."
            className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <input
          type="number"
          value={filterUserId}
          onChange={(e) => setFilterUserId(e.target.value)}
          placeholder="User ID..."
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={filterModule}
          onChange={(e) => { setFilterModule(e.target.value); setPage(0); }}
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Modules</option>
          {MODULES.filter(m => m).map(m => (
            <option key={m} value={m}>{m.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center gap-2">
          <FaFilter /> Filter
        </button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="w-full overflow-x-auto">
<table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Module</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Admin</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Old Value</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">New Value</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={8} className="py-12 text-center text-gray-400"><FaSpinner className="animate-spin mx-auto text-2xl" /></td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={8} className="py-12 text-center text-gray-400">No audit logs found</td></tr>
            ) : logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{log.id}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{log.action}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${MODULE_COLORS[log.module] || 'bg-gray-100 text-gray-600'}`}>
                    {log.module?.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs font-mono">{log.userId || '—'}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{log.adminName || '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs max-w-[120px] truncate" title={log.oldValue}>{log.oldValue || '—'}</td>
                <td className="px-4 py-3 text-gray-800 text-xs max-w-[120px] truncate" title={log.newValue}>{log.newValue || '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                  {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN') : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-50">
          Previous
        </button>
        <span className="text-sm text-gray-500">Page {page + 1} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditLogs;
