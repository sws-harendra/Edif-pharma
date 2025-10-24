// components/PartnersSection.tsx

import React from 'react';

// Partners ka data
const partners: string[] = [
  'Johnson & Johnson',
  'Pfizer',
  'Novartis',
  'Roche',
  'GSK',
  'Merck',
];

// Main Component
const PartnersSection: React.FC = () => {
  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted Partners
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
          
          {/* Partners data ko map karke har card ko render karna */}
          {partners.map((partnerName) => (
            <div
              key={partnerName}
              className="
                flex items-center justify-center 
                p-6 bg-gray-50 rounded-lg shadow-sm
                border border-gray-100
                transition-all duration-300 hover:bg-gray-100 hover:shadow-md
              "
            >
              <span className="text-center font-semibold text-gray-600">
                {partnerName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;