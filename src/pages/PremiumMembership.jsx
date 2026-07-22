import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FaCrown, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const PremiumMembership = () => {
  const navigate = useNavigate();
  const paymentLink = "https://razorpay.me/@chetandevidasshimpi";
  const [showPayment, setShowPayment] = useState(false);

  const features = [
    { title: "Browse Profiles", free: true, paid: true },
    { title: "Shortlist & Send Interest", free: true, paid: true },
    { title: "Message & chat with unlimited users", free: true, paid: true },
    { title: "Get up to 3x more matches daily", free: false, paid: true },
    { title: "Unlock access to advanced search", free: false, paid: true },
    { title: "View contact details", free: false, paid: true },
    { title: "Get 3 free Spotlights", free: false, paid: true }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 font-sans text-slate-800 bg-[#FCFBF9] min-h-screen">
      
      {/* ── 1 Month Free Subscription Promo Headline Banner at the Top ── */}
      <div className="max-w-4xl mx-auto mb-10 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white rounded-3xl p-6 text-center shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="text-left space-y-1 relative z-10">
          <span className="bg-white/20 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">Limited Offer</span>
          <h2 className="text-lg md:text-xl font-extrabold tracking-tight mt-1">Get 1 Month Free Premium Subscription!</h2>
          <p className="text-[11px] text-pink-100 font-semibold">Sign up today to browse, connect, and chat with unlimited verified profiles completely free for 30 days.</p>
        </div>
        <button className="bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-2xl text-xs font-black shadow-md transition-all shrink-0 cursor-pointer">
          Claim Free Month
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-12 space-y-2">
        <span className="text-xs font-black uppercase text-pink-600 tracking-widest">Upgrade Your Account</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Membership Plans</h1>
        <p className="text-slate-500 text-xs font-semibold max-w-md mx-auto">Compare plans and find your perfect life partner today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        
        {/* ── Left Card: Free Plan ── */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Free</h2>
              <div className="w-12 h-1 bg-pink-500 mt-2" />
            </div>
            
            <ul className="space-y-4">
              {features.map((f, idx) => (
                <li key={idx} className={`flex items-center gap-3 text-xs font-semibold ${f.free ? 'text-slate-800' : 'text-slate-400'}`}>
                  {f.free ? (
                    <FaCheckCircle className="text-pink-600 text-lg flex-shrink-0" />
                  ) : (
                    <span className="w-[18px] h-[18px] rounded-full border border-slate-200 text-slate-350 flex items-center justify-center flex-shrink-0 text-[8px] font-black">✕</span>
                  )}
                  <span>{f.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => navigate('/profile/edit')}
            className="w-full mt-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-xs font-black shadow-md transition-all cursor-pointer text-center"
          >
            Register Free
          </button>
        </div>

        {/* ── Right Card: Paid (Premium Gold Plan) ── */}
        <div className="bg-pink-600 border border-pink-700 rounded-[32px] p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black">Paid Gold</h2>
                <div className="w-12 h-1 bg-white mt-2" />
              </div>
              <span className="px-2.5 py-0.5 bg-white/25 text-white text-[8px] font-black rounded-full uppercase tracking-wider">Most Popular</span>
            </div>

            <ul className="space-y-4">
              {features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-semibold text-white">
                  <FaCheckCircle className="text-white text-lg flex-shrink-0" />
                  <span>{f.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 mt-8 relative z-10">
            <div className="text-center">
              <span className="text-3xl font-black">₹99</span>
              <span className="text-xs opacity-80 font-bold ml-1">/ 30 Days</span>
            </div>
            <button 
              onClick={() => setShowPayment(!showPayment)}
              className="w-full py-4 bg-white text-pink-600 hover:bg-pink-50 rounded-2xl text-xs font-black shadow-md transition-all cursor-pointer text-center"
            >
              {showPayment ? "Hide Payment QR" : "Browse Plans & Pay"}
            </button>
          </div>
        </div>

      </div>

      {/* UPI QR Payment Modal Card */}
      {showPayment && (
        <div className="max-w-md mx-auto mt-8 bg-white border border-slate-200 p-8 rounded-[32px] shadow-lg text-center space-y-6">
          <h3 className="font-black text-sm text-slate-800 flex items-center justify-center gap-2">
            <FaCrown className="text-amber-500 fill-amber-500" />
            <span>Premium Gold Access</span>
          </h3>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">Scan QR code using GooglePay, PhonePe or any UPI app to transfer ₹99 membership fees.</p>
          
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl inline-block shadow-sm">
            <QRCodeSVG value={paymentLink} size={180} level={"H"} fgColor={"#e11d48"} />
          </div>

          <div className="space-y-2">
            <a 
              href={paymentLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full block bg-pink-600 hover:bg-pink-700 text-white font-black py-3.5 rounded-xl text-xs shadow-md transition-all"
            >
              Pay via Razorpay Link
            </a>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-left flex gap-2">
              <FaInfoCircle className="text-amber-600 mt-0.5 shrink-0 size-3.5" />
              <p className="text-[10px] text-amber-800 font-semibold leading-relaxed">
                <strong>Please Note:</strong> On the payment page, please type in <strong>₹99</strong> manually. To have this amount prefilled automatically in the future, you can generate a <strong>Standard Payment Link</strong> (e.g. <code>https://rzp.io/l/...</code>) inside your Razorpay Dashboard and update it here.
              </p>
            </div>
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 text-left flex gap-2">
              <FaInfoCircle className="text-blue-500 mt-0.5 shrink-0 size-3.5" />
              <p className="text-[10px] text-blue-800 font-semibold leading-relaxed">Status updates automatically. Upload transaction screenshot on user dashboard for direct moderation review.</p>
            </div>
          </div>
        </div>
      )}

      {/* Personalized matchmaking footer with different photos */}
      <div className="max-w-md mx-auto mt-16 text-center space-y-4 border-t border-slate-100 pt-8">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Personalised Match-making Service</span>
        <h3 className="text-lg font-black text-slate-900 leading-none">Introducing <span className="text-pink-600">Exclusive</span></h3>
        <div className="flex justify-center gap-4 py-2">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-white shadow-sm">
            <img src="/indian-girl-1.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-white shadow-sm">
            <img src="/indian-girl-2.jpg" className="w-full h-full object-cover" />
          </div>
        </div>
        <button 
          onClick={() => navigate('/profile/edit')}
          className="bg-pink-600 text-white px-8 py-3.5 rounded-2xl text-xs font-black shadow-md cursor-pointer hover:bg-pink-700 transition-colors"
        >
          Register Free
        </button>
      </div>

    </div>
  );
};

export default PremiumMembership;
