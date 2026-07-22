import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

const MelavaList = () => {
  const [melavas, setMelavas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMelavas = async () => {
      try {
        const response = await api.get('/melava');
        const data = response.data?.data || response.data;
        if (Array.isArray(data) && data.length > 0) {
          setMelavas(data);
        } else {
          throw new Error('No data');
        }
      } catch (err) {
        console.error('Error fetching melavas:', err);
        // Fallback sample data in case backend isn't ready
        setMelavas([
          {
            _id: '1',
            title: 'Pune Grand Shimpi Bandhan Melava 2026',
            date: '2026-08-15T09:00:00Z',
            venue: 'Ganesh Kala Krida Manch, Swargate, Pune',
            bannerUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
            status: 'Upcoming'
          },
          {
            _id: '2',
            title: 'Nashik Vadhu Var Parichay Melava',
            date: '2026-09-10T10:00:00Z',
            venue: 'Kalidas Kalamandir, Nashik',
            bannerUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
            status: 'Upcoming'
          },
          {
            _id: '3',
            title: 'Mumbai Regional Meetup',
            date: '2026-10-05T10:00:00Z',
            venue: 'Dadar Club, Dadar West, Mumbai',
            bannerUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
            status: 'Upcoming'
          }
        ]);
        setError('Showing sample data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMelavas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Upcoming Vivah Melava | Shimpi Bandhan</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">Upcoming Vivah Melavas</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Participate in our grand community gatherings to find your perfect life partner in person. Meet, connect, and start your beautiful journey.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {melavas.map((melava) => (
              <div key={melava._id || melava.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {melava.status || 'UPCOMING'}
                  </div>
                  <img 
                    src={melava.bannerUrl || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'} 
                    alt={melava.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white line-clamp-2 leading-tight">
                    {melava.title}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="w-5 h-5 mr-3 text-[var(--color-secondary)] flex-shrink-0" />
                      <span className="font-medium">{new Date(melava.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiClock className="w-5 h-5 mr-3 text-[var(--color-secondary)] flex-shrink-0" />
                      <span className="font-medium">{new Date(melava.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <FiMapPin className="w-5 h-5 mr-3 mt-0.5 text-[var(--color-secondary)] flex-shrink-0" />
                      <span className="line-clamp-2">{melava.venue}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/melava/${melava._id || melava.id}`} 
                    className="block w-full text-center bg-gray-50 text-[var(--color-primary)] border border-gray-200 py-3 rounded-xl font-bold hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300 shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            {melavas.length === 0 && !error && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No upcoming melavas at the moment. Please check back later.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MelavaList;
