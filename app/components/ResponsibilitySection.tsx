// components/ResponsibilitySection.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/store";
import { fetchCSR } from "@/app/lib/store/features/csrSustainabilitySlice";

const ResponsibilitySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { csr, status } = useAppSelector((state) => state.csrSustainability);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCSR());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <section className="flex justify-center items-center h-96 bg-gray-100 text-gray-700">
        Loading CSR data...
      </section>
    );
  }

  if (!csr || !csr.enabled) {
    return (
      <section className="flex justify-center items-center h-96 bg-gray-100 text-gray-700">
        CSR data not available.
      </section>
    );
  }

  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${csr.bannerImage || "/images/lab.png"})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-teal-800/80 to-blue-900/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        {/* Title */}
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {csr.title}
        </h2>

        {/* Subtitle */}
        {csr.subtitle && (
          <p className="mt-2 text-2xl font-medium text-teal-200">
            {csr.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-200">
          {csr.description}
        </p>

        {/* Stats (Dynamic from initiatives if you want) */}
        {csr.initiatives && csr.initiatives.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {csr.initiatives.slice(0, 3).map((item, index) => (
              <div key={index}>
                <p className="text-2xl font-bold text-white">{item.title}</p>
                <p className="mt-1 text-base text-gray-300">{item.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        <div className="mt-12">
          <Link
            href={csr.learnMoreLink || "#"}
            className="inline-flex items-center justify-center px-8 py-3 
              bg-white text-blue-800 font-semibold rounded-md shadow-md
              hover:bg-gray-100 transition-colors duration-200
              transform hover:scale-105"
          >
            {csr.learnMoreText || "Learn More"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResponsibilitySection;
