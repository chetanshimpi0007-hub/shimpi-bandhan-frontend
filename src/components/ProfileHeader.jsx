import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Trash2 } from 'lucide-react';
import ProfilePhotoUploadModal from './ProfilePhotoUploadModal';
import api, { getBackendUrl } from '../services/api';

const ProfileHeader = ({ profileId, photos = [], onPhotosUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const primaryPhoto = photos.find(p => p.photoType === 'PRIMARY' && p.status === 'PENDING') 
                    || photos.find(p => p.isPrimary) 
                    || photos.find(p => p.photoType === 'PRIMARY') 
                    || photos[0];
  const photoUrl = primaryPhoto?.thumbnailUrl || primaryPhoto?.photoUrl || '/default-avatar.png';
  const status = primaryPhoto?.status || 'NO_PHOTO';

  const handleDelete = async () => {
    if (!primaryPhoto?.id) return;
    if (!window.confirm("Are you sure you want to remove your profile photo?")) return;
    
    try {
      setIsDeleting(true);
      await api.delete(`/profile/photos/${primaryPhoto.id}`);
      if (onPhotosUpdated) {
        onPhotosUpdated(photos.filter(p => p.id !== primaryPhoto.id));
      }
    } catch (err) {
      console.error("Failed to delete photo", err);
      alert("Failed to delete photo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 mb-8 border-b border-gray-100">
      <div className="relative group mb-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] rounded-full border-[5px] border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-[var(--color-background)] flex items-center justify-center relative"
          role="img"
        >
          <img 
            src={(() => {
              const urlVal = primaryPhoto?.thumbnailUrl || primaryPhoto?.photoUrl;
              if (!urlVal) return '/default-avatar.png';
              if (urlVal.startsWith('http') || urlVal.startsWith('blob:')) return urlVal;
              return `${getBackendUrl()}${urlVal}`;
            })()} 
            className="w-full h-full object-cover" 
            loading="lazy" 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/default-avatar.png";
            }}
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </motion.div>
        
        {/* Status overlay removed as per user request to put it below the buttons */}

        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          aria-label="Upload new profile photo"
          className="absolute bottom-1 right-1 md:bottom-3 md:right-3 bg-[var(--color-primary)] text-white p-2 md:p-3 rounded-full shadow-lg border-2 border-white hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all z-10"
        >
          <Camera size={20} className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
        </motion.button>
      </div>

      <div className="flex gap-4 mt-2">
        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] flex items-center gap-1"
        >
          <Camera size={16} /> Change Photo
        </button>
        
        {primaryPhoto && (
          <button 
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 disabled:opacity-50"
          >
            <Trash2 size={16} /> {isDeleting ? 'Removing...' : 'Remove Photo'}
          </button>
        )}
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm font-medium text-gray-500">Status: </span>
        <span className={`text-sm font-bold ${
          status === 'APPROVED' ? 'text-green-600' :
          status === 'PENDING' ? 'text-yellow-600' :
          status === 'REJECTED' ? 'text-red-600' : 'text-gray-400'
        }`}>
          {status === 'NO_PHOTO' ? 'No Photo Uploaded' : status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
      </div>

      <ProfilePhotoUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        profileId={profileId}
        onUploadSuccess={async (newPhoto) => {
           try {
              const res = await api.get('/profile/photos');
              if (onPhotosUpdated) onPhotosUpdated(res.data);
           } catch (err) {
              console.error("Failed to refetch photos, falling back to local update", err);
              let updated = [...photos];
              // Remove existing primary if new one is uploaded since we only have one primary slot in UI logic
              updated = updated.filter(p => p.photoType !== 'PRIMARY' && !p.isPrimary);
              updated.push({ ...newPhoto, isPrimary: true, photoType: 'PRIMARY' });
              if (onPhotosUpdated) onPhotosUpdated(updated);
           }
           setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProfileHeader;
