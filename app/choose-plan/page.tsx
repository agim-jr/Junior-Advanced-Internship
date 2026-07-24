'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChoosePlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = {
    yearly: {
      name: 'Premium Plus Yearly',
      price: 99.99,
      period: 'year',
      trial: '7-day free trial included',
    },
    monthly: {
      name: 'Premium Monthly',
      price: 9.99,
      period: 'month',
      trial: 'No trial included',
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

  const handleStartTrial = () => {
    console.log('Starting trial with plan:', selectedPlan);
    alert('Payment integration coming soon! This would redirect to Stripe checkout.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/for-you')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Turn ordinary moments into amazing learning opportunities
        </p>
        <div className="flex items-center justify-center gap-8 mt-8 text-gray-700">
          <div>
            <div className="text-3xl mb-2">📚</div>
            <p className="text-sm">Key ideas in few min with many books to read</p>
          </div>
          <div>
            <div className="text-3xl mb-2">👥</div>
            <p className="text-sm">
              <strong>3 million</strong> people growing with Summarist everyday
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm">Precise recommendations collections curated by experts</p>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Choose the plan that fits you
        </h2>

        <div className="space-y-4 mb-8">
          {/* Yearly Plan */}
          <div
            onClick={() => setSelectedPlan('yearly')}
            className={`bg-white rounded-lg p-6 cursor-pointer transition border-2 ${
              selectedPlan === 'yearly'
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'yearly'
                      ? 'border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedPlan === 'yearly' && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{plans.yearly.name}</h3>
                  <p className="text-green-600 text-sm">{plans.yearly.trial}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ${plans.yearly.price}/{plans.yearly.period}
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`bg-white rounded-lg p-6 cursor-pointer transition border-2 ${
              selectedPlan === 'monthly'
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === 'monthly'
                      ? 'border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedPlan === 'monthly' && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{plans.monthly.name}</h3>
                  <p className="text-gray-600 text-sm">{plans.monthly.trial}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ${plans.monthly.price}/{plans.monthly.period}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartTrial}
          className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          {selectedPlan === 'yearly'
            ? 'Start your free 7-day trial'
            : 'Start your subscription'}
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          {selectedPlan === 'yearly' &&
            "Cancel your trial at any time before it ends, and you won't be charged."}
        </p>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className="text-2xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
