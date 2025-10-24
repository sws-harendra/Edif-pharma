// components/RnDSection.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js Image component ka istemal behtar optimization ke liye
import {
  FaMicroscope,
  FaFileMedicalAlt,
  FaCogs,
  FaArrowRight,
} from "react-icons/fa";

// Har feature item ke data ke liye type
type FeatureItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string; // Icon ke background color ke liye
};

// Features ka data
const features: FeatureItem[] = [
  {
    icon: FaMicroscope,
    title: "Advanced Analytics",
    description: "Cutting-edge analytical methods and quality control systems",
    bgColor: "bg-blue-800",
  },
  {
    icon: FaFileMedicalAlt,
    title: "Formulation Development",
    description: "Expert formulation science for complex drug delivery systems",
    bgColor: "bg-red-600",
  },
  {
    icon: FaCogs,
    title: "Process Innovation",
    description:
      "Continuous improvement in manufacturing processes and efficiency",
    bgColor: "bg-blue-800",
  },
];

// Main Component
const RnDSection: React.FC = () => {
  return (
    <section id="rnd-section" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Container (Mobile par 1 column, large screen par 2 column) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 1. Image Column */}
          <div>
            {/* IMPORTANT: 'rd-lab.jpg' ko public folder mein rakhe image se badlein */}
            <Image
              src="/images/lab2.png" // Path to your image in the /public folder
              alt="Innovation R&D Laboratory"
              width={600}
              height={400}
              className="w-full h-auto rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* 2. Content Column */}
          <div>
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Innovation & R&D Excellence
            </h2>
            {/* Description */}
            <p className="mt-4 text-lg text-gray-600">
              Our state-of-the-art research facilities drive pharmaceutical
              innovation, developing breakthrough solutions that meet evolving
              global healthcare needs.
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
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-10">
              <Link
                href="/r-and-d"
                className="
                  inline-flex items-center gap-2 px-6 py-3 
                  bg-blue-800 text-white font-semibold rounded-md shadow-md
                  hover:bg-blue-900 transition-colors duration-200
                  transform hover:scale-105
                "
              >
                Explore Our R&D Capabilities
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RnDSection;
