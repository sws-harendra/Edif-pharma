// components/PressMediaSection.tsx

import React from "react";
import Link from "next/link";
import {
  FaCalendarAlt, // Date icon
  FaExternalLinkAlt, // External link icon
} from "react-icons/fa";

// "Featured In" list ke data ke liye type
type FeaturedInData = {
  letter: string;
  name: string;
};

// "Featured In" list ka data
const featuredIn: FeaturedInData[] = [
  { letter: "F", name: "Financial Times" },
  { letter: "F", name: "Forbes" },
  { letter: "R", name: "Reuters" },
  { letter: "B", name: "Bloomberg" },
  { letter: "T", name: "The Economist" },
];

// Main Component
const PressMediaSection: React.FC = () => {
  return (
    // 'Insights' section ki tarah bg-gray-50 ka use kar rahe hain
    <section id="media_section" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Press & Media Coverage
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Latest news and media coverage highlighting our achievements and
            industry recognition.
          </p>
        </div>

        {/* Main Grid (Mobile par 1 col, large screen par 3 col ka ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* 1. Left Column (Press Release) */}
          <div className="lg:col-span-2 bg-white h-full rounded-lg shadow-lg border border-gray-200 p-8">
            {/* Metadata */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaCalendarAlt className="h-4 w-4 mr-1.5" />
              <span>March 20, 2024</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              PharmaGlobal Expands Manufacturing Capacity with New $50M Facility
              in Southeast Asia
            </h3>

            {/* Description */}
            <p className="mt-4 text-base text-gray-600">
              The new state-of-the-art facility will increase our production
              capacity by 40% and create 200 new jobs, strengthening our
              commitment to serving growing Asian markets with quality
              pharmaceutical products.
            </p>

            {/* Read Full Release Button */}
            <div className="mt-6">
              <Link
                href="/press-release-link" // Yahaan actual link daalein
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1.5 px-4 py-2 
                  font-medium text-sm text-gray-700 
                  border border-gray-300 rounded-md
                  hover:bg-gray-50 transition-colors
                "
              >
                Read Full Release
                <FaExternalLinkAlt className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* 2. Right Column (Featured In) */}
          <div className="lg:col-span-1 space-y-5">
            <h4 className="text-xl font-bold text-gray-900">Featured In</h4>

            {/* Featured List */}
            <div className="space-y-4">
              {featuredIn.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-lg shadow-md border border-gray-200 
                             p-4 flex items-center gap-4
                             transition-all duration-300 hover:shadow-lg"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 bg-blue-800 text-white 
                                  flex items-center justify-center rounded-md font-bold text-lg"
                  >
                    {item.letter}
                  </div>
                  <span className="font-semibold text-gray-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* View All Newsroom Button */}
            <div className="mt-6">
              <Link
                href="/newsroom"
                className="
                  w-full inline-flex items-center justify-center gap-2 px-6 py-3 
                  bg-blue-800 text-white font-semibold rounded-md shadow-md
                  hover:bg-blue-900 transition-colors duration-200
                "
              >
                View All Newsroom
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressMediaSection;
