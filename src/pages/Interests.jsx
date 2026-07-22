import { useState, useEffect } from 'react';
import { FaHeart, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import api from '../services/api';

const Interests = () => {
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'sent'
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterests = async (type) => {
    setLoading(true);
    try {
      const res = await api.get(`/interests/${type}`);
      setInterests(res.data);
    } catch (error) {
      console.error("Failed to fetch interests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests(activeTab);
  }, [activeTab]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/interests/${id}/status?status=${status}`);
      // Refresh list
      fetchInterests(activeTab);
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interests</h1>
          <p className="text-gray-500 text-sm">Manage your connection requests</p>
        </div>
        
        <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-100 flex self-start">
          <button 
            onClick={() => setActiveTab('received')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'received' ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Received
          </button>
          <button 
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'sent' ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Sent
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-3xl text-[var(--color-primary)]" />
          </div>
        ) : interests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FaHeart className="text-gray-300 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No Interests Found</h3>
            <p className="text-gray-500 text-sm mt-1">You have no {activeTab} interests at the moment.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {interests.map((interest) => (
              <li key={interest.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img src="https://via.placeholder.com/100" alt="Profile" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {activeTab === 'received' ? `Profile ID: ${interest.sender.id}` : `Profile ID: ${interest.receiver.id}`}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Sent on {new Date(interest.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-1">
                    <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full 
                      ${interest.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                        interest.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 
                        interest.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {interest.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  {activeTab === 'received' && interest.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(interest.id, 'ACCEPTED')}
                        className="flex-1 sm:flex-none bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <FaCheck /> Accept
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(interest.id, 'REJECTED')}
                        className="flex-1 sm:flex-none bg-red-50 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}

                  {activeTab === 'sent' && interest.status === 'PENDING' && (
                    <button 
                      onClick={() => handleUpdateStatus(interest.id, 'CANCELLED')}
                      className="w-full sm:w-auto bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      Cancel Request
                    </button>
                  )}
                  
                  {interest.status === 'ACCEPTED' && (
                    <button className="w-full sm:w-auto bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors shadow-sm">
                      Chat Now
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Interests;
