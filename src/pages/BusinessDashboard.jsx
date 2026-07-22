import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiTrendingUp, FiEye, FiUsers, FiAward, FiPlus, FiEdit2, FiTrash2, FiPauseCircle, FiPlayCircle, FiUploadCloud, FiList, FiCheckCircle, FiCalendar, FiClock, FiMessageSquare, FiX, FiFilter, FiSearch, FiLayout } from 'react-icons/fi';


const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [offers, setOffers] = useState([
    { id: 1, title: '20% Off Wedding Collection', status: 'Active', validUntil: '2026-12-31' },
    { id: 2, title: 'Free Alteration', status: 'Paused', validUntil: '2026-10-15' }
  ]);
  const [galleryImages, setGalleryImages] = useState([
    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=400&q=80'
  ]);
  const [isDragging, setIsDragging] = useState(false);
  
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: 'Rahul Sharma', mobile: '9876543210', city: 'Pune', date: '2026-07-08', status: 'New', priority: 'High', notes: 'Wants an early response', meeting: null, followUps: [{ task: 'Call to confirm requirements', done: false }] },
    { id: 2, name: 'Priya Patel', mobile: '9123456780', city: 'Mumbai', date: '2026-07-07', status: 'In Progress', priority: 'Medium', notes: 'Interested in premium wedding package', meeting: { date: '2026-07-10', time: '14:00', status: 'Scheduled' }, followUps: [{ task: 'Send brochure', done: true }] },
    { id: 3, name: 'Amit Kumar', mobile: '9988776655', city: 'Nashik', date: '2026-07-05', status: 'Completed', priority: 'Low', notes: '', meeting: { date: '2026-07-06', time: '11:00', status: 'Completed' }, followUps: [] }
  ]);
  const [enquiryView, setEnquiryView] = useState('kanban'); // 'table' or 'kanban'
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [meetingForm, setMeetingForm] = useState({ date: '', time: '', status: 'Scheduled' });
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState('All');

  const onDragStartKanban = (e, id) => {
    e.dataTransfer.setData('enqId', id);
  };
  const onDragOverKanban = (e) => {
    e.preventDefault();
  };
  const onDropKanban = (e, newStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('enqId');
    if(id) {
      setEnquiries(enquiries.map(eq => eq.id.toString() === id ? { ...eq, status: newStatus } : eq));
    }
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    setEnquiries(enquiries.map(eq => eq.id === selectedEnquiry.id ? { ...eq, meeting: meetingForm } : eq));
    setShowMeetingModal(false);
  };

  const toggleOfferStatus = (id) => {
    setOffers(offers.map(o => o.id === id ? { ...o, status: o.status === 'Active' ? 'Paused' : 'Active' } : o));
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      // Dummy logic to add a new image
      setGalleryImages([...galleryImages, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80']);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Business Dashboard | Shimpi Bandhan</title>
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-500">Manage your directory listing, offers, and gallery.</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
          <FiAward className="text-yellow-600 w-6 h-6" />
          <div>
            <p className="text-xs text-yellow-800 font-semibold uppercase tracking-wider">Current Plan</p>
            <p className="text-lg font-bold text-yellow-900 leading-none">Gold Member</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8 flex gap-6 overflow-x-auto">
        {['overview', 'enquiries', 'offers', 'gallery', 'payments'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-sm font-bold capitalize whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-blue-600"><FiTrendingUp className="w-6 h-6" /></div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Performance Score</p>
                  <p className="text-2xl font-bold text-gray-900">92/100</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-green-600"><FiEye className="w-6 h-6" /></div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Profile Views (30d)</p>
                  <p className="text-2xl font-bold text-gray-900">1,245</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-purple-50 p-4 rounded-xl text-purple-600"><FiUsers className="w-6 h-6" /></div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Leads (30d)</p>
                  <p className="text-2xl font-bold text-gray-900">84</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium mb-2">Profile Completion</p>
                <div className="flex items-end gap-2 mb-2">
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Views & Leads (Mock Chart)</h3>
              <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                <span className="text-gray-400">Chart rendering area</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Enquiries</p>
                  <p className="text-2xl font-black text-gray-900">{enquiries.length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><FiUsers size={20} /></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Active</p>
                  <p className="text-2xl font-black text-gray-900">{enquiries.filter(e => e.status !== 'Completed').length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center"><FiClock size={20} /></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Conversion %</p>
                  <p className="text-2xl font-black text-gray-900">{enquiries.length ? Math.round((enquiries.filter(e => e.status === 'Completed').length / enquiries.length) * 100) : 0}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center"><FiTrendingUp size={20} /></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Avg Response</p>
                  <p className="text-2xl font-black text-gray-900">2.5h</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><FiMessageSquare size={20} /></div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <button onClick={() => setEnquiryView('kanban')} className={`p-2 rounded-lg flex items-center gap-2 ${enquiryView === 'kanban' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><FiLayout /> Kanban</button>
                <button onClick={() => setEnquiryView('table')} className={`p-2 rounded-lg flex items-center gap-2 ${enquiryView === 'table' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><FiList /> Table</button>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search name, phone..." value={enquirySearch} onChange={e => setEnquirySearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
                </div>
                <select value={enquiryFilter} onChange={e => setEnquiryFilter(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none bg-white">
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {enquiryView === 'kanban' ? (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {['New', 'In Progress', 'Completed'].map(status => (
                  <div key={status} onDragOver={onDragOverKanban} onDrop={(e) => onDropKanban(e, status)} className="min-w-[300px] flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                      {status} <span className="bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs">{enquiries.filter(e => e.status === status).length}</span>
                    </h4>
                    <div className="space-y-4">
                      {enquiries.filter(e => e.status === status && (enquiryFilter === 'All' || e.priority === enquiryFilter) && (e.name.toLowerCase().includes(enquirySearch.toLowerCase()) || e.mobile.includes(enquirySearch))).map(enq => (
                        <div key={enq.id} draggable onDragStart={(e) => onDragStartKanban(e, enq.id)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-gray-900">{enq.name}</h5>
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${enq.priority === 'High' ? 'bg-red-100 text-red-700' : enq.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>{enq.priority}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1"><FiClock size={12} /> {enq.date}</p>
                          <p className="text-sm text-gray-600 mb-3">{enq.mobile}</p>
                          {enq.notes && <p className="text-xs text-gray-500 bg-yellow-50 p-2 rounded mb-3 italic">"{enq.notes}"</p>}
                          {enq.followUps && enq.followUps.length > 0 && (
                            <div className="mb-3">
                              {enq.followUps.map((fu, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                  <input type="checkbox" defaultChecked={fu.done} className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                                  <span className={fu.done ? 'line-through text-gray-400' : ''}>{fu.task}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {enq.meeting ? (
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-xs flex justify-between items-center">
                              <div><span className="font-semibold text-blue-800">Meeting:</span> {enq.meeting.date} {enq.meeting.time} <span className="text-[10px] bg-white px-1 rounded ml-1 border">{enq.meeting.status}</span></div>
                            </div>
                          ) : (
                            <button onClick={() => { setSelectedEnquiry(enq); setMeetingForm({ date: '', time: '', status: 'Scheduled' }); setShowMeetingModal(true); }} className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                              <FiCalendar /> Schedule Meeting
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-sm">
                        <th className="p-4 font-bold text-gray-600">Client</th>
                        <th className="p-4 font-bold text-gray-600">Contact</th>
                        <th className="p-4 font-bold text-gray-600">Status</th>
                        <th className="p-4 font-bold text-gray-600">Meeting</th>
                        <th className="p-4 font-bold text-gray-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {enquiries.filter(e => (enquiryFilter === 'All' || e.priority === enquiryFilter) && (e.name.toLowerCase().includes(enquirySearch.toLowerCase()) || e.mobile.includes(enquirySearch))).map(enq => (
                        <tr key={enq.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="p-4">
                            <p className="font-bold text-gray-900">{enq.name}</p>
                            <p className="text-xs text-gray-500">{enq.date} • <span className={`font-semibold ${enq.priority === 'High' ? 'text-red-600' : 'text-gray-500'}`}>{enq.priority}</span></p>
                          </td>
                          <td className="p-4">
                            <p>{enq.mobile}</p>
                            <p className="text-xs text-gray-500">{enq.city}</p>
                          </td>
                          <td className="p-4">
                            <select value={enq.status} onChange={(e) => setEnquiries(enquiries.map(eq => eq.id === enq.id ? { ...eq, status: e.target.value } : eq))} className="border border-gray-300 rounded px-2 py-1 text-xs">
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="p-4">
                            {enq.meeting ? (
                              <div className="text-xs">
                                <p className="font-semibold">{enq.meeting.date} {enq.meeting.time}</p>
                                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">{enq.meeting.status}</span>
                              </div>
                            ) : (
                              <button onClick={() => { setSelectedEnquiry(enq); setMeetingForm({ date: '', time: '', status: 'Scheduled' }); setShowMeetingModal(true); }} className="text-xs font-bold text-[var(--color-primary)] hover:underline">Schedule</button>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            {enq.meeting && <button onClick={() => { setSelectedEnquiry(enq); setMeetingForm(enq.meeting); setShowMeetingModal(true); }} className="text-blue-500 hover:underline text-xs mr-2">Edit Meeting</button>}
                            <button className="text-gray-400 hover:text-[var(--color-primary)]" title="Add Note"><FiEdit2 /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'offers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Offers</h2>
              <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#72112e] transition-colors">
                <FiPlus /> Create New Offer
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-sm font-bold text-gray-600">Offer Title</th>
                    <th className="p-4 text-sm font-bold text-gray-600">Valid Until</th>
                    <th className="p-4 text-sm font-bold text-gray-600">Status</th>
                    <th className="p-4 text-sm font-bold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map(offer => (
                    <tr key={offer.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-900">{offer.title}</td>
                      <td className="p-4 text-gray-600">{offer.validUntil}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {offer.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-3 text-gray-400">
                        <button onClick={() => toggleOfferStatus(offer.id)} className="hover:text-[var(--color-primary)] transition-colors" title={offer.status === 'Active' ? 'Pause' : 'Activate'}>
                          {offer.status === 'Active' ? <FiPauseCircle size={18} /> : <FiPlayCircle size={18} />}
                        </button>
                        <button className="hover:text-blue-500 transition-colors" title="Edit"><FiEdit2 size={18} /></button>
                        <button onClick={() => deleteOffer(offer.id)} className="hover:text-red-500 transition-colors" title="Delete"><FiTrash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                  {offers.length === 0 && (
                    <tr><td colSpan="4" className="p-8 text-center text-gray-500">No offers found. Create one!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Business Gallery</h2>
              <span className="text-sm text-gray-500">{galleryImages.length} / 10 Images Used</span>
            </div>
            
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors mb-8 ${isDragging ? 'border-[var(--color-primary)] bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
            >
              <FiUploadCloud className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-1">Drag and drop your images here</p>
              <p className="text-sm text-gray-400 mb-4">Supported formats: JPG, PNG. Max size: 5MB</p>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
                Browse Files
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-200 aspect-square">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment History</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-sm font-bold text-gray-600">Date</th>
                    <th className="p-4 text-sm font-bold text-gray-600">Description</th>
                    <th className="p-4 text-sm font-bold text-gray-600">Amount</th>
                    <th className="p-4 text-sm font-bold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="p-4 text-gray-600">10 Aug 2026</td>
                    <td className="p-4 font-medium text-gray-900">Gold Plan Subscription</td>
                    <td className="p-4 text-gray-600">₹3,499</td>
                    <td className="p-4"><span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Paid</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><FiCalendar /> Schedule Meeting</h3>
              <button onClick={() => setShowMeetingModal(false)} className="text-gray-500 hover:text-gray-900"><FiX size={20} /></button>
            </div>
            <div className="p-6">
              <form onSubmit={handleScheduleMeeting} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input required type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={meetingForm.date} onChange={e => setMeetingForm({...meetingForm, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input required type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={meetingForm.time} onChange={e => setMeetingForm({...meetingForm, time: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={meetingForm.status} onChange={e => setMeetingForm({...meetingForm, status: e.target.value})}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full bg-[var(--color-primary)] text-white font-bold py-2 rounded-lg">Save Meeting</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BusinessDashboard;
