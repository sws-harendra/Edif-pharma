// components/CTASection.tsx

import React from "react";
import Link from "next/link";
import {
  FaFileAlt, // Request a Quote icon
  FaPhoneAlt, // Phone icon
  FaEnvelope, // Email icon
} from "react-icons/fa";

// Main Component
const CTASection: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-gradient-to-r from-blue-800 via-teal-700 to-green-700 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Partner with a Trusted <br />
          Global Pharma Manufacturer
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
          Ready to elevate your pharmaceutical supply chain? Join 1000+
          companies worldwide who trust us for quality manufacturing and
          reliable partnerships.
        </p>

        {/* Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/request-quote"
            className="
              inline-flex items-center justify-center px-6 py-3 
              bg-white text-blue-800 font-semibold rounded-md shadow-md
              hover:bg-gray-100 transition-colors duration-200
              transform hover:scale-105
            "
          >
            <FaFileAlt className="mr-2 h-4 w-4" />
            Request a Quote
          </Link>

          {/* Dusra button (aapke image mein blank tha, maine 'Contact Us' daal diya hai) */}
          <Link
            href="/contact"
            className="
              inline-flex items-center justify-center px-6 py-3 
              bg-white text-blue-800 font-semibold rounded-md shadow-md
              hover:bg-gray-100 transition-colors duration-200
              transform hover:scale-105
            "
          >
            Contact Us
          </Link>
        </div>

        {/* Immediate Assistance Box */}
        <div
          className="mt-16 max-w-4xl mx-auto 
                        bg-black/20 backdrop-blur-sm rounded-lg p-6 sm:p-8"
        >
          <p className="text-lg font-semibold text-gray-100 mb-4">
            Need immediate assistance?
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
            {/* Phone */}
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors"
            >
              <FaPhoneAlt className="h-4 w-4" />
              <span className="font-medium">Phone:</span>
              +1 (555) 123-4567
            </a>

            {/* Divider */}
            <span className="hidden md:block text-gray-500">|</span>

            {/* Email */}
            <a
              href="mailto:partnerships@pharmaglobal.com"
              className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors"
            >
              <FaEnvelope className="h-4 w-4" />
              <span className="font-medium">Email:</span>
              partnerships@pharmaglobal.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
