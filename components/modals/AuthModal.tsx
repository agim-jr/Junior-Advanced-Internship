'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const { signIn, signUp, signInAsGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
      setEmail('');
      setPassword('');
      router.push('/for-you');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInAsGuest();
      onClose();
      router.push('/for-you');
    } catch (err: any) {
      setError(err.message || 'Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '28rem',
          padding: '1.5rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          onMouseEnter={() => setHoveredElement('close')}
          onMouseLeave={() => setHoveredElement(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: hoveredElement === 'close' ? '#4b5563' : '#9ca3af',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s',
          }}
        >
          <X style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1.5rem',
          }}
        >
          {isLogin ? 'Log in to Summarist' : 'Sign up to Summarist'}
        </h2>

        <button
          onClick={handleGuestLogin}
          disabled={loading}
          onMouseEnter={() => setHoveredElement('guest')}
          onMouseLeave={() => setHoveredElement(null)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: hoveredElement === 'guest' && !loading ? '#e5e7eb' : '#f3f4f6',
            color: '#111827',
            fontWeight: '600',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? 'Loading...' : 'Login as Guest'}
        </button>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1rem 0',
          }}
        >
          <div style={{ borderTop: '1px solid #d1d5db', flexGrow: 1 }}></div>
          <span style={{ padding: '0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>or</span>
          <div style={{ borderTop: '1px solid #d1d5db', flexGrow: 1 }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.25rem',
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                fontSize: '1rem',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.25rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="At least 6 characters"
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                fontSize: '1rem',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setHoveredElement('submit')}
            onMouseLeave={() => setHoveredElement(null)}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: hoveredElement === 'submit' && !loading ? '#059669' : '#10b981',
              color: 'white',
              fontWeight: '600',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            onMouseEnter={() => setHoveredElement('toggle')}
            onMouseLeave={() => setHoveredElement(null)}
            style={{
              fontSize: '0.875rem',
              color: hoveredElement === 'toggle' ? '#059669' : '#10b981',
              fontWeight: '500',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
