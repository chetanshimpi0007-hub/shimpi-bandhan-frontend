const Reports = () => {
  const reports = [
    { id: 1, reporter: 'Rohan Shimpi', reported: 'Sneha Shimpi', reason: 'Fake Profile', status: 'Open' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Report Management</h2>
        <p className="text-sm text-gray-500">Note: Admins cannot read private chat messages. Only metadata and report reason is available.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="p-4 border-b">Reporter</th>
              <th className="p-4 border-b">Reported User</th>
              <th className="p-4 border-b">Reason</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{report.reporter}</td>
                <td className="p-4">{report.reported}</td>
                <td className="p-4 text-red-500">{report.reason}</td>
                <td className="p-4">{report.status}</td>
                <td className="p-4 space-x-2">
                  <button className="bg-royal-blue text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition-colors">Review</button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors">Dismiss</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Reports;
