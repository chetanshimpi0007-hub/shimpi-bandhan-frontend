import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaStar, FaRupeeSign, FaImage } from 'react-icons/fa';

const PremiumApprovals = () => {
  const [approvals, setApprovals] = useState([
    { id: 1, user: 'Chetan Shimpi', transactionId: 'TXN12345678', amount: '99', status: 'Pending', screenshot: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=400&q=80' },
    { id: 2, user: 'Pooja Shimpi', transactionId: 'TXN87654321', amount: '99', status: 'Pending', screenshot: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=400&q=80' },
  ]);

  const handleApprove = (id) => {
    setApprovals(approvals.filter(a => a.id !== id));
    // API call to approve and activate premium
  };

  const handleReject = (id) => {
    setApprovals(approvals.filter(a => a.id !== id));
    // API call to reject
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <FaStar className="text-yellow-400" />
            </div>
            Premium Approvals
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review and verify premium membership payments</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="text-slate-300 font-bold">{approvals.length}</span>
          <span className="text-slate-500 text-sm">Pending</span>
        </div>
      </div>

      <div className="bg-[#111827] rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">User</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Transaction Details</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Payment Proof</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {approvals.map(approval => (
                <tr key={approval.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">
                        {approval.user.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-200 group-hover:text-yellow-400 transition-colors">{approval.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-300 font-mono text-xs bg-slate-800 px-2 py-1 rounded inline-block w-fit border border-slate-700">
                        {approval.transactionId}
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center">
                        <FaRupeeSign className="text-[10px]" /> {approval.amount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700 group/img cursor-pointer">
                      <img src={approval.screenshot} alt="Payment Screenshot" className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                        <FaImage className="text-white text-xl" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleApprove(approval.id)} 
                        className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-emerald-500/20"
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button 
                        onClick={() => handleReject(approval.id)} 
                        className="flex items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors border border-red-500/20"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {approvals.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700">
                        <FaStar className="text-slate-600 text-2xl" />
                      </div>
                      <p className="text-slate-300 text-lg font-medium mb-1">No pending approvals</p>
                      <p className="text-slate-500 text-sm">All premium membership requests have been processed.</p>
                    </div>
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

export default PremiumApprovals;
