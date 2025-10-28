'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Import components and mock data
import NotificationPanel from '../NotificationPanel';
import { mockNotifications, unreadCount } from '@/data/mock-notifications';

// Corrected NavKey to match the image categories: Dashboard, Projects, Reports, Resources
type NavKey = 'Dashboard' | 'Projects' | 'Reports' | 'Resources';

export interface HeaderWithSidebarProps {
  title: string;
  active?: NavKey;
  userName?: string;
  userEmail?: string;
  children: React.ReactNode;
}

/* ---------------- Sidebar link ---------------- */
function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${active ? 'bg-blue-800 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

/* ---------------- Desktop sidebar ---------------- */
function DesktopSidebar({
  userName = 'Manager John Silva',
  userEmail = 'manager@cdl.lk',
  active,
  onClose,
}: {
  userName?: string;
  userEmail?: string;
  active?: NavKey;
  onClose?: () => void;
}) {
  const initials =
    (userName || '')
      .split(' ')
      .filter(Boolean)
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MJ';

  return (
    <aside className="flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 z-40">
      {/* Logo Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          {/* Note: In a real project, replace this with a proper next/image usage path */}
          <Image
            src="/cdl-logo.png"
            alt="Colombo Dockyard PLC"
            width={180}
            height={50}
            className="object-contain"
          />
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 md:hidden shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center font-semibold text-lg">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 truncate">{userName}</p>
            <p className="text-sm text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavItem
          href="/manager/dashboard"
          label="Dashboard"
          active={active === 'Dashboard'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />
        <NavItem
          href="/manager/projects"
          label="Projects"
          active={active === 'Projects'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        />
        <NavItem
          href="/manager/reports"
          label="Reports"
          active={active === 'Reports'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <NavItem
          href="/manager/resources"
          label="Resources"
          active={active === 'Resources'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        />
      </nav>
    </aside>
  );
}

/* ---------------- Top bar / Header ---------------- */
function TopBar({
  onMenuClick,
}: {
  onMenuClick: () => void;
  userName?: string;
}) {
  // 1. STATE FOR PANEL VISIBILITY
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // 2. REF FOR CLICK-OUTSIDE LOGIC
  const notificationsRef = useRef<HTMLDivElement>(null);

  // 3. EFFECT TO HANDLE CLICK-OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close if the click is outside the notification wrapper div
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    // Attach the event listener when the panel is open
    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener on unmount or when the panel closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);


  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-end h-16">
          {/* Hamburger Menu Button - Mobile only */}
          <button
            onClick={onMenuClick}
            className="md:hidden text-gray-500 hover:text-gray-800"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-4">
            {/* 4. WRAP BUTTON AND PANEL IN A RELATIVE DIV WITH REF */}
            <div className="relative" ref={notificationsRef}>
              {/* Notification Bell */}
              <button
                className="relative p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} // TOGGLE STATE
              >
                {/* Use the dynamically calculated unread count */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 00-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* 5. CONDITIONAL RENDERING OF THE PANEL */}
              {isNotificationsOpen && (
                <NotificationPanel
                  notifications={mockNotifications}
                  onClose={() => setIsNotificationsOpen(false)} // FIX: PASSING THE REQUIRED onClose PROP
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Shell ---------------- */
export default function HeaderWithSidebar({
  title,
  active,
  userName = 'Manager John Silva',
  userEmail = 'manager@cdl.lk',
  children,
}: HeaderWithSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <DesktopSidebar
          userName={userName}
          userEmail={userEmail}
          active={active}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="md:ml-72">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} userName={userName} />

        <main>
          <div className="px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}