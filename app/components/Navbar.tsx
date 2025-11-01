"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchHeader } from "@/app/lib/store/features/headerSlice";
import { getImageUrl } from "@/app/utils/getImageUrl";
import type { MenuItem, HeaderData } from "@/app/services/header.service";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { header, status } = useSelector((state: RootState) => state.header);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!header && status === "idle") {
      dispatch(fetchHeader());
    }
  }, [dispatch, header, status]);

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  if (!header || status === "loading") return null;

  const {
    logoUrl,
    stickyHeader,
    menuItems = [],
    ctaButton,
  } = header as HeaderData;

  const sortedMenus = [...menuItems]
    .filter((m) => m.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <nav
      className={`bg-white shadow-md z-50 ${
        stickyHeader ? "sticky top-0" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-1">
              {logoUrl ? (
                <img
                  src={getImageUrl(logoUrl)}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain h-20 w-20"
                />
              ) : (
                <div className="text-xl font-bold text-gray-800">LOGO</div>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {sortedMenus.map((menu: MenuItem) =>
              menu.subMenus && menu.subMenus.length > 0 ? (
                <div key={menu.id} className="relative group">
                  <button className="flex items-center gap-1 text-gray-900 hover:text-red-600 font-medium transition-colors duration-200">
                    {menu.label}
                    <FaChevronDown className="h-3 w-3 mt-1" />
                  </button>
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-300 transform scale-95 group-hover:scale-100 z-10"
                  >
                    <div className="py-1">
                      {[...menu.subMenus]
                        .filter((s) => s.enabled)
                        .sort((a, b) => a.order - b.order)
                        .map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.url}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                          >
                            {sub.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={menu.id}
                  href={menu.url}
                  className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  {menu.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          {ctaButton?.enabled && (
            <div className="hidden md:block">
              <Link
                href={ctaButton.link || "#"}
                className="px-5 py-2.5 text-white font-medium rounded-md shadow-sm transition-colors duration-300"
                style={{ backgroundColor: ctaButton.color || "#e60000" }}
              >
                {ctaButton.text}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 space-y-2">
          {sortedMenus.map((menu: MenuItem) =>
            menu.subMenus && menu.subMenus.length > 0 ? (
              <div key={menu.id}>
                <button
                  onClick={() => toggleMobileDropdown(menu.label)}
                  className="w-full flex justify-between items-center py-2 font-medium text-gray-700 hover:text-red-600"
                >
                  {menu.label}
                  <FaChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeMobileDropdown === menu.label
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeMobileDropdown === menu.label ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {[...menu.subMenus]
                    .filter((s) => s.enabled)
                    .sort((a, b) => a.order - b.order)
                    .map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.url}
                        className="flex items-center gap-3 py-2 text-gray-600 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                </div>
              </div>
            ) : (
              <Link
                key={menu.id}
                href={menu.url}
                className="block py-2 font-medium text-gray-700 hover:text-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {menu.label}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          {ctaButton?.enabled && (
            <div className="pt-4">
              <Link
                href={ctaButton.link || "#"}
                className="block w-full text-center px-5 py-2.5 text-white font-medium rounded-md shadow-sm transition-colors duration-300"
                style={{ backgroundColor: ctaButton.color || "#e60000" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {ctaButton.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
