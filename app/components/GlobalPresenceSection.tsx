// components/GlobalPresenceSection.tsx

import React from 'react';
import { 
  FaGlobeAmericas,  // Main icon
  FaMapMarkerAlt    // Card icon
} from 'react-icons/fa';
import { 
  FaArrowTrendUp  // Growth icon (react-icons/fa6 se)
} from 'react-icons/fa6'; // 'fa6' 'react-icons' ke latest version mein included hai

// Har continent card ke data ke liye type
type ContinentCardData = {
  icon: React.ElementType;
  continent: string;
  count: string;
  growth: string;
  growthIcon: React.ElementType;
};

// Continent cards ka data
const continentsData: ContinentCardData[] = [
  {
    icon: FaMapMarkerAlt,
    continent: 'Africa',
    count: '15+ Countries',
    growth: '+25% YoY',
    growthIcon: FaArrowTrendUp,
  },
  {
    icon: FaMapMarkerAlt,
    continent: 'Europe',
    count: '18+ Countries',
    growth: '+18% YoY',
    growthIcon: FaArrowTrendUp,
  },
  {
    icon: FaMapMarkerAlt,
    continent: 'Asia',
    count: '12+ Countries',
    growth: '+32% YoY',
    growthIcon: FaArrowTrendUp,
  },
];

// Main Component
const GlobalPresenceSection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Global Presence
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Trusted pharmaceutical partner serving healthcare markets across three continents.
          </p>
        </div>

        {/* Large Summary Card */}
        {/* Halki background color (bg-gray-50) aapke design se match karne ke liye */}
        <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-100 
                        p-10 sm:p-12 text-center mb-16">
          <FaGlobeAmericas className="h-16 w-16 text-blue-800 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900">
            Exporting to 45+ Countries Worldwide
          </h3>
          <p className="mt-3 text-md text-gray-600">
            Building global healthcare partnerships since 1998
          </p>
        </div>

        {/* Continent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {continentsData.map((continent) => (
            <ContinentCard
              key={continent.continent}
              icon={continent.icon}
              continent={continent.continent}
              count={continent.count}
              growth={continent.growth}
              growthIcon={continent.growthIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Alag se ContinentCard component (code saaf rakhne ke liye)
const ContinentCard: React.FC<ContinentCardData> = ({
  icon: Icon,
  continent,
  count,
  growth,
  growthIcon: GrowthIcon
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Icon */}
      <Icon className="h-10 w-10 text-blue-800 mx-auto mb-5" />
      
      {/* Continent Name */}
      <h4 className="text-2xl font-bold text-gray-900">{continent}</h4>
      
      {/* Country Count */}
      <p className="mt-2 text-base text-gray-600">{count}</p>
      
      {/* Growth Stat */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <GrowthIcon className="h-4 w-4 text-green-600" />
        <span className="text-sm font-semibold text-green-600">{growth}</span>
      </div>
    </div>
  );
};

export default GlobalPresenceSection;