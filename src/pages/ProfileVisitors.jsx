import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getBackendUrl } from '../services/api';
import { FaCrown, FaEyeSlash, FaLock, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

const ProfileVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const isPremium = user?.profile?.isPremiumMember;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await api.get('/views/visitors?size=20');
        setVisitors(res.data.content);
      } catch (error) {
        console.error("Failed to fetch visitors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitors();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Visitors</h1>
          <p className="text-gray-600">See who has been viewing your profile.</p>
        </div>
        {!isPremium && (
          <button 
            onClick={() => navigate('/premium')}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-blue-800 text-[var(--color-secondary)] px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all"
          >
            <FaCrown /> Upgrade to Premium
          </button>
        )}
      </div>

      {!isPremium && visitors.length > 0 && (
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-2xl p-6 text-center">
          <FaLock className="mx-auto text-3xl text-orange-500 mb-2" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Unlock Profile Visitors</h2>
          <p className="text-gray-700 mb-4">You have {visitors.length} people interested in your profile. Upgrade to Premium to see their full details and photos.</p>
          <button 
            onClick={() => navigate('/premium')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-md transition-all"
          >
            Upgrade Now
          </button>
        </div>
      )}

      {visitors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <FaEyeSlash className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-700">No visitors yet</h3>
          <p className="text-gray-500">Keep your profile updated and active to attract more matches.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visitors.map((profile, index) => (
            <div key={index} className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:shadow-md ${!isPremium ? 'blur-sm select-none' : ''}`}>
              <div className="relative h-64 bg-gray-200">
                {profile.profilePhotoUrl ? (
                  <img 
                    src={(profile.profilePhotoUrl.startsWith('http') || profile.profilePhotoUrl.startsWith('blob:')) ? profile.profilePhotoUrl : `${getBackendUrl()}${profile.profilePhotoUrl}`} 
                    alt="Profile" 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                ) : (
                  <img src="/default-avatar.png" alt="Profile" className="w-full h-full object-cover" />
                )}
                {!isPremium && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <FaLock className="text-4xl text-white drop-shadow-md" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 truncate flex items-center gap-1">
                  {profile.fullName}
                  {profile.isOnline && <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full ml-1" title="Online"></span>}
                  {profile.isVerifiedProfile && <span className="text-blue-500 text-sm ml-1" title="Verified"><FaCheckCircle /></span>}
                  {profile.isPremiumMember && <span className="text-yellow-500 text-sm ml-1" title="Premium"><FaCrown /></span>}
                </h3>
                <div className="text-sm text-gray-600 mt-1">
                  <p>{profile.age ? `${profile.age} yrs` : 'Age hidden'} • {profile.height || '-'}</p>
                  <p>{profile.city}, {profile.state}</p>
                  <p className="truncate text-gray-500">{profile.education || 'Education not specified'}</p>
                </div>
                {isPremium && (
                  <Link to={`/profile/${profile.userId}`} className="mt-4 block w-full text-center bg-gray-50 hover:bg-gray-100 text-[var(--color-primary)] font-semibold py-2 rounded-lg transition-colors border border-gray-200">
                    View Full Profile
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileVisitors;
