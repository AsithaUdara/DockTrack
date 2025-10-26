'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        ${active ? 'bg-[#003d82] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

/* ---------------- Desktop sidebar ---------------- */
function DesktopSidebar({
  userName = 'Manager',
  userEmail = 'manager@cdl.lk',
  active,
}: {
  userName?: string;
  userEmail?: string;
  active?: NavKey;
}) {
  const initials =
    (userName || '')
      .split(' ')
      .filter(Boolean)
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'M';

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:bottom-0 md:w-72 bg-white border-r border-slate-200 z-40">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#003d82] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CD</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#003d82] leading-tight">Colombo Dockyard PLC</p>
            <p className="text-xs text-gray-500">...an odyssey of Excellence</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#003d82] text-white flex items-center justify-center font-semibold text-lg">
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

/* ---------------- Top bar ---------------- */
function TopBar({
  title,
  userName = 'Manager',
}: {
  title: string;
  userName?: string;
}) {
  const initials =
    (userName || '')
      .split(' ')
      .filter(Boolean)
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'M';

  return (
    <header className="fixed top-0 right-0 left-0 md:left-72 h-16 bg-[#003d82] text-white z-30 shadow-md">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold truncate">{title}</h1>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-[#002d5f] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <div className="w-9 h-9 rounded-full bg-white text-[#003d82] flex items-center justify-center font-bold text-sm shadow-sm">
            {initials}
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
  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <DesktopSidebar userName={userName} userEmail={userEmail} active={active} />
      
      <div className="md:ml-72">
        <TopBar title={active ? active : title} userName={userName} />
        
        <main className="pt-16">
          <div className="px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}