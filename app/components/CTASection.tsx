"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchCTABanner } from "../lib/store/features/finalCtaBannerSlice";
import { getImageUrl } from "../utils/getImageUrl";

const CTASection: React.FC = () => {
  // Get CTA data from Redux slice
  const ctaData = useSelector(
    (state: RootState) => state.finalCtaBanner.banner
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCTABanner());
  }, []);
  // If no data yet (API not loaded), show nothing or a skeleton
  if (!ctaData) return null;

  return (
    <section
      id="contact"
      className="text-white relative"
      style={{
        background: `linear-gradient(to right, ${ctaData.gradientStart}, ${ctaData.gradientEnd})`,
        backgroundImage: ctaData.backgroundImage
          ? `url(${getImageUrl(ctaData.backgroundImage)})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {ctaData.title}
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
          {ctaData.subtitle}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Quote Button */}
          {ctaData.quoteButtonText && (
            <Link
              href={ctaData.quoteButtonLink || "#"}
              className="inline-flex items-center justify-center px-6 py-3 
                bg-white text-blue-800 font-semibold rounded-md shadow-md
                hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              <FaFileAlt className="mr-2 h-4 w-4" />
              {ctaData.quoteButtonText}
            </Link>
          )}

          {/* Catalog Button */}
          {ctaData.catalogButtonText && ctaData.catalogFile && (
            <a
              href={ctaData.catalogFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 
                bg-white text-blue-800 font-semibold rounded-md shadow-md
                hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              <FaDownload className="mr-2 h-4 w-4" />
              {ctaData.catalogButtonText}
            </a>
          )}
        </div>
      </div>

      {/* Optional background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  );
};

export default CTASection;
