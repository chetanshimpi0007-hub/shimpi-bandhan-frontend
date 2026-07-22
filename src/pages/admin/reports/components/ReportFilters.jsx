import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const ReportFilters = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-royal-blue focus:border-royal-blue sm:text-sm"
            onChange={e => onFilterChange('search', e.target.value)} 
          />
        </div>
      </div>
      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select 
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-royal-blue focus:border-royal-blue sm:text-sm"
          onChange={e => onFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>
      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
        <select 
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-royal-blue focus:border-royal-blue sm:text-sm"
          onChange={e => onFilterChange('community', e.target.value)}
        >
          <option value="">All Communities</option>
          <option value="AHER_SHIMPI">Aher Shimpi</option>
          <option value="NAMDEV_SHIMPI">Namdev Shimpi</option>
        </select>
      </div>
      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select 
          className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-royal-blue focus:border-royal-blue sm:text-sm"
          onChange={e => onFilterChange('gender', e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>
    </div>
  );
};
export default ReportFilters;
