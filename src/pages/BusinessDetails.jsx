import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { FiMapPin, FiPhone, FiMail, FiGlobe, FiStar, FiClock, FiCheckCircle, FiX } from 'react-icons/fi';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '', mobile: '', email: '', weddingDate: '', city: '', message: '', budget: '', preferredTime: ''
  });

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    alert('Enquiry submitted successfully!');
    setShowEnquiryModal(false);
  };


  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await api.get(`/public/business/${id}`);
        const data = response.data?.data || response.data;
        if (data) {
          const mappedBusiness = {
            ...data,
            _id: data.id || data._id,
            name: data.businessName || data.name,
            category: data.categoryName || data.category,
            address: data.addressLine || data.address || data.city || '',
            phone: data.mobileNumber || data.whatsappNumber || data.phone,
            rating: data.averageRating || data.rating || 0,
            bannerUrl: (() => {
              const url = data.coverUrl || data.logoUrl || data.bannerUrl;
              if (url && url.startsWith('/uploads')) return `http://localhost:8080${url}`;
              return url || 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=1200&q=80';
            })(),
            plan: data.planType || data.plan,
            features: data.features || [],
            gallery: data.gallery || [
              // Default gallery if none exists
              (() => {
                const url = data.coverUrl || data.logoUrl;
                if (url && url.startsWith('/uploads')) return `http://localhost:8080${url}`;
                return url;
              })()
            ].filter(Boolean),
            offers: data.offers || []
          };
          setBusiness(mappedBusiness);
        } else {
          throw new Error('Business not found');
        }
      } catch (err) {
        console.error('Error fetching business details:', err);
        // Fallback sample data based on ID
        if (id === 'b-arnav') {
          setBusiness({
            _id: id,
            name: 'Arnav InfoWeb (IT Company)',
            category: 'IT Services',
            description: 'We build solutions that drive your business forward. Specializing in Website Development, Mobile Apps, ERP & CRM, Digital Marketing, and UI/UX Design.',
            address: 'Nashik, Maharashtra, India',
            phone: '9158011580, 8767778028',
            email: 'info@arnavinfoweb.in',
            website: 'www.arnavinfoweb.in',
            workingHours: 'Dedicated Support 24/7',
            rating: 5.0,
            bannerUrl: '/arnav-banner.jpg',
            plan: 'Platinum',
            features: ['Website Development', 'Mobile App Development', 'ERP & CRM Solutions', 'Digital Marketing', 'UI/UX Design', 'AI & Custom Solutions'],
            gallery: ['/arnav-banner.jpg'],
            offers: [
              { id: 1, title: 'Free IT Consultation', validUntil: '2026-12-31' },
              { id: 2, title: '100% Customer Satisfaction Guarantee', validUntil: '2026-12-31' }
            ]
          });
        } else {
          setBusiness({
            _id: id,
            name: 'Shree Cloth Emporium',
            category: 'Clothing',
            description: 'We offer a wide variety of traditional and modern clothing for all occasions. Specializing in wedding collections, paithani sarees, and custom tailoring for the Shimpi community.',
            address: '123 Main Road, Near Market, Nashik, Maharashtra 422001',
            phone: '+91 98765 43210',
            email: 'contact@shreecloth.com',
            website: 'www.shreecloth.com',
            workingHours: '10:00 AM - 9:00 PM (Closed on Mondays)',
            rating: 4.8,
            bannerUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80',
            plan: 'Gold',
            features: ['Custom Tailoring', 'Wedding Collections', 'Home Delivery', 'Easy Returns'],
            gallery: [
              'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80'
            ],
            offers: [
              { id: 1, title: '20% Off Wedding Collection', validUntil: '2026-12-31' },
              { id: 2, title: 'Free Alteration on purchases above ₹5000', validUntil: '2026-10-15' }
            ]
          });
        }
        setError('Showing sample data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Business Not Found</h2>
        <p className="text-gray-600 mb-6">The business you are looking for does not exist or has been removed.</p>
        <Link to="/business" className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-bold">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>{business.name} | Shimpi Bandhan Business</title>
        <meta name="description" content={business.description} />
        <meta property="og:title" content={business.name} />
        <meta property="og:description" content={business.description} />
        <meta property="og:image" content={business.bannerUrl} />
        <meta property="og:type" content="business.business" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": business.name,
            "image": business.bannerUrl,
            "description": business.description,
            "telephone": business.phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": business.address
            }
          })}
        </script>
      </Helmet>

      {/* Banner Section */}
      <div className="h-[40vh] min-h-[300px] relative w-full bg-gray-900">
        <img 
          src={business.bannerUrl || 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=1200&q=80'} 
          alt={business.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[var(--color-secondary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {business.category}
                </span>
                {business.plan && (
                  <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <FiStar /> {business.plan} Member
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{business.name}</h1>
              <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base">
                <span className="flex items-center gap-1"><FiStar className="text-yellow-400" /> {business.rating || 'New'} Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Business</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {business.description || 'No description available for this business.'}
              </p>
            </div>

            {business.features && business.features.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {business.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FiCheckCircle className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {business.offers && business.offers.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-sm border border-yellow-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FiStar className="text-yellow-600" /> Active Offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {business.offers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-xl p-5 border border-yellow-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full -z-10"></div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{offer.title}</h3>
                      <p className="text-sm text-gray-500 font-medium">Valid Until: {offer.validUntil}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {business.gallery && business.gallery.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {business.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                      <img 
                        src={img} 
                        alt={`${business.name} Gallery ${idx + 1}`} 
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Contact Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-primary)]/10 p-3 rounded-full text-[var(--color-primary)]">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Address</h4>
                    <p className="text-gray-800 font-medium">{business.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--color-primary)]/10 p-3 rounded-full text-[var(--color-primary)]">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</h4>
                    <a href={`tel:${business.phone}`} className="text-gray-800 font-medium hover:text-[var(--color-primary)] transition-colors">
                      {business.phone}
                    </a>
                  </div>
                </div>

                {business.email && (
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-primary)]/10 p-3 rounded-full text-[var(--color-primary)]">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Email</h4>
                      <a href={`mailto:${business.email}`} className="text-gray-800 font-medium hover:text-[var(--color-primary)] transition-colors">
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-primary)]/10 p-3 rounded-full text-[var(--color-primary)]">
                      <FiGlobe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Website</h4>
                      <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}

                {business.workingHours && (
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-primary)]/10 p-3 rounded-full text-[var(--color-primary)]">
                      <FiClock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Working Hours</h4>
                      <p className="text-gray-800 font-medium">{business.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t space-y-4">
                <button onClick={() => setShowEnquiryModal(true)} className="w-full bg-[var(--color-primary)] text-white font-bold py-3 rounded-xl hover:bg-[#72112e] transition-colors shadow-sm flex items-center justify-center gap-2">
                  <FiMail /> Enquire Now
                </button>
                <button className="w-full bg-[var(--color-secondary)] text-white font-bold py-3 rounded-xl hover:bg-yellow-600 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <FiPhone /> Contact Business
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[#72112e] p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Enquire Now</h3>
              <button onClick={() => setShowEnquiryModal(false)} className="text-white/80 hover:text-white transition-colors">
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <input required type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.mobile} onChange={e => setEnquiryForm({...enquiryForm, mobile: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wedding Date <span className="text-red-500">*</span></label>
                    <input required type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.weddingDate} onChange={e => setEnquiryForm({...enquiryForm, weddingDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.city} onChange={e => setEnquiryForm({...enquiryForm, city: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.budget} onChange={e => setEnquiryForm({...enquiryForm, budget: e.target.value})}>
                      <option value="">Select Budget</option>
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Time</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.preferredTime} onChange={e => setEnquiryForm({...enquiryForm, preferredTime: e.target.value})}>
                      <option value="">Anytime</option>
                      <option value="Morning">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening">Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})}></textarea>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-[var(--color-primary)] text-white font-bold py-3 rounded-lg hover:bg-[#72112e] transition-colors">
                    Submit Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BusinessDetails;
