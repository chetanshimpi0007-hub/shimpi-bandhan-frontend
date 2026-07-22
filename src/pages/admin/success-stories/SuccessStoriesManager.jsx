import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaHeart, FaPlus, FaTimes, FaTrash, FaSpinner, FaCalendarAlt, FaQuoteLeft } from 'react-icons/fa';

const SuccessStoriesManager = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [isAdding, setIsAdding] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/success-stories');
      setStories(res.data);
    } catch (err) {
      console.error("Failed to fetch stories", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    try {
      await axios.post('http://localhost:8080/api/v1/success-stories', data);
      setIsAdding(false);
      reset();
      fetchStories();
    } catch (error) {
      alert('Failed to add story');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this success story?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/success-stories/${id}`);
      fetchStories();
    } catch (error) {
      alert("Failed to delete story");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
              <FaHeart className="text-pink-400" />
            </div>
            Success Stories Manager
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage matches made in heaven to show on the platform.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)} 
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg text-sm ${
            isAdding 
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700' 
              : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-pink-500/20'
          }`}
        >
          {isAdding ? <><FaTimes /> Cancel</> : <><FaPlus /> Add New Story</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-pink-500/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500"></div>
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
              <FaPlus className="text-pink-400" /> Create Success Story
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bride Name <span className="text-pink-500">*</span></label>
                  <input type="text" {...register('brideName', { required: true })} className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder-slate-600" placeholder="e.g. Sneha" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Groom Name <span className="text-pink-500">*</span></label>
                  <input type="text" {...register('groomName', { required: true })} className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder-slate-600" placeholder="e.g. Rahul" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Wedding Date <span className="text-pink-500">*</span></label>
                  <input type="date" {...register('weddingDate', { required: true })} className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Photo URL</label>
                  <input type="url" {...register('photoUrl')} className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder-slate-600" placeholder="https://..." />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Video URL (Optional)</label>
                <input type="url" {...register('videoUrl')} className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder-slate-600" placeholder="https://youtube.com/..." />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Testimonial <span className="text-pink-500">*</span></label>
                <textarea {...register('story', { required: true })} rows="4" className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder-slate-600 resize-none" placeholder="Write their success story here..."></textarea>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button type="submit" disabled={actionLoading} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 min-w-[150px]">
                  {actionLoading ? <FaSpinner className="animate-spin" /> : 'Save Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-[#F5C842]">
            <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
            <p className="text-slate-400 font-medium">Loading stories...</p>
          </div>
        ) : stories.length === 0 && !isAdding ? (
          <div className="col-span-full py-16 text-center bg-[#111827] rounded-2xl border border-slate-800">
            <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500/20">
              <FaHeart className="text-2xl text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">No Success Stories Yet</h3>
            <p className="text-slate-400">Click "Add New Story" to showcase successful matches.</p>
          </div>
        ) : (
          stories.map(story => (
            <div key={story.id} className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl group hover:border-pink-500/50 transition-all flex flex-col relative">
              <div className="h-56 bg-slate-900 relative overflow-hidden">
                <img src={story.photoUrl || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'} alt="Couple" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-90"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-bold text-white text-xl drop-shadow-lg mb-1">{story.brideName} <span className="text-pink-400">&</span> {story.groomName}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <FaCalendarAlt className="text-pink-400" /> {new Date(story.weddingDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col relative">
                <FaQuoteLeft className="text-slate-800 text-3xl absolute top-3 right-4 opacity-50" />
                <p className="text-sm text-slate-400 italic line-clamp-4 mb-5 relative z-10">"{story.story}"</p>
                
                <div className="mt-auto pt-4 border-t border-slate-800 flex justify-end">
                  <button onClick={() => handleDelete(story.id)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-400 transition-colors bg-slate-800/50 hover:bg-red-500/10 px-3 py-1.5 rounded-lg">
                    <FaTrash /> Delete
                  </button>
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
