// src/components/shared/layout/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-end h-16">

          {/* Hamburger menu */}
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-500 hover:text-gray-800"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-4" ref={notifRef}>
            
            {/* Notification Button */}
            <button
              onClick={() => setShowNotifications((p) => !p)}
              className="relative p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                3
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Dropdown panel */}
          {showNotifications && (
  <div
    className="absolute right-4 top-16 w-72 bg-white border rounded-lg shadow-lg p-4 z-50
               origin-top animate-[fadeIn_0.15s_ease-out]"
  >
    <ul className="space-y-2 text-sm list-disc pl-5">
      <li className="text-gray-800">New report added</li>
      <li className="text-gray-800">Pending approval: 3 new photos</li>
      <li className="text-gray-800">System update scheduled</li>
    </ul>
  </div>
)}


          </div>
        </div>
      </div>
    </header>
  );
}
