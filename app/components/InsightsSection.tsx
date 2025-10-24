// components/InsightsSection.tsx

import React from "react";
import Link from "next/link";
import {
  FaCalendarAlt, // Card date icon
  FaArrowRight, // Read More icon
  FaBookOpen, // View All icon (example)
} from "react-icons/fa";

// Har insight card ke data ke liye type
type InsightCardData = {
  date: string;
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor: string; // Category ke color ke liye
};

// Insights ka data
const insights: InsightCardData[] = [
  {
    date: "March 15, 2024",
    category: "Industry Insights",
    title: "Future of Pharmaceutical Manufacturing: Trends and Innovations",
    description:
      "Exploring emerging technologies and methodologies shaping the future of pharmaceutical production and quality control.",
    href: "/insights/future-of-pharma",
    categoryColor: "text-red-600",
  },
  {
    date: "March 10, 2024",
    category: "Regulatory",
    title: "Regulatory Compliance in Global Markets: A Comprehensive Guide",
    description:
      "Understanding the complex landscape of international pharmaceutical regulations and compliance requirements.",
    href: "/insights/regulatory-compliance",
    categoryColor: "text-red-600",
  },
  {
    date: "March 5, 2024",
    category: "Sustainability",
    title: "Sustainable Practices in Pharmaceutical Manufacturing",
    description:
      "How environmentally conscious manufacturing processes are becoming essential for modern pharmaceutical companies.",
    href: "/insights/sustainability",
    categoryColor: "text-red-600",
  },
];

// Main Component
const InsightsSection: React.FC = () => {
  return (
    <section id="blogs" className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Latest Insights & Knowledge
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed with our latest research findings, industry insights,
            and expert perspectives on pharmaceutical manufacturing.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <InsightCard
              key={insight.title}
              date={insight.date}
              category={insight.category}
              title={insight.title}
              description={insight.description}
              href={insight.href}
              categoryColor={insight.categoryColor}
            />
          ))}
        </div>

        {/* "View All" Button */}
        <div className="mt-16 text-center">
          <Link
            href="/insights"
            className="
              inline-flex items-center gap-2 px-6 py-3 
              bg-blue-800 text-white font-semibold rounded-md shadow-md
              hover:bg-blue-900 transition-colors duration-200
              transform hover:scale-105
            "
          >
            {/* <FaBookOpen className="h-4 w-4" /> */}
            View All Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

// Alag se InsightCard component (code saaf rakhne ke liye)
const InsightCard: React.FC<InsightCardData> = ({
  date,
  category,
  title,
  description,
  href,
  categoryColor,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-6
                    flex flex-col h-full
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Card Metadata */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <FaCalendarAlt className="h-4 w-4 mr-1.5" />
        <span>{date}</span>
        <span className="mx-2">&bull;</span>
        <span className={`font-medium ${categoryColor}`}>{category}</span>
      </div>

      {/* Card Content (flex-grow se yeh 'Read More' ko neeche push karega) */}
      <div className="flex-grow">
        <Link href={href}>
          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-800 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="mt-3 text-base text-gray-600">{description}</p>
      </div>

      {/* Read More Link */}
      <div className="mt-6">
        <Link
          href={href}
          className="
            inline-flex items-center gap-1.5 font-semibold 
            text-blue-700 hover:text-blue-900
            transition-all duration-200 group
          "
        >
          Read More
          <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default InsightsSection;
