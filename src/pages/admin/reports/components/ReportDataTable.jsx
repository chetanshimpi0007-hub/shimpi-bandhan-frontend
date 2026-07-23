import React from 'react';

const ReportDataTable = ({ columns, data, pagination, onPageChange, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500 animate-pulse">
        Loading data...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-500">
        No records found matching your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <div className="w-full overflow-x-auto">
<table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-sm font-semibold text-gray-700">
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 whitespace-nowrap">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b hover:bg-gray-50 transition-colors text-sm text-gray-700">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="p-4 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="p-4 border-t flex justify-between items-center bg-gray-50 text-sm">
          <div className="text-gray-600">
            Showing page {pagination.number + 1} of {pagination.totalPages} ({pagination.totalElements} total records)
          </div>
          <div className="flex space-x-2">
            <button 
              disabled={pagination.first} 
              onClick={() => onPageChange(pagination.number - 1)}
              className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-100"
            >
              Prev
            </button>
            <button 
              disabled={pagination.last} 
              onClick={() => onPageChange(pagination.number + 1)}
              className="px-3 py-1 border rounded bg-white disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReportDataTable;
