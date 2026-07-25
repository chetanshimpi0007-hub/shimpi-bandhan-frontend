import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FaHeart, FaPlus, FaTimes, FaTrash, FaEdit, FaSpinner, 
  FaCalendarAlt, FaMapMarkerAlt, FaStar, FaEye, FaEyeSlash, FaSortAmountDown, FaImages 
} from 'react-icons/fa';
import api from '../../../services/api';

const SuccessStoriesManager = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/success-stories/all');
      setStories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch admin success stories", err);
      // Fallback to public endpoint if /all not available
      try {
        const fallbackRes = await api.get('/success-stories');
        setStories(fallbackRes.data || []);
      } catch (fallbackErr) {
        console.error("Failed fallback fetch", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (story) => {
    setEditingStory(story);
    setIsAdding(false);
    setValue('brideName', story.brideName || '');
    setValue('groomName', story.groomName || '');
    setValue('weddingDate', story.weddingDate || '');
    setValue('city', story.city || '');
    setValue('photoUrl', story.photoUrl || '');
    setValue('shortStory', story.shortStory || '');
    setValue('story', story.story || '');
    setValue('galleryImages', story.galleryImages || '');
    setValue('displayOrder', story.displayOrder || 0);
    setValue('isFeatured', story.isFeatured ?? true);
    setValue('isPublished', story.isPublished ?? true);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingStory(null);
    reset();
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    try {
      const payload = {
        ...data,
        displayOrder: Number(data.displayOrder || 0),
        isFeatured: Boolean(data.isFeatured),
        isPublished: Boolean(data.isPublished)
      };

      if (editingStory) {
        await api.put(`/success-stories/${editingStory.id}`, payload);
      } else {
        await api.post('/success-stories', payload);
      }

      cancelForm();
      fetchStories();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save story.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this success story?")) return;
    try {
      await api.delete(`/success-stories/${id}`);
      fetchStories();
    } catch (error) {
      alert("Failed to delete story.");
    }
  };

  const toggleFeatured = async (story) => {
    try {
      await api.patch(`/success-stories/${story.id}/toggle-featured`);
      fetchStories();
    } catch (error) {
      alert("Failed to toggle featured status.");
    }
  };

  const togglePublished = async (story) => {
    try {
      await api.patch(`/success-stories/${story.id}/toggle-published`);
      fetchStories();
    } catch (error) {
      alert("Failed to toggle published status.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 bg-slate-900 min-h-screen text-slate-100 rounded-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2.5 bg-[#E91E63]/20 rounded-2xl border border-[#E91E63]/30">
              <FaHeart className="text-[#E91E63] text-xl" />
            </div>
            Success Stories Manager
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage real matrimonial matches to feature in the interactive 3D circular showcase.
          </p>
        </div>

        <button 
          onClick={() => {
            if (isAdding || editingStory) {
              cancelForm();
            } else {
              reset();
              setIsAdding(true);
            }
          }} 
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-lg text-sm ${
            (isAdding || editingStory)
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700' 
              : 'bg-gradient-to-r from-[#E91E63] to-[#C2185B] hover:brightness-110 text-white shadow-[#E91E63]/30'
          }`}
        >
          {(isAdding || editingStory) ? <><FaTimes /> Cancel</> : <><FaPlus /> Add New Story</>}
        </button>
      </div>

      {/* Create / Edit Form Modal */}
      {(isAdding || editingStory) && (
        <div className="bg-slate-800/95 border border-[#E91E63]/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E91E63] to-[#C2185B]"></div>
          
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            {editingStory ? <><FaEdit className="text-[#E91E63]" /> Edit Success Story</> : <><FaPlus className="text-[#E91E63]" /> Add New Success Story</>}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Groom Name <span className="text-[#E91E63]">*</span></label>
                <input type="text" {...register('groomName', { required: true })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="e.g. Ramesh Shimpi" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Bride Name <span className="text-[#E91E63]">*</span></label>
                <input type="text" {...register('brideName', { required: true })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="e.g. Priya Shimpi" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Wedding Date <span className="text-[#E91E63]">*</span></label>
                <input type="date" {...register('weddingDate', { required: true })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">City / Location</label>
                <input type="text" {...register('city')} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="e.g. Nashik, Maharashtra" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Display Order</label>
                <input type="number" {...register('displayOrder')} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Main Couple Photo URL</label>
                <input type="text" {...register('photoUrl')} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="/priya-ramesh.jpg or https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Gallery Image URLs (Comma-Separated)</label>
                <input type="text" {...register('galleryImages')} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="/url1.jpg, /url2.jpg" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Short Summary (2-3 lines for 3D card) <span className="text-[#E91E63]">*</span></label>
              <textarea {...register('shortStory', { required: true })} rows="2" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="Brief 2-3 line summary..."></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Full Story Detail <span className="text-[#E91E63]">*</span></label>
              <textarea {...register('story', { required: true })} rows="4" className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-[#E91E63] transition-all text-sm" placeholder="Detailed wedding story..."></textarea>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-200 cursor-pointer">
                <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 accent-[#E91E63] rounded" />
                Featured Story
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-200 cursor-pointer">
                <input type="checkbox" {...register('isPublished')} className="w-4 h-4 accent-[#E91E63] rounded" />
                Published (Visible on Frontend)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <button type="button" onClick={cancelForm} className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button type="submit" disabled={actionLoading} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg text-xs disabled:opacity-50">
                {actionLoading ? <FaSpinner className="animate-spin" /> : (editingStory ? 'Update Story' : 'Save Story')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-[#E91E63]">
            <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
            <p className="text-slate-400 font-medium text-sm">Loading success stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-slate-800/50 rounded-3xl border border-slate-700">
            <FaHeart className="text-4xl text-[#E91E63] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">No Success Stories Found</h3>
            <p className="text-slate-400 text-xs">Click "Add New Story" to create your first story.</p>
          </div>
        ) : (
          stories.map(story => (
            <div key={story.id} className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-xl flex flex-col relative group hover:border-[#E91E63]/50 transition-all">
              
              {/* Couple Image */}
              <div className="h-52 bg-slate-900 relative overflow-hidden">
                <img src={story.photoUrl || '/wedding-couple.jpg'} alt="Couple" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <button 
                    onClick={() => toggleFeatured(story)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border backdrop-blur-md transition-all ${
                      story.isFeatured 
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' 
                        : 'bg-black/50 text-slate-300 border-white/20'
                    }`}
                  >
                    <FaStar className={story.isFeatured ? 'text-slate-950' : 'text-slate-400'} />
                    {story.isFeatured ? 'Featured' : 'Standard'}
                  </button>

                  <button 
                    onClick={() => togglePublished(story)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border backdrop-blur-md transition-all ${
                      story.isPublished 
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-md' 
                        : 'bg-rose-500/80 text-white border-rose-400'
                    }`}
                  >
                    {story.isPublished ? <FaEye /> : <FaEyeSlash />}
                    {story.isPublished ? 'Published' : 'Hidden'}
                  </button>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-bold text-white text-lg drop-shadow">{story.groomName} ❤️ {story.brideName}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-[#E91E63]" /> {story.city || 'Maharashtra'}</span>
                    <span className="flex items-center gap-1"><FaCalendarAlt className="text-amber-400" /> {story.weddingDate}</span>
                  </div>
                </div>
              </div>

              {/* Story Details & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-3">
                  "{story.shortStory || story.story}"
                </p>

                <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <FaSortAmountDown /> Order: {story.displayOrder || 0}
                  </span>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => startEdit(story)} 
                      className="flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/30 transition-all"
                    >
                      <FaEdit /> Edit
                    </button>

                    <button 
                      onClick={() => handleDelete(story.id)} 
                      className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-xl border border-rose-500/30 transition-all"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesManager;
