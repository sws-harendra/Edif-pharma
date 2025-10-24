// components/ManufacturingSection.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Next.js Image component ka istemal
import { 
  FaShieldAlt,    // Quality Assurance icon
  FaUserTie,      // Expert Workforce icon
  FaCheckCircle,  // Compliance Excellence icon
  FaArrowRight    // Button icon
} from 'react-icons/fa';

// Har feature item ke data ke liye type
type FeatureItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string; // Icon background color ke liye
};

// Features ka data
const features: FeatureItemProps[] = [
  {
    icon: FaShieldAlt,
    title: 'Quality Assurance',
    description: 'Comprehensive QA/QC systems with real-time monitoring',
    bgColor: 'bg-red-600',
  },
  {
    icon: FaUserTie,
    title: 'Expert Workforce',
    description: 'Highly trained professionals with decades of experience',
    bgColor: 'bg-blue-800',
  },
  {
    icon: FaCheckCircle,
    title: 'Compliance Excellence',
    description: 'Full compliance with WHO-GMP, FDA, and EU regulations',
    bgColor: 'bg-red-600',
  },
];

// Main Component
const ManufacturingSection: React.FC = () => {
  return (
    // Section ko halka gray background diya hai taaki pichle section se alag dikhe
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Container (Mobile par 1 col, large screen par 2 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 1. Content Column */}
          {/* Responsive order: mobile par yeh pehle aayega */}
          <div className="order-2 lg:order-1">
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Manufacturing Excellence
            </h2>
            {/* Description */}
            <p className="mt-4 text-lg text-gray-600">
              World-class manufacturing facilities with stringent quality assurance
              protocols, ensuring every product meets the highest international
              standards.
            </p>

            {/* Features List */}
            <div className="mt-10 space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  {/* Icon */}
                  <div 
                    className={`flex-shrink-0 w-12 h-12 flex items-center justify-center 
                                rounded-md text-white ${feature.bgColor}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-10">
              <Link
                href="/manufacturing-capabilities"
                className="
                  inline-flex items-center gap-2 px-6 py-3 
                  bg-blue-600 text-white font-semibold rounded-md shadow-md
                  hover:bg-blue-700 transition-colors duration-200
                  transform hover:scale-105
                "
              >
                View Manufacturing Capabilities
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* 2. Image Column */}
          {/* Responsive order: mobile par yeh neeche aayega */}
          <div className="order-1 lg:order-2">
            {/* IMPORTANT: 'manufacturing-plant.jpg' ko public folder mein rakhe image se badlein */}
            <Image
              src="/images/lab3.png" // Path to your image in the /public folder
              alt="Manufacturing facility"
              width={600}
              height={400}
              className="w-full h-auto rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ManufacturingSection;