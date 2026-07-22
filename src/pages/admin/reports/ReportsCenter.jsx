import React, { useState, useEffect } from 'react';
import ReportFilters from './components/ReportFilters';
import ReportDataTable from './components/ReportDataTable';
import ExportQueue from './components/ExportQueue';
import { reportService } from '../services/reportService';
import { toast } from 'react-toastify';
import { useExportQueue } from '../hooks/useExportQueue';

const SummaryCards = ({ summary }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-[#111827] p-4 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-blue-500">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Users</h3>
      <p className="text-2xl font-bold text-slate-100 mt-2">{summary?.totalUsers || 0}</p>
    </div>
    <div className="bg-[#111827] p-4 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-yellow-500">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Premium Members</h3>
      <p className="text-2xl font-bold text-yellow-400 mt-2">{summary?.totalPremium || 0}</p>
    </div>
    <div className="bg-[#111827] p-4 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-emerald-500">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
      <p className="text-2xl font-bold text-emerald-400 mt-2">₹{summary?.totalRevenue || 0}</p>
    </div>
    <div className="bg-[#111827] p-4 rounded-2xl shadow-sm border border-slate-800 border-l-4 border-l-purple-500">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Businesses</h3>
      <p className="text-2xl font-bold text-slate-100 mt-2">{summary?.totalBusinesses || 0}</p>
    </div>
  </div>
);

const ReportsCenter = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [summary, setSummary] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [filters, setFilters] = useState({ page: 0, size: 20 });
  const { queueExport } = useExportQueue();

  const tabs = [
    'Users', 'Payments', 'Businesses', 'Audit Logs', 'Export Queue'
  ];

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    if (activeTab !== 'Export Queue') {
      fetchTableData(0);
    }
  }, [activeTab, filters.search, filters.status, filters.community, filters.gender]);

  const fetchSummary = async () => {
    try {
      const res = await reportService.getDashboardSummary();
      setSummary(res.data);
    } catch (e) {
      console.error("Failed to load summary", e);
    }
  };

  const fetchTableData = async (page = 0) => {
    setLoading(true);
    try {
      const params = { ...filters, page };
      let res;
      if (activeTab === 'Users') {
        res = await reportService.getUsers(params);
      } else if (activeTab === 'Payments') {
        res = await reportService.getPayments(params);
      } else if (activeTab === 'Businesses') {
        res = await reportService.getBusinesses(params);
      } else if (activeTab === 'Audit Logs') {
        res = await reportService.getAuditLogs(params);
      }
      
      if (res) {
        setTableData(res.data.content);
        setPagination(res.data);
      }
    } catch (e) {
      toast.error('Failed to load table data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val, page: 0 }));
  };

  const triggerExport = async (format) => {
    try {
      let reportType = 'USERS';
      if (activeTab === 'Payments') reportType = 'PAYMENTS';
      if (activeTab === 'Businesses') reportType = 'BUSINESSES';
      if (activeTab === 'Audit Logs') reportType = 'AUDIT_LOGS';
      
      const payload = {
        reportType,
        format: format.toUpperCase(),
        filters: {} // Convert current filters to string map if needed
      };
      
      await queueExport(payload);
      toast.success(`${format} export queued successfully! See Export Queue tab.`);
    } catch (e) {
      toast.error('Failed to queue export');
    }
  };

  // Define columns dynamically based on tab
  const getColumns = () => {
    if (activeTab === 'Users') {
      return [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'fullName' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Community', accessor: 'community' },
        { header: 'Status', render: row => <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{row.status}</span> },
      ];
    }
    if (activeTab === 'Payments') {
      return [
        { header: 'ID', accessor: 'id' },
        { header: 'User Phone', render: row => row.user?.phone },
        { header: 'Amount', render: row => `₹${row.finalAmountPaid}` },
        { header: 'Status', render: row => <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{row.status}</span> },
      ];
    }
    return [{ header: 'Data', render: row => JSON.stringify(row).substring(0, 50) + '...' }];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Enterprise Reports</h2>
          <p className="text-slate-400 text-sm mt-1">Analytics, exports, and audit logs</p>
        </div>
        {activeTab !== 'Export Queue' && (
          <div className="flex space-x-2">
            <button onClick={() => triggerExport('EXCEL')} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">Export Excel</button>
            <button onClick={() => triggerExport('CSV')} className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">Export CSV</button>
          </div>
        )}
      </div>

      <SummaryCards summary={summary} />

      {/* Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap border-b border-slate-800/60 mb-6 gap-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 font-bold text-sm transition-colors rounded-t-xl ${
              activeTab === tab 
                ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900/40' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Export Queue' ? (
        <ExportQueue />
      ) : (
        <>
          <ReportFilters onFilterChange={handleFilterChange} />
          <ReportDataTable 
            columns={getColumns()} 
            data={tableData} 
            pagination={pagination} 
            loading={loading}
            onPageChange={fetchTableData} 
          />
        </>
      )}
    </div>
  );
};

export default ReportsCenter;
