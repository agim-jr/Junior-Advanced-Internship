'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ChoosePlanPage() {
  const router = useRouter();
  const { user, openAuthModal, refreshSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const plans = {
    yearly: {
      name: 'Premium Plus Yearly',
      price: 99.99,
      period: 'year',
      trial: '7-day free trial included',
      type: 'premium-plus' as const,
    },
    monthly: {
      name: 'Premium Monthly',
      price: 9.99,
      period: 'month',
      trial: 'No trial included',
      type: 'premium' as const,
    },
  };

  const faqs = [
    {
      question: 'How does the free 7-day trial work?',
      answer:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      question: 'Can I switch subscriptions from monthly to yearly, or yearly to monthly?',
      answer:
        'While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.',
    },
    {
      question: "What's included in the Premium plan?",
      answer:
        'Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.',
    },
    {
      question: 'Can I cancel during my trial or subscription?',
      answer:
        'You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.',
    },
  ];

  const handleStartTrial = async () => {
    if (!user) {
      openAuthModal();
      return;
    }

    setIsUpgrading(true);

    try {
      const plan = plans[selectedPlan];
      const subscriptionData: any = {
        subscriptionType: plan.type,
        updatedAt: new Date().toISOString(),
      };

      if (selectedPlan === 'yearly') {
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 7);
        subscriptionData.trialEndsAt = trialEnd.toISOString();
      }

      await setDoc(
        doc(db, 'users', user.uid),
        subscriptionData,
        { merge: true }
      );

      await refreshSubscription();

      alert(
        selectedPlan === 'yearly'
          ? '🎉 Success! Your 7-day free trial has started. Enjoy Premium Plus!'
          : '🎉 Success! You now have Premium access. Enjoy!'
      );

      router.push('/settings');
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      alert('Failed to upgrade. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '16px',
        }}>
          <button
            onClick={() => router.push('/for-you')}
            style={{
              color: '#2563eb',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
            onMouseOut={(e) => e.currentTarget.style.color = '#2563eb'}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        padding: '48px 16px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#111827',
        }}>
          Get unlimited access to many amazing books to read
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#6b7280',
          marginBottom: '8px',
        }}>
          Turn ordinary moments into amazing learning opportunities
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          marginTop: '32px',
          color: '#374151',
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '200px' }}>
            <div style={{ fontSize: '1.875rem', marginBottom: '8px' }}>📚</div>
            <p style={{ fontSize: '0.875rem' }}>
              Key ideas in few min with many books to read
            </p>
          </div>
          <div style={{ maxWidth: '200px' }}>
            <div style={{ fontSize: '1.875rem', marginBottom: '8px' }}>👥</div>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>3 million</strong> people growing with Summarist everyday
            </p>
          </div>
          <div style={{ maxWidth: '200px' }}>
            <div style={{ fontSize: '1.875rem', marginBottom: '8px' }}>🎯</div>
            <p style={{ fontSize: '0.875rem' }}>
              Precise recommendations collections curated by experts
            </p>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '672px',
        margin: '0 auto',
        padding: '0 16px 48px',
      }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '32px',
          color: '#111827',
        }}>
          Choose the plan that fits you
        </h2>

        <div style={{ marginBottom: '32px' }}>
          <div
            onClick={() => setSelectedPlan('yearly')}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              cursor: 'pointer',
              border: selectedPlan === 'yearly' ? '2px solid #2563eb' : '2px solid #e5e7eb',
              boxShadow: selectedPlan === 'yearly' ? '0 10px 15px rgba(0,0,0,0.1)' : 'none',
              marginBottom: '16px',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: selectedPlan === 'yearly' ? '2px solid #2563eb' : '2px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {selectedPlan === 'yearly' && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                    }}></div>
                  )}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#111827',
                  }}>
                    {plans.yearly.name}
                  </h3>
                  <p style={{
                    color: '#16a34a',
                    fontSize: '0.875rem',
                  }}>
                    {plans.yearly.trial}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                }}>
                  ${plans.yearly.price}/{plans.yearly.period}
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedPlan('monthly')}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              cursor: 'pointer',
              border: selectedPlan === 'monthly' ? '2px solid #2563eb' : '2px solid #e5e7eb',
              boxShadow: selectedPlan === 'monthly' ? '0 10px 15px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: selectedPlan === 'monthly' ? '2px solid #2563eb' : '2px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {selectedPlan === 'monthly' && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                    }}></div>
                  )}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#111827',
                  }}>
                    {plans.monthly.name}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  }}>
                    {plans.monthly.trial}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                }}>
                  ${plans.monthly.price}/{plans.monthly.period}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartTrial}
          disabled={isUpgrading}
          style={{
            width: '100%',
            backgroundColor: isUpgrading ? '#9ca3af' : '#2563eb',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '1.125rem',
            fontWeight: '600',
            border: 'none',
            cursor: isUpgrading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => {
            if (!isUpgrading) e.currentTarget.style.backgroundColor = '#1d4ed8';
          }}
          onMouseOut={(e) => {
            if (!isUpgrading) e.currentTarget.style.backgroundColor = '#2563eb';
          }}
        >
          {isUpgrading
            ? 'Processing...'
            : selectedPlan === 'yearly'
            ? 'Start your free 7-day trial'
            : 'Start your subscription'}
        </button>

        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.875rem',
          marginTop: '16px',
        }}>
          {selectedPlan === 'yearly' &&
            "Cancel your trial at any time before it ends, and you won't be charged."}
        </p>

        <div style={{ marginTop: '48px' }}>
          <div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <span style={{
                    fontWeight: '600',
                    color: '#111827',
                    flex: 1,
                    paddingRight: '16px',
                  }}>
                    {faq.question}
                  </span>
                  <span style={{
                    fontSize: '1.5rem',
                    color: '#6b7280',
                  }}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div style={{
                    padding: '0 24px 16px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
