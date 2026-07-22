import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle } from 'react-icons/fi';

const plans = [
  {
    name: 'Basic',
    price: 0,
    duration: '6 Months (First 5 Businesses Free)',
    features: ['Basic Listing', 'Contact Info visible', 'Appears in Search'],
    color: 'bg-green-50',
    border: 'border-green-200'
  },
  {
    name: 'Silver',
    price: 1999,
    duration: '1 Year',
    features: ['Priority Listing', 'Verified Badge', 'Up to 5 Images', 'Analytics Dashboard'],
    color: 'bg-slate-50',
    border: 'border-slate-300'
  },
  {
    name: 'Gold',
    price: 3499,
    duration: '2 Years',
    features: ['Top of Category Search', 'Gold Verified Badge', 'Up to 10 Images', 'Lead Generation Alerts', 'Dedicated Support'],
    color: 'bg-yellow-50',
    border: 'border-yellow-400',
    popular: true
  },
  {
    name: 'Platinum',
    price: 5999,
    duration: 'Lifetime',
    features: ['Homepage Featured', 'Platinum Verified Badge', 'Unlimited Images & Video', 'Unlimited Leads', 'Priority Dedicated Support', 'Marketing Consultation'],
    color: 'bg-indigo-50',
    border: 'border-indigo-400'
  }
];

const BusinessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Could be retrieved from location.state if navigated from Register
  const businessId = location.state?.businessId || 'unknown';

  const handlePayment = () => {
    setIsProcessing(true);
    // Dummy Razorpay Logic
    setTimeout(() => {
      alert(`Dummy Razorpay: Successfully processed ₹${plans.find(p => p.name === selectedPlan).price} for ${selectedPlan} Plan!`);
      setIsProcessing(false);
      navigate(`/business/${businessId === 'temp-id' ? 'b1' : businessId}`); // Navigate to details or list
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Choose Plan & Payment | Shimpi Bandhan</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Business Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get maximum visibility for your business in the Shimpi community. Select a plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative rounded-2xl cursor-pointer transition-all duration-300 border-2 ${selectedPlan === plan.name ? `border-[var(--color-primary)] shadow-xl scale-105` : `${plan.border} hover:shadow-md bg-white`} ${selectedPlan === plan.name ? plan.color : ''} p-6 flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-secondary)] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex justify-center items-baseline">
                  <span className="text-3xl font-extrabold text-[var(--color-primary)]">₹{plan.price}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{plan.duration}</p>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <FiCheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedPlan === plan.name ? 'text-[var(--color-primary)]' : 'text-green-500'}`} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <button 
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${selectedPlan === plan.name ? 'bg-[var(--color-primary)] text-white shadow-md hover:bg-[#72112e]' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="text-gray-600">Selected Plan:</span>
            <span className="font-bold text-[var(--color-primary)]">{selectedPlan} Plan</span>
          </div>
          <div className="flex justify-between items-center mb-8 text-xl font-bold border-t pt-4">
            <span>Total Amount:</span>
            <span>₹{plans.find(p => p.name === selectedPlan).price}</span>
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full ${plans.find(p => p.name === selectedPlan).price === 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-[#0559a7] hover:bg-[#044a8b]'} text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg flex items-center justify-center gap-3 ${
              isProcessing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                {plans.find(p => p.name === selectedPlan).price === 0 ? 'Activate Free Plan' : 'Pay securely with Razorpay'}
              </>
            )}
          </button>
          <div className="mt-4 flex justify-center items-center gap-4 text-gray-400 text-sm">
            <span>100% Secure Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPayment;
