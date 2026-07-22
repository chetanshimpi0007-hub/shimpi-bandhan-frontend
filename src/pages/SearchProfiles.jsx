import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaFilter, FaSearch, FaSpinner, FaCrown, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';
import ProfileCard from '../components/ProfileCard';

const SearchProfiles = () => {
  const { register, handleSubmit } = useForm();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});

  const fetchProfiles = async (pageNumber = 0, currentFilters = filters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNumber,
        size: 12,
        ...currentFilters
      });
      // Remove empty filters
      Array.from(queryParams.keys()).forEach(key => {
        if (queryParams.get(key) === '' || queryParams.get(key) === 'false' && (key === 'isPremiumMember' || key === 'isVerifiedProfile')) {
           queryParams.delete(key);
        }
      });

      const response = await api.get(`/profiles/search?${queryParams.toString()}`);
      
      if (pageNumber === 0) {
        setProfiles(response.data.content);
      } else {
        setProfiles(prev => [...prev, ...response.data.content]);
      }
      
      setTotalPages(response.data.totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching profiles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(0);
  }, []);

  const onSubmitFilters = (data) => {
    setFilters(data);
    fetchProfiles(0, data);
  };

  const loadMore = () => {
    if (page < totalPages - 1) {
      fetchProfiles(page + 1);
    }
  };

  const handleSendInterest = async (receiverId) => {
    try {
      await api.post(`/interests/send/${receiverId}`);
      alert("Interest sent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send interest");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaFilter className="text-[var(--color-primary)]" /> Filters
          </h2>
          <form onSubmit={handleSubmit(onSubmitFilters)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
              <div className="flex items-center gap-2">
                <input type="number" {...register("minAge")} placeholder="Min" className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
                <span className="text-gray-400">-</span>
                <input type="number" {...register("maxAge")} placeholder="Max" className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select {...register("maritalStatus")} className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                <option value="">Any</option>
                <option value="NEVER_MARRIED">Never Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOW">Widow</option>
                <option value="WIDOWER">Widower</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manglik</label>
              <select {...register("manglik")} className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" {...register("city")} placeholder="e.g. Pune" className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Income (₹)</label>
              <input type="number" {...register("minIncome")} placeholder="e.g. 500000" className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Family Type</label>
              <select {...register("familyType")} className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                <option value="">Any</option>
                <option value="NUCLEAR">Nuclear</option>
                <option value="JOINT">Joint</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select {...register("sortBy")} className="w-full border-gray-300 rounded-lg p-2 text-sm bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                <option value="newest">Newest First</option>
                <option value="premium_first">Premium Profiles First</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("isPremiumMember")} className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1"><FaCrown className="text-yellow-500" /> Premium Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("isVerifiedProfile")} className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1"><FaCheckCircle className="text-green-500" /> Verified Only</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-[var(--color-primary)] text-white rounded-lg p-2.5 font-bold hover:bg-blue-900 transition-colors flex justify-center items-center gap-2">
              <FaSearch /> Apply Filters
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Search Matches</h1>
          <p className="text-gray-500 text-sm">Showing profiles matching your preferences and community.</p>
        </div>

        {profiles.length === 0 && !loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-700">No matches found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profiles.map(profile => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onSendInterest={handleSendInterest} 
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <FaSpinner className="animate-spin text-3xl text-[var(--color-primary)]" />
          </div>
        )}

        {!loading && page < totalPages - 1 && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={loadMore}
              className="bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-2.5 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              Load More Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProfiles;
