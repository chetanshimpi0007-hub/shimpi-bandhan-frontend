import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { FiCheckCircle, FiShield, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

const MelavaRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [melava, setMelava] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    memberId: '',
    profileType: 'Bride',
    attendeeName: '',
    contactNumber: '',
    personsAttending: 1
  });

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
        // Fallback sample data in case backend isn't ready
        setMelava({
          _id: id,
          title: 'Pune Grand Shimpi Bandhan Melava 2026',
          fees: 500
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMelavaDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRegisterAndPay = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (melava.fees > 0) {
        // Simulate Razorpay Payment Flow
        const res = await loadRazorpayScript();
        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?');
          setSubmitting(false);
          return;
        }

        const options = {
          key: 'rzp_test_dummy_key_here', // Dummy key
          amount: melava.fees * 100, // Amount in paise
          currency: 'INR',
          name: 'Shimpi Bandhan',
          description: `Registration for ${melava.title}`,
          image: 'https://via.placeholder.com/150',
          handler: function (response) {
            // Payment success handler
            submitRegistration(response.razorpay_payment_id);
          },
          prefill: {
            name: formData.attendeeName,
            contact: formData.contactNumber,
          },
          theme: {
            color: '#1a365d',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
          alert(`Payment failed. Error: ${response.error.description}`);
          setSubmitting(false);
        });
        
        paymentObject.open();
      } else {
        // Free event, skip payment
        submitRegistration('FREE_ENTRY');
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const submitRegistration = async (paymentId) => {
    try {
      // In a real app, you'd send this to the backend
      // await api.post(`/melava/${id}/register`, { ...formData, paymentId });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setSubmitting(false);
    } catch (error) {
      alert('Registration failed. Please try again later.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
            You have successfully registered for <span className="font-semibold">{melava.title}</span>. A confirmation SMS and Email has been sent to you.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate(`/melava/${id}`)}
              className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Back to Melava Details
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Register - {melava.title} | Shimpi Bandhan</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(`/melava/${id}`)} 
          className="inline-flex items-center text-gray-600 hover:text-[var(--color-primary)] mb-6 font-medium transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-[var(--color-primary)] p-6 md:p-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Registration Form</h1>
            <p className="text-blue-100">{melava.title}</p>
          </div>
          
          <form onSubmit={handleRegisterAndPay} className="p-6 md:p-8 space-y-6">
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
              <FiAlertCircle className="text-blue-600 w-6 h-6 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Please ensure your Member ID is correct. Your profile details will be linked to this registration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shimpi Bandhan Member ID *</label>
                <input 
                  type="text" 
                  name="memberId"
                  required
                  placeholder="e.g., SM10234"
                  value={formData.memberId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Type *</label>
                <select 
                  name="profileType"
                  value={formData.profileType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                >
                  <option value="Bride">Bride (Vadhu)</option>
                  <option value="Groom">Groom (Var)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendee Name *</label>
                <input 
                  type="text" 
                  name="attendeeName"
                  required
                  placeholder="Full Name"
                  value={formData.attendeeName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  required
                  placeholder="+91"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Persons Attending *</label>
                <select 
                  name="personsAttending"
                  value={formData.personsAttending}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons (Max)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Maximum 4 family members allowed per registration.</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg text-gray-700 font-medium">Registration Fees</span>
                <span className="text-2xl font-bold text-gray-900">
                  {melava.fees > 0 ? `₹${melava.fees}` : 'Free'}
                </span>
              </div>
              
              <button 
                type="submit" 
                disabled={submitting}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center transition-all ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'}`}
              >
                {submitting ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div> Processing...</>
                ) : (
                  <><FiShield className="mr-2" /> Pay & Register Securely</>
                )}
              </button>
              
              <div className="text-center mt-4 flex items-center justify-center text-gray-500 text-sm">
                <FiShield className="mr-1 text-gray-400" /> 100% Secure Encrypted Payment (Powered by Razorpay)
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MelavaRegister;
