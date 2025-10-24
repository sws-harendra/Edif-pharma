// components/ProductsSection.tsx

import React from 'react';
import Link from 'next/link';
import { 
  FaVial,             // APIs icon
  FaCapsules,         // Dosage Forms icon
  FaPrescriptionBottle, // Specialty Formulations icon
  FaIndustry          // Contract Manufacturing icon
} from 'react-icons/fa';

// Har product card ke data ke liye type
type ProductCardData = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  buttonType: 'filled' | 'outlined'; // Button style ke liye type
};

// Products ka data
const productsData: ProductCardData[] = [
  {
    icon: FaVial,
    title: 'APIs',
    description: 'High-quality Active Pharmaceutical Ingredients manufactured under stringent quality standards.',
    href: '/products/apis',
    buttonType: 'filled',
  },
  {
    icon: FaCapsules,
    title: 'Finished Dosage Forms',
    description: 'Complete pharmaceutical formulations ready for market distribution worldwide.',
    href: '/products/dosage-forms',
    buttonType: 'outlined',
  },
  {
    icon: FaPrescriptionBottle,
    title: 'Specialty Formulations',
    description: 'Custom pharmaceutical solutions tailored to specific therapeutic needs and markets.',
    href: '/products/specialty',
    buttonType: 'outlined',
  },
  {
    icon: FaIndustry,
    title: 'Contract Manufacturing',
    description: 'End-to-end manufacturing services from development to commercial production.',
    href: '/products/manufacturing',
    buttonType: 'outlined',
  },
];

// Main Component
const ProductsSection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Products & Capabilities
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive pharmaceutical solutions backed by decades of expertise and global regulatory compliance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productsData.map((product) => (
            <ProductCard
              key={product.title}
              icon={product.icon}
              title={product.title}
              description={product.description}
              href={product.href}
              buttonType={product.buttonType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Alag se ProductCard component
const ProductCard: React.FC<ProductCardData> = ({
  icon: Icon,
  title,
  description,
  href,
}) => {
 
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8
                    flex flex-col
                    transition-all duration-300 hover:shadow-xl">
      
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-md">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-grow mt-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-600">{description}</p>
      </div>

      {/* Button */}
      <div className="mt-8">
        <Link
          href={href}
          className={`inline-block  px-5 py-2.5 rounded-md font-medium text-sm
                      transition-colors duration-200
                      bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white`}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;