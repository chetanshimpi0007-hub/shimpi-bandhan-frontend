import { useState, useEffect } from 'react';
import api from '../services/api';

const RegistrationManage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  
  // Melava filter
  const [melavas] = useState([
    { id: 1, title: 'Pune Grand Shimpi Melava' },
    { id: 2, title: 'Mumbai Mega Melava' }
  ]);
  const [selectedMelava, setSelectedMelava] = useState(1);

  useEffect(() => {
    fetchRegistrations();
  }, [selectedMelava]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/melava/${selectedMelava}/registrations`);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Failed to fetch registrations', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (id) => {
    try {
      await api.post(`/admin/melava/registrations/${id}/checkin`);
      setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, checkedIn: true } : reg));
    } catch (error) {
      console.error('Failed to check-in', error);
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    reg.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registration & Check-in</h2>
          <p className="text-gray-500 text-sm mt-1">Manage attendees and scan QR codes</p>
        </div>
        
        <div className="flex space-x-3 w-full md:w-auto">
          <button 
            onClick={() => setIsScanning(!isScanning)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isScanning ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
          >
            <span>📷</span>
            <span>{isScanning ? 'Close Scanner' : 'Scan QR Code'}</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <span>📥</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {isScanning && (
        <div className="mb-6 bg-gray-900 rounded-xl p-6 flex flex-col items-center justify-center text-white border-4 border-gray-800">
          <div className="w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e] animate-scan"></div>
            <span className="relative z-10 text-gray-300">Camera Viewport</span>
          </div>
          <p className="text-gray-400">Point camera at attendee's QR code ticket</p>
          
          <div className="mt-4 flex space-x-2">
            <input 
              type="text" 
              placeholder="Or enter Registration ID manually" 
              className="px-4 py-2 rounded-lg text-gray-900 w-64 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-lg font-medium">Verify</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <label className="text-sm font-medium text-gray-700">Select Melava:</label>
            <select 
              value={selectedMelava}
              onChange={(e) => setSelectedMelava(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {melavas.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
          
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <span className="absolute left-3 top-1.5 text-gray-400">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading registrations...</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-700">Reg ID</th>
                  <th className="p-4 font-semibold text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-gray-700">Age / Gender</th>
                  <th className="p-4 font-semibold text-gray-700">City</th>
                  <th className="p-4 font-semibold text-gray-700">Payment</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">No registrations found.</td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-600">{reg.id}</td>
                      <td className="p-4 font-medium text-gray-900">{reg.name}</td>
                      <td className="p-4 text-gray-600">{reg.age} • {reg.gender}</td>
                      <td className="p-4 text-gray-600">{reg.city}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          reg.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reg.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {reg.checkedIn ? (
                          <span className="flex items-center text-green-600 text-sm font-medium">
                            <span className="mr-1">✅</span> Checked-in
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">Not arrived</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {!reg.checkedIn && (
                          <button 
                            onClick={() => handleCheckIn(reg.id)}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Mark Check-in
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationManage;
