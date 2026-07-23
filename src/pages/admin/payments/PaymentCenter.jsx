import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

const PaymentCenter = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalRefunded: 0, totalFailed: 0, totalCreated: 0, totalPayments: 0 });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState(''); // '' for all, 'FAILED' for failed
  const [refundReason, setRefundReason] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [page, statusFilter]);

  const fetchSummary = async () => {
    try {
      const response = await api.get('/admin/payments/summary');
      setSummary(response.data);
    } catch (error) {
      toast.error('Failed to load payment summary');
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      let url = `/admin/payments?page=${page}&size=20`;
      if (statusFilter) {
        url = `/admin/payments?status=${statusFilter}&page=${page}&size=20`;
      }
      const response = await api.get(url);
      setPayments(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (paymentId) => {
    if (!refundReason.trim()) {
      toast.warning('Please provide a reason for the refund');
      return;
    }
    try {
      await api.post(`/admin/payments/${paymentId}/refund?reason=${encodeURIComponent(refundReason)}`);
      toast.success('Payment marked as refunded successfully');
      setRefundReason('');
      setSelectedPayment(null);
      fetchSummary();
      fetchPayments();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to refund payment');
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#111827] p-6 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-blue-500">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Payments</h3>
          <p className="text-2xl font-bold text-slate-100 mt-2">{summary.totalPayments}</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-emerald-500">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Revenue (₹)</h3>
          <p className="text-2xl font-bold text-emerald-400 mt-2">₹{summary.totalRevenue}</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-purple-500">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Refunded (₹)</h3>
          <p className="text-2xl font-bold text-slate-100 mt-2">₹{summary.totalRefunded}</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-red-500">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Failed Transactions</h3>
          <p className="text-2xl font-bold text-red-400 mt-2">{summary.totalFailed}</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-yellow-500">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Created (Pending)</h3>
          <p className="text-2xl font-bold text-yellow-400 mt-2">{summary.totalCreated}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pb-4">
        <div className="p-4 flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-100">Transaction History</h2>
          <div className="flex space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => { setStatusFilter(''); setPage(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === '' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All
            </button>
            <button
              onClick={() => { setStatusFilter('FAILED'); setPage(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'FAILED' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Failed
            </button>
            <button
              onClick={() => { setStatusFilter('CAPTURED'); setPage(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'CAPTURED' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Captured
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">Transaction ID</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">User</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">Amount (₹)</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">Status</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">Date</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-slate-500">Loading payments...</td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-slate-500 bg-slate-900/20 rounded-2xl mt-4 border border-slate-800/50">No payments found.</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-blue-400 group-hover:text-blue-300 transition-colors">{payment.razorpayPaymentId || payment.razorpayOrderId}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-200">{payment.user?.firstName} {payment.user?.lastName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{payment.user?.email || payment.user?.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-slate-100">₹{payment.amount}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-[10px] font-bold tracking-wider uppercase rounded-full border
                        ${payment.status === 'CAPTURED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          payment.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          payment.status === 'REFUNDED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                          'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {payment.status === 'CAPTURED' && (
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors opacity-50 group-hover:opacity-100"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 pb-8">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-sm font-semibold text-slate-300 disabled:opacity-40 transition-colors shadow-sm"
            >
              Previous
            </button>
            <span className="text-sm font-semibold text-slate-500 bg-slate-900/50 px-4 py-1.5 rounded-full border border-slate-800/50">
              Page <span className="text-slate-200">{page + 1}</span> of <span className="text-slate-200">{totalPages}</span>
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-sm font-semibold text-slate-300 disabled:opacity-40 transition-colors shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Refund Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-[#0A0D1A]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl p-6 max-w-md w-full border border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Process Refund</h3>
            <p className="text-sm text-slate-400 mb-4">
              Are you sure you want to refund payment <span className="font-mono text-slate-200">{selectedPayment.razorpayPaymentId}</span> for <span className="text-emerald-400 font-bold">₹{selectedPayment.amount}</span>?
            </p>
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Reason for Refund</label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                rows="3"
                placeholder="Enter refund reason for audit logs..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => { setSelectedPayment(null); setRefundReason(''); }}
                className="px-4 py-2 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRefund(selectedPayment.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-500 shadow-lg shadow-red-500/20 transition-all text-sm font-bold"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCenter;
