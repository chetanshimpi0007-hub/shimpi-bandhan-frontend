import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginSuccess } from '../../../redux/authSlice';

const AuthSync = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        dispatch(loginSuccess({ token, user }));
        navigate('/admin/dashboard', { replace: true });
      } catch (error) {
        console.error('Failed to parse user from URL', error);
        navigate('/login', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, dispatch, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0D1A 0%, #0f172a 50%, #0A0D1A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Inter', sans-serif"
    }}>
      <h2>Syncing Admin Session...</h2>
    </div>
  );
};

export default AuthSync;
