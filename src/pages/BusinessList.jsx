import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { FiSearch, FiMapPin, FiPhone, FiStar, FiClock, FiTag, FiAward } from 'react-icons/fi';

const initialSampleData = [
  {
    _id: 'b-arnav',
    name: 'Arnav InfoWeb (IT Company)',
    category: 'IT Services',
    address: 'Nashik, Maharashtra, India',
    phone: '9158011580, 8767778028',
    rating: 5.0,
    bannerUrl: '/arnav-banner.jpg',
    plan: 'Platinum',
    isOpen: true,
    hasOffer: true,
    website: 'www.arnavinfoweb.in'
  },
  {
    _id: 'b1',
    name: 'Shree Cloth Emporium',
    category: 'Clothing',
    address: 'Main Road, Nashik',
    phone: '9876543210',
    rating: 4.8,
    bannerUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    plan: 'Gold',
    isOpen: true,
    hasOffer: true
  },
  {
    _id: 'b2',
    name: 'Royal Caterers',
    category: 'Catering',
    address: 'Kothrud, Pune',
    phone: '9988776655',
    rating: 4.5,
    bannerUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    plan: 'Platinum',
    isOpen: false,
    hasOffer: false
  },
  {
    _id: 'b3',
    name: 'Gems & Jewels',
    category: 'Jewelry',
    address: 'Dadar, Mumbai',
    phone: '9123456780',
    rating: 4.9,
    bannerUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    plan: 'Silver',
    isOpen: true,
    hasOffer: true
  }
];

const normalizeBusinessName = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\(it company\)/gi, '')
    .replace(/it company/gi, '')
    .replace(/[^a-z0-9]/gi, '');
};

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [hasActiveOffers, setHasActiveOffers] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');

  const categories = ['All', 'Clothing', 'Jewelry', 'Catering', 'Photography', 'Decorators', 'IT Services'];

  useEffect(() => {
    fetchBusinesses();
  }, [category, isOpenNow, hasActiveOffers, sortBy]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const response = await api.post('/public/business/search', {
        search: searchTerm,
        category: category === 'All' ? '' : category,
        isOpenNow,
        hasActiveOffers,
        sortBy
      });
      const data = response.data?.content || response.data?.data || response.data;
      
      let sampleData = [...initialSampleData];

      // Simulate frontend filtering for demo data
      if (category !== 'All') sampleData = sampleData.filter(b => b.category === category);
      if (isOpenNow) sampleData = sampleData.filter(b => b.isOpen);
      if (hasActiveOffers) sampleData = sampleData.filter(b => b.hasOffer);
      if (sortBy === 'highestRated') sampleData.sort((a, b) => b.rating - a.rating);

      let realData = [];
      if (Array.isArray(data) && data.length > 0) {
        realData = data.map(b => ({
          _id: b.id || b._id,
          name: b.businessName || b.name,
          category: b.categoryName || b.category,
          address: b.addressLine || b.address || b.city || '',
          phone: b.mobileNumber || b.whatsappNumber || b.phone,
          rating: b.averageRating || b.rating || 0,
          bannerUrl: (() => {
            const url = b.coverUrl || b.logoUrl || b.bannerUrl;
            if (url && url.startsWith('/uploads')) return `http://localhost:8080${url}`;
            return url || 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80';
          })(),
          plan: b.planType || b.plan,
          isOpen: true,
          hasOffer: false
        }));
      }
      
      // Deduplicate combined dataset by normalized business name
      const allCombined = [...realData, ...sampleData];
      const uniqueBusinesses = [];
      const seenNames = new Set();
      for (const item of allCombined) {
        const normKey = normalizeBusinessName(item.name);
        if (normKey && !seenNames.has(normKey)) {
          seenNames.add(normKey);
          uniqueBusinesses.push(item);
        }
      }

      setBusinesses(uniqueBusinesses);
      
    } catch (err) {
      console.error('Error fetching businesses:', err);
      // Fallback to sample data when backend is unreachable
      let sampleData = [...initialSampleData];
      if (category !== 'All') sampleData = sampleData.filter(b => b.category === category);
      if (isOpenNow) sampleData = sampleData.filter(b => b.isOpen);
      if (hasActiveOffers) sampleData = sampleData.filter(b => b.hasOffer);
      if (sortBy === 'highestRated') sampleData.sort((a, b) => b.rating - a.rating);
      
      const uniqueSample = [];
      const seenNames = new Set();
      for (const item of sampleData) {
        const normKey = normalizeBusinessName(item.name);
        if (normKey && !seenNames.has(normKey)) {
          seenNames.add(normKey);
          uniqueSample.push(item);
        }
      }
      setBusinesses(uniqueSample);
      setError('Could not fetch real data from backend. Showing offline directory.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBusinesses();
  };

  // Get top unique featured businesses (max 3, deduplicated by name)
  const uniqueFeatured = [];
  const seenFeaturedKeys = new Set();
  for (const b of businesses) {
    if (b.plan === 'Platinum' || b.plan === 'Gold' || b.plan === 'PLATINUM' || b.plan === 'GOLD') {
      const normKey = normalizeBusinessName(b.name);
      if (normKey && !seenFeaturedKeys.has(normKey)) {
        seenFeaturedKeys.add(normKey);
        uniqueFeatured.push(b);
      }
    }
  }
  const featuredBusinesses = uniqueFeatured.slice(0, 3);

  const isShowingFeatured = featuredBusinesses.length > 0 && category === 'All' && !searchTerm;
  const featuredNormKeys = new Set(featuredBusinesses.map(b => normalizeBusinessName(b.name)));

  // Exclude featured businesses from main grid so each business appears ONCE total on the page
  const gridBusinesses = isShowingFeatured
    ? businesses.filter(b => !featuredNormKeys.has(normalizeBusinessName(b.name)))
    : businesses;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Business Directory | Shimpi Bandhan</title>
        <meta name="description" content="Discover and support businesses owned by the Shimpi community. Find the highest-rated services, active offers, and more." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">Business Directory</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and support businesses owned by our community members. Register your business to reach thousands of families.
          </p>
          <div className="mt-6">
            <Link to="/business/register" className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#72112e] transition-colors">
              Register Your Business
            </Link>
          </div>
        </div>

        {/* Featured Section */}
        {featuredBusinesses.length > 0 && category === 'All' && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiAward className="text-yellow-500" /> Featured Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBusinesses.slice(0, 3).map((business) => (
                <Link to={`/business/${business._id}`} key={`feat-${business._id}`} className="group block relative rounded-2xl overflow-hidden shadow-sm border border-yellow-200 hover:shadow-xl transition-all h-64">
                  <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </div>
                  <img src={business.bannerUrl} alt={business.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <h3 className="text-xl font-bold text-white mb-1">{business.name}</h3>
                    <p className="text-sm text-gray-300 flex items-center gap-1"><FiStar className="text-yellow-400" /> {business.rating}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Search & Filter</h3>
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search businesses..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  />
                  <FiSearch className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                </div>
                <button type="submit" className="mt-3 w-full bg-[var(--color-secondary)] text-white font-bold py-2.5 rounded-xl hover:bg-yellow-600 transition-colors">
                  Search
                </button>
              </form>

              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Sort By</h4>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[var(--color-primary)] bg-gray-50"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="highestRated">Highest Rated</option>
                </select>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="font-bold text-gray-700 mb-2">Quick Filters</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={isOpenNow}
                    onChange={(e) => setIsOpenNow(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 flex items-center gap-2"><FiClock /> Open Now</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={hasActiveOffers}
                    onChange={(e) => setHasActiveOffers(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 flex items-center gap-2"><FiTag /> Active Offers</span>
                </label>
              </div>
              
              <h4 className="font-bold text-gray-700 mb-3">Categories</h4>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${category === cat ? 'bg-[var(--color-primary)] text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Business Listing */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Businesses {category !== 'All' && `in ${category}`}</h2>
              <span className="text-gray-500 font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">{businesses.length} Results</span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridBusinesses.map((business) => (
                  <div key={business._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute top-3 right-3 z-10 bg-[var(--color-secondary)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <FiStar className="w-3 h-3" /> {business.rating || 'New'}
                      </div>
                      <img 
                        src={business.bannerUrl || 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80'} 
                        alt={business.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                        <span className="text-white/90 text-xs font-medium px-2 py-1 bg-white/20 rounded backdrop-blur-sm mb-1 inline-block">
                          {business.category}
                        </span>
                        <h3 className="text-xl font-bold text-white line-clamp-1">{business.name}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex gap-2 mb-4">
                        {business.isOpen && (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">Open Now</span>
                        )}
                        {business.hasOffer && (
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md border border-yellow-100">Offers Available</span>
                        )}
                      </div>
                      <div className="space-y-2 mb-5">
                        <div className="flex items-start text-gray-600 text-sm">
                          <FiMapPin className="w-4 h-4 mr-2 mt-0.5 text-[var(--color-secondary)] flex-shrink-0" />
                          <span className="line-clamp-2">{business.address}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiPhone className="w-4 h-4 mr-2 text-[var(--color-secondary)] flex-shrink-0" />
                          <span>{business.phone}</span>
                        </div>
                      </div>
                      <Link 
                        to={`/business/${business._id}`} 
                        className="block w-full text-center bg-gray-50 text-[var(--color-primary)] border border-gray-200 py-2.5 rounded-xl font-bold hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
                {businesses.length === 0 && (
                  <div className="col-span-full bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
                    <p className="text-gray-500 text-lg">No businesses found matching your criteria.</p>
                    <button onClick={() => {setSearchTerm(''); setCategory('All'); setIsOpenNow(false); setHasActiveOffers(false); setSortBy('relevant');}} className="mt-4 text-[var(--color-primary)] font-semibold hover:underline">Clear Filters</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
