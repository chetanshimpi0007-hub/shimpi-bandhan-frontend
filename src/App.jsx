import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PWAHandler from './components/PWAHandler';

const Loading = () => (
  <div className="flex h-screen items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MelavaList = lazy(() => import('./pages/MelavaList'));
const MelavaDetails = lazy(() => import('./pages/MelavaDetails'));
const MelavaRegister = lazy(() => import('./pages/MelavaRegister'));
const BusinessList = lazy(() => import('./pages/BusinessList'));
const BusinessDetails = lazy(() => import('./pages/BusinessDetails'));
const BusinessRegister = lazy(() => import('./pages/BusinessRegister'));
const BusinessPayment = lazy(() => import('./pages/BusinessPayment'));

// Protected Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const StaticPage = lazy(() => import('./pages/StaticPage'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const SearchProfiles = lazy(() => import('./pages/SearchProfiles'));
const PremiumMembership = lazy(() => import('./pages/PremiumMembership'));
const Interests = lazy(() => import('./pages/Interests'));
const Chat = lazy(() => import('./pages/Chat'));
const ProfileVisitors = lazy(() => import('./pages/ProfileVisitors'));
const FamilyDashboard = lazy(() => import('./pages/FamilyDashboard'));
const FamilyDiscussionRoom = lazy(() => import('./pages/FamilyDiscussionRoom'));
const MeetingCalendar = lazy(() => import('./pages/MeetingCalendar'));
const FamilyTimeline = lazy(() => import('./pages/FamilyTimeline'));
const FamilyApprovalStatus = lazy(() => import('./pages/FamilyApprovalStatus'));

const BusinessDashboard = lazy(() => import('./pages/BusinessDashboard'));
const AdminRoutes = lazy(() => import('./pages/admin/App')); // which exports AdminRoutes

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<StaticPage title="About Us" content={<><p className="text-gray-600 leading-relaxed text-lg mb-4">Welcome to Shimpi Bandhan, the most trusted premium matrimonial platform exclusively for the Aher and Namdev Shimpi communities. We are dedicated to helping you find your perfect life partner.</p><div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6"><h3 className="text-xl font-bold text-gray-900 mb-2">About Development</h3><p className="text-gray-600 leading-relaxed text-md">This platform has been professionally designed and developed by <strong>Arnav InfoWeb</strong>, Nashik, Maharashtra, India, with a focus on delivering a secure, modern, scalable, and premium matrimonial experience for the Shimpi community.</p></div></>} />} />
            <Route path="/contact" element={<StaticPage title="Contact Us" content={<div className="text-gray-600 leading-relaxed text-lg"><p className="mb-4">We would love to hear from you!</p><p><strong>Email:</strong> support@shimpibandhan.com</p><p><strong>Miss Payal Shimpi:</strong> 7350330271</p><p><strong>Miss Sonal Sankpal:</strong> 755 931 9587</p></div>} />} />
            <Route path="/help" element={<StaticPage title="Help & Support" content={<div className="text-gray-600 leading-relaxed text-lg"><p className="mb-4">Need help using Shimpi Bandhan? We are here for you.</p><p className="mb-2"><strong>1. How to Register?</strong> Click on 'Register Free' at the top right and fill in your details.</p><p className="mb-2"><strong>2. Profile Verification:</strong> Admin team manually verifies all accounts to ensure authenticity.</p><p className="mb-4"><strong>3. Contact Support:</strong> You can reach us at 7350330271 or support@shimpibandhan.com.</p></div>} />} />
            <Route path="/faq" element={<StaticPage title="FAQ" content={<p className="text-gray-600 leading-relaxed text-lg"><strong>Q: Who can register on Shimpi Bandhan?</strong><br/>A: Registration is currently open exclusively for individuals from the Aher Shimpi and Namdev Shimpi communities.</p>} />} />
            <Route path="/privacy" element={<StaticPage title="Privacy Policy" content={<p className="text-gray-600 leading-relaxed text-lg">Your privacy is our priority. We employ advanced security protocols and strict data confidentiality policies to ensure your personal information remains completely secure and is never shared with third-party vendors without your explicit consent.</p>} />} />
            <Route path="/terms" element={<StaticPage title="Terms & Conditions" content={<p className="text-gray-600 leading-relaxed text-lg">By registering on Shimpi Bandhan, you agree to abide by our community guidelines, maintaining respectful conduct and providing accurate information on your profile.</p>} />} />
            <Route path="/refund" element={<StaticPage title="Refund Policy" content={<p className="text-gray-600 leading-relaxed text-lg">Thank you for choosing Shimpi Bandhan Premium Membership. Please note that all premium subscription purchases are final and non-refundable. Since premium features are instantly activated upon purchase, we do not offer refunds, partial refunds, or cancellations under any circumstances.</p>} />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/melava" element={<MelavaList />} />
            <Route path="/melava/:id" element={<MelavaDetails />} />
            <Route path="/melava/:id/register" element={<MelavaRegister />} />
            <Route path="/business" element={<BusinessList />} />
            <Route path="/business/register" element={<BusinessRegister />} />
            <Route path="/business/payment" element={<BusinessPayment />} />
            <Route path="/business/:id" element={<BusinessDetails />} />
          </Route>

          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business/dashboard" element={<BusinessDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/search" element={<SearchProfiles />} />
            <Route path="/premium" element={<PremiumMembership />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/visitors" element={<ProfileVisitors />} />
            <Route path="/family-dashboard" element={<FamilyDashboard />} />
            <Route path="/family-discussion" element={<FamilyDiscussionRoom />} />
            <Route path="/meeting-calendar" element={<MeetingCalendar />} />
            <Route path="/family-timeline" element={<FamilyTimeline />} />
            <Route path="/family-approval" element={<FamilyApprovalStatus />} />
          </Route>

          {/* Admin Routes Module */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Suspense>
      <PWAHandler />
    </Router>
    </HelmetProvider>
  );
}

export default App;
