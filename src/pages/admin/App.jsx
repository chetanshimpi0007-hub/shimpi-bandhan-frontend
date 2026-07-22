import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

// ── Error Boundary ─────────────────────────────────────────────────────────
class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[Admin Panel Error]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#f8fafc', fontFamily: 'sans-serif', padding: '40px'
        }}>
          <div style={{
            background: '#fff', border: '1px solid #fee2e2', borderRadius: '16px',
            padding: '40px', maxWidth: '600px', width: '100%', textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,.07)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ color: '#111827', marginBottom: '8px', fontSize: '20px' }}>Admin Panel Error</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <pre style={{
              background: '#f1f5f9', borderRadius: '8px', padding: '16px',
              fontSize: '11px', color: '#334155', textAlign: 'left', overflow: 'auto',
              maxHeight: '200px', marginBottom: '24px'
            }}>
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px',
                padding: '10px 24px', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Lazy Loaded Pages ──────────────────────────────────────────────────────
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const PremiumApprovals = lazy(() => import('./premium/PremiumApprovals'));
const UsersList = lazy(() => import('./users/UsersList'));
const ReportsCenter = lazy(() => import('./reports/ReportsCenter'));
const ProfileVerifications = lazy(() => import('./profiles/ProfileVerifications'));
const PhotoVerifications = lazy(() => import('./verification/PhotoVerifications'));
const VideoApprovalDashboard = lazy(() => import('./videos/VideoApprovalDashboard'));
const SuccessStoriesManager = lazy(() => import('./success-stories/SuccessStoriesManager'));
const FamilyAccountDashboard = lazy(() => import('./family/FamilyAccountDashboard'));
const MelavaModule = lazy(() => import('./melava/MelavaModule'));
const BusinessModule = lazy(() => import('./business/BusinessModule'));
const EnquiryAnalytics = lazy(() => import('./analytics/EnquiryAnalytics'));
const PlatformSettings = lazy(() => import('./settings/PlatformSettings'));
const PaymentCenter = lazy(() => import('./payments/PaymentCenter'));
const ChatModeration = lazy(() => import('./chat/ChatModeration'));
const AuditLogs = lazy(() => import('./components/AuditLogs'));
const AnalyticsCenter = lazy(() => import('./analytics/AnalyticsCenter'));

// ── Loading Spinner ────────────────────────────────────────────────────────
const AdminLoading = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100%', minHeight: '300px', background: '#f8fafc'
  }}>
    <div style={{
      width: '40px', height: '40px', border: '3px solid #e2e8f0',
      borderTop: '3px solid #2563eb', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ── Protected Route ────────────────────────────────────────────────────────
const PrivateAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// ── Admin Routes ───────────────────────────────────────────────────────────
export default function AdminRoutes() {
  return (
    <AdminErrorBoundary>
      <Suspense fallback={<AdminLoading />}>
        <Routes>
          <Route path="/" element={<PrivateAdminRoute><MainLayout /></PrivateAdminRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="premium-approvals" element={<PremiumApprovals />} />
            <Route path="users" element={<UsersList />} />
            <Route path="reports" element={<ReportsCenter />} />
            <Route path="profile-verifications" element={<ProfileVerifications />} />
            <Route path="photo-verifications" element={<PhotoVerifications />} />
            <Route path="videos" element={<VideoApprovalDashboard />} />
            <Route path="success-stories" element={<SuccessStoriesManager />} />
            <Route path="family-accounts" element={<FamilyAccountDashboard />} />
            <Route path="melava/*" element={<MelavaModule />} />
            <Route path="business/*" element={<BusinessModule />} />
            <Route path="analytics/enquiries" element={<EnquiryAnalytics />} />
            <Route path="settings" element={<PlatformSettings />} />
            <Route path="payments" element={<PaymentCenter />} />
            <Route path="chat-moderation" element={<ChatModeration />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="analytics" element={<AnalyticsCenter />} />
          </Route>
        </Routes>
      </Suspense>
    </AdminErrorBoundary>
  );
}
