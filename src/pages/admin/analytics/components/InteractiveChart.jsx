import React, { useRef, useState } from 'react';
import { 
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { FiDownload, FiMaximize2, FiMinimize2, FiFileText } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const InteractiveChart = ({ title, data, loading, error, empty, renderChart, type = 'line', onDrillDown }) => {
  const chartRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  const handleExportPNG = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      canvas.toBlob(blob => saveAs(blob, `${title}.png`));
    }
  };

  const handleExportPDF = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
      pdf.save(`${title}.pdf`);
    }
  };

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${title}.csv`);
  };

  const handleExportExcel = () => {
    if (!data || data.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${title}.xlsx`);
  };

  if (loading) return <div className="h-64 bg-gray-100 rounded animate-pulse w-full"></div>;
  if (error) return <div className="h-64 flex items-center justify-center text-red-500 bg-red-50">Failed to load chart data</div>;
  if (empty || !data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50">No data available for this range</div>;

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 flex flex-col ${fullscreen ? 'fixed inset-0 z-50 m-4' : 'h-[400px]'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2 text-gray-500">
          <button onClick={handleExportPNG} title="Export PNG" className="hover:text-royal-blue p-1"><FiDownload /></button>
          <button onClick={handleExportPDF} title="Export PDF" className="hover:text-red-500 p-1"><span className="text-xs font-bold font-sans tracking-tighter">PDF</span></button>
          <button onClick={handleExportCSV} title="Export CSV" className="hover:text-green-500 p-1"><FiFileText /></button>
          <button onClick={() => setFullscreen(!fullscreen)} title="Toggle Fullscreen" className="hover:text-gray-800 p-1">
            {fullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full relative" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart({ data, onDrillDown })}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InteractiveChart;
