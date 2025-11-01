"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Edit } from "lucide-react";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { fetchHeader } from "@/app/lib/store/features/headerSlice";
import Modal from "@/app/components/Modal";
import EditHeaderForm from "./components/editheader";
import { getImageUrl } from "@/app/utils/getImageUrl";

export default function ManageHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { header, status, error } = useSelector(
    (state: RootState) => state.header
  );
  const [open, setOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(
    null
  );

  // ✅ Fetch header on mount
  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-5">
        <p className="text-gray-500">Loading header...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-red-100 text-red-600 text-center py-3">
        Failed to load header: {error}
      </div>
    );
  }

  if (!header) return null;

  const { logoUrl, stickyHeader, menuItems = [], ctaButton } = header;

  // ✅ Sort and filter menu items
  const sortedMenu = [...menuItems]
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <header
      className={`${
        stickyHeader ? "sticky top-0" : ""
      } z-50 bg-white  shadow-md`}
    >
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Header">
        <EditHeaderForm />
      </Modal>

      <nav className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src={getImageUrl(logoUrl)}
            alt="Company Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* ✅ Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8">
          {sortedMenu.map((item) => (
            <li key={item.id} className="relative group">
              {item.subMenus && item.subMenus.length > 0 ? (
                <>
                  <button
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="flex items-center gap-1 text-gray-800 hover:text-blue-600 transition"
                  >
                    {item.label} <ChevronDown size={16} />
                  </button>
                  {activeDropdown === item.id && (
                    <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 z-50">
                      {item.subMenus.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.url}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-800 hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* ✅ CTA Button */}
          {ctaButton?.enabled && (
            <Link
              href={ctaButton.link}
              style={{ backgroundColor: ctaButton.color }}
              className="text-white px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              {ctaButton.text}
            </Link>
          )}
        </ul>

        {/* ✅ Edit Button — Now on the Right */}
        <button
          onClick={() => setOpen(true)}
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>

        {/* ✅ Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* ✅ Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md">
          <ul className="flex flex-col space-y-1 px-4 py-2">
            {sortedMenu.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                </Link>
                {item.subMenus && item.subMenus.length > 0 && (
                  <ul className="pl-4 space-y-1">
                    {item.subMenus.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={sub.url}
                          className="block py-1 text-gray-500 hover:text-blue-500"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {ctaButton?.enabled && (
              <Link
                href={ctaButton.link}
                style={{ backgroundColor: ctaButton.color }}
                className="block text-center text-white font-medium py-2 rounded-md mt-2"
              >
                {ctaButton.text}
              </Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
