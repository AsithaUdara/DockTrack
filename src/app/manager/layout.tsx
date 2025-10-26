// src/app/(manager)/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/shared/layout/Sidebar';

export default function ManagerRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Close the drawer on hash/route changes (safety)
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Mobile hamburger (top-left, above page header) */}
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-[60] md:hidden rounded-lg p-2 bg-white/95 border border-gray-200 shadow hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Slide-in sidebar */}
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      {/* Backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Page content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
