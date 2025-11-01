"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchHeroByHeader } from "@/app/lib/store/features/heroSlice";
import { getImageUrl } from "@/app/utils/getImageUrl"; // 🧩 helper to prefix uploads

const Hero: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { heroes, status } = useSelector(
    (state: RootState) => state.heroSection
  );

  // Fetch hero for headerId = 2 (example)
  useEffect(() => {
    dispatch(fetchHeroByHeader(2));
  }, [dispatch]);

  const hero = heroes?.[0];

  // Show nothing until loaded
  if (status === "loading" || !hero) return null;

  return (
    <section
      className="relative bg-cover bg-center text-white h-[90vh] flex items-center"
      style={{
        backgroundImage: `url(${
          getImageUrl(hero.bannerImage!) || "/images/lab.png"
        })`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-teal-700/80 to-green-600/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[calc(100vh-80px)] py-20">
          {/* Text Content */}
          <div className="max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-6 text-xl text-gray-200">{hero.subheadline}</p>

            {/* Button Group */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={hero.primaryCtaLink || "#"}
                className="
                  inline-flex items-center justify-center px-6 py-3 
                  bg-white text-teal-700 font-semibold rounded-md shadow-md
                  hover:bg-gray-100 transition-colors duration-200
                  transform hover:scale-105
                "
              >
                {hero.primaryCtaText}
                <FaChevronRight className="ml-2 h-4 w-4" />
              </Link>

              {hero.secondaryCtaText && (
                <Link
                  href={hero.secondaryCtaLink || "#"}
                  className="
                    inline-flex items-center justify-center px-6 py-3 
                    bg-white text-teal-700 font-semibold rounded-md shadow-md
                    hover:bg-gray-100 transition-colors duration-200
                    transform hover:scale-105
                  "
                >
                  {hero.secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
