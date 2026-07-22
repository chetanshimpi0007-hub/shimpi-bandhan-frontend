import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaSpinner, FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import api from '../services/api';
import PhotoUpload from '../components/PhotoUpload';
import ProfileHeader from '../components/ProfileHeader';

const EditProfile = () => {
  const { register, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [submittingVerification, setSubmittingVerification] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [profileId, setProfileId] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [res, photosRes] = await Promise.all([
          api.get('/profiles/me'),
          api.get('/profile/photos')
        ]);
        
        const profile = res.data;
        setProfileId(profile.id);
        setPhotos(Array.isArray(photosRes.data) ? photosRes.data : []);
        // ProfileResponse uses 'verificationStatus' (VerificationStatus enum), not 'status'
        // Map enum values to what UI conditions check
        const vs = profile.verificationStatus;
        if (!vs || vs === 'DRAFT') setStatus('DRAFT');
        else if (vs === 'SUBMITTED_FOR_VERIFICATION') setStatus('PENDING_VERIFICATION');
        else if (vs === 'APPROVED') setStatus('APPROVED');
        else if (vs === 'REJECTED') setStatus('REJECTED');
        else setStatus(vs);
        
        // Populate form
        Object.keys(profile).forEach(key => {
          if (profile[key] !== null) {
            setValue(key, profile[key]);
          }
        });
        
        try {
          const videoRes = await api.get(`/videos/${profile.userId}`);
          if (videoRes.data?.videoUrl) {
            setValue("videoUrl", videoRes.data.videoUrl);
          }
        } catch (e) {
          // No video yet
        }

      } catch (err) {
        console.error("Failed to load profile for editing", err);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, [setValue]);

  const handleSaveDraft = async (e) => {
    if (e) e.preventDefault();
    console.log("Save Draft Clicked");
    setLoading(true);
    setApiError('');
    setSuccessMsg('');
    try {
      const rawData = getValues();
      console.log("Form values (raw):", rawData);

      // Sanitize: convert empty strings to null for enum and numeric fields
      // Backend Jackson cannot coerce empty string "" to Java Enum/Number types
      const sanitizeData = (obj) => {
        if (obj === null || obj === undefined) return obj;
        if (Array.isArray(obj)) return obj.map(sanitizeData);
        if (typeof obj === 'object') {
          const result = {};
          for (const [key, val] of Object.entries(obj)) {
            result[key] = sanitizeData(val);
          }
          return result;
        }
        // Convert empty strings to null
        if (typeof obj === 'string' && obj.trim() === '') return null;
        return obj;
      };

      const data = sanitizeData(rawData);
      console.log("Form values (sanitized):", data);

      const res = await api.post('/profiles/save-draft', data);
      console.log("Save Draft Response:", res.data);
      
      if (data.videoUrl) {
        try {
          await api.post('/videos/upload', {
            videoUrl: data.videoUrl,
            thumbnailUrl: data.videoUrl.replace('.mp4', '.jpg'),
            durationSeconds: 30
          });
        } catch (videoErr) {
          console.error("Failed to upload video during draft save", videoErr);
        }
      }

      const msg = res.data?.message || 'Draft saved successfully.';
      setSuccessMsg(msg);
      // Scroll to top so the success banner is visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error("Error saving draft:", error);
      // Spring returns {error: '...'}, our controller returns {message: '...'}
      const errMsg = error.response?.data?.message 
                  || error.response?.data?.error 
                  || 'Failed to save draft. Please try again.';
      setApiError(errMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    // If onSubmit is invoked (e.g., via hitting Enter), treat it as a draft save.
    await handleSaveDraft();
  };

  const handleSubmitVerification = async () => {
    // 1. Manually trigger form validation for mandatory fields
    const isValid = await trigger();
    if (!isValid) {
      setApiError('Please fill in all mandatory fields before submitting for verification.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const safePhotos = Array.isArray(photos) ? photos : [];
    const hasPrimary = safePhotos.some(p => p.isPrimary || p.photoType === 'PRIMARY');
    const galleryCount = safePhotos.filter(p => !p.isPrimary && p.photoType !== 'PRIMARY').length;
    
    if (!hasPrimary) {
      setApiError('Please upload a Primary Profile Photo before submitting your profile for verification.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (galleryCount < 2) {
      setApiError('Please upload at least 2 full-size gallery photos before submitting your profile for verification.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmittingVerification(true);
    setApiError('');
    setSuccessMsg('');
    try {
      // 2. Save current form values to backend first (sanitize empty strings → null for enums)
      const rawData = getValues();
      const sanitize = (obj) => {
        if (obj === null || obj === undefined) return obj;
        if (Array.isArray(obj)) return obj.map(sanitize);
        if (typeof obj === 'object') { const r = {}; for (const [k,v] of Object.entries(obj)) r[k]=sanitize(v); return r; }
        if (typeof obj === 'string' && obj.trim() === '') return null;
        return obj;
      };
      const data = sanitize(rawData);
      await api.post('/profiles/save-draft', data);

      if (data.videoUrl) {
        try {
          await api.post('/videos/upload', {
            videoUrl: data.videoUrl,
            thumbnailUrl: data.videoUrl.replace('.mp4', '.jpg'),
            durationSeconds: 30
          });
        } catch (videoErr) {
          console.error("Failed to upload video during verification submit", videoErr);
        }
      }

      // 3. Submit for verification
      await api.post('/profiles/submit');
      setSuccessMsg('Profile submitted for verification successfully!');
      setStatus('PENDING_VERIFICATION');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to submit for verification. Please complete all required fields.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmittingVerification(false);
    }
  };

  if (fetching) return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-4xl text-[var(--color-primary)]" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/profile')} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="mb-8">
          <ProfileHeader photos={Array.isArray(photos) ? photos : []} onPhotosUpdated={setPhotos} />
        </div>
        {status === 'PENDING_VERIFICATION' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg flex items-start gap-3">
            <FaExclamationTriangle className="mt-1" />
            <div>
              <h4 className="font-bold">Profile Pending Verification</h4>
              <p className="text-sm">Your profile is currently under review by our team. Some features may be restricted until approved.</p>
            </div>
          </div>
        )}
        
        {status === 'APPROVED' && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-3">
            <FaCheckCircle className="text-xl" />
            <div>
              <h4 className="font-bold">Profile Approved</h4>
              <p className="text-sm">Your profile is verified and live on Shimpi Bandhan.</p>
            </div>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSaveDraft(e); }} className="space-y-8">
          {apiError && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm text-center font-medium border border-red-200">
              {apiError}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm text-center font-medium border border-green-200">
              {successMsg}
            </div>
          )}



          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" {...register("fullName", { required: "Name is required" })} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" {...register("email")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select {...register("gender", { required: "Gender is required" })} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Mobile Number</label>
                <input type="text" {...register("contactNumber")} disabled className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-200 border outline-none text-gray-500 cursor-not-allowed" title="Primary number cannot be changed here" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Mobile Number</label>
                <input type="text" {...register("alternateMobile")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="10-digit number" />
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Village / Area</label>
                <input type="text" {...register("village")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" {...register("city")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input type="text" {...register("district")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" {...register("state")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input type="text" {...register("pincode")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
            </div>
          </div>

          {/* Birth & Horoscope Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Birth & Horoscope Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" {...register("dateOfBirth", { required: "DOB is required" })} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time of Birth</label>
                <input type="time" {...register("birthDetails.birthTime")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                <input type="text" {...register("birthDetails.birthPlace")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Pune, Maharashtra" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rashi (Zodiac Sign)</label>
                <input type="text" {...register("horoscopeDetails.rashi")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Mesh (Aries)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nakshatra</label>
                <input type="text" {...register("horoscopeDetails.nakshatra")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Charan</label>
                <input type="text" {...register("horoscopeDetails.charan")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naadi</label>
                <input type="text" {...register("horoscopeDetails.nadi")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gan</label>
                <input type="text" {...register("horoscopeDetails.gan")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manglik</label>
                <select {...register("manglik")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Physical Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Physical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (ft)</label>
                <input type="number" step="0.1" {...register("height")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="5.9" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input type="number" step="0.1" {...register("weight")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="70" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select {...register("bloodGroup")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <input type="text" {...register("religion")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="Hindu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gotra</label>
                <input type="text" {...register("gotra")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                <select {...register("maritalStatus")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="">Select Status</option>
                  <option value="NEVER_MARRIED">Never Married</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="WIDOW">Widow</option>
                  <option value="WIDOWER">Widower</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family Type</label>
                <select {...register("familyType")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="">Select Type</option>
                  <option value="NUCLEAR">Nuclear</option>
                  <option value="JOINT">Joint</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lifestyle & Habits</label>
                <select {...register("lifestyle")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="">Select Lifestyle</option>
                  <option value="VEGETARIAN">Vegetarian, No Smoking/Drinking</option>
                  <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                  <option value="MODERATE">Moderate / Occasional Drinker</option>
                </select>
              </div>
            </div>
          </div>

          {/* Education & Occupation */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Education & Occupation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                <input type="text" {...register("education")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. B.Tech CS" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <input type="text" {...register("occupation")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" {...register("company")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
                <input type="number" {...register("annualIncome")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
            </div>
          </div>


          {/* Family Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Family Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                <input type="text" {...register("familyDetailsExtended.fatherName")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation</label>
                <input type="text" {...register("familyDetailsExtended.fatherOccupation")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                <input type="text" {...register("familyDetailsExtended.motherName")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Occupation</label>
                <input type="text" {...register("familyDetailsExtended.motherOccupation")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Brothers</label>
                <input type="number" {...register("familyDetailsExtended.brothers")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Married Brothers</label>
                <input type="number" {...register("familyDetailsExtended.marriedBrothers")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Sisters</label>
                <input type="number" {...register("familyDetailsExtended.sisters")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Married Sisters</label>
                <input type="number" {...register("familyDetailsExtended.marriedSisters")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Native Place (Mulgaav)</label>
                <input type="text" {...register("familyDetailsExtended.nativePlace")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mama's Surname (Maternal)</label>
                <input type="text" {...register("familyDetailsExtended.mamaKul")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parents Mobile Number</label>
                <input type="text" {...register("familyContact")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="10-digit number" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Family Details</label>
              <textarea {...register("familyDetails")} rows="3" className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]"></textarea>
            </div>
          </div>

          {/* Other Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Other Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                <textarea {...register("aboutMe")} rows="4" className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="Tell us about your personality, hobbies, and life goals..."></textarea>
              </div>
            </div>
          </div>

          {/* Expectations / Partner Preferences */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Expectations / Partner Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Minimum Height (ft)</label>
                <input type="number" step="0.1" {...register("partnerPreferenceExtended.partnerHeight")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. 5.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Education</label>
                <input type="text" {...register("partnerPreferenceExtended.partnerEducation")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Graduation/PG" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Occupation</label>
                <input type="text" {...register("partnerPreferenceExtended.partnerOccupation")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="e.g. IT Professional, Govt Job" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected City/State</label>
                <input type="text" {...register("partnerPreferenceExtended.partnerCity")} className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Expectations</label>
              <textarea {...register("partnerPreference")} rows="3" className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border outline-none focus:border-[var(--color-primary)]" placeholder="Describe the kind of partner you are looking for..."></textarea>
            </div>
          </div>

          {/* Video Biodata */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Video Biodata (Premium Feature)</h3>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-4">
              <p className="text-sm text-blue-800">Stand out by uploading a short Video Biodata (Max 60 seconds). Paste your Cloudinary URL below.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Cloudinary)</label>
                <input type="text" {...register("videoUrl")} className="w-full border-gray-300 rounded-lg p-2.5 bg-white border outline-none focus:border-[var(--color-primary)]" placeholder="https://res.cloudinary.com/.../video.mp4" />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">My Contact Number Visibility</span>
                <select {...register("contactNumberPrivacy")} className="border-gray-300 rounded-lg p-2 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="PUBLIC">Public</option>
                  <option value="PREMIUM_ONLY">Premium Users Only</option>
                  <option value="ACCEPTED_ONLY">Accepted Interests Only</option>
                  <option value="HIDDEN">Hidden</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">My WhatsApp Visibility</span>
                <select {...register("whatsappNumberPrivacy")} className="border-gray-300 rounded-lg p-2 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="PUBLIC">Public</option>
                  <option value="PREMIUM_ONLY">Premium Users Only</option>
                  <option value="ACCEPTED_ONLY">Accepted Interests Only</option>
                  <option value="HIDDEN">Hidden</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Family Contact Visibility</span>
                <select {...register("familyContactPrivacy")} className="border-gray-300 rounded-lg p-2 bg-gray-50 border outline-none focus:border-[var(--color-primary)]">
                  <option value="PUBLIC">Public</option>
                  <option value="PREMIUM_ONLY">Premium Users Only</option>
                  <option value="ACCEPTED_ONLY">Accepted Interests Only</option>
                  <option value="HIDDEN">Hidden</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="block text-sm font-medium text-gray-700">Enable Family Approval Workflow</span>
                  <span className="text-xs text-gray-500">Require family consent for final match approval</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("requireFamilyApproval")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Gallery Photos at the bottom */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Upload Photo</h3>
            <PhotoUpload 
              existingPhotos={(Array.isArray(photos) ? photos : []).filter(p => !p.isPrimary && p.photoType !== 'PRIMARY')} 
              onPhotosUpdated={(newGalleryPhotos) => {
                const safePhotos = Array.isArray(photos) ? photos : [];
                const primary = safePhotos.find(p => p.isPrimary || p.photoType === 'PRIMARY');
                setPhotos(primary ? [primary, ...newGalleryPhotos] : newGalleryPhotos);
              }} 
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto">
              {(status === 'DRAFT' || status === 'REJECTED') && (
                <button 
                  type="button" 
                  onClick={handleSubmitVerification}
                  disabled={submittingVerification || loading}
                  className="w-full md:w-auto bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {submittingVerification ? <FaSpinner className="animate-spin" /> : <><FaCheckCircle /> Submit for Verification</>}
                </button>
              )}
            </div>
            
             <div className="w-full md:w-auto flex justify-end gap-4">
              <button type="button" onClick={() => navigate('/profile')} className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleSaveDraft} disabled={loading || submittingVerification} className="bg-[var(--color-primary)] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-md flex items-center gap-2">
                {loading ? <FaSpinner className="animate-spin" /> : <><FaSave /> Save Draft</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
