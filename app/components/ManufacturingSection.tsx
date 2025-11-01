"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchAllManufacturing } from "@/app/lib/store/features/manufacturingSlice";

// All icons used across sections
import {
  FaShieldAlt,
  FaUserTie,
  FaCheckCircle,
  FaArrowRight,
  FaMicroscope,
  FaFileMedicalAlt,
  FaCogs,
} from "react-icons/fa";
import { getImageUrl } from "../utils/getImageUrl";

// Map string icon names from backend → icon components
const iconMap: Record<string, React.ElementType> = {
  FaShieldAlt,
  FaUserTie,
  FaCheckCircle,
  FaMicroscope,
  FaFileMedicalAlt,
  FaCogs,
};

const ManufacturingSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sections, status } = useSelector(
    (state: RootState) => state.manufacturing
  );

  // Fetch once
  useEffect(() => {
    dispatch(fetchAllManufacturing());
  }, [dispatch]);

  if (status === "loading")
    return <p className="text-center py-10">Loading sections...</p>;

  if (!sections?.length)
    return <p className="text-center py-10">No sections found</p>;

  return (
    <>
      {sections.map((section: any, index: number) => {
        // alternate layout → even = image right, odd = image left
        const isReversed = index % 2 !== 0;

        return (
          <section
            key={index}
            className={`${
              isReversed ? "bg-white" : "bg-gray-50"
            } py-16 sm:py-24`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`${
                    isReversed ? "order-1 lg:order-2" : "order-1 lg:order-1"
                  }`}
                >
                  {section.mediaUrl && (
                    <img
                      src={getImageUrl(section.mediaUrl)}
                      alt={section.name}
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`${
                    isReversed ? "order-2 lg:order-1" : "order-2 lg:order-2"
                  }`}
                >
                  <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    {section.name}
                  </h2>

                  <p className="mt-4 text-lg text-gray-600">
                    {section.description}
                  </p>

                  {/* Dynamic Features */}
                  <div className="mt-10 space-y-8">
                    {section.subheadings?.map((feature: any, i: number) => {
                      const Icon =
                        iconMap[feature.icon as keyof typeof iconMap] ||
                        FaCheckCircle;
                      return (
                        <div key={i} className="flex items-start gap-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md text-white ${
                              feature.bgColor || "bg-blue-600"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {feature.title}
                            </h3>
                            <p className="mt-1 text-base text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  {section.ctaText && (
                    <div className="mt-10">
                      <Link
                        href={section.ctaLink || "#"}
                        className="inline-flex items-center gap-2 px-6 py-3 
                          bg-blue-600 text-white font-semibold rounded-md shadow-md
                          hover:bg-blue-700 transition-colors duration-200
                          transform hover:scale-105"
                      >
                        {section.ctaText}
                        <FaArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default ManufacturingSection;
