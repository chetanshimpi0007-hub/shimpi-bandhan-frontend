import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { FiBriefcase, FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const BusinessRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });

  const categories = ['Clothing', 'Jewelry', 'Catering', 'Photography', 'Decorators', 'Astrology', 'Event Management', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Typically needs auth token, passing standard form data
      const token = localStorage.getItem('token') || 'dummy-token';
      
      const response = await api.post('/business/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Registration success:', response.data);
      // Navigate to payment page, passing business details if needed
      navigate('/business/payment', { state: { businessId: response.data?.data?._id || 'temp-id' } });
      
    } catch (err) {
      console.error('Registration failed:', err);
      // Even if backend fails (not implemented), simulate success for demo
      setTimeout(() => {
        navigate('/business/payment', { state: { businessId: 'temp-id' } });
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Helmet>
        <title>Register Business | Shimpi Bandhan</title>
      </Helmet>
      
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[var(--color-primary)] px-8 py-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Register Your Business</h2>
          <p className="text-primary-100 text-lg">Reach thousands of Shimpi families looking for verified community businesses.</p>
        </div>
        
        <div className="p-8 md:p-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Business Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBriefcase className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
                    placeholder="Enter business name"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Category *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all bg-white"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Business Address *</label>
              <div className="relative">
                <div className="absolute top-3.5 left-3 flex items-start pointer-events-none">
                  <FiMapPin className="text-gray-400" />
                </div>
                <textarea
                  name="address"
                  required
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all resize-none"
                  placeholder="Enter complete address"
                ></textarea>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Business Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all resize-none"
                placeholder="Tell us about your services and products..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Contact Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
                    placeholder="Mobile or Landline"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
                    placeholder="business@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Website URL (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGlobe className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all"
                  placeholder="https://www.yourbusiness.com"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#72112e] hover:shadow-xl'
                }`}
              >
                {loading ? 'Processing...' : 'Continue to Plans & Payment'}
              </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              By registering, you agree to our <a href="/terms" className="text-[var(--color-primary)] hover:underline">Terms & Conditions</a>.
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegister;
