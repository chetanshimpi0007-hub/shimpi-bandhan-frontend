import { useState, useEffect } from 'react';
import api from '../services/api';

const MelavaManage = () => {
  const [melavas, setMelavas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMelava, setEditingMelava] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    status: 'Upcoming'
  });

  useEffect(() => {
    fetchMelavas();
  }, []);

  const fetchMelavas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/melava');
      setMelavas(response.data);
    } catch (error) {
      console.error('Failed to fetch melavas', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (melava = null) => {
    if (melava) {
      setEditingMelava(melava);
      setFormData({ ...melava });
    } else {
      setEditingMelava(null);
      setFormData({ title: '', date: '', location: '', description: '', status: 'Upcoming' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMelava(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMelava) {
        const response = await api.put(`/admin/melava/${editingMelava.id}`, formData);
        setMelavas(prev => prev.map(m => m.id === editingMelava.id ? response.data : m));
      } else {
        const response = await api.post('/admin/melava', formData);
        setMelavas(prev => [...prev, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save melava', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Melava?')) {
      try {
        await api.delete(`/admin/melava/${id}`);
        setMelavas(prev => prev.filter(m => m.id !== id));
      } catch (error) {
        console.error('Failed to delete melava', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Melava Management</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-royal-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Create New Melava
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading melavas...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-700">ID</th>
                  <th className="p-4 font-semibold text-gray-700">Title</th>
                  <th className="p-4 font-semibold text-gray-700">Date</th>
                  <th className="p-4 font-semibold text-gray-700">Location</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {melavas.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">No melavas found.</td>
                  </tr>
                ) : (
                  melavas.map((melava) => (
                    <tr key={melava.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-gray-600">#{melava.id}</td>
                      <td className="p-4 font-medium text-gray-800">{melava.title}</td>
                      <td className="p-4 text-gray-600">{melava.date}</td>
                      <td className="p-4 text-gray-600">{melava.location}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          melava.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                          melava.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {melava.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenModal(melava)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(melava.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {editingMelava ? 'Edit Melava' : 'Create New Melava'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Pune Grand Melava"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location} 
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Ganesh Kala Krida Manch"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-blue-800 font-medium"
                >
                  {editingMelava ? 'Update Melava' : 'Create Melava'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MelavaManage;
