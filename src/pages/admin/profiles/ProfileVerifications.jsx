import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaSpinner, FaDownload, FaUserEdit, FaUserClock, FaClipboardList, FaBan } from 'react-icons/fa';
import api from '../services/api';

const ProfileVerifications = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'profiles' | 'approved' | 'rejected'

  // --- Pending User Registrations State ---
  const [pendingUsers, setPendingUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersPage, setUsersPage] = useState(0);
  const [usersTotalPages, setUsersTotalPages] = useState(1);

  // --- Profile Verifications State ---
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [rejectionModal, setRejectionModal] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [notification, setNotification] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const formatDate = (dateVal, showTime = false) => {
    if (!dateVal) return '—';
    try {
      if (Array.isArray(dateVal)) {
        const [year, month, day, hour = 0, minute = 0, second = 0] = dateVal;
        const d = new Date(year, month - 1, day, hour, minute, second);
        return d.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {})
        });
      }
      const d = new Date(dateVal);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {})
        });
      }
    } catch (e) {
      console.error(e);
    }
    return '—';
  };

  // ── Fetch Pending User Registrations ──
  const fetchPendingUsers = async (silent = false) => {
    if (!silent) setUsersLoading(true);
    try {
      const res = await api.get('/admin/users/pending', { params: { page: usersPage, size: 15 } });
      setPendingUsers(res.data.content || []);
      setUsersTotalPages(res.data.totalPages || 1);
    } catch {
      notify('Failed to load pending registrations', 'error');
    } finally {
      if (!silent) setUsersLoading(false);
    }
  };

  // ── Fetch Profile Verifications ──
  const fetchProfiles = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      let res;
      if (activeTab === 'profiles') {
        res = await api.get('/admin/profiles/pending', { params: { page, size: 10 } });
      } else if (activeTab === 'approved') {
        res = await api.get('/admin/profiles/status/APPROVED', { params: { page, size: 10 } });
      } else if (activeTab === 'rejected') {
        res = await api.get('/admin/profiles/status/REJECTED', { params: { page, size: 10 } });
      }
      if (res) {
        setProfiles(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch {
      notify('Failed to load profiles', 'error');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchPendingUsers();
    } else {
      setPage(0);
      fetchProfiles();
    }
  }, [activeTab, usersPage]);

  useEffect(() => {
    if (activeTab !== 'users') {
      fetchProfiles();
    }
  }, [page]);

  // ── User Approval ──
  const handleApproveUser = async (userId) => {
    setActionLoading(userId + 'approve');
    try {
      await api.put(`/admin/users/${userId}/approve`);
      notify('User approved and activated!');
      fetchPendingUsers(true);
    } catch {
      notify('Approval failed', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectUser = async (userId) => {
    if (!window.confirm('Reject this user registration? They will not be able to log in.')) return;
    setActionLoading(userId + 'reject');
    try {
      await api.put(`/admin/users/${userId}/reject`);
      notify('User registration rejected');
      fetchPendingUsers(true);
    } catch {
      notify('Rejection failed', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // ── Profile Actions ──
  const handleApprove = async (profileId) => {
    setActionLoading(profileId + 'approve');
    try {
      await api.put(`/admin/profiles/${profileId}/approve`);
      notify('Profile approved successfully!');
      setSelectedProfile(null);
      fetchProfiles(true);
    } catch {
      notify('Approval failed', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) { notify('Reason is required', 'error'); return; }
    setActionLoading(rejectionModal.id + rejectionModal.type);
    try {
      if (rejectionModal.type === 'reject') {
        await api.put(`/admin/profiles/${rejectionModal.id}/reject?reason=${encodeURIComponent(rejectionReason)}`);
        notify('Profile rejected');
      } else {
        await api.put(`/admin/profiles/${rejectionModal.id}/request-changes?reason=${encodeURIComponent(rejectionReason)}`);
        notify('Changes requested');
      }
      setRejectionModal(null);
      setRejectionReason('');
      setSelectedProfile(null);
      fetchProfiles(true);
    } catch {
      notify('Action failed', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const Field = ({ label, value }) => (
    <div className="flex flex-col gap-1 bg-slate-55 p-3 rounded-lg border border-slate-200/80">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-800 font-semibold">{value || '—'}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl text-white font-medium text-sm backdrop-blur-md ${notification.type === 'error' ? 'bg-red-500/90 border border-red-400' : 'bg-emerald-500/90 border border-emerald-400'}`}>
          {notification.msg}
        </div>
      )}

      {/* Rejection Modal */}
      {rejectionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {rejectionModal.type === 'reject' ? 'Reject Profile' : 'Request Changes'}
            </h3>
            <p className="text-sm text-slate-500 mb-4">This reason will be shared with the user.</p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="E.g. Profile photo is not clear, please re-upload a proper front-facing photo..."
              autoFocus
            />
            <div className="flex gap-3 mt-6">
              <button onClick={() => setRejectionModal(null)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors">Cancel</button>
              <button
                onClick={handleReject}
                disabled={!!actionLoading}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${
                  rejectionModal.type === 'reject' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md' 
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 shadow-md'
                }`}
              >
                {actionLoading ? <FaSpinner className="animate-spin mx-auto" /> : 
                 (rejectionModal.type === 'reject' ? 'Confirm Rejection' : 'Send Request')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Approvals Center</h1>
          <p className="text-slate-500 text-sm mt-1">Manage new registrations and profile verifications</p>
        </div>
        <div className="flex gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FaUserClock size={13} />
            New Registrations
            {pendingUsers.length > 0 && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'users' ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-800'}`}>{pendingUsers.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'profiles' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FaClipboardList size={13} />
            Pending Profiles
            {activeTab === 'profiles' && profiles.length > 0 && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">{profiles.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'approved' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FaCheckCircle size={13} />
            Approved Profiles
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'rejected' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FaBan size={13} />
            Rejected Profiles
          </button>
        </div>
      </div>

      {/* ── TAB: New User Registrations ── */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                <FaUserClock className="text-yellow-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Pending User Registrations</p>
                <p className="text-xs text-slate-400 font-medium">Awaiting admin approval</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="w-full overflow-x-auto">
<table className="w-full text-sm text-left border-collapse" style={{ minWidth: '800px' }}>
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200">
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Community</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Account Type</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Registered</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersLoading ? (
                    <tr><td colSpan={6} className="py-20 text-center"><FaSpinner className="animate-spin mx-auto text-3xl text-blue-500" /></td></tr>
                  ) : pendingUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center bg-slate-50/30">
                        <div className="flex flex-col items-center justify-center">
                          <FaCheckCircle className="text-4xl text-emerald-500 mb-3" />
                          <p className="text-slate-800 text-lg font-semibold">All caught up!</p>
                          <p className="text-slate-400 text-sm mt-1">No pending user registrations.</p>
                        </div>
                      </td>
                    </tr>
                  ) : pendingUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-sm flex-shrink-0">
                            {u.id}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">User #{u.id}</p>
                            <p className="text-[11px] font-medium text-slate-400 mt-0.5">Referral: {u.referralCode || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="text-slate-800 font-semibold text-sm tracking-wide">{u.phone}</span>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
                          {u.community?.replace('_', ' ') || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${u.accountType === 'FAMILY' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                          {u.accountType || 'SELF'}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-slate-505 text-sm font-medium">
                        {formatDate(u.createdAt, true)}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApproveUser(u.id)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-lg text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
                          >
                            {actionLoading === u.id + 'approve' ? <FaSpinner className="animate-spin" size={10} /> : <FaCheckCircle size={10} />}
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectUser(u.id)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
                          >
                            {actionLoading === u.id + 'reject' ? <FaSpinner className="animate-spin" size={10} /> : <FaTimesCircle size={10} />}
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {usersTotalPages > 1 && (
            <div className="flex items-center justify-between pt-4 pb-8">
              <button onClick={() => setUsersPage(p => Math.max(0, p - 1))} disabled={usersPage === 0} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-40 transition-colors">Previous</button>
              <span className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">Page <span className="text-slate-800">{usersPage + 1}</span> of <span className="text-slate-800">{usersTotalPages}</span></span>
              <button onClick={() => setUsersPage(p => Math.min(usersTotalPages - 1, p + 1))} disabled={usersPage >= usersTotalPages - 1} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-40 transition-colors">Next</button>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Profiles (Pending, Approved, Rejected) ── */}
      {activeTab !== 'users' && (
        <div className="space-y-4">
          {/* Profile Detail Panel */}
          {selectedProfile && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-805">{selectedProfile.fullName}</h2>
                  <p className="text-slate-500 text-sm">{selectedProfile.user?.phone} • {selectedProfile.email}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`http://localhost:8080/api/v1/admin/export/users/${selectedProfile.user?.id}/pdf`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <FaDownload /> PDF
                  </a>
                  {selectedProfile.verificationStatus !== 'APPROVED' && (
                    <button
                      onClick={() => handleApprove(selectedProfile.id)}
                      disabled={!!actionLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
                    >
                      <FaCheckCircle /> Approve
                    </button>
                  )}
                  {selectedProfile.verificationStatus !== 'REJECTED' && (
                    <button
                      onClick={() => setRejectionModal({id: selectedProfile.id, type: 'reject'})}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  )}
                  <button onClick={() => setSelectedProfile(null)} className="px-4 py-2 border border-slate-200 bg-slate-55 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-colors">Close</button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Field label="Gender" value={selectedProfile.gender} />
                <Field label="Date of Birth" value={selectedProfile.dateOfBirth} />
                <Field label="Community" value={selectedProfile.community} />
                <Field label="Religion" value={selectedProfile.religion} />
                <Field label="Marital Status" value={selectedProfile.maritalStatus} />
                <Field label="Education" value={selectedProfile.education} />
                <Field label="Occupation" value={selectedProfile.occupation} />
                <Field label="Annual Income (₹)" value={selectedProfile.annualIncome} />
                <Field label="City" value={selectedProfile.city} />
                <Field label="State" value={selectedProfile.state} />
                <Field label="Membership" value={selectedProfile.planType} />
                <Field label="Profile Completion" value={selectedProfile.profileCompletionPercentage != null ? `${selectedProfile.profileCompletionPercentage}%` : null} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {selectedProfile.aboutMe && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">About Me</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedProfile.aboutMe}</p>
                  </div>
                )}
                {selectedProfile.partnerPreference && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">Partner Preference</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedProfile.partnerPreference}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <FaClipboardList className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm capitalize">{activeTab} Profiles</p>
                <p className="text-xs text-slate-400 font-medium">Awaiting or verified records</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="w-full overflow-x-auto">
<table className="w-full text-sm text-left border-collapse" style={{ minWidth: '800px' }}>
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200">
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Details</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Community</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Registered</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={5} className="py-20 text-center"><FaSpinner className="animate-spin mx-auto text-3xl text-blue-500" /></td></tr>
                  ) : profiles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center bg-slate-50/30">
                        <div className="flex flex-col items-center justify-center">
                          <FaCheckCircle className="text-4xl text-emerald-500 mb-3" />
                          <p className="text-slate-800 text-lg font-semibold">No profiles found</p>
                          <p className="text-slate-400 text-sm mt-1">Status: {activeTab}</p>
                        </div>
                      </td>
                    </tr>
                  ) : profiles.map(p => (
                    <tr key={p.id} className="hover:bg-slate-55/50 transition-colors group">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0 shadow-sm">
                            {p.fullName ? p.fullName.charAt(0) : '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{p.fullName || 'Unknown'}</p>
                            <p className="text-slate-400 text-xs mt-0.5 font-medium">{p.gender} • {p.dateOfBirth || 'DOB N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-slate-600 text-sm font-semibold">
                        {p.community?.replace('_', ' ') || '—'}
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${p.profileCompletionPercentage || 0}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-550">{p.profileCompletionPercentage || 0}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-slate-500 text-sm font-medium">
                        {formatDate(p.createdAt)}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setSelectedProfile(p)} className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 rounded-lg text-xs font-bold transition-all shadow-sm">Review</button>
                          {p.verificationStatus !== 'APPROVED' && (
                            <button onClick={() => handleApprove(p.id)} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-lg text-xs font-bold transition-all shadow-sm">Approve</button>
                          )}
                          {p.verificationStatus !== 'REJECTED' && (
                            <button onClick={() => setRejectionModal({id: p.id, type: 'reject'})} className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-bold transition-all shadow-sm">Reject</button>
                          )}
                          {p.verificationStatus === 'SUBMITTED_FOR_VERIFICATION' && (
                            <button onClick={() => setRejectionModal({id: p.id, type: 'request-changes'})} className="px-3 py-1.5 bg-yellow-50 text-yellow-750 hover:bg-yellow-500 hover:text-white border border-yellow-200 rounded-lg text-xs font-bold transition-all shadow-sm" title="Request Changes">
                              <FaUserEdit size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 pb-8">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-55 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-40 transition-colors shadow-sm">Previous</button>
            <span className="text-sm font-semibold text-slate-550 bg-slate-55 px-4 py-1.5 rounded-full border border-slate-100">Page <span className="text-slate-800">{page + 1}</span> of <span className="text-slate-800">{totalPages}</span></span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-55 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-40 transition-colors shadow-sm">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileVerifications;
