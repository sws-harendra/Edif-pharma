// components/StatsSection.tsx

import React from 'react';
import { 
  FaCalendarAlt, // Expertise icon
  FaBoxOpen,     // Products icon
  FaGlobeAmericas, // Countries icon
  FaAward        // Certification icon
} from 'react-icons/fa';

// Har stat card ke data ke liye type
type StatCardProps = {
  icon: React.ElementType;
  stat: string;
  title: string;
  subtitle?: string; // Optional subtitle (WHO-GMP ke liye)
};

// Stats ka data
const statsData: StatCardProps[] = [
  {
    icon: FaCalendarAlt,
    stat: '25+',
    title: 'Years of Expertise',
  },
  {
    icon: FaBoxOpen,
    stat: '100+',
    title: 'Products',
  },
  {
    icon: FaGlobeAmericas,
    stat: '45+',
    title: 'Countries Served',
  },
  {
    icon: FaAward,
    stat: 'WHO-GMP',
    title: 'EU GMP | US FDA Certified',
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid container */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Stats data ko map karke har card ko render karna */}
          {statsData.map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              stat={item.stat}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Alag se ek StatCard component (code saaf rakhne ke liye)
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, stat, title }) => {
  return (
    <div className="bg-white border rounded-xl shadow-lg p-8 text-center
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      
      {/* Icon Wrapper */}
      <div className="w-20 h-20 bg-blue-900 text-white rounded-full 
                      flex items-center justify-center mx-auto mb-6">
        <Icon className="h-10 w-10" />
      </div>
      
      {/* Stat Number / Text */}
      <p className="text-4xl font-extrabold text-gray-900">
        {stat}
      </p>
      
      {/* Title */}
      <p className="mt-2 text-lg font-medium text-gray-600">
        {title}
      </p>
    </div>
  );
};

export default StatsSection;