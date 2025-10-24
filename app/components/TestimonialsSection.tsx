// components/TestimonialsSection.tsx

import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa'; // Icons ke liye

// Har testimonial card ke data ke liye type
type TestimonialCardData = {
  rating: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
};

// Testimonials ka data
const testimonials: TestimonialCardData[] = [
  {
    rating: 5,
    quote: "PharmaGlobal has been our reliable partner for consistent quality and timely delivery across multiple markets. Their commitment to excellence is unmatched.",
    authorName: "Dr. Sarah Johnson",
    authorTitle: "Chief Procurement Officer",
    authorCompany: "Global Health Solutions",
  },
  {
    rating: 5,
    quote: "The regulatory compliance and documentation provided by PharmaGlobal made our market entry seamless across 15 countries.",
    authorName: "Michael Chen",
    authorTitle: "Regional Director",
    authorCompany: "International Pharma Corp",
  },
  {
    rating: 5,
    quote: "Their R&D capabilities and custom formulation services have helped us bring innovative products to market faster than ever before.",
    authorName: "Dr. Maria Rodriguez",
    authorTitle: "Head of Product Development",
    authorCompany: "MedTech Innovations",
  },
];

// Main Component
const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our partnerships speak to our commitment to quality, reliability, and innovation in 
            pharmaceutical manufacturing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              authorName={testimonial.authorName}
              authorTitle={testimonial.authorTitle}
              authorCompany={testimonial.authorCompany}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Alag se TestimonialCard component (code saaf rakhne ke liye)
const TestimonialCard: React.FC<TestimonialCardData> = ({
  rating,
  quote,
  authorName,
  authorTitle,
  authorCompany
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 
                    p-8 flex flex-col h-full
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <FaStar key={i} className="h-5 w-5 text-yellow-500" />
        ))}
      </div>

      {/* Quote Icon */}
      <FaQuoteLeft className="h-10 w-10 text-gray-200 mb-4" />

      {/* Quote Text (flex-grow se yeh author info ko neeche push karega) */}
      <p className="text-gray-600 italic flex-grow">
        "{quote}"
      </p>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Author Info */}
      <div>
        <p className="font-bold text-gray-900">{authorName}</p>
        <p className="text-sm text-gray-500">{authorTitle}</p>
        <p className="text-sm font-semibold text-blue-700 mt-1">{authorCompany}</p>
      </div>
    </div>
  );
};

export default TestimonialsSection;