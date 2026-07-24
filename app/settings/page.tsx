'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, subscriptionType, loading, refreshSubscription } = useAuth();
  const [isCanceling, setIsCanceling] = useState(false);

  const handleCancelSubscription = async () => {
    if (!user) return;

    const confirmed = confirm(
      'Are you sure you want to downgrade to Basic? You will lose access to premium content.'
    );

    if (!confirmed) return;

    setIsCanceling(true);

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          subscriptionType: 'basic',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      await refreshSubscription();
      alert('Successfully downgraded to Basic plan.');
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription. Please try again.');
    } finally {
      setIsCanceling(false);
    }
  };

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

  const getPlanDisplay = () => {
    switch (subscriptionType) {
      case 'premium':
        return { name: 'Premium', color: '#2563eb', billing: 'Billed monthly' };
      case 'premium-plus':
        return { name: 'Premium Plus', color: '#7c3aed', billing: 'Billed yearly' };
      default:
        return { name: 'Basic', color: '#6b7280', billing: 'Free plan' };
    }
  };

  const planInfo = getPlanDisplay();

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
                  <span style={{
                    color: planInfo.color,
                    fontWeight: '600',
                  }}>
                    {planInfo.name}
                  </span>
                </p>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                }}>
                  {planInfo.billing}
                </p>
              </div>
              {subscriptionType === 'basic' && (
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
              {(subscriptionType === 'premium' || subscriptionType === 'premium-plus') && (
                <button
                  onClick={handleCancelSubscription}
                  disabled={isCanceling}
                  style={{
                    backgroundColor: isCanceling ? '#9ca3af' : '#dc2626',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isCanceling ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                  }}
                  onMouseOver={(e) => {
                    if (!isCanceling) e.currentTarget.style.backgroundColor = '#b91c1c';
                  }}
                  onMouseOut={(e) => {
                    if (!isCanceling) e.currentTarget.style.backgroundColor = '#dc2626';
                  }}
                >
                  {isCanceling ? 'Canceling...' : 'Downgrade to Basic'}
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
