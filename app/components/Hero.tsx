"use client";
import React from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa'; // Icon ke liye

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white bg-[url('/images/lab.png')] h-[90vh] flex items-center"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-teal-700/80 to-green-600/70"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[calc(100vh-80px)] py-20">
          
          {/* Text Content */}
          <div className="max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Global Pharmaceutical Manufacturing Partner
            </h1>
            <p className="mt-6 text-xl text-gray-200">
              Supplying trusted APIs & formulations to 45+ countries across Africa, Europe & Asia.
            </p>
             
            {/* Button Group */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/request-quote"
                className="
                  inline-flex items-center justify-center px-6 py-3 
                  bg-white text-teal-700 font-semibold rounded-md shadow-md
                  hover:bg-gray-100 transition-colors duration-200
                  transform hover:scale-105
                "
              >
                Request a Quote
                <FaChevronRight className="ml-2 h-4 w-4" />
              </Link>
              
              {/* Dusra button (aapke image mein blank tha, maine 'Learn More' daal diya hai) */}
              <Link
                href="/about" // Ise apne hisab se change kar lein
                className="
                  inline-flex items-center justify-center px-6 py-3 
                  bg-white text-teal-700 font-semibold rounded-md shadow-md
                  hover:bg-gray-100 transition-colors duration-200
                  transform hover:scale-105
                "
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;