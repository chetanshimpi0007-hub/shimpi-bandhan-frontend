import React from 'react';
import { useExportQueue } from '../../hooks/useExportQueue';
import { toast } from 'react-toastify';
import { FiDownload, FiTrash2, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

const ExportQueue = () => {
  const { jobs, isConnected, deleteJob, refetch } = useExportQueue();

  const handleDownload = (job) => {
    if (job.status !== 'COMPLETED') return;
    
    // In a real app with auth, you might need to fetch the blob via Axios 
    // to pass the JWT, then trigger download using URL.createObjectURL
    // But assuming the endpoint checks cookies or token via query param
    // Or we do it via api.js:
    import('../../services/api').then(({ default: api }) => {
      api.get(`/admin/export/download/${job.jobUuid}`, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', job.fileName || 'export.file');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success('Download started');
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to download file');
        });
    });
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this export job?')) {
      try {
        await deleteJob(uuid);
        toast.success('Job deleted');
      } catch (e) {
        toast.error('Failed to delete job');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'QUEUED': return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">QUEUED</span>;
      case 'PROCESSING': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1"><FiRefreshCw className="animate-spin" /> PROCESSING</span>;
      case 'COMPLETED': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">COMPLETED</span>;
      case 'FAILED': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">FAILED</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '-';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '-';
    return new Date(isoStr).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Export Queue 
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} title={isConnected ? 'WebSocket Connected' : 'Polling (WebSocket Disconnected)'}></span>
          </h2>
          <p className="text-sm text-gray-500">Manage and download your generated reports.</p>
        </div>
        <button onClick={refetch} className="p-2 border rounded hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No export jobs found in the queue.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-sm text-gray-600">
                <th className="p-3">Report Name</th>
                <th className="p-3">Type & Format</th>
                <th className="p-3">Status</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Requested At</th>
                <th className="p-3">Size</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b hover:bg-gray-50 text-sm text-gray-700">
                  <td className="p-3 font-medium">
                    {job.fileName || `${job.reportType}_REPORT`}
                    {job.errorDetails && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1" title={job.errorDetails}>
                        <FiAlertCircle /> Failed: {job.errorDetails.substring(0, 30)}...
                      </p>
                    )}
                  </td>
                  <td className="p-3">
                    {job.reportType} <br/> <span className="text-xs text-gray-500">{job.format}</span>
                  </td>
                  <td className="p-3">{getStatusBadge(job.status)}</td>
                  <td className="p-3">
                    {job.status === 'PROCESSING' ? (
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                        <div className="bg-blue-600 h-2.5 rounded-full w-1/2 animate-pulse"></div>
                      </div>
                    ) : job.status === 'COMPLETED' ? (
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-green-500 h-2.5 rounded-full w-full"></div>
                      </div>
                    ) : (
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-gray-400 h-2.5 rounded-full w-0"></div>
                      </div>
                    )}
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDate(job.requestedAt)}</td>
                  <td className="p-3 whitespace-nowrap">{formatSize(job.fileSizeBytes)}</td>
                  <td className="p-3 text-right space-x-2 whitespace-nowrap">
                    {job.status === 'COMPLETED' && (
                      <button onClick={() => handleDownload(job)} className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100" title="Download">
                        <FiDownload />
                      </button>
                    )}
                    <button onClick={() => handleDelete(job.jobUuid)} className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100" title="Delete">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExportQueue;
