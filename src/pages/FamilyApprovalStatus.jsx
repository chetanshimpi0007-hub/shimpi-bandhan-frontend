import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaInfoCircle, FaUser } from 'react-icons/fa';

const MemberStatusCard = ({ member, role, status, notes }) => {
  const statusConfig = {
    approved: { icon: FaCheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', text: 'Approved' },
    rejected: { icon: FaTimesCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'Rejected' },
    pending: { icon: FaClock, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', text: 'Pending Review' }
  };
  
  const currentStatus = statusConfig[status];
  const Icon = currentStatus.icon;

  return (
    <div className={`p-5 rounded-2xl border ${currentStatus.border} bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
      <div className={`absolute top-0 right-0 w-16 h-16 ${currentStatus.bg} rounded-bl-full -z-10 transition-transform group-hover:scale-110`}></div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xl overflow-hidden shadow-inner">
            <FaUser />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{member}</h3>
            <p className="text-sm text-gray-500 font-medium">{role}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${currentStatus.bg} ${currentStatus.color} text-sm font-semibold border ${currentStatus.border}`}>
          <Icon />
          <span>{currentStatus.text}</span>
        </div>
      </div>
      {notes && (
        <div className="mt-4 bg-gray-50 p-3 rounded-xl flex items-start gap-2 border border-gray-100">
          <FaInfoCircle className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 italic">"{notes}"</p>
        </div>
      )}
    </div>
  );
};

const FamilyApprovalStatus = () => {
  const [approvals] = useState([
    { id: 1, member: 'Rajesh Shimpi', role: 'Father', status: 'approved', notes: 'Looks like a well-educated family.' },
    { id: 2, member: 'Sunita Shimpi', role: 'Mother', status: 'pending', notes: '' },
    { id: 3, member: 'Amit Shimpi', role: 'Elder Brother', status: 'approved', notes: 'Had a good chat with him. Seems genuine.' },
    { id: 4, member: 'Ramesh Uncle', role: 'Uncle', status: 'rejected', notes: 'Horoscope does not match well.' },
  ]);

  const approvedCount = approvals.filter(a => a.status === 'approved').length;
  const progressPercentage = (approvedCount / approvals.length) * 100;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Overview Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-blue-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-2">Family Approval Workflow</h1>
          <p className="text-blue-100 mb-6 text-lg">Current Match: Rahul Sharma</p>
          
          <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Overall Progress</span>
              <span>{approvedCount} / {approvals.length} Approved</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-[var(--color-secondary)] h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Approvals Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Member Consents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvals.map(approval => (
            <MemberStatusCard key={approval.id} {...approval} />
          ))}
        </div>
      </div>
      
      {/* Action Area */}
      <div className="bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/30 p-6 rounded-2xl text-center shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Need to cast your vote?</h3>
        <p className="text-gray-600 mb-4">Review the profile carefully before submitting your final decision.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-colors flex items-center gap-2">
            <FaCheckCircle /> Approve
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition-colors flex items-center gap-2">
            <FaTimesCircle /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyApprovalStatus;
