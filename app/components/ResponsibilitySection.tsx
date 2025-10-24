// components/ResponsibilitySection.tsx

import React from 'react';
import Link from 'next/link';

// Stats data ke liye type
type StatItem = {
  stat: string;
  label: string;
};

// Stats ka data
const stats: StatItem[] = [
  { stat: '500K+', label: 'Lives Impacted' },
  { stat: '25%', label: 'Carbon Reduction' },
  { stat: '15+', label: 'Community Programs' },
];

// Main Component
const ResponsibilitySection: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/lab.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-teal-800/80 to-blue-900/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                      py-10 text-center">
        
        {/* Title */}
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Healthcare with Responsibility
        </h2>
        
        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-200">
          Our commitment extends beyond manufacturing. We're dedicated to 
          sustainable practices, community health initiatives, and ethical business 
          operations that create lasting positive impact.
        </p>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="text-4xl font-bold text-white">
                {item.stat}
              </p>
              <p className="mt-2 text-base text-gray-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link
            href="/csr-report" // Yahaan report ka link daalein
            className="
              inline-flex items-center justify-center px-8 py-3 
              bg-white text-blue-800 font-semibold rounded-md shadow-md
              hover:bg-gray-100 transition-colors duration-200
              transform hover:scale-105
            "
          >
            Read Our CSR Report
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResponsibilitySection;