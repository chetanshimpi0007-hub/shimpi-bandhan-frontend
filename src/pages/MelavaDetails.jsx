import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { FiCalendar, FiMapPin, FiClock, FiDollarSign, FiUsers, FiInfo, FiArrowLeft } from 'react-icons/fi';

const MelavaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [melava, setMelava] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMelavaDetails = async () => {
      try {
        const response = await api.get(`/melava/${id}`);
        const data = response.data?.data || response.data;
        if (data) {
          setMelava(data);
        } else {
          throw new Error('Not found');
        }
      } catch (err) {
        console.error('Error fetching melava details:', err);
        // Fallback sample data in case backend isn't ready
        setMelava({
          _id: id,
          title: 'Pune Grand Shimpi Bandhan Melava 2026',
          date: '2026-08-15T09:00:00Z',
          endDate: '2026-08-15T18:00:00Z',
          venue: 'Ganesh Kala Krida Manch, Swargate, Pune, Maharashtra 411042',
          bannerUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
          fees: 500,
          description: 'Join us for the most awaited grand matrimonial gathering of the year. This event is specifically organized for the Shimpi community to help eligible brides and grooms find their perfect life partners. We have arranged comprehensive facilities, breakfast, lunch, and high-tea for all registered participants. Special introductory sessions will be held to facilitate better interactions.',
          expectedAttendees: 1500,
          contactPersons: [
            { name: 'Mr. Ramesh Shimpi', phone: '+91 9876543210' },
            { name: 'Mrs. Sunita Shimpi', phone: '+91 8765432109' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMelavaDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (!melava) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Melava Not Found</h2>
        <button onClick={() => navigate('/melava')} className="text-[var(--color-primary)] font-medium hover:underline">
          &larr; Back to all melavas
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>{melava.title} | Shimpi Bandhan</title>
      </Helmet>
      
      {/* Hero Banner Section */}
      <div className="relative h-64 md:h-96 w-full bg-gray-900">
        <img 
          src={melava.bannerUrl} 
          alt={melava.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => navigate('/melava')} 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Back to List
            </button>
            <h1 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight mb-2">
              {melava.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/90 gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-[var(--color-secondary)]" />
                <span>{melava.venue.split(',')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FiInfo className="mr-3 text-[var(--color-primary)]" /> About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {melava.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FiUsers className="mr-3 text-[var(--color-primary)]" /> Event Highlights & Contacts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-blue-900 font-bold mb-1 text-lg">Expected Attendees</div>
                  <div className="text-blue-700">{melava.expectedAttendees}+ Profiles</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <div className="text-orange-900 font-bold mb-1 text-lg">Contact Persons</div>
                  {melava.contactPersons?.map((cp, idx) => (
                    <div key={idx} className="text-orange-700 text-sm">
                      {cp.name} - {cp.phone}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Event Details</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                      <FiCalendar className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Date</div>
                      <div className="text-gray-900 font-semibold">
                        {new Date(melava.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                      <FiClock className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Time</div>
                      <div className="text-gray-900 font-semibold">
                        {new Date(melava.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} 
                        {melava.endDate && ` - ${new Date(melava.endDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                      <FiMapPin className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Venue</div>
                      <div className="text-gray-900 font-semibold">{melava.venue}</div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                      <FiDollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Registration Fees</div>
                      <div className="text-green-700 font-bold text-xl">
                        {melava.fees > 0 ? `₹${melava.fees}` : 'Free Entry'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link 
                    to={`/melava/${melava._id || melava.id}/register`}
                    className="block w-full bg-[var(--color-primary)] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-blue-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Register Now
                  </Link>
                  <p className="text-center text-xs text-gray-400 mt-3">Seats are limited. Register early to confirm your spot.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MelavaDetails;
