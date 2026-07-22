import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaVideo, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const VideoApprovalDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch unapproved videos
    // For now, mock data or fetch all
    setVideos([
      { id: 1, userId: 101, fullName: 'Rohit Shimpi', videoUrl: 'https://res.cloudinary.com/demo/video/upload/dog.mp4', duration: 45, status: 'PENDING' },
      { id: 2, userId: 102, fullName: 'Sneha Namdev', videoUrl: 'https://res.cloudinary.com/demo/video/upload/cat.mp4', duration: 62, status: 'PENDING' }
    ]);
    setLoading(false);
  }, []);

  const handleAction = (id, action) => {
    alert(`Video ${id} ${action}`);
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FaVideo className="text-indigo-400" />
            </div>
            Video Biodata Approvals
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review user uploaded video biodatas. Max 60 seconds allowed.</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="text-indigo-400 font-bold">{videos.length}</span>
          <span className="text-slate-500 text-sm">Pending Videos</span>
        </div>
      </div>

      <div className="bg-[#111827] rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-lg font-bold text-slate-200">Pending Review Queue</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {videos.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                <FaCheckCircle className="text-4xl text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-200 mb-2">Queue Empty</h2>
              <p className="text-slate-400">There are no pending video biodatas to review.</p>
            </div>
          ) : (
            videos.map(video => (
              <div key={video.id} className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg group hover:border-slate-600 transition-colors flex flex-col">
                <div className="bg-black h-48 relative flex items-center justify-center">
                  <video src={video.videoUrl} controls className="w-full h-full object-contain" />
                  
                  {video.duration > 60 && (
                    <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm border border-red-400 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold shadow-lg flex items-center gap-1.5 z-10">
                      <FaExclamationTriangle /> OVER 60s
                    </div>
                  )}
                  
                  {video.duration <= 60 && (
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-slate-300 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold shadow-lg flex items-center gap-1.5 z-10">
                      <FaClock /> {video.duration}s
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-200 text-lg group-hover:text-indigo-400 transition-colors truncate">{video.fullName}</h3>
                  <p className="text-sm text-slate-500 mb-5 font-mono">User ID: {video.userId}</p>
                  
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleAction(video.id, 'APPROVED')} 
                      className="flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl font-bold text-sm py-2.5 transition-all border border-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button 
                      onClick={() => handleAction(video.id, 'REJECTED')} 
                      className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl font-bold text-sm py-2.5 transition-all border border-red-500/20 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoApprovalDashboard;
