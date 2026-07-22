import { useState, useEffect } from 'react';
import axios from 'axios';

const VerificationCenter = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch profiles pending verification
    // For now we'll fetch all profiles and filter locally or mock
    const fetchPending = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/profiles/search?size=50');
        const unverified = res.data.content.filter(p => !p.isVerifiedProfile);
        setProfiles(unverified);
      } catch (err) {
        console.error("Failed to fetch profiles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      // Assuming a PUT endpoint for verification status, or we can mock it
      // await axios.put(`http://localhost:8080/api/v1/admin/profiles/${id}/verify`, { status });
      alert(`Profile ${id} verified status: ${status}`);
      setProfiles(profiles.filter(p => p.id !== id && p.userId !== id));
    } catch (err) {
      alert("Verification failed");
    }
  };

  if (loading) return <div className="p-16 text-center text-slate-500">Loading verifications...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Profile Verification Center</h2>
          <p className="text-slate-400 text-sm mt-1">Review and approve new user profiles</p>
        </div>
      </div>
      
      <div className="w-full pb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">User</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">Contact Info</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">Submitted On</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-16 text-center text-slate-500 bg-slate-900/20 rounded-2xl mt-4 border border-slate-800/50">No pending verifications.</td>
                </tr>
              ) : (
                profiles.map(profile => (
                  <tr key={profile.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={profile.profilePhotoUrl ? (profile.profilePhotoUrl.startsWith('http') ? profile.profilePhotoUrl : `http://localhost:8080${profile.profilePhotoUrl}`) : '/default-avatar.png'} 
                          alt="" 
                          className="w-10 h-10 rounded-xl object-cover bg-slate-800 border border-slate-700 flex-shrink-0 shadow-sm" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/default-avatar.png";
                          }}
                        />
                        <div>
                          <p className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{profile.fullName}</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">{profile.age} yrs • {profile.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-mono tracking-wide text-slate-300">{profile.contactNumber}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{profile.email || 'N/A'}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400 font-medium">
                      {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleVerify(profile.userId, 'REJECTED')} className="px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors">Reject</button>
                        <button onClick={() => handleVerify(profile.userId, 'APPROVED')} className="px-3 py-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors">Approve</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerificationCenter;
