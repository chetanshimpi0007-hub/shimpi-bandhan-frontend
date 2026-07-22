import React, { useState } from 'react';
import { FaLink, FaUsers, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const FamilyAccountDashboard = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, profileId: 101, name: 'Rahul Shimpi', accountType: 'SELF', phone: '9999999991' },
    { id: 2, profileId: 102, name: 'Sneha Aher', accountType: 'FAMILY', phone: '8888888881', familyManager: 'Father' },
  ]);
  const [linkForm, setLinkForm] = useState({ profileId: '', candidateUserId: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setTimeout(() => {
      setMsg(`Candidate User ${linkForm.candidateUserId} successfully linked to Profile ${linkForm.profileId}.`);
      setLoading(false);
      setLinkForm({ profileId: '', candidateUserId: '' });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FaUsers className="text-blue-400" />
            </div>
            Family Account Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage linked profiles and family memberships</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Link Accounts Form */}
        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-slate-800 h-fit">
          <h2 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
            <FaLink className="text-[#F5C842]" /> Link Candidate
          </h2>
          <form onSubmit={handleLink} className="space-y-5">
            {msg && <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl font-medium">{msg}</div>}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Profile ID (Family Created)</label>
              <input 
                type="text" 
                value={linkForm.profileId} 
                onChange={e => setLinkForm({...linkForm, profileId: e.target.value})}
                required 
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:border-transparent transition-all placeholder-slate-600" 
                placeholder="Enter Profile ID"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Candidate User ID</label>
              <input 
                type="text" 
                value={linkForm.candidateUserId} 
                onChange={e => setLinkForm({...linkForm, candidateUserId: e.target.value})}
                required 
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:border-transparent transition-all placeholder-slate-600" 
                placeholder="Enter Candidate ID"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 flex justify-center items-center gap-2 disabled:opacity-50">
              {loading ? <FaSpinner className="animate-spin text-lg" /> : <><FaLink /> Link Accounts</>}
            </button>
          </form>
        </div>

        {/* Member List */}
        <div className="lg:col-span-2 bg-[#111827] rounded-2xl shadow-xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800 bg-slate-900/30">
            <h2 className="text-lg font-bold text-slate-200">Pending Approvals & Recent Profiles</h2>
            <p className="text-xs text-slate-500 mt-1">Review accounts managed by family members</p>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="bg-slate-900/50 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Profile ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Manager</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-slate-300 transition-colors">#{c.profileId}</td>
                    <td className="px-6 py-4 font-bold text-slate-200">{c.name}</td>
                    <td className="px-6 py-4">
                      {c.accountType === 'FAMILY' ? (
                        <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2.5 py-1 rounded-md font-medium tracking-wide">Family Managed</span>
                      ) : (
                        <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-md font-medium tracking-wide">Self Managed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{c.familyManager || <span className="opacity-50">—</span>}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 rounded-lg text-xs font-bold px-3 py-1.5 transition-colors opacity-80 group-hover:opacity-100">
                        <FaCheckCircle /> Approve
                      </button>
                    </td>
                  </tr>
                ))}
                {candidates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No recent profiles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyAccountDashboard;
