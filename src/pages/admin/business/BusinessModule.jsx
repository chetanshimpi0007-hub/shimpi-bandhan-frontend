import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import BusinessDashboard from './BusinessDashboard';
import BusinessManagement from './BusinessManagement';
import { FaBuilding } from 'react-icons/fa';

const BusinessModule = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/business/dashboard' },
    { name: 'Approvals & Management', path: '/business/manage' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <FaBuilding className="text-teal-400" />
            </div>
            Business Directory
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage platform businesses and promotional packages</p>
        </div>
      </div>

      <div className="bg-[#111827] p-2 rounded-2xl shadow-lg border border-slate-800 inline-block">
        <nav className="flex space-x-2">
          {tabs.map((tab) => {
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-slate-800 text-teal-400 shadow-md border border-slate-700'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="min-h-[500px]">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<BusinessDashboard />} />
          <Route path="manage" element={<BusinessManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default BusinessModule;
