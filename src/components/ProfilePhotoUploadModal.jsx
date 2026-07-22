import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, ZoomIn, ZoomOut } from 'lucide-react';
import api from '../services/api';

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
    0, 0, pixelCrop.width, pixelCrop.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) resolve(file);
      else reject(new Error('Canvas is empty'));
    }, 'image/jpeg');
  });
};

const ProfilePhotoUploadModal = ({ isOpen, onClose, profileId, onUploadSuccess }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  // Stop body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleFile = (file) => {
    if (!file) return;
    setError('');
    // Validation
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Max 5MB allowed.');
      return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPG, PNG, WEBP are supported.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      // Simulate progress up to 90%
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) {
            clearInterval(interval);
            return 90;
          }
          return p + 10;
        });
      }, 200);

      const formData = new FormData();
      formData.append('file', croppedBlob, 'profile_photo.jpg');
      // Do NOT pass type param — backend defaults to PRIMARY

      let responseData;
      const response = await api.post(`/profile/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
           setProgress(percentCompleted);
         }
      });
      responseData = response.data;
      console.log('✅ Photo upload response:', responseData);
      
      setProgress(100);

      setTimeout(() => {
        setUploading(false);
        onUploadSuccess(responseData);
        resetState();
      }, 500);

    } catch (err) {
      console.error('❌ Photo upload error:', err);
      const errMsg = err.response?.data?.message || err.response?.data || err.message || 'Failed to upload photo';
      setError(typeof errMsg === 'string' ? errMsg : 'Failed to upload photo. Please try again.');
      setUploading(false);
    }
  };

  const resetState = () => {
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setProgress(0);
    setError('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Upload Profile Photo</h2>
            <button onClick={handleClose} disabled={uploading} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            {!imageSrc ? (
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
                  ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
              >
                <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <UploadCloud size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Drag & Drop your photo here</h3>
                <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                <p className="text-xs text-gray-400">Supported: JPG, PNG, WEBP (Max 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative w-full h-64 md:h-80 bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={(area, pixels) => setCroppedAreaPixels(pixels)}
                    onZoomChange={setZoom}
                  />
                </div>
                
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <ZoomOut size={20} className="text-gray-500" />
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <ZoomIn size={20} className="text-gray-500" />
                </div>

                {uploading && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-blue-600">Uploading...</span>
                      <span className="text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
            <button 
              onClick={handleClose} 
              disabled={uploading}
              className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              disabled={!imageSrc || uploading}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
            >
              {uploading ? 'Saving...' : 'Save Photo'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfilePhotoUploadModal;
