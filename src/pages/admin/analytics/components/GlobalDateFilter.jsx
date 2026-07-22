import React from 'react';

const GlobalDateFilter = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
      <span className="text-sm font-medium text-gray-600 px-2">Date Range:</span>
      <select
        value={value.filter}
        onChange={e => onChange({ filter: e.target.value })}
        className="border-none text-sm font-semibold text-gray-800 focus:ring-0 cursor-pointer outline-none"
      >
        <option value="Today">Today</option>
        <option value="Yesterday">Yesterday</option>
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days">Last 30 Days</option>
        <option value="This Month">This Month</option>
        <option value="Last Month">Last Month</option>
        <option value="This Year">This Year</option>
      </select>
    </div>
  );
};

export default GlobalDateFilter;
