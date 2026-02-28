import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
  typescript: true,
})

export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: '',
    features: [
      '5 projects',
      '100 API calls/month',
      'Basic support',
      '1 team member',
    ],
    limits: {
      projects: 5,
      apiCalls: 100,
      teamMembers: 1,
    },
  },
  PRO: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Unlimited projects',
      '10,000 API calls/month',
      'Priority support',
      '10 team members',
      'GitHub integration',
      'Vercel integration',
    ],
    limits: {
      projects: -1, // unlimited
      apiCalls: 10000,
      teamMembers: 10,
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
    features: [
      'Unlimited everything',
      'Custom API limits',
      '24/7 support',
      'Unlimited team members',
      'All integrations',
      'Custom features',
      'SLA guarantee',
    ],
    limits: {
      projects: -1,
      apiCalls: -1,
      teamMembers: -1,
    },
  },
}
