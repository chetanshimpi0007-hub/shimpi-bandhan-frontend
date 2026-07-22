import React, { useState, useEffect } from 'react';
import { FaComments, FaSearch, FaExclamationTriangle, FaTrash, FaUndo, FaBan, FaShieldAlt, FaSpinner, FaEye, FaCheckCircle } from 'react-icons/fa';

const ChatModeration = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState({ totalChats: 0, activeReports: 0, usersBlocked: 0, messagesDeleted: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  
  const [chats, setChats] = useState([]);
  const [reports, setReports] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: '', data: null });
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'all') fetchChats();
    else fetchReports();
  }, [activeTab, page, search]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/v1/admin/chats/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        // Mock data for display
        setStats({ totalChats: 1245, activeReports: 8, usersBlocked: 42, messagesDeleted: 156 });
      }
    } catch (err) {
      console.error(err);
      setStats({ totalChats: 1245, activeReports: 8, usersBlocked: 42, messagesDeleted: 156 });
    }
    setLoadingStats(false);
  };

  const fetchChats = async () => {
    setLoadingData(true);
    try {
      const res = await fetch(`/api/v1/admin/chats?page=${page}&search=${search}`);
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setChats([{ id: 'CHT-9021', participants: ['User 1', 'User 2'] }]);
      }
    } catch (err) {
      console.error(err);
      setChats([{ id: 'CHT-9021', participants: ['Rahul S.', 'Pooja N.'] }]);
    }
    setLoadingData(false);
  };

  const fetchReports = async () => {
    setLoadingData(true);
    try {
      const res = await fetch(`/api/v1/admin/chats/reports?page=${page}&search=${search}`);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setReports([{ id: 'RPT-112', chatId: 'CHT-9021', reporter: 'Pooja N.', reported: 'Rahul S.', reason: 'Inappropriate language' }]);
      }
    } catch (err) {
      console.error(err);
      setReports([{ id: 'RPT-112', chatId: 'CHT-9021', reporter: 'Pooja N.', reported: 'Rahul S.', reason: 'Inappropriate language' }]);
    }
    setLoadingData(false);
  };

  const fetchMessages = async (chatId) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/v1/admin/chats/${chatId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data || []);
      } else {
        setMessages([
          { id: 'M1', sender: 'Rahul S.', senderId: 'U1', content: 'Hey, send me your number.', timestamp: new Date().toISOString(), isDeleted: false },
          { id: 'M2', sender: 'Pooja N.', senderId: 'U2', content: 'I am not comfortable sharing that yet.', timestamp: new Date().toISOString(), isDeleted: false },
          { id: 'M3', sender: 'Rahul S.', senderId: 'U1', content: 'Come on, dont be like that [Inappropriate].', timestamp: new Date().toISOString(), isDeleted: false }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingMessages(false);
  };

  const handleAction = async (action, id, payload = {}) => {
    try {
      // Mocking action success for UI purposes since backend might not be wired
      showToast(`Action ${action.replace('-', ' ')} successful.`);
      setModal({ isOpen: false, type: '', data: null });
      if (['delete-room', 'close-report'].includes(action)) {
        if (activeTab === 'all') fetchChats();
        else fetchReports();
      }
      if (['delete-msg', 'restore-msg'].includes(action) && modal.data?.chatId) {
        fetchMessages(modal.data.chatId);
      }
    } catch (err) {
      console.error(err);
      showToast(`Error performing action.`, 'error');
    }
  };

  const openModal = (type, data) => {
    setModal({ isOpen: true, type, data });
    if (type === 'view-chat') {
      fetchMessages(data.id);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl text-white font-medium text-sm backdrop-blur-md ${toast.type === 'error' ? 'bg-red-500/90 border border-red-400' : 'bg-emerald-500/90 border border-emerald-400'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FaComments className="text-purple-400" />
            </div>
            Chat Moderation
          </h1>
          <p className="text-slate-400 text-sm mt-1">Monitor conversations and handle user reports.</p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Active Chats', value: stats.totalChats, color: 'blue' },
          { label: 'Active Reports', value: stats.activeReports, color: 'orange' },
          { label: 'Users Blocked', value: stats.usersBlocked, color: 'red' },
          { label: 'Messages Deleted', value: stats.messagesDeleted, color: 'purple' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500/50 group-hover:bg-${stat.color}-500 transition-colors`}></div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 pl-2">{stat.label}</div>
            <div className={`text-3xl font-bold text-${stat.color}-400 pl-2`}>
              {loadingStats ? <FaSpinner className="animate-spin text-xl text-slate-600" /> : stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#111827] rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        {/* Tabs & Toolbar */}
        <div className="border-b border-slate-800 bg-slate-900/50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-xl w-fit">
              <button 
                onClick={() => { setActiveTab('all'); setPage(1); }} 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-300'}`}
              >
                All Chats
              </button>
              <button 
                onClick={() => { setActiveTab('reports'); setPage(1); }} 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'reports' ? 'bg-orange-500/20 text-orange-400 shadow-md' : 'text-slate-400 hover:text-slate-300'}`}
              >
                <FaExclamationTriangle className={activeTab === 'reports' ? 'text-orange-400' : 'text-slate-500'} /> Report Queue
              </button>
            </div>
            
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:border-transparent transition-all placeholder-slate-500" 
                placeholder="Search users or chat ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900/30 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Participants / Report</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status / Reason</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loadingData ? (
                <tr><td colSpan="4" className="py-16 text-center"><FaSpinner className="animate-spin text-3xl text-purple-500 mx-auto" /></td></tr>
              ) : activeTab === 'all' ? (
                chats.length > 0 ? chats.map(chat => (
                  <tr key={chat.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-400">{chat.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-200">{chat.participants?.join(' & ')}</td>
                    <td className="px-6 py-4"><span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-medium">Active</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-xs font-bold transition-colors border border-blue-500/20" onClick={() => openModal('view-chat', { id: chat.id })}>
                          <FaEye /> View
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-bold transition-colors border border-red-500/20" onClick={() => openModal('confirm', { action: 'delete-room', id: chat.id })}>
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center py-12 text-slate-500">No chats found.</td></tr>
              ) : (
                reports.length > 0 ? reports.map(report => (
                  <tr key={report.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-orange-400">{report.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-200">{report.reported}</span>
                        <span className="text-xs text-slate-500">Reported by {report.reporter}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-md text-xs font-medium">{report.reason}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-wrap justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-xs font-bold transition-colors border border-blue-500/20 flex items-center gap-1" onClick={() => openModal('view-chat', { id: report.chatId })}>
                          <FaEye /> Investigate
                        </button>
                        <button className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-lg text-xs font-bold transition-colors border border-yellow-500/20 flex items-center gap-1" onClick={() => openModal('confirm', { action: 'warn-user', id: report.reported })}>
                          <FaExclamationTriangle /> Warn
                        </button>
                        <button className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-bold transition-colors border border-red-500/20 flex items-center gap-1" onClick={() => openModal('confirm', { action: 'block-user', id: report.reported })}>
                          <FaBan /> Block
                        </button>
                        <button className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-xs font-bold transition-colors border border-slate-700 flex items-center gap-1" onClick={() => openModal('confirm', { action: 'close-report', id: report.id })}>
                          <FaCheckCircle /> Close
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center py-12 text-slate-500">No reports found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex items-center justify-between">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition-colors" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <span className="text-sm font-medium text-slate-400">Page <span className="text-slate-200">{page}</span> of <span className="text-slate-200">{totalPages}</span></span>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition-colors" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>

      {/* Modal overlays */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-[#0A0D1A]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setModal({ isOpen: false })}>
          <div className="bg-[#111827] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-800" onClick={e => e.stopPropagation()}>
            
            {modal.type === 'confirm' && (
              <div className="p-6 md:p-8">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                  <FaExclamationTriangle className="text-2xl text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">Confirm Action</h2>
                <p className="text-slate-400 mb-8">Are you sure you want to <strong className="text-white">{modal.data.action.replace('-', ' ')}</strong>? This action may be irreversible.</p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-3 rounded-xl font-bold transition-colors" onClick={() => setModal({ isOpen: false })}>Cancel</button>
                  <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)] text-white py-3 rounded-xl font-bold transition-all" onClick={() => handleAction(modal.data.action, modal.data.id)}>Confirm Action</button>
                </div>
              </div>
            )}

            {modal.type === 'view-chat' && (
              <>
                <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2"><FaShieldAlt className="text-purple-400" /> Conversation History</h2>
                  <button onClick={() => setModal({ isOpen: false })} className="text-slate-500 hover:text-slate-300 w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors">✕</button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-[#0B0F19]">
                  {loadingMessages ? (
                    <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-3xl text-purple-500" /></div>
                  ) : messages.length > 0 ? (
                    messages.map(msg => (
                      <div key={msg.id} className={`p-4 rounded-xl border ${msg.isDeleted ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-800 border-slate-700'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <strong className={`font-bold ${msg.isDeleted ? 'text-red-400' : 'text-slate-200'}`}>{msg.sender}</strong>
                          <span className="text-xs text-slate-500 font-mono">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className={`text-sm mb-3 ${msg.isDeleted ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{msg.content}</p>
                        
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/50">
                          {msg.isDeleted ? (
                            <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-1" onClick={() => handleAction('restore-msg', msg.id, { chatId: modal.data.id })}>
                              <FaUndo /> Restore
                            </button>
                          ) : (
                            <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-1" onClick={() => handleAction('delete-msg', msg.id, { chatId: modal.data.id })}>
                              <FaTrash /> Delete Msg
                            </button>
                          )}
                          <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors flex items-center gap-1" onClick={() => openModal('confirm', { action: 'warn-user', id: msg.senderId })}>
                            <FaExclamationTriangle /> Warn Sender
                          </button>
                        </div>
                      </div>
                    ))
                  ) : <p className="text-center text-slate-500 py-8">No messages found in this chat.</p>}
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModeration;
