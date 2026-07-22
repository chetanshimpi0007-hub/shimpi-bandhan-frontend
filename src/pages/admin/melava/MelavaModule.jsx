import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import MelavaDashboard from './MelavaDashboard';
import MelavaManage from './MelavaManage';
import RegistrationManage from './RegistrationManage';

const MelavaModule = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/melava/dashboard' },
    { name: 'Melava Management', path: '/melava/manage' },
    { name: 'Registration & Check-in', path: '/melava/registrations' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === tab.path
                  ? 'bg-royal-blue text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[500px]">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MelavaDashboard />} />
          <Route path="manage" element={<MelavaManage />} />
          <Route path="registrations" element={<RegistrationManage />} />
        </Routes>
      </div>
    </div>
  );
};

export default MelavaModule;
