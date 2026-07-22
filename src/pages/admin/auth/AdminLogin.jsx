import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { loginSuccess } from '../../../redux/authSlice';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { phone, password });
      const { token, user } = response.data;
      if (user.role !== 'ADMIN') {
        setError('Administrator access is restricted. Please use the independent Super Admin Portal to login.');
        setLoading(false);
        return;
      }
      dispatch(loginSuccess({ token, user }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0D1A 0%, #0f172a 50%, #0A0D1A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)',
        top: '-150px', left: '-150px', borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        bottom: '-100px', right: '-100px', borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        top: '40%', right: '20%', borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite'
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Login Card */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '440px',
        margin: '0 16px',
        background: 'rgba(17, 24, 39, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,200,66,0.05)',
        animation: 'fadeInUp 0.6s ease forwards'
      }}>
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '72px', height: '72px', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #F5C842, #FF8C42)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(245,200,66,0.35)',
            fontSize: '32px'
          }}>
            👑
          </div>
          <h1 style={{
            margin: 0, fontSize: '26px', fontWeight: 800,
            background: 'linear-gradient(135deg, #F5C842, #FF8C42)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', letterSpacing: '-0.5px'
          }}>Shimpi Bandhan Admin</h1>
          <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '14px', fontWeight: 400 }}>
            Super Admin Control Panel
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)',
          marginBottom: '32px'
        }} />

        <form onSubmit={handleLogin}>
          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#fca5a5', padding: '12px 16px', borderRadius: '12px',
              fontSize: '13px', marginBottom: '20px', lineHeight: '1.5',
              display: 'flex', alignItems: 'flex-start', gap: '8px'
            }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Phone Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '8px' }}>
              Admin Mobile Number
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '18px', pointerEvents: 'none'
              }}>📱</span>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0000000000"
                style={{
                  width: '100%', padding: '14px 14px 14px 46px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: '#f1f5f9', fontSize: '15px',
                  outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(245,200,66,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '18px', pointerEvents: 'none'
              }}>🔐</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '14px 48px 14px 46px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: '#f1f5f9', fontSize: '15px',
                  outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(245,200,66,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px',
                  color: '#64748b', padding: 0
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '15px',
              background: loading ? 'rgba(245,200,66,0.5)' : 'linear-gradient(135deg, #F5C842, #FF8C42)',
              border: 'none', borderRadius: '12px',
              color: '#0A0D1A', fontSize: '15px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(245,200,66,0.35)',
              fontFamily: "'Inter', sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '18px', height: '18px',
                  border: '2px solid rgba(0,0,0,0.3)',
                  borderTopColor: '#0A0D1A',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Authenticating...
              </>
            ) : '🔓 Secure Login'}
          </button>
        </form>

        {/* Footer note */}
        <p style={{
          textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#475569'
        }}>
          🛡️ Protected by JWT · Role-Based Access Control
        </p>
      </div>

      {/* Bottom branding */}
      <div style={{
        position: 'absolute', bottom: '24px', left: 0, right: 0,
        textAlign: 'center', color: '#1e293b', fontSize: '12px'
      }}>
        © 2026 Shimpi Bandhan · Designed by <strong style={{ color: '#334155' }}>Arnav InfoWeb</strong> · Nashik
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #334155; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
