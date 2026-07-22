import { useState, useRef, useEffect } from 'react';
import { FaUpload, FaTrash, FaStar, FaTimes, FaSpinner, FaPlus } from 'react-icons/fa';
import api, { getBackendUrl } from '../services/api';

const PhotoUpload = ({ profileId, existingPhotos = [], onPhotosUpdated }) => {
  const [photos, setPhotos] = useState(existingPhotos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPhotos(existingPhotos);
  }, [existingPhotos]);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (photos.length >= 10) {
        setError('Maximum 10 photos allowed.');
        e.target.value = '';
        return;
      }

      const file = e.target.files[0];
      try {
        setLoading(true);
        setError('');
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'GALLERY');

        const response = await api.post(`/profile/photos`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        let updatedPhotos = [...photos, response.data];
        
        // We don't auto-set primary here because ProfileHeader handles primary photos.
        
        setPhotos(updatedPhotos);
        onPhotosUpdated(updatedPhotos);
      } catch (err) {
        console.error(err);
        const serverMsg = err.response?.data?.message || err.message;
        setError(`Failed to upload photo: ${serverMsg}`);
      } finally {
        setLoading(false);
      }
      e.target.value = ''; // reset
    }
  };

  const deletePhoto = async (photoId) => {
    try {
      setLoading(true);
      await api.delete(`/profile/photos/${photoId}`);
      const updatedPhotos = photos.filter(p => p.id !== photoId);
      setPhotos(updatedPhotos);
      onPhotosUpdated(updatedPhotos);
    } catch (err) {
      console.error(err);
      setError('Failed to delete photo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-4">Upload at least 2 and up to 10 photos.</p>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {photos.length < 2 && (
        <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg text-sm mb-4 font-medium border border-yellow-200">
          Please upload at least {2 - photos.length} more photo(s) to verify your profile.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {photos.map(photo => (
          <div key={photo.id} className={`relative rounded-lg overflow-hidden border-2 ${photo.isPrimary ? 'border-[var(--color-primary)]' : 'border-gray-200'} aspect-[3/4] group`}>
            <img 
              src={(() => {
                const urlVal = photo.thumbnailUrl || photo.photoUrl || photo.url;
                if (!urlVal) return '/default-avatar.png';
                if (urlVal.startsWith('http') || urlVal.startsWith('blob:')) return urlVal;
                return `${getBackendUrl()}${urlVal}`;
              })()} 
              alt="" 
              className="w-full h-full object-cover bg-gray-100" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
              <button 
                type="button"
                onClick={() => deletePhoto(photo.id)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {photos.length < 10 && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center aspect-[3/4] cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors text-gray-500"
          >
            <FaPlus className="text-2xl mb-2" />
            <span className="text-sm font-medium">Add Photo</span>
            <span className="text-xs">({photos.length}/10)</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default PhotoUpload;
