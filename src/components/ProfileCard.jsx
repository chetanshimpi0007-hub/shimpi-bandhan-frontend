import { FaCrown, FaCheckCircle, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaComments, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getBackendUrl } from '../services/api';

const ProfileCard = ({ profile, onSendInterest }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img 
          src={(() => {
            const urlVal = profile.profilePhotoUrl;
            if (!urlVal || typeof urlVal !== 'string') return '/default-avatar.png';
            if (urlVal.startsWith('http') || urlVal.startsWith('blob:')) return urlVal;
            return `${getBackendUrl()}${urlVal}`;
          })()} 
          alt={profile.fullName} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/default-avatar.png";
          }}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {profile.isPremiumMember && (
            <div className="bg-white text-yellow-500 p-2 rounded-full shadow-md" title="Premium Member">
              <FaCrown />
            </div>
          )}
          {profile.isVerifiedProfile && (
            <div className="bg-white text-blue-500 p-2 rounded-full shadow-md" title="Verified Profile">
              <FaCheckCircle />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            {profile.fullName}, {profile.age}
            {profile.isOnline && <span className="inline-block w-3 h-3 bg-green-500 rounded-full border border-white" title="Online"></span>}
          </h3>
          <p className="text-gray-200 text-sm">{profile.community} • {profile.height} ft</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaGraduationCap className="text-gray-400" />
          <span className="truncate">{profile.education || 'Education not specified'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaBriefcase className="text-gray-400" />
          <span className="truncate">{profile.occupation || 'Occupation not specified'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaMapMarkerAlt className="text-gray-400" />
          <span className="truncate">{profile.city}, {profile.state}</span>
        </div>
        <div className="mt-2 pt-3 border-t border-gray-100">
          <span className="inline-block bg-blue-50 text-[var(--color-primary)] text-xs px-2 py-1 rounded-md font-medium">
            {profile.maritalStatus}
          </span>
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto flex gap-2">
        <Link 
          to={`/profile/${profile.userId}`} 
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold text-center hover:bg-gray-200 transition-colors"
        >
          View Profile
        </Link>
        <button 
          onClick={() => onSendInterest(profile.userId)}
          className="bg-[var(--color-primary)] text-white p-2 rounded-lg hover:bg-blue-900 transition-colors"
          title="Send Interest"
        >
          <FaHeart />
        </button>
        {profile.isPremiumMember && (
          <button 
            className="bg-[var(--color-secondary)] text-[var(--color-primary)] p-2 rounded-lg hover:bg-yellow-400 transition-colors"
            title="Chat Now"
          >
            <FaComments />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
