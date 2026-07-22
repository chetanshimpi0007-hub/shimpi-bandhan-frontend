import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBackendUrl } from '../services/api';
import { useSelector } from 'react-redux';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaSpinner, FaCrown, FaCheckCircle, FaLock, FaHeart, FaWhatsapp, FaHome, FaUsers } from 'react-icons/fa';
import api from '../services/api';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [compatibility, setCompatibility] = useState(null);
  const [videoBiodata, setVideoBiodata] = useState(null);
  const [ownerPhotoUrl, setOwnerPhotoUrl] = useState(null); // fallback photo for owner
  
  const currentUser = useSelector(state => state.auth.user);
  const isOwnProfile = !id || Number(id) === Number(currentUser?.id);
  const isPremium = currentUser?.profile?.isPremiumMember;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const endpoint = isOwnProfile ? '/profiles/me' : `/profiles/${id}`;
        const res = await api.get(endpoint);
        setProfile(res.data);

        // If owner and profilePhotoUrl is empty, fetch photos directly as fallback
        if (isOwnProfile && !res.data?.profilePhotoUrl) {
          try {
            const photosRes = await api.get('/profile/photos');
            const allPhotos = Array.isArray(photosRes.data) ? photosRes.data : [];
            // Look for PRIMARY type first, then isPrimary flag, then any photo
            const primary = allPhotos.find(p => p.photoType === 'PRIMARY') 
                         || allPhotos.find(p => p.isPrimary) 
                         || allPhotos[0];
            if (primary?.thumbnailUrl || primary?.photoUrl) {
              const rawUrl = primary.thumbnailUrl || primary.photoUrl;
              const fullUrl = rawUrl.startsWith('http') || rawUrl.startsWith('blob:')
                ? rawUrl
                : `${getBackendUrl()}${rawUrl}`;
              setOwnerPhotoUrl(fullUrl);
            }
          } catch (photoErr) {
            console.error('Failed to load owner photos fallback', photoErr);
          }
        }

        if (!isOwnProfile) {
          // Record view in the background
          api.post(`/views/record/${id}`, {}, { headers: { 'User-Agent': navigator.userAgent } }).catch(console.error);
          
          // Fetch compatibility
          api.get(`/compatibility/${id}`).then(res => setCompatibility(res.data)).catch(console.error);
        }

        // Fetch video biodata
        const targetId = isOwnProfile ? currentUser?.id : id;
        api.get(`/videos/${targetId}`).then(res => setVideoBiodata(res.data)).catch(console.error);

      } catch (err) {
        if (isOwnProfile && (err.response?.status === 404 || err.response?.data?.message?.toLowerCase().includes('not found') || err.response?.data?.message?.toLowerCase().includes('fail'))) {
          navigate('/profile/edit');
        } else {
          setError(err.response?.data?.message || 'Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, isOwnProfile, currentUser]);

  const handleSendInterest = async () => {
    try {
      await api.post(`/interests/send/${profile.userId}`);
      alert("Interest sent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send interest");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-4xl text-[var(--color-primary)]" /></div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!profile) return <div className="text-center py-20">Profile not found</div>;

  const isContactLocked = !profile.contactNumber || profile.contactNumber?.includes("LOCKED");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-900 to-[var(--color-primary)] relative">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-20 sm:-mt-24 mb-6">
            <img 
              src={(() => {
                // Priority 1: profilePhotoUrl from /profiles/me (API-resolved URL)
                // Priority 2: ownerPhotoUrl from /profile/photos (direct fallback for pending photos)
                const urlVal = profile.profilePhotoUrl || ownerPhotoUrl;
                if (!urlVal) return '/default-avatar.png';
                if (urlVal.startsWith('http') || urlVal.startsWith('blob:')) return urlVal;
                return `${getBackendUrl()}${urlVal}`;
              })()} 
              alt={profile.fullName}
              loading="lazy"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {profile.fullName || 'Name Not Set'}
                  {profile.isOnline && <span className="inline-block w-4 h-4 bg-green-500 rounded-full border-2 border-white" title="Online"></span>}
                </h1>
                {profile.isVerifiedProfile && <div className="bg-white text-blue-500 p-1.5 rounded-full shadow-sm" title="Verified"><FaCheckCircle className="text-xl" /></div>}
                {profile.isPremiumMember && <div className="bg-white text-yellow-500 p-1.5 rounded-full shadow-sm" title="Premium"><FaCrown className="text-xl" /></div>}
                
                {profile.accountType === 'FAMILY' ? (
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200" title="Family Managed">👨‍👩‍👧 Family Managed</span>
                ) : (
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200" title="Self Managed">🧑 Self Managed</span>
                )}
              </div>
              <p className="text-gray-600 text-lg">{profile.age ? `${profile.age} yrs` : ''} • {profile.community}</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              {isOwnProfile ? (
                <Link to="/profile/edit" className="flex-1 sm:flex-none bg-[var(--color-primary)] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors text-center">
                  Edit Profile
                </Link>
              ) : (
                <button onClick={handleSendInterest} className="flex-1 sm:flex-none bg-[var(--color-secondary)] text-[var(--color-primary)] px-8 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-md flex items-center justify-center gap-2">
                  <FaHeart /> Send Interest
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-[var(--color-primary)]"><FaBriefcase /></div>
              <div>
                <p className="text-sm text-gray-500">Profession</p>
                <p className="font-semibold text-gray-800">{profile.occupation || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-[var(--color-primary)]"><FaGraduationCap /></div>
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <p className="font-semibold text-gray-800">{profile.education || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-[var(--color-primary)]"><FaMapMarkerAlt /></div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">{profile.city ? `${profile.city}, ${profile.state}` : 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">About Me</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {profile.aboutMe || 'No details provided.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Personal & Religious Info</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div><span className="text-gray-500 block text-sm">Date of Birth</span><span className="font-medium">{profile.dateOfBirth || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Marital Status</span><span className="font-medium">{profile.maritalStatus || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Height</span><span className="font-medium">{profile.height ? `${profile.height} ft` : '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Blood Group</span><span className="font-medium">{profile.bloodGroup || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Religion</span><span className="font-medium">{profile.religion || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Community</span><span className="font-medium">{profile.community || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Gotra</span><span className="font-medium">{profile.gotra || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Manglik</span><span className="font-medium">{profile.manglik !== null ? (profile.manglik ? 'Yes' : 'No') : '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Family Type</span><span className="font-medium">{profile.familyType || '-'}</span></div>
              <div><span className="text-gray-500 block text-sm">Lifestyle</span><span className="font-medium">{profile.lifestyle || '-'}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Partner Preference</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {profile.partnerPreference || 'No preference specified.'}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* AI Compatibility Score */}
          {!isOwnProfile && compatibility && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl shadow-sm border border-indigo-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <FaCrown className="text-6xl text-indigo-900" />
              </div>
              <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2 relative z-10">
                AI Compatibility Score
              </h2>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-20 h-20 rounded-full border-4 border-indigo-500 flex items-center justify-center bg-white shadow-inner">
                  <span className="text-2xl font-bold text-indigo-700">{compatibility.overallCompatibilityPercentage}%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-indigo-800">Overall Match</p>
                  <p className="text-xs text-indigo-600">Based on 12 criteria</p>
                </div>
              </div>

              {isPremium ? (
                <div className="space-y-3 relative z-10">
                  <h3 className="text-sm font-bold text-indigo-900">Detailed Breakdown</h3>
                  {Object.entries(compatibility.detailedBreakdown).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-indigo-800">{key}</span>
                        <span className="text-indigo-600">{value}%</span>
                      </div>
                      <div className="w-full bg-indigo-200 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${value}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-indigo-200">
                    <h3 className="text-sm font-bold text-green-700 mb-1">Strengths</h3>
                    <ul className="list-disc pl-4 text-xs text-green-800 space-y-1">
                      {compatibility.strengths.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-center relative z-10">
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-200">
                    <FaLock className="mx-auto text-indigo-400 mb-2" />
                    <p className="text-xs text-indigo-800 font-semibold mb-2">Upgrade to Premium to view detailed breakdown</p>
                    <Link to="/premium" className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">Upgrade Now</Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Biodata */}
          {videoBiodata && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                 Video Biodata
              </h2>
              {isPremium || isOwnProfile ? (
                 <video src={videoBiodata.videoUrl} controls className="w-full rounded-xl" />
              ) : (
                 <div className="relative rounded-xl overflow-hidden bg-gray-200 h-40 flex items-center justify-center">
                    {videoBiodata.thumbnailUrl ? <img src={videoBiodata.thumbnailUrl} loading="lazy" className="w-full h-full object-cover blur-md" alt="Video Thumbnail" /> : null}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                       <FaLock className="text-white text-3xl mb-2" />
                       <p className="text-white text-sm font-bold mb-2">Premium Feature</p>
                       <Link to="/premium" className="bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-900 transition-colors">Upgrade to View</Link>
                    </div>
                 </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaPhone className="text-[var(--color-primary)]" /> Contact Details
            </h2>
            
            {isContactLocked ? (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                <FaLock className="mx-auto text-3xl text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-800 mb-1">🔒 Contact Details Locked</p>
                <p className="text-xs text-gray-500 mb-4">Upgrade to Premium to view phone number, email, and more.</p>
                <Link to="/premium" className="block w-full bg-[var(--color-primary)] text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors">
                  Upgrade Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Mobile Number</p>
                  <p className="text-gray-800 font-medium flex items-center gap-2">
                    <FaPhone className="text-gray-400" /> {profile.alternateMobile || profile.contactNumber || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">WhatsApp</p>
                  <p className="text-gray-800 font-medium flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" /> {profile.whatsappNumber || profile.alternateMobile || profile.contactNumber || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Email ID</p>
                  <p className="text-gray-800 font-medium flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" /> {profile.email || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Address</p>
                  <p className="text-gray-800 font-medium flex items-center gap-2">
                    <FaHome className="text-gray-400" /> 
                    {[profile.village, profile.city, profile.district, profile.state, profile.pincode].filter(Boolean).join(', ') || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Family Contact</p>
                  <p className="text-gray-800 font-medium flex items-center gap-2">
                    <FaUsers className="text-gray-400" /> {profile.familyContact || 'Not provided'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Family Details</h2>
            <p className="text-gray-700 text-sm">
              {profile.familyDetails || 'No details provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
