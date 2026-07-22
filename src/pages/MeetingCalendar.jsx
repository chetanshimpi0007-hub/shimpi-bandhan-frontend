import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { FaCalendarAlt, FaPlus, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';

const MeetingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Initial Video Call with Sharma Family',
      date: new Date(),
      type: 'video',
      time: '18:00',
    },
    {
      id: 2,
      title: 'In-person Meeting at Cafe',
      date: addDays(new Date(), 2),
      type: 'in-person',
      time: '11:00',
    }
  ]);
  const [showModal, setShowModal] = useState(false);

  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start, end });

  const getMeetingsForDay = (day) => meetings.filter(m => isSameDay(m.date, day));

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[var(--color-primary)] rounded-xl">
            <FaCalendarAlt className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meeting Calendar</h1>
            <p className="text-gray-500 text-sm">Schedule and manage family meetings</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-800 transition-colors shadow-md flex items-center gap-2">
          <FaPlus /> Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{format(currentDate, 'MMMM yyyy')}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-2 hover:bg-gray-100 rounded-full">Prev</button>
              <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-2 hover:bg-gray-100 rounded-full">Next</button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-xl overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
            
            {days.map((day, idx) => (
              <div key={idx} className={`bg-white min-h-[120px] p-2 transition-colors hover:bg-gray-50 cursor-pointer ${isSameDay(day, new Date()) ? 'ring-2 ring-[var(--color-primary)] ring-inset' : ''}`}>
                <div className={`text-right text-sm font-medium ${isSameDay(day, new Date()) ? 'text-[var(--color-primary)]' : 'text-gray-700'}`}>
                  {format(day, 'd')}
                </div>
                <div className="mt-2 space-y-1">
                  {getMeetingsForDay(day).map(m => (
                    <div key={m.id} className="text-xs p-1.5 rounded-lg bg-[var(--color-secondary)]/20 text-[var(--color-primary)] font-medium truncate flex items-center gap-1 border border-[var(--color-secondary)]/50">
                      {m.type === 'video' ? <FaVideo /> : <FaMapMarkerAlt />} {m.time}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Meetings</h3>
          <div className="space-y-4">
            {meetings.map(m => (
              <div key={m.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="bg-gray-50 px-3 py-2 rounded-lg text-center min-w-[60px] flex flex-col justify-center">
                  <span className="text-sm font-bold text-[var(--color-primary)]">{format(m.date, 'MMM')}</span>
                  <span className="text-xl font-bold text-gray-900">{format(m.date, 'd')}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 line-clamp-1">{m.title}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    {m.type === 'video' ? <FaVideo className="text-blue-500"/> : <FaMapMarkerAlt className="text-green-500"/>} {m.time}
                  </p>
                </div>
              </div>
            ))}
            {meetings.length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming meetings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCalendar;
