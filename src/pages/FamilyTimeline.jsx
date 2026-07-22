import React from 'react';
import { FaCheckCircle, FaClock, FaCalendarAlt, FaUserCheck, FaComments } from 'react-icons/fa';

const TimelineItem = ({ isLast, title, description, date, status, icon: Icon }) => (
  <div className="relative flex gap-6 pb-8 group">
    {!isLast && <div className="absolute top-8 bottom-0 left-6 w-0.5 bg-gray-200 group-hover:bg-[var(--color-primary)] transition-colors duration-500"></div>}
    
    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-transform transform group-hover:scale-110 ${status === 'completed' ? 'bg-green-500 text-white' : status === 'current' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-500'}`}>
      <Icon className="text-xl" />
    </div>
    
    <div className="flex-1 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
        <h3 className={`text-lg font-bold ${status === 'completed' ? 'text-gray-900' : status === 'current' ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>
          {title}
        </h3>
        <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full w-fit">{date}</span>
      </div>
      <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 mt-2">{description}</p>
    </div>
  </div>
);

const FamilyTimeline = () => {
  const timelineData = [
    { id: 1, title: 'Profile Shortlisted', description: 'Rahul\'s profile was shortlisted by Uncle Rajesh.', date: 'Oct 15, 2023', status: 'completed', icon: FaUserCheck },
    { id: 2, title: 'Initial Chat Initiated', description: 'Family members started a discussion in the Family Room.', date: 'Oct 16, 2023', status: 'completed', icon: FaComments },
    { id: 3, title: 'Video Meeting Scheduled', description: 'A video call is arranged with Rahul\'s family.', date: 'Oct 20, 2023', status: 'current', icon: FaCalendarAlt },
    { id: 4, title: 'In-person Meeting', description: 'Pending video call outcome.', date: 'TBD', status: 'pending', icon: FaClock },
    { id: 5, title: 'Final Family Approval', description: 'All family members need to provide their final consent.', date: 'TBD', status: 'pending', icon: FaCheckCircle },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Match Progression Timeline</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Track the complete journey and important milestones with this prospective match.</p>
        </div>
        
        <div className="pl-4">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              isLast={index === timelineData.length - 1}
              title={item.title}
              description={item.description}
              date={item.date}
              status={item.status}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyTimeline;
