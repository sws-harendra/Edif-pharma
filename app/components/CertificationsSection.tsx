// components/CertificationsSection.tsx

import React from "react";
import Link from "next/link";
import {
  FaShieldAlt, // Certification icon
  FaDownload, // Button icon
} from "react-icons/fa";

// Har certification card ke data ke liye type
type CertificationCardData = {
  icon: React.ElementType;
  title: string;
  description: string;
};

// Certifications ka data
const certifications: CertificationCardData[] = [
  {
    icon: FaShieldAlt,
    title: "WHO-GMP",
    description: "World Health Organization Good Manufacturing Practice",
  },
  {
    icon: FaShieldAlt,
    title: "US FDA",
    description: "United States Food and Drug Administration",
  },
  {
    icon: FaShieldAlt,
    title: "EU GMP",
    description: "European Union Good Manufacturing Practice",
  },
  {
    icon: FaShieldAlt,
    title: "ISO 9001",
    description: "International Organization for Standardization",
  },
];

// Main Component
const CertificationsSection: React.FC = () => {
  return (
    <section id="certificate_section" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Certifications & Quality Assurance
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our commitment to quality is validated by international regulatory
            bodies and industry standards.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert) => (
            <CertificationCard
              key={cert.title}
              icon={cert.icon}
              title={cert.title}
              description={cert.description}
            />
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-16 text-center">
          <Link
            href="/path/to/certifications.pdf" // Yahaan PDF ka link daalein
            target="_blank" // PDF ko naye tab mein kholne ke liye
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-6 py-3 
              bg-blue-800 text-white font-semibold rounded-md shadow-md
              hover:bg-blue-900 transition-colors duration-200
              transform hover:scale-105
            "
          >
            <FaDownload className="h-4 w-4" />
            Download Certifications PDF
          </Link>
        </div>
      </div>
    </section>
  );
};

// Alag se CertificationCard component (code saaf rakhne ke liye)
const CertificationCard: React.FC<CertificationCardData> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Icon Wrapper */}
      {/* Icon ka color (bg-red-600) 'Manufacturing' section se match kiya hai */}
      <div
        className="w-16 h-16 bg-red-600 text-white rounded-full 
                      flex items-center justify-center mx-auto mb-6"
      >
        <Icon className="h-8 w-8" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
  );
};

export default CertificationsSection;
