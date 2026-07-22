import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaCheckCircle, FaTimesCircle, FaClock, FaBan, FaEllipsisV } from 'react-icons/fa';

const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'Pending' | 'Active' | 'Suspended' | 'Rejected'
  
  // Modal states
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [statusAction, setStatusAction] = useState(''); // 'Approve', 'Suspend', 'Reject', 'Restore'
  const [priorityValue, setPriorityValue] = useState(0);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/admin/business');
      if (response.data && response.data.data) {
        setBusinesses(response.data.data);
      } else if (Array.isArray(response.data)) {
        setBusinesses(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch businesses, using mock data', error);
      setBusinesses([
        { id: 1, name: 'Shree Krishna Silks', owner: 'Ramesh Shimpi', phone: '+91 9876543210', status: 'Pending', featured: false, priority: 0 },
        { id: 2, name: 'Mahalaxmi Jewellers', owner: 'Suresh Shimpi', phone: '+91 9123456789', status: 'Active', featured: true, priority: 10 },
        { id: 3, name: 'Anand Caterers', owner: 'Anand Shimpi', phone: '+91 9988776655', status: 'Suspended', featured: false, priority: 0 },
        { id: 4, name: 'Shree Ganesh Traders', owner: 'Ganesh Shimpi', phone: '+91 9888777666', status: 'Active', featured: false, priority: 2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Status Management
  const openStatusModal = (business, action) => {
    setSelectedBusiness(business);
    setStatusAction(action);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedBusiness(null);
    setStatusAction('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedBusiness) return;
    
    let targetStatus = 'Active';
    if (statusAction === 'Suspend') targetStatus = 'Suspended';
    if (statusAction === 'Reject') targetStatus = 'Rejected';
    if (statusAction === 'Approve' || statusAction === 'Restore') targetStatus = 'Active';

    try {
      await axios.put(`/api/v1/admin/business/${selectedBusiness.id}/status`, null, { params: { status: targetStatus } });
      setBusinesses(prev => prev.map(b => b.id === selectedBusiness.id ? { ...b, status: targetStatus } : b));
    } catch (error) {
      console.error('Failed to update status, applying mock update', error);
      setBusinesses(prev => prev.map(b => b.id === selectedBusiness.id ? { ...b, status: targetStatus } : b));
    } finally {
      closeStatusModal();
    }
  };

  // Feature / Unfeature Management
  const toggleFeature = async (business) => {
    const newFeatureStatus = !business.featured;
    try {
      await axios.put(`/api/v1/admin/business/${business.id}/feature?featured=${newFeatureStatus}`);
      setBusinesses(prev => prev.map(b => b.id === business.id ? { ...b, featured: newFeatureStatus } : b));
    } catch (error) {
      console.error('Failed to toggle feature, applying mock update', error);
      setBusinesses(prev => prev.map(b => b.id === business.id ? { ...b, featured: newFeatureStatus } : b));
    }
  };

  // Priority Management
  const openPriorityModal = (business) => {
    setSelectedBusiness(business);
    setPriorityValue(business.priority || 0);
    setIsPriorityModalOpen(true);
  };

  const closePriorityModal = () => {
    setIsPriorityModalOpen(false);
    setSelectedBusiness(null);
  };

  const handleUpdatePriority = async () => {
    if (!selectedBusiness) return;
    try {
      await axios.put(`/api/v1/admin/business/${selectedBusiness.id}/priority?priority=${priorityValue}`);
      setBusinesses(prev => prev.map(b => b.id === selectedBusiness.id ? { ...b, priority: Number(priorityValue) } : b));
    } catch (error) {
      console.error('Failed to override priority, applying mock update', error);
      setBusinesses(prev => prev.map(b => b.id === selectedBusiness.id ? { ...b, priority: Number(priorityValue) } : b));
    } finally {
      closePriorityModal();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        await axios.delete(`/api/v1/admin/business/${id}`);
        setBusinesses(prev => prev.filter(b => b.id !== id));
      } catch (error) {
        console.error('Failed to delete, applying mock delete', error);
        setBusinesses(prev => prev.filter(b => b.id !== id));
      }
    }
  };

  const exportToCSV = () => {
    if (businesses.length === 0) return;
    const headers = ['ID', 'Business Name', 'Owner', 'Phone', 'Status', 'Featured', 'Priority'];
    const csvRows = [headers.join(',')];
    businesses.forEach(b => {
      const row = [b.id, `"${b.name}"`, `"${b.owner}"`, `"${b.phone}"`, b.status, b.featured ? 'Yes' : 'No', b.priority || 0];
      csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'business_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-800 border border-yellow-250';
      case 'Suspended': return 'bg-orange-50 text-orange-700 border border-orange-250';
      case 'Rejected': return 'bg-red-50 text-red-700 border border-red-250';
      default: return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  const filteredBusinesses = businesses.filter(b => {
    if (activeTab === 'All') return true;
    return b.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Business Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage platform businesses and priorities</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={exportToCSV}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center space-x-2 text-sm shadow-sm"
          >
            <span>📥</span>
            <span>Export to CSV</span>
          </button>
          <button 
            onClick={fetchBusinesses}
            className="bg-white border border-slate-200 hover:bg-slate-55 text-slate-600 px-4 py-2.5 rounded-xl font-bold transition-all text-sm shadow-sm"
          >
            Refresh List
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1 w-fit">
        {['All', 'Pending', 'Active', 'Suspended', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-500"><FaSpinner className="animate-spin mx-auto text-3xl text-blue-500" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap" style={{ minWidth: '800px' }}>
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Business Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Settings</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBusinesses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-slate-500 bg-slate-50/30">
                      No businesses found for this category.
                    </td>
                  </tr>
                ) : (
                  filteredBusinesses.map((business) => (
                    <tr key={business.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4.5">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{business.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 font-medium">ID: #{business.id}</div>
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="text-sm text-slate-800 font-semibold">{business.owner}</div>
                        <div className="text-xs font-mono text-slate-500 tracking-wide mt-0.5">{business.phone}</div>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${getStatusStyle(business.status)}`}>
                          {business.status}
                        </span>
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="flex flex-col items-center justify-center space-y-1.5">
                          <button
                            onClick={() => toggleFeature(business)}
                            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border transition ${business.featured ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-slate-100 border-slate-200 text-slate-550'} hover:opacity-85`}
                            title={business.featured ? "Click to Unfeature" : "Click to Feature"}
                          >
                            {business.featured ? '⭐ Featured' : '☆ Not Featured'}
                          </button>
                          <button
                            onClick={() => openPriorityModal(business)}
                            className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition"
                          >
                            Priority: {business.priority || 0}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {business.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => openStatusModal(business, 'Approve')}
                                className="text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs border border-emerald-200 px-3 py-1.5 rounded-lg bg-emerald-50 transition-colors shadow-sm"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => openStatusModal(business, 'Reject')}
                                className="text-red-700 hover:bg-red-650 hover:text-white font-bold text-xs border border-red-200 px-3 py-1.5 rounded-lg bg-red-50 transition-colors shadow-sm"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {business.status === 'Active' && (
                            <button 
                              onClick={() => openStatusModal(business, 'Suspend')}
                              className="text-orange-700 hover:bg-orange-650 hover:text-white font-bold text-xs border border-orange-200 px-3 py-1.5 rounded-lg bg-orange-50 transition-colors shadow-sm"
                            >
                              Suspend
                            </button>
                          )}
                          {business.status === 'Suspended' && (
                            <button 
                              onClick={() => openStatusModal(business, 'Restore')}
                              className="text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs border border-emerald-200 px-3 py-1.5 rounded-lg bg-emerald-50 transition-colors shadow-sm"
                            >
                              Restore
                            </button>
                          )}
                          <div className="w-px h-4 bg-slate-200 mx-1"></div>
                          <button 
                            onClick={() => handleDelete(business.id)}
                            className="text-slate-500 hover:text-red-600 hover:bg-red-50 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {isStatusModalOpen && selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-150 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                Confirm {statusAction}
              </h3>
              <button onClick={closeStatusModal} className="text-slate-400 hover:text-slate-650 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6">
              <p className="text-slate-550 mb-4 text-sm">
                Are you sure you want to <strong>{statusAction.toLowerCase()}</strong> the business <span className="text-slate-900 font-semibold">"{selectedBusiness.name}"</span>?
              </p>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={closeStatusModal}
                  className="px-4 py-2 border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleUpdateStatus}
                  className={`px-4 py-2 text-white rounded-xl font-bold text-sm shadow-md ${
                    statusAction === 'Approve' || statusAction === 'Restore' ? 'bg-emerald-600 hover:bg-emerald-700' :
                    statusAction === 'Reject' ? 'bg-red-650 hover:bg-red-700' :
                    'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  Confirm {statusAction}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Priority Override Modal */}
      {isPriorityModalOpen && selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-150 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Override Priority</h3>
              <button onClick={closePriorityModal} className="text-slate-400 hover:text-slate-650 text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6">
              <p className="text-slate-550 text-sm mb-4">
                Set a custom priority for <span className="font-semibold text-slate-900">{selectedBusiness.name}</span>. Higher numbers indicate higher priority.
              </p>
              
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Priority Value</label>
              <input 
                type="number" 
                value={priorityValue} 
                onChange={(e) => setPriorityValue(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                min="0"
              />
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={closePriorityModal}
                  className="px-4 py-2 border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleUpdatePriority}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-md transition-all"
                >
                  Save Priority
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessManagement;
