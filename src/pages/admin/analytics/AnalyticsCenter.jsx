import React, { useState } from 'react';
import GlobalDateFilter from './components/GlobalDateFilter';
import UserAnalytics from './components/UserAnalytics';
import RevenueAnalytics from './components/RevenueAnalytics';
import MembershipAnalytics from './components/MembershipAnalytics';
import BusinessAnalytics from './components/BusinessAnalytics';
import MatrimonialAnalytics from './components/MatrimonialAnalytics';
import CrmAnalytics from './components/CrmAnalytics';
import ChatAnalytics from './components/ChatAnalytics';
import NotificationAnalytics from './components/NotificationAnalytics';
import SystemAnalytics from './components/SystemAnalytics';

const tabs = [
  'User', 'Membership', 'Revenue', 'Business',
  'Matrimonial', 'CRM', 'Chat', 'Notification', 'System'
];

const AnalyticsCenter = () => {
  const [activeTab, setActiveTab] = useState('User');
  const [dateRange, setDateRange] = useState({ filter: 'Last 30 Days' });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Enterprise Analytics Center</h2>
          <p className="text-slate-400 text-sm mt-1">Platform-wide data insights and trends</p>
        </div>
        <GlobalDateFilter value={dateRange} onChange={setDateRange} />
      </div>

      <div className="flex overflow-x-auto whitespace-nowrap border-b border-slate-800/60 gap-1">
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
            {tab} Analytics
          </button>
        ))}
      </div>

      <div className="mt-2">
        {activeTab === 'User'         && <UserAnalytics dateRange={dateRange} />}
        {activeTab === 'Membership'   && <MembershipAnalytics dateRange={dateRange} />}
        {activeTab === 'Revenue'      && <RevenueAnalytics dateRange={dateRange} />}
        {activeTab === 'Business'     && <BusinessAnalytics dateRange={dateRange} />}
        {activeTab === 'Matrimonial'  && <MatrimonialAnalytics dateRange={dateRange} />}
        {activeTab === 'CRM'          && <CrmAnalytics dateRange={dateRange} />}
        {activeTab === 'Chat'         && <ChatAnalytics dateRange={dateRange} />}
        {activeTab === 'Notification' && <NotificationAnalytics dateRange={dateRange} />}
        {activeTab === 'System'       && <SystemAnalytics dateRange={dateRange} />}
      </div>
    </div>
  );
};

export default AnalyticsCenter;
