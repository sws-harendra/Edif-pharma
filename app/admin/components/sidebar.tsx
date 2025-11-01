"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  User,
  LogIn,
  FolderOpen,
  Menu,
  X,
  Heading,
} from "lucide-react";
import { PiFlagBanner } from "react-icons/pi";
import { BiStats } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCreate } from "react-icons/io5";
import { MdCallToAction } from "react-icons/md";

// Type for each sidebar link
interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  color?: string;
  section?: string; // Optional grouping (e.g., Account)
}

const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Manage Header",
    href: "/admin/header",
    icon: <Heading />,
    color: "text-red-500",
  },
  {
    label: "Hero Section",
    href: "/admin/hero-section",
    icon: <PiFlagBanner />,
    color: "text-green-500",
  },
  {
    label: "Quick Stats",
    href: "/admin/quick-stats",
    icon: <BiStats />,
    color: "text-sky-500",
  },
  {
    label: "Manufacturing Section",
    href: "/admin/manufacturing",
    icon: <IoCreate />,
    color: "text-pink-500",
  },
  {
    label: "Main CTA",
    href: "/admin/final-cta",
    icon: <MdCallToAction />,
    color: "text-pink-500",
  },
  // Account Section
  {
    label: "Profile",
    href: "/admin/profile",
    icon: <User />,
    section: "Account Pages",
  },
  {
    label: "Sign In",
    href: "/admin/login",
    icon: <LogIn />,
    section: "Account Pages",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 👈 Get current route

  const toggleSidebar = () => setIsOpen(!isOpen);

  const groupedLinks = sidebarLinks.reduce((acc, link) => {
    const section = link.section || "Main";
    if (!acc[section]) acc[section] = [];
    acc[section].push(link);
    return acc;
  }, {} as Record<string, SidebarLink[]>);

  return (
    <>
      {/* Hamburger - Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md bg-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-background-light shadow-md flex flex-col justify-between rounded-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 p-5">
          <LayoutDashboard className="w-6 h-6 text-indigo-600" />
          <span className="text-lg font-semibold">Admin Pharma</span>
        </div>
        <hr className="border-gray-200 my-2" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {Object.entries(groupedLinks).map(([section, links]) => (
            <div key={section}>
              {section !== "Main" && (
                <div className="mt-6 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section}
                </div>
              )}
              {links.map(({ label, href, icon, color }) => (
                <SidebarItem
                  key={href}
                  icon={icon}
                  label={label}
                  href={href}
                  color={color}
                  active={pathname === href}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Help Section */}
        <div className="p-5">
          <div className="bg-gradient-to-b from-indigo-50 to-white rounded-2xl shadow-sm p-4 text-center">
            <div className="flex justify-center mb-2">
              <FolderOpen className="w-10 h-10 text-indigo-500" />
            </div>
            <p className="font-semibold text-gray-700">Need help?</p>
            <p className="text-sm text-gray-500 mb-4">Please Contact Us</p>

            <button className="w-full bg-gray-800 text-white py-2 rounded-xl text-sm mb-2 hover:bg-gray-700 transition-colors">
              Contact US
            </button>
            {/* <button className="w-full bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition-colors">
              Upgrade to Pro
            </button> */}
          </div>
        </div>
      </aside>
    </>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
  active?: boolean;
  href: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  color,
  active,
  href,
  onClick,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center space-x-3 px-5 py-2 rounded-xl mx-2 transition-colors cursor-pointer ${
      active
        ? "bg-indigo-50 text-indigo-700 font-semibold"
        : "text-foreground hover:bg-background"
    }`}
  >
    <span className={`${color || "text-gray-500"} w-5 h-5`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </Link>
);

export default Sidebar;
