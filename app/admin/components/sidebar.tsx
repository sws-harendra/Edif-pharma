"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Table,
  CreditCard,
  Box,
  Globe,
  User,
  LogIn,
  FolderOpen,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2  rounded-lg shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-800" />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={` fixed lg:static top-0 left-0 h-screen  shadow-md flex flex-col justify-between rounded-r-2xl z-40 transition-transform duration-300 ease-in-out w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-2 p-5">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-semibold text-light">
              Edit Pharma
            </span>
          </div>

          <hr className="border-gray-200 my-2" />

          {/* Nav Links */}
          <nav className="mt-4 space-y-1">
            <SidebarItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              active
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
            />
            <SidebarItem
              icon={<Table />}
              label="Tables"
              color="text-red-500"
              href="/admin/tables"
              onClick={() => setIsOpen(false)}
            />
            <SidebarItem
              icon={<CreditCard />}
              label="Billing"
              color="text-green-500"
              href="/admin/billing"
              onClick={() => setIsOpen(false)}
            />
            <SidebarItem
              icon={<Box />}
              label="Virtual Reality"
              color="text-sky-500"
              href="/admin/vr"
              onClick={() => setIsOpen(false)}
            />
            <SidebarItem
              icon={<Globe />}
              label="RTL"
              color="text-pink-500"
              href="/admin/rtl"
              onClick={() => setIsOpen(false)}
            />

            <div className="mt-6 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account Pages
            </div>

            <SidebarItem
              icon={<User />}
              label="Profile"
              href="/admin/profile"
              onClick={() => setIsOpen(false)}
            />
            <SidebarItem
              icon={<LogIn />}
              label="Sign In"
              href="/admin/signin"
              onClick={() => setIsOpen(false)}
            />
          </nav>
        </div>

        {/* Help Section */}
        <div className="p-5">
          <div className="bg-gradient-to-b from-indigo-50 to-white rounded-2xl shadow-sm p-4 text-center">
            <div className="flex justify-center mb-2">
              <FolderOpen className="w-10 h-10 text-indigo-500" />
            </div>
            <p className="font-semibold text-gray-700">Need help?</p>
            <p className="text-sm text-gray-500 mb-4">Please check our docs</p>

            <button className="w-full bg-gray-800 text-white py-2 rounded-xl text-sm mb-2 hover:bg-gray-700 transition-colors">
              Documentation
            </button>
            <button className="w-full bg-indigo-500 text-white py-2 rounded-xl text-sm hover:bg-indigo-600 transition-colors">
              Upgrade to pro
            </button>
          </div>
        </div>
      </div>
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
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center space-x-3 px-5 py-2 rounded-xl mx-2 transition-colors cursor-pointer ${
        active
          ? "bg-indigo-50 text-indigo-700 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className={`${color || "text-gray-500"} w-5 h-5`}>{icon}</span>
      <span className="text-sm">{label}</span>
    </a>
  );
};

export default Sidebar;
