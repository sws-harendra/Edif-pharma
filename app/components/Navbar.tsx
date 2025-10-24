"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaClinicMedical, // Logo icon
  FaChevronDown, // Dropdown arrow
  FaBars, // Mobile menu open
  FaTimes, // Mobile menu close
  FaInfoCircle, // About icons
  FaUsers,
  FaLandmark,
  FaPills, // Product icons
  FaCapsules,
  FaSyringe,
  FaNewspaper, // Newsroom icons
  FaBroadcastTower,
  FaRss,
} from "react-icons/fa";
import Image from "next/image";

// Dropdown item ke liye type definition
type DropdownItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

// Nav link ke liye type definition
type NavLink = {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
};

// Navigation links ka data
const navLinks: NavLink[] = [
  // { name: 'Home', href: '/' },
  {
    name: "About Us",
    href: "#",
    dropdown: [
      { name: "Our Mission", href: "/#our_mission", icon: FaInfoCircle },
      { name: "Our Team", href: "/#team", icon: FaUsers },
      { name: "Our History", href: "/#history", icon: FaLandmark },
    ],
  },
  {
    name: "Products",
    href: "#",
    dropdown: [
      { name: "Product A", href: "/#products", icon: FaPills },
      { name: "Product B", href: "/#products", icon: FaCapsules },
      { name: "Product C", href: "/#products", icon: FaSyringe },
    ],
  },
  { name: "Manufacturing & R&D", href: "/#rnd-section" },
  { name: "Certifications & Compliance", href: "/#certificate_section" },
  { name: "Markets Served", href: "/#market_served" },
  {
    name: "Newsroom",
    href: "#",
    dropdown: [
      { name: "Press Releases", href: "/#media_section", icon: FaNewspaper },
      { name: "In the Media", href: "/#testimonial", icon: FaBroadcastTower },
      { name: "Blog", href: "/#blogs", icon: FaRss },
    ],
  },
  { name: "Careers", href: "/#careers" },
  { name: "Contact Us", href: "/#contact" },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);

  // Mobile dropdown toggle logic
  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between h-20">
          {/* 1. Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <img
                src="/icon.png" // Path to your logo image
                alt="PharmaGlobal Logo"
                className="h-20 w-20"
              />
            </Link>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6 xxl:space-x-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                // Desktop Dropdown (Hover)
                <div key={link.name} className="relative group">
                  <button className="flex items-center gap-1 text-gray-900 hover:text-red-600 font-medium transition-colors duration-200">
                    {link.name}
                    <FaChevronDown className="h-3 w-3 mt-1" />
                  </button>
                  {/* Dropdown Menu */}
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                  transition-all duration-300 transform scale-95 group-hover:scale-100 z-10"
                  >
                    <div className="py-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Simple Link
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* 3. Desktop "Request a Quote" Button */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-md shadow-sm
                         hover:bg-red-700 transition-colors duration-300"
            >
              Request a Quote
            </Link>
          </div>

          {/* 4. Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Menu (Sliding) */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-xl
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"}`}
      >
        <div className="px-4 space-y-2">
          {navLinks.map((link) =>
            link.dropdown ? (
              // Mobile Dropdown (Clickable)
              <div key={link.name}>
                <button
                  onClick={() => toggleMobileDropdown(link.name)}
                  className="w-full flex justify-between items-center py-2 font-medium text-gray-700 hover:text-red-600"
                >
                  {link.name}
                  <FaChevronDown
                    className={`h-4 w-4 transition-transform duration-200 
                                ${
                                  activeMobileDropdown === link.name
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                  />
                </button>
                {/* Mobile Dropdown Sub-menu */}
                <div
                  className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out
                              ${
                                activeMobileDropdown === link.name
                                  ? "max-h-96"
                                  : "max-h-0"
                              }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 py-2 text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // Mobile Simple Link
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 font-medium text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.name}
              </Link>
            )
          )}

          {/* Mobile "Request a Quote" Button */}
          <div className="pt-4">
            <Link
              href="/request-quote"
              className="block w-full text-center px-5 py-2.5 bg-red-600 text-white font-medium rounded-md shadow-sm
                         hover:bg-red-700 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
