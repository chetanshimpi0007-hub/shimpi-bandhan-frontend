import React, { useState } from 'react';

const EnquiryAnalytics = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const exportToCSV = () => {
    alert('Exporting to CSV...');
  };
  
  const exportToExcel = () => {
    alert('Exporting to Excel...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Enquiry Analytics</h2>
          <p className="text-gray-500">Business lead generation performance and conversion metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button onClick={exportToCSV} className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Export CSV
          </button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm">
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Enquiries</p>
          <p className="text-3xl font-black text-gray-900 mt-2">1,248</p>
          <p className="text-xs text-green-500 mt-2 font-bold">+12% vs last period</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Conversion Rate</p>
          <p className="text-3xl font-black text-gray-900 mt-2">24.5%</p>
          <p className="text-xs text-green-500 mt-2 font-bold">+2.1% vs last period</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Avg Response Time</p>
          <p className="text-3xl font-black text-gray-900 mt-2">3.2h</p>
          <p className="text-xs text-red-500 mt-2 font-bold">+0.5h vs last period</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Meetings Scheduled</p>
          <p className="text-3xl font-black text-gray-900 mt-2">412</p>
          <p className="text-xs text-green-500 mt-2 font-bold">+8% vs last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Category Performance (Mock Chart)</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
            <div className="text-center text-gray-400">
              <span className="text-4xl">📊</span>
              <p className="mt-2 text-sm font-medium">Bar Chart Rendering Area</p>
              <p className="text-xs mt-1">Clothing vs Planners vs Caterers</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">City Performance (Mock Chart)</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
            <div className="text-center text-gray-400">
              <span className="text-4xl">📈</span>
              <p className="mt-2 text-sm font-medium">Line Chart Rendering Area</p>
              <p className="text-xs mt-1">Pune vs Mumbai vs Nashik vs Jalgaon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryAnalytics;
