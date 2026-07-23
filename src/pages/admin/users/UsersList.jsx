import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaUserCheck, FaUserTimes, FaBan, FaTrash, FaKey, FaFilter, FaSpinner, FaDownload, FaMask } from 'react-icons/fa';
import api from '../services/api';

const STATUS_COLORS = {
  APPROVED: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-3 py-1 rounded-full text-[10px] shadow-sm',
  PENDING: 'bg-amber-50 text-amber-800 border border-amber-200 font-bold px-3 py-1 rounded-full text-[10px] shadow-sm',
  SUSPENDED: 'bg-orange-50 text-orange-700 border border-orange-200 font-bold px-3 py-1 rounded-full text-[10px] shadow-sm',
  BLOCKED: 'bg-rose-50 text-rose-700 border border-rose-200 font-bold px-3 py-1 rounded-full text-[10px] shadow-sm',
};

const COMMUNITIES = ['AHER_SHIMPI', 'NAMDEV_SHIMPI'];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [community, setCommunity] = useState('');
  const [status, setStatus] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState(null);
  const [resetPasswordModal, setResetPasswordModal] = useState(null);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return '—';
    try {
      if (Array.isArray(dateVal)) {
        const [year, month, day, hour = 0, minute = 0, second = 0] = dateVal;
        const d = new Date(year, month - 1, day, hour, minute, second);
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      }
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      }
    } catch (e) {
      console.error(e);
    }
    return '—';
  };

  const fetchUsers = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const params = { page, size: 20 };
      if (search) params.search = search;
      if (community) params.community = community;
      if (status) params.status = status;
      const res = await api.get('/admin/users', { params });
      setUsers(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      notify('Failed to load users', 'error');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [page, search, community, status]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchUsers();
  };

  const doAction = async (userId, endpoint, successMsg) => {
    setActionLoading(userId + endpoint);
    try {
      await api.put(`/admin/users/${userId}/${endpoint}`);
      notify(successMsg);
      fetchUsers(true); // Silent refresh so the page doesn't blink
    } catch {
      notify(`Action failed`, 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Permanently delete this user and all their data?')) return;
    setActionLoading(userId + 'delete');
    try {
      await api.delete(`/admin/users/${userId}`);
      notify('User deleted');
      fetchUsers(true); // Silent refresh
    } catch {
      notify('Delete failed', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetPassword = async (userId) => {
    setActionLoading(userId + 'reset');
    try {
      const res = await api.post(`/admin/users/${userId}/reset-password`);
      setResetPasswordModal(res.data);
    } catch {
      notify('Password reset failed', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl text-white font-medium text-sm backdrop-blur-md transition-all ${notification.type === 'error' ? 'bg-red-500/90 border border-red-400' : 'bg-emerald-500/90 border border-emerald-400'}`}>
          {notification.msg}
        </div>
      )}

      {/* Reset Password Modal */}
      {resetPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Password Reset Successful</h3>
            <p className="text-sm text-slate-500 mb-6">Share this temporary password with the user securely:</p>
            <div className="bg-slate-55 border border-slate-200 rounded-xl p-4 mb-6 relative overflow-hidden group">
              <p className="text-2xl font-mono font-bold text-blue-600 tracking-wider relative z-10">{resetPasswordModal.temporaryPassword}</p>
            </div>
            <button onClick={() => setResetPasswordModal(null)} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-colors">Close</button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all registered accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {loading ? <FaSpinner className="animate-spin inline" /> : `Page ${page + 1} of ${totalPages}`}
          </span>
          <a
            href="http://localhost:8080/api/v1/admin/export/users/excel"
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-md"
          >
            <FaDownload /> Export Excel
          </a>
        </div>
      </div>

      {/* Modern Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 flex gap-3 relative">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-250 hover:border-slate-350 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all shadow-sm"
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md flex items-center gap-2">
            <FaFilter className="text-xs" /> Apply
          </button>
        </form>
        
        <div className="flex gap-3">
          <select 
            value={community} 
            onChange={(e) => { setCommunity(e.target.value); setPage(0); }} 
            className="py-3 px-4 bg-white border border-slate-250 hover:border-slate-350 rounded-xl text-sm text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer min-w-[160px] shadow-sm"
          >
            <option value="">All Communities</option>
            {COMMUNITIES.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
          </select>
          <select 
            value={status} 
            onChange={(e) => { setStatus(e.target.value); setPage(0); }} 
            className="py-3 px-4 bg-white border border-slate-250 hover:border-slate-350 rounded-xl text-sm text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer min-w-[140px] shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="APPROVED">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>
      </div>

      {/* Seamless Modern List (No Outer Box, No Vertical Borders) */}
      <div className="w-full overflow-x-auto pb-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="w-full overflow-x-auto">
<table className="w-full text-left border-collapse" style={{ minWidth: '800px' }}>
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Community</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Registered</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-20"><FaSpinner className="animate-spin mx-auto text-3xl text-blue-500" /></td></tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-24 bg-slate-50/30 rounded-b-2xl">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaSearch className="text-slate-400 text-xl" />
                  </div>
                  <p className="text-slate-800 text-lg font-semibold mb-1">No users found</p>
                  <p className="text-slate-400 text-sm">Try adjusting your filters.</p>
                </td>
              </tr>
            ) : users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group cursor-default">
                <td className="px-6 py-4.5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0 shadow-sm">
                      {user.profile?.fullName ? user.profile.fullName.charAt(0) : '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{user.profile?.fullName || 'No Profile'}</p>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium">{user.profile?.email || '—'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4.5">
                  <span className="text-slate-800 text-sm font-semibold tracking-wide">{user.phone}</span>
                </td>
                <td className="px-6 py-4.5">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200">
                    {user.community?.replace('_', ' ') || '—'}
                  </span>
                </td>
                <td className="px-6 py-4.5">
                  <span className={`inline-block ${STATUS_COLORS[user.status] || 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4.5 text-slate-500 text-sm font-medium">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4.5 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => doAction(user.id, 'activate', 'User activated')}
                      title="Activate"
                      className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      disabled={actionLoading === user.id + 'activate'}
                    >
                      <FaUserCheck size={14} />
                    </button>
                    <button
                      onClick={() => doAction(user.id, 'suspend', 'User suspended')}
                      title="Suspend"
                      className="p-2 text-slate-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      disabled={actionLoading === user.id + 'suspend'}
                    >
                      <FaUserTimes size={14} />
                    </button>
                    <button
                      onClick={() => doAction(user.id, 'block', 'User blocked')}
                      title="Block"
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      disabled={actionLoading === user.id + 'block'}
                    >
                      <FaBan size={14} />
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      title="Reset Password"
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      disabled={actionLoading === user.id + 'reset'}
                    >
                      <FaKey size={14} />
                    </button>
                    <a
                      href={`http://localhost:8080/api/v1/admin/profiles/download-pdf/${user.id}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Download Registration PDF"
                      className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors inline-block"
                    >
                      <FaDownload size={14} />
                    </a>
                    <button
                      onClick={() => doAction(user.id, 'impersonate', 'Impersonation started (Check logs)')}
                      title="Impersonate User"
                      className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      disabled={actionLoading === user.id + 'impersonate'}
                    >
                      <FaMask size={14} />
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button
                      onClick={() => handleDelete(user.id)}
                      title="Delete User"
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      disabled={actionLoading === user.id + 'delete'}
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (Seamless) */}
      <div className="flex items-center justify-between pt-4 pb-8">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-40 transition-colors shadow-sm"
        >
          Previous
        </button>
        <span className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
          Page <span className="text-slate-800">{page + 1}</span> of <span className="text-slate-800">{totalPages}</span>
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-40 transition-colors shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
