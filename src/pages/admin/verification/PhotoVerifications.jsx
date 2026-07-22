import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaCheckCircle, FaTimesCircle, FaTrash, FaImage, FaSpinner } from 'react-icons/fa';

const PhotoVerifications = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPendingPhotos();
  }, []);

  const fetchPendingPhotos = async () => {
    try {
      const response = await api.get('/admin/photos/pending');
      setPhotos(response.data.content || response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending photos:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id + 'approve');
    try {
      await api.put(`/admin/photos/${id}/approve`);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error approving photo:', error);
      alert('Failed to approve photo');
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (id) => {
    setSelectedPhotoId(id);
    setRejectionReason('');
    setRejectModalOpen(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }
    
    setActionLoading(selectedPhotoId + 'reject');
    try {
      await api.put(`/admin/photos/${selectedPhotoId}/reject`, { rejectionReason: rejectionReason });
      setPhotos((prev) => prev.filter((p) => p.id !== selectedPhotoId));
      setRejectModalOpen(false);
    } catch (error) {
      console.error('Error rejecting photo:', error);
      alert('Failed to reject photo');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to completely delete this photo?")) return;
    setActionLoading(id + 'delete');
    try {
      await api.delete(`/admin/photos/${id}`);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Pending Photo Verifications</h1>
          <p className="text-slate-400 text-sm mt-1">Review uploaded profile photos for compliance</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2">
          <FaImage className="text-[#F5C842]" />
          <span className="text-slate-300 font-bold">{photos.length}</span>
          <span className="text-slate-500 text-sm">Pending</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 bg-[#111827] rounded-2xl border border-slate-800">
          <FaSpinner className="animate-spin text-[#F5C842] text-4xl mb-4" />
          <p className="text-slate-400">Loading pending photos...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="bg-[#111827] rounded-2xl border border-slate-800 p-16 text-center shadow-xl">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <FaCheckCircle className="text-4xl text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-200 mb-2">All Caught Up!</h2>
          <p className="text-slate-400">There are no pending photos to review at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-[#111827] rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-800 group hover:border-slate-700 transition-colors">
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img 
                  src={photo.photoUrl ? (photo.photoUrl.startsWith('http') ? photo.photoUrl : `http://localhost:8080${photo.photoUrl}`) : '/default-avatar.png'} 
                  alt={`Uploaded by ${photo.userName}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80"></div>
                
                <span className="absolute top-3 right-3 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2.5 py-1 rounded-full border border-yellow-500/30 backdrop-blur-md uppercase tracking-wider">
                  Pending
                </span>
                
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-bold text-white drop-shadow-md truncate">{photo.userName}</h3>
                  <p className="text-xs text-slate-300 drop-shadow-md truncate font-mono">ID: {photo.userId}</p>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className="text-xs text-slate-400">
                    Uploaded: {new Date(photo.uploadDate).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleApprove(photo.id)}
                    disabled={!!actionLoading}
                    className="flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white font-bold py-2.5 px-3 rounded-xl transition-all border border-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] disabled:opacity-50"
                  >
                    {actionLoading === photo.id + 'approve' ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />} Approve
                  </button>
                  <button 
                    onClick={() => openRejectModal(photo.id)}
                    disabled={!!actionLoading}
                    className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white font-bold py-2.5 px-3 rounded-xl transition-all border border-red-500/20 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] disabled:opacity-50"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                  <button 
                    onClick={() => handleDelete(photo.id)}
                    disabled={!!actionLoading}
                    className="col-span-2 flex items-center justify-center gap-2 mt-1 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 font-medium py-2 px-4 rounded-xl transition-colors border border-slate-700 text-xs disabled:opacity-50"
                  >
                    {actionLoading === photo.id + 'delete' ? <FaSpinner className="animate-spin" /> : <FaTrash size={10} />} Delete Photo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-[#0A0D1A]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-800 transform transition-all">
            <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <FaTimesCircle className="text-red-500" />
                Reject Photo
              </h3>
              <button 
                onClick={() => setRejectModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:border-transparent resize-none"
                rows="4"
                placeholder="E.g., Photo is blurry, face is not fully visible, inappropriate content..."
                autoFocus
              ></textarea>
              <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                This reason will be shared with the user via notification.
              </p>
            </div>
            
            <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 flex justify-end space-x-3">
              <button 
                onClick={() => setRejectModalOpen(false)}
                className="px-5 py-2.5 text-slate-300 hover:bg-slate-800 border border-slate-700 rounded-xl font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={!!actionLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)] text-white rounded-xl font-bold transition-all text-sm disabled:opacity-50"
              >
                {actionLoading ? <FaSpinner className="animate-spin" /> : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoVerifications;
