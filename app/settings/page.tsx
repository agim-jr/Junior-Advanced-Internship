'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<string>('Basic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setSubscription('Basic');
      setLoading(false);
    }, 500);
  }, [user]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '448px',
          margin: '0 auto',
          padding: '0 16px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <svg
              style={{
                margin: '0 auto',
                height: '96px',
                width: '96px',
                color: '#9ca3af',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px',
          }}>
            Log in to your account to see your Settings
          </h2>
          <button
            onClick={() => router.push('/for-you')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        padding: '32px 16px',
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '32px',
          color: '#111827',
        }}>
          Settings
        </h1>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}>
              Your Subscription plan
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div>
                <p style={{
                  fontSize: '1.125rem',
                  marginBottom: '8px',
                  color: '#374151',
                }}>
                  <span style={{ fontWeight: '600' }}>Plan: </span>
                  <span style={{ color: '#2563eb', textTransform: 'capitalize' }}>
                    {subscription}
                  </span>
                </p>
                {subscription === 'Basic' && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  }}>
                    Upgrade to Premium to unlock all features
                  </p>
                )}
                {subscription === 'Premium' && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  }}>
                    Billed monthly
                  </p>
                )}
                {subscription === 'Premium Plus' && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  }}>
                    Billed yearly with benefits
                  </p>
                )}
              </div>
              {subscription === 'Basic' && (
                <button
                  onClick={() => router.push('/choose-plan')}
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Upgrade to Premium
                </button>
              )}
              {(subscription === 'Premium' || subscription === 'Premium Plus') && (
                <button
                  onClick={() => alert('Cancel subscription functionality coming soon')}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                >
                  Manage Subscription
                </button>
              )}
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#111827',
            }}>
              Email
            </h2>
            <div style={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '16px',
            }}>
              <p style={{ color: '#374151' }}>
                {user.email || 'No email available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
