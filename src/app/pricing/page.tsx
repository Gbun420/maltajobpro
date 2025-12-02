import React from 'react';

const PricingTier = ({ title, price, features, isFeatured = false }) => (
  <div className={`border rounded-lg p-8 h-full flex flex-col ${isFeatured ? 'bg-slate-800 border-amber-400' : 'bg-slate-800/50 border-slate-700'}`}>
    <h3 className="text-2xl font-bold text-white">{title}</h3>
    <p className="text-4xl font-extrabold text-amber-400 mt-4">
      €{price}<span className="text-lg text-slate-400 font-medium">/month</span>
    </p>
    <ul className="text-slate-300 space-y-3 mt-6 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full mt-8 py-3 font-bold rounded-md transition-colors ${isFeatured ? 'bg-amber-400 text-slate-900 hover:bg-amber-500' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
      Get Started
    </button>
  </div>
);

const PricingPage = () => {
  const tiers = {
    basic: {
      title: 'Basic Posting',
      price: 49,
      features: [
        '5 job postings monthly',
        'Basic candidate matching',
        'Standard visibility (3rd page results)',
        'Email support only',
      ],
    },
    premium: {
      title: 'Premium Recruiter',
      price: 149,
      features: [
        '15 job postings monthly',
        'Advanced AI matching algorithms',
        'Priority placement (1st page results)',
        'Dedicated account manager',
        'Candidate analytics dashboard',
        'Multi-user access (3 seats)',
      ],
      isFeatured: true,
    },
    enterprise: {
      title: 'Enterprise',
      price: 499,
      features: [
        'Unlimited job postings',
        'Custom AI matching models',
        'Featured placement (top of page)',
        'API access for integration',
        'White-label career pages',
        'Advanced analytics suite',
        '10 user seats included',
      ],
    },
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          The Right Plan for Your Business
        </h1>
        <p className="text-slate-300 mt-4 text-lg">
          Flexible pricing for companies of all sizes. Choose the plan that fits your recruitment needs and budget.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <PricingTier {...tiers.basic} />
        <PricingTier {...tiers.premium} />
        <PricingTier {...tiers.enterprise} />
      </div>
    </div>
  );
};

export default PricingPage;
